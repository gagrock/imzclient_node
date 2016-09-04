var express = require('express');
var fs      = require('fs');
var path = require('path');
//var app = express();

function server(){
	this.app = express();
	this.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	this.ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    this.configRoutesDirs = function(){ 
    	 
    	 this.app.use('/css',express.static(path.join(__dirname, '/css')))
			    .use('/js',express.static(path.join(__dirname, '/js')))
				.use('/img',express.static(path.join(__dirname, '/img')))
				.get('/', function(req, res) {
			    	res.sendFile(path.join(__dirname + '/templates/home.html'));
				})
				.get('/explore', function(req, res) {
			    	res.sendFile(path.join(__dirname + '/templates/explore.html'));
				})
				.get('/signup', function(req, res) {
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
				.get('/article', function(req, res) {
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


var AppServer = new server();
	AppServer.configRoutesDirs();
	AppServer.start();