var express = require('express');
var fs      = require('fs');
var path = require('path');
var useragent = require('useragent');
useragent(true);
//var app = express();

function server(){
	this.app = express();
	this.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	this.ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    this.configRoutesDirs = function(){ 
    	 
    	 this.app.use('/css',express.static(path.join(__dirname, '/css')))
			    .use('/js',express.static(path.join(__dirname, '/js')))
				.use('/img',express.static(path.join(__dirname, '/img')))
				.use('/sitemap',express.static(path.join(__dirname, '/sitemap.xml')))
				.use(require('prerender-node').set('prerenderToken', 'qgpXq9plHix3AZDCa3Xp'))
				.get('/', function(req, res) {
					checkUserAgent(req);
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
					
			    	res.sendFile(path.join(__dirname + '/templates/article.html'));
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

checkUserAgent = function(req){
		var agent = useragent.parse(req.headers['user-agent']);
		console.log("useragent: "+agent);
	};

var AppServer = new server();
	AppServer.configRoutesDirs();
	AppServer.start();