
var fs = require('fs'),
	path = require('path'),
    xml2js = require('xml2js'),
    data2xml = require('data2xml');

exports.convertDataToXml = data2xml({ attrProp : '@', valProp  : '#', cdataProp : '%' });   
exports.xmlToJsParser = new xml2js.Parser();

exports.URLBuilder = function(){
	 //function
	this.urlset = {
	
        '@' : { 
        	'xmlns' : "http://www.sitemaps.org/schemas/sitemap/0.9",
        	'xmlns:xsi' : "http://www.w3.org/2001/XMLSchema-instance",
        	'xsi:schemaLocation' :"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
         }
       
	};
	this.urlset.url = [];
	this.urlLength = function(){return this.urlset.url.length; };

	this.setUrl = function(url){
		var node = {

			"loc" :[ url ],
			"lastmod" : [ new Date().toISOString() ],
			"changefreq" : "weekly",
			"priority" : ["1.00"]
		};		    
		this.urlset.url.push(node);

		return this.urlset;
	
	};

	this.ifURLPresent = function(key) {
			var urls = this.urlset.url;
		    var i, len = urls.length;

		    for (i = 0; i < len; i++) {
		    	var urlLoc = urls[i].loc;
		        if(urlLoc && urlLoc[0] === key ) return true;
		        
		    }
		    
		    return false;
	};
	
};	
exports.isReadComplete = false;
exports.xmlBuilder = function(){
     
     this.convert = function(pname,data){

			return exports.convertDataToXml(pname,data);
	 };

	 this.readSiteMap = function(init){
 
	    fs.readFile(path.join(__dirname, '../', 'sitemap.xml'), 
	    	function(err, data) {
				if(!err){
		    	   exports.xmlToJsParser.parseString(data,
		    	   		 function (err, result) {
		    				init(result.urlset.url);
		    				exports.isReadComplete = true;
		       		  	 });
		    	}//no erro in fetching	
		});//endof readfile
	};

	this.writeSiteMap = function(xmldata){

		fs.writeFile(path.join(__dirname, '../', 'sitemap.xml'), 
		  xmldata, 
		  function(error) {
		    if (error) {
		      		console.log("error in writing to sitemap", error);
		    	} 
		    	else {
		      		console.log("sitemap  was saved! Successfully..");
		    }
		  }); 

	}

};





