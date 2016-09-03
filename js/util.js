

function Article(date , name , cover, content , title , url){
	   this.date = date;
		this.author = name;
	   this.cover = cover;
	   this.content = content;
	  this.title  = title;
	  this.url   = url;
}

function Comment(content){
	this.content = content;
}
function postUser(username,email,password){
	this.username =(username);
	this.email =(email);
	this.password = (password);
}



update ={
	onScroll : function(callback)
		{
		  $(window).scroll(function(){
			 var scrolltop = $(window).scrollTop();
			 var bottom = $(document).height() - $(window).height();
			 if(scrolltop == bottom) callback(); 		
			});	 
		 
		}
};




var Base64 = {
// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


//public method for encoding
encodeObase : function (input) {
 var output = "";
 var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
 var i = 0;
if(input !== null){
 input = Base64._utf8_encode(input);

 while (i < input.length) {

     chr1 = input.charCodeAt(i++);
     chr2 = input.charCodeAt(i++);
     chr3 = input.charCodeAt(i++);

     enc1 = chr1 >> 2;
     enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
     enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
     enc4 = chr3 & 63;

     if (isNaN(chr2)) {
         enc3 = enc4 = 64;
     } else if (isNaN(chr3)) {
         enc4 = 64;
     }

     output = output +
     Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
     Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

 }

 return output;
}
},

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
   if(input !== null){
    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

    }

    return "Base "+output;
  }
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    //remove the appended Base String
    if(input !== null){
    arr = input.split(/[ ]+/);
    if(arr.length == 2 )
    input = arr[1].replace(/[^A-Za-z0-9\+\/\=]/g, "");
    else 
    input = arr[0].replace(/[^A-Za-z0-9\+\/\=]/g, "");	

    while (i < input.length) {

        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;
    }
},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c= 0, c1 = 0, c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }
    return string;
}
};
/*end of Base64*/

var Ajax ={
		 AllUserURL : "http://backendapi-vbr.rhcloud.com/api/users",
		 publicURL : "http://backendapi-vbr.rhcloud.com/api/public/"
};
Ajax.GET = function(obj){
	if(typeof obj.prejax == 'function') obj.prejax();
	  $.ajax({ 
		 xhr: function(){
			 var xhr = new XMLHttpRequest();
			 xhr.addEventListener("progress",function(event){
				if(typeof obj.progress == 'function') obj.progress(event);
					 
			 },false);
			 
			 xhr.onloadstart = function (e) {
				 if(typeof obj.loadStart == 'function') obj.loadStart(e);
				};
			xhr.onloadend = function (e) {
					if(typeof obj.loadEnd == 'function') obj.loadEnd(e);
				};
			return xhr; 
		 }, 
	   ifModified : true,	   
       type: "GET",
       dataType: "json",
       contentType:"application/json",
       url: obj.url,
       beforeSend : function(request){
    	   if(typeof obj.beforeSend == 'function') 
    	     obj.beforeSend(request);},
       success: function(data){ 
    	   		if(typeof obj.success == 'function')
    		   	obj.success(data); 
    	  },  
	    error:function(data){
	    		if(typeof obj.error == 'function') 
	    			obj.error(data);
	    },
	    complete: function( jqxhr,  status){
	    	if(typeof obj.complete == 'function') 
    			obj.complete(jqxhr, status);
	    	
	    }
    	  
   });
  
};//end of GET


Ajax.POST  = function(obj){
	   
	if(typeof obj.prejax == 'function') obj.prejax();
	  $.ajax({ 
		 xhr: function(){
			   var xhr = new XMLHttpRequest();
			   xhr.upload.addEventListener("progress",function(event){
			   if(typeof obj.progress == 'function') obj.progress(event);	 
			   },false);
			   
			  xhr.onloadstart = function (e) {
					 if(typeof obj.loadStart == 'function') obj.loadStart(e);
					};
			xhr.onloadend = function (e) {
						if(typeof obj.loadEnd == 'function') obj.loadEnd(e);
					};
			   return xhr; 
		 }, 
        type: "POST",
        dataType: "json",
        contentType:"application/json",
        url: obj.url,
        data: obj.data,
	   	beforeSend : function(request){
	   				if(typeof obj.beforeSend == 'function') 
	   						obj.beforeSend(request);
	   				}, 
        success: function(data){ 
	   				if(typeof obj.success == 'function')
	   				obj.success(data); 
        	},  
        error:function(data){
    			if(typeof obj.error == 'function') 
    			obj.error(data);
        },
	    complete: function( jqxhr,  status){
	    	if(typeof obj.complete == 'function') 
    			obj.complete(jqxhr, status);
	    	
	    }
        	
    });
};


Ajax.PUT  = function(obj){
	   
	if(typeof obj.prejax == 'function') obj.prejax();
	  $.ajax({ 
		 xhr: function(){
			   var xhr = new XMLHttpRequest();
			   xhr.upload.addEventListener("progress",function(event){
			   if(typeof obj.progress == 'function') obj.progress(event);	 
			   },false);
			   
			  xhr.onloadstart = function (e) {
					 if(typeof obj.loadStart == 'function') obj.loadStart(e);
					};
			xhr.onloadend = function (e) {
						if(typeof obj.loadEnd == 'function') obj.loadEnd(e);
					};
			   return xhr; 
		 }, 
     type: "PUT",
     dataType: "json",
     contentType:"application/json",
     url: obj.url,
     data: obj.data,
	   	beforeSend : function(request){
	   				if(typeof obj.beforeSend == 'function') 
	   						obj.beforeSend(request);
	   				}, 
     success: function(data){ 
	   				if(typeof obj.success == 'function')
	   				obj.success(data); 
     	},  
     error:function(data){
 			if(typeof obj.error == 'function') 
 			obj.error(data);
     },
	 complete: function( jqxhr,  status){
	    	if(typeof obj.complete == 'function') 
    			obj.complete(jqxhr, status);
	    	
	    }
 });
};


Ajax.DELETE  = function(obj){
	   log(obj);
	if(typeof obj.prejax == 'function') obj.prejax();
	  $.ajax({ 
		 xhr: function(){
			   var xhr = new XMLHttpRequest();
			   xhr.upload.addEventListener("progress",function(event){
			   if(typeof obj.progress == 'function') obj.progress(event);	 
			   },false);
			   
			  xhr.onloadstart = function (e) {
					 if(typeof obj.loadStart == 'function') obj.loadStart(e);
					};
			xhr.onloadend = function (e) {
						if(typeof obj.loadEnd == 'function') obj.loadEnd(e);
					};
			   return xhr; 
		 }, 
     type: "DELETE",
     dataType: "json",
     contentType:"application/json",
     url: obj.url,
     data: {},
	   	beforeSend : function(request){
	   				if(typeof obj.beforeSend == 'function') 
	   						obj.beforeSend(request);
	   				}, 
     success: function(data){ 
	   				if(typeof obj.success == 'function')
	   				obj.success(data); 
     	},  
     error:function(data){
 			if(typeof obj.error == 'function') 
 			obj.error(data);
     },
	 complete: function( jqxhr,  status){
	    	if(typeof obj.complete == 'function') 
    			obj.complete(jqxhr, status);
	    	
	    }
 });
};


var progressBar = {
		width:1,
		height:2,
		counter:2,
		headerclass: "",
		top: 0,
		append: false,
		position: "fixed",
		
		build : function(headerclass,top){
			log('pb build');
			if(top !== undefined) this.top = top;
			
			console.log("position is: "+this.position);
	
			this.headerclass = headerclass;
			
			if(this.append === true){
				$(this.headerclass).append("<div class='loading small-12 large-12 medium-12 '></div>");
			    log("PB appended to"+headerclass);
			}
			else{ 
				$(this.headerclass).prepend("<div class='loading small-12 large-12 medium-12 '></div>");
				log("PB prepended to"+headerclass);
			}
		
		$('.loading').css('position',this.position)
					.css('top',this.top+'px')
					.css('height',this.height+'px')
					.css('margin',"0")
					.css('left','0')
					.css('z-index','999');
		
		
		if(this.position === 'fixed'){
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				if (scrollTop > 0) {
		            $('.loading').css('top',0+'px');
				}
			});
		}
			
		},
		initialize:function(event){
			$('.loading').css('background-color'," #9c27b0");   
			 $('.loading').css({ 'width' : this.width+'%'}); 
			 log('loadstart');
		},
		set_MIN_MAX_with: function(){
			$('.loading').css({'max-width' : 100+'%' }); 
			 $('.loading').css({'min-width' : this.counter+'%' }); 
		},
		progress: function(event){
			log("prorgress");
			if(this.width < 100)
			 this.width += this.counter; 
			
             $('.loading').css({'width': this.width+'%'});
             if(this.width  > 10)
                 $('.loading').css('background-color'," #9c27b0"); 
             if(this.width  > 20)
                 $('.loading').css('background-color',"#1e90ff"); 
             
             
		},
		success :function(data){
			 this.width = 5;
			 $('.loading').css('background-color',"#00e676"); 
		},
		error :function(data){
			 this.width = 5;
			 $('.loading').css('background-color'," #f44336"); 
		},
		end: function(event){
			$('.loading').css({'width' : 100+'%'});
			log("load end : ");
			setTimeout(function(){
				$('.loading').hide(4000);
				$('.loading').remove();
			}, 500);
			
		}
		
};




var Auth = {
		 isLoggedIn :function(){
		       var encodedAuth =  sessionStorage.getItem('_auth');
		       var user = sessionStorage.getItem('_user');
		        if(encodedAuth ===  null && user === null){
		        	log('nulls present. login not present');
		        	sessionStorage.setItem("_lv", Base64.encode(location.href));
		        	location.replace('./signup');
		        }
		        else return true;
	  },
	  loggedIn :function(){
	       var encodedAuth =  sessionStorage.getItem('_auth');
	       var user = sessionStorage.getItem('_user');
	        if(encodedAuth  && user ){
	        	log('Logged in true');
	        	return true;
	         }
	        else return false;
	  },
	  ifLoggedIn : function(){
		    var encodedAuth =  sessionStorage.getItem('_auth');
	        var user = sessionStorage.getItem('_user');
	        if(encodedAuth !==  null && user !== null){
	     	 location.replace("./articles");
	        }
	        
	  },
	  logout :function(){
		  sessionStorage.clear();
		  location.replace('./signup');
	  }
};


var errorcode ={
		OK :200,
		NOT_FOUND :404,
		BAD_REQUEST :400,
		NOT_IMPLEMENTED :415,
		CONFLICT : 409,
		append: false,
		margin: '0',
		showNoData : function(message,parentdiv,fa_icon){
			 this.removeNoData();
			var nodata= "<div style='margin : "+this.margin+"'class='no-data'>"+
	        "<span class='fa "+fa_icon+"'></span>"+message+"</div>";
			if(this.append === true) $(parentdiv).append(nodata);
			else $(parentdiv).prepend(nodata);
		},
		removeNoData : function(){
			$('.no-data').remove();
		}
};


util={};	
	
util.log=function(msg){ console.log(msg); };
//refererce for util.log for easy use
var log=util.log;

util.storeArrayInSession = function(key,array){
	if(array !== null && key !== null)
	sessionStorage.setItem(key, Base64.encode(JSON.stringify(array)));
};	

util.getArrayFromSession = function(key){
	var val = sessionStorage.getItem(key);
	if(val !== null)
	return JSON.parse(Base64.decode(sessionStorage.getItem(key)));
};
util.storeArrayInLocal = function(key,array){
	if(array !== null && key !== null){
	localStorage.setItem(key, Base64.encode(JSON.stringify(array)));
	}
};

util.getArrayFromLocal = function(key){
	var val = localStorage.getItem(key);
	if(val !== null)
	return JSON.parse(Base64.decode(localStorage.getItem(key)));
};

util.storeObjectInSession = function(key,obj){
	if(obj !== null && key !== null)
	sessionStorage.setItem(key, Base64.encode(JSON.stringify(obj)));
};	

util.getObjectFromSession = function(key){
	var val = sessionStorage.getItem(key);
	if(val !== null)
	return JSON.parse(Base64.decode(sessionStorage.getItem(key)));
};

util.setItemInSession = function(key,value)
{
	 if(value !== null && key !== null)sessionStorage.setItem(key,Base64.encode(value) );
};
util.getItemFromSession = function(key){
	var val = sessionStorage.getItem(key);
	if(val !== null)
		return Base64.decode(sessionStorage.getItem(key));
};

util.getRandomNumber = function(min,max){
	return  Math.floor(Math.random() * (max - min + 1)) + min;
};

util.getVerifyQueryString = function(){

	return window.location.href.split('?')[1];
};

util.chunkString = function(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
};

util.isUrlPresent = function(){
	if(window.location.href.split("#").length == 2) return true;
	else return false;
	
};


util.showProblemStatement = function(beforeparent,parent){
	
	setTimeout(function(){
		var probstring =
			"<div class=' show_no_article small-12 large-8 medium-10 large-centered medium-centered columns'>" +
			" <h1>Uh-ho!<i class='fa fa-2x fa-frown-o '></i></h1>" +
			"<h3>I think something was lost on the way</h3>" +
			" <p> if( refreshing page solved it )<i id='refresh' class='fa fa-lg fa-refresh round-border '></i></p>" +
			"  <p> { then great  }<i id='back' class='fa  fa-lg fa-thumbs-up '></i>  </p>" +
			" <p> else { sign-in again } <i id='signin' class='fa fa-lg fa-sign-in round-border'></i></p> </div>";
		 
	     $(beforeparent).hide();  
		$('footer').hide();
		$(parent).append(probstring).hide().slideDown(1000);
		 $(parent).on('click','#refresh',function(){
		   
	     	location.href = location.href;
	     });
	     
	     $(parent).on('click','#signin',function(){
	     	location.replace('./signup');
	     });
	    
	}, 1000);
	
	
};

util.showNoArticles= function(parent){
	
	setTimeout(function(){
		var probstring =
			"<div class=' show_no_article small-12 large-8 medium-10 large-centered medium-centered columns'>" +
			" <h1>Uh-ho!<i class='fa fa-2x fa-frown-o '></i></h1>" +
			"<h3>You have not written any articles yet</h3>" +
			" <p> do{ write some articles }<i id='editor' class='fa fa-lg fa-pencil-square-o  round-border '></i></p>" +

			" <p> while ( you are here ) <i class='fa fa-lg fa-thumbs-up round-border'></i></p> </div>";

		$(parent).append(probstring).hide().slideDown(1000);
		
		 $(parent).on('click','#editor',function(){
		     	location.replace('./editor');
		     });
		
	}, 1000);
	    
	
};

util.showNoEditor= function(parent){
	
	var probstring =
		"<div class=' show_no_article small-12 large-8 medium-10 large-centered medium-centered columns'>" +
		" <h1>oops!<i class='fa fa-2x fa-frown-o '></i></h1>" +
		"<h3>Our Editor does not like smaller screens</h3>" +
		" <p> if( you have a PC or Laptop ) <i class='fa fa-lg fa-thumbs-up round-border'></i></p>" +
		" <p> { open your favourite browser } </p> "+
		" <p> { open editor and start writing } <i id='editor' class='fa fa-lg fa-pencil-square-o  round-border '></i> </p> </div>";

	$(parent).append(probstring);
	
	 $(parent).on('click','#editor',function(){
	     	location.replace('./editor');
	     });
	    
	
};
util.showNoComment= function(parent){
	
	var probstring =
		"<div class=' show_no_article small-12 large-12 medium-12 large-centered medium-centered columns'>" +
		" <h1>oops!<i class='fa fa-2x fa-frown-o '></i></h1>" +
		"<h3>I think people forgot to put comments here</h3>" +
		" <p> if( you want to post comment ) <i class='fa fa-lg fa-thumbs-up round-border'></i></p>" +
		" <p> { Click the 'post comment' button } </p> "+
		" <p> else { wait for others } <i class='fa fa-lg fa-pause round-border '></i> </p> </div>";

	$(parent).append(probstring);
	
	 $(parent).on('click','#editor',function(){
	     	location.replace('./editor');
	     });
	    
	
};

