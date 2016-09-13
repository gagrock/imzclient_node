// Express is our web server that can handle request
var express = require('express');
var app = express();




function BotServer(){
  this.app = express();
  this.port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
  this.ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  this.configure = function(){ 
     
       this.app
        .get('/', function(req, res) { 
          //simplyfy the routes of all urls here with reg expression
          respond(req,res);
        });
       
      };

  this.start = function(){
       var port = this.port;
       var ip = this.ip_address;    
        this.app.listen(port, ip, function () {
          console.log( "BotServer Listening on " + ip + ", server_port " + port);
        });
  };


} //end

var Bot_Server = new BotServer();
  Bot_Server.configure();
  Bot_Server.start();


