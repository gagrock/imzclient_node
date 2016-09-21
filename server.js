var express = require('express');
var fs      = require('fs');
var path = require('path');

var sitemap = require("./modules/sitemap.js");
var urlbuilder = new sitemap.URLBuilder();
var xmlBuilder = new sitemap.xmlBuilder();



function server(){
	this.app = express();
	this.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	this.ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    this.configRoutesDirs = function(){ 
    	 
    		//init urlmap
			xmlBuilder.readSiteMap(function(urls){
				for(var i = 0; i < urls.length; i++){
					urlbuilder.urlset.url.push(urls[i]);
				}
			});

    	 this.app.use('/css',express.static(path.join(__dirname, '/css')))
			    .use('/js',express.static(path.join(__dirname, '/js')))
				.use('/img',express.static(path.join(__dirname, '/img')))
				.use('/sitemap',express.static(path.join(__dirname, '/sitemap.xml')))
				.use('/BingSiteAuth.xml',express.static(path.join(__dirname, '/BingSiteAuth.xml')))
				.use(require('prerender-node').set('prerenderToken', 'qgpXq9plHix3AZDCa3Xp'))
				.get('/', function(req, res) {
					
			    	res.sendFile(path.join(__dirname + '/templates/home.html'));
				})
				.get('/explore', function(req, res) {
					console.log(req.url);
			    	res.sendFile(path.join(__dirname + '/templates/explore.html'));
				})
				.get('/signup', function(req, res) {
					console.log(req.url);
			    	res.sendFile(path.join(__dirname + '/templates/signup.html'));
				})
				.get('/editor', function(req, res) {

			    	res.sendFile(path.join(__dirname + '/templates/editor.html'));
				})
				.get('/articles', function(req, res) {
			    	res.sendFile(path.join(__dirname + '/templates/userArticles.html'));
				})
				.get('/account', function(req, res) {
			    	res.sendFile(path.join(__dirname + '/templates/account.html'));
				})
				.get('/:author/articles/:id/:title', function(req, res) {
					var fullUrl = req.protocol + '://' + "www.imzah.com" + req.originalUrl;
					console.log(fullUrl);
			    	res.sendFile(path.join(__dirname + '/templates/article.html'));

			    	
					if(!urlbuilder.ifURLPresent(fullUrl)){

						var data = urlbuilder.setUrl(fullUrl);
						var xml = xmlBuilder.convert("urlset",data);
					    console.log(xml);
				        if(sitemap.isReadComplete){
							xmlBuilder.writeSiteMap(xml);
						 }
				   }
				});
		   
			};

	this.start = function(){
			 var port = this.port;
			 var ip = this.ip_address;		
			  this.app.listen(port, ip, function () {
				  console.log( "Listening on " + ip + ", server_port " + port);
				});
	};

	

} //




var AppServer = new server();
	AppServer.configRoutesDirs();
	AppServer.start();