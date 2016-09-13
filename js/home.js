
log('home.js');

home={
		scrollToDiv : function(div){
			$('html,body').animate({
		           scrollTop: $("#"+div).offset().top},
		           'slow');
		},
		scroll_top : function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
		},
		bubbleChew :function(){
			var t1,t2,t3;
	       setTimeout(function(){
	    	   t1 = setInterval(function(){
		    	   $('a.chev-down').animate({'top' : "0px"},1000);
		    	   $('a.chev-down').animate({'top' : "10px"},1000);
		    	   
		       }, 2);
	       }, 300);
	       
	       $('a.chev-down').on('click',function(){
	    	    home.scrollToDiv("i_cards");
	    	   
	       });
	       
	     
	       
	       
		}
};

home.getTrendingArticle = function(article){
	var a_id = "a_" + article.id;
	var t_id = "t_" + article.id;
	var p_id = "t_" + article.id;

    var fp = article.user.username+'/articles/'+article.id+"/"+Base64.decode(article.title).split(" ").join("-");
	var h_href = "./"+fp;
	var img = article.src;
	var index =util.getRandomNumber(0, article.tags.length-1);
	 
	 
	 var x =  "<article id='"+
			  a_id+"' class='user-article small-12 large-3 medium-6 columns  left'>"+
			 "<div class='user-article-inside '>"+
			 "<div  class='user-article-pic '  >"+
		      "<img id='"+ p_id+  "' src ='"+img+"'/>" +
		      "<span class='tag'><a>&#35;"+article.tags[index]+"</a></span>"+
		      "<span class='author'><a >"+article.user.name+"</a></span>"+
		      "<h5><a href = '"+h_href+"'>"+Base64.decode(article.title)+"</a></h5>"+
		      
			 "<div class='user-article-info'>"+
			 "<ul class='no-list-style comment-like '>"+
			 "<li><li><a><span class='fa fa-heart-o'></span><b>"+
			 article.likes + "</b></a></li>"+
			 "<li><li><a><span class='fa fa-comment-o'></span><b>"+
			 article.commentCount + "</b></a></li>"+
			 "<li>"+
			 "</ul> </div>  </div> </article> "; 

	   $('.home-trends').append(x);
	   
	   $('#'+p_id).on('mouseover', function(){$(this).css('opacity',"0.5");});
	   $('#'+p_id).on('mouseout', function(){$(this).css('opacity',"0.8");});
	   
	   $('#'+a_id).on('click',function(){
		   window.location.href = h_href;
	   });
		
		
};
home.appendMoreString = function(div){
 var x = "<div class='home_more small-12 medium-12 large-12" +
 		"  column'>" +
 		"<a class=' more small-12 large-6 medium-6 medium-push-3 large-push-3 columns button-a blue-button'>" +
 		"<i class='fa fa-arrow-circle-o-down '>" +
 		"</i>explore more articles</a></div>";
 $(div).append(x);
 
};
home.endOfArticesString = function(div){
	 var x = "<div class='home_eoa small-12 medium-12 large-12" +
	 		"  column'>" +
	 		"<a class=' small-12 large-6 medium-6 medium-push-3 large-push-3 columns button-m'>" +
	 		"Yay&nbsp;!<i class='fa fa-smile-o' aria-hidden='true'></i>" +
	 		" &nbsp;&nbsp;you have explored all articles</a></div>";
	 $(div).append(x);
	 
	};
home.getMorearticles = function(){
    $('.home-trends').on('click','.more',function(){
        log('home_more clicked...'); 
        $('.more').html("<i class='fa fa-lg fa-cog fa-spin'> </i> fetching articles...")
                 .css({
                	 'border-color': "#1481BA",
                      'background': "#1481BA",
                      'color':"#FFF"
                 });
        Ajax.GET(publicAjax);
    });	
};
home.removeMoreString = function(){
	$('.home_more').remove();
};


home.appendTrendingarticles = function(arr){
	
	for(i=0;i<arr.length ; i++){
		var article = arr[i];
		this.getTrendingArticle(article);
	}
	this.appendMoreString('.home-trends');
};


var  publicAjax = {
		url : "",
		role: "explore",
		counter: 0,
		prejax : function() {
			progressBar.append = false;
			progressBar.counter = 2;
			progressBar.height = 5;
			progressBar.position = "fixed";
			progressBar.build('body', 0);
			this.url= Ajax.publicURL+this.role+"?next="+this.counter;
			log("url is:" + this.url);
		},
		progress : function(event) {
			if (event.lengthComputable) {
				progressBar.set_MIN_MAX_with();
			}
			progressBar.progress(event);
		},
		loadStart : function(event) {
			progressBar.initialize(event);
		},
		loadEnd : function(event) {
			progressBar.end(event);
		},
		success : function(obj) {
			log("success in "+this.role);
			log(obj); 
	       this.performSuccess(this.role, obj);
	       this.counter++;
	       progressBar.success(obj);
		},
		error : function(data) {
			
			log('fail in trending');
			log(data);
			this.processError(this.role, data.status);
			progressBar.error(data);
		}

	};


publicAjax.performSuccess = function(role, arrayObj){
	switch (role) {
	case 'explore':
		    log('success called from public article');
		  
		    home.removeMoreString();
		    home.appendTrendingarticles(arrayObj);
		break;
	}
	
};
publicAjax.processError = function(role,status){
	
     switch (role) {
	case 'explore':
		     if(status === errorcode.NOT_FOUND){
		    	 log('no articles found');
		    	   home.removeMoreString();
		    	   home.endOfArticesString('.home-trends');
		    	   
		     }
		     else{
		    	   home.removeMoreString();
		    	
		     }
		     
		break;

	}
};

home.processHome = function(){
	Auth.loggedIn();
	this.bubbleChew();

	Ajax.GET(publicAjax);
	this.getMorearticles();

	
};

$(home.processHome());