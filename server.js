var express = require('express');
var app = express();
var path = require('path');

app.use('/css',express.static(path.join(__dirname, '/css')));
app.use('/js',express.static(path.join(__dirname, '/js')));
app.use('/img',express.static(path.join(__dirname, '/img')));
app
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
	})

  .listen(8080);