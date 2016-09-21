var sitemap = require("./modules/sitemap.js");

var urlbuilder = new sitemap.URLBuilder();
var xmlBuilder = new sitemap.xmlBuilder();

//init urlmap
xmlBuilder.readSiteMap(function(urls){
	
	for(var i = 0; i < urls.length; i++){
		urlbuilder.urlset.url.push(urls[i]);
	}
});

//console.log(urlbuilder.ifURLPresent("http://www.dtccf.com")); //check if url present

//console.log("setUrl =" ,urlbuilder.setUrl("http://www.dtccf.com")); //add url

//console.log("converter" , xmlBuilder.convert(urlbuilder.setUrl("http://www.dtccf.com")));


//console.log(urlbuilder.ifURLPresent("http://www.dtccf.com"));

//write xmlto file


var st = setInterval(function(){
	if(sitemap.isReadComplete){
		clearInterval(st);
		if(!urlbuilder.ifURLPresent("http://redriectmap.com")){

			var data = urlbuilder.setUrl("http://redriectmap.com");
			console.log(data);

		    var xml = xmlBuilder.convert("urlset",data);

		    console.log(xml);
		    
		    xmlBuilder.writeSiteMap(xml);
		}

	}

},100);