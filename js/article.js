var MainArticle = {
	article : null,
	user : null,
	commentcount :0,
	init : function() {
		this.article = util.getObjectFromSession('_cA');
		log(this.article);
		this.user = util.getObjectFromSession('_user');	
		log(this.user);
		if(this.article) this.commentcount = this.article.commentCount;
	},
	
	buildtags : function(tags, parentclass) {
		var tagString = "";
		for (i = 0; i < tags.length; i++) {
			tagString += " <small><span class='fa fa-tag'></span>" + tags[i]+ "</small>";
					
		}
		$('.' + parentclass).html('').append(tagString);
	},
	processCommentAuthor : function() {
		
		var message = "Login to post comment";
		if (this.user) {
			 message = " <i class='fa fa-user'></i> " + this.user.username;
			 $('.comment-wrapper').html('');
			 $('.comment-write-wrapper').show();
		} else {
			$('.comment-wrapper').html('');
			$('.comment-write-wrapper').show();
			var lv = location.href;
			sessionStorage.setItem('_lv', Base64.encode(lv));
			$('.comment-author').attr('href', "./signup");
			log("user is null " + lv);
		}
		$('.comment-author').html(message);
		
	}
};

MainArticle.buildCurrentArticle = function(article) {
	
	if (article) {
		
		log("inside build article " + article.title);
		var title = "<h1>"+Base64.decode(article.title)+"</h1>";
		$('#a_t').html(Base64.decode(article.title) + " | imzah.com");
		Auth.updateSignupButton();
	
		$('.main-article-cover')
		   .css({ "visibility" : 'visible'})
		    .html("<img style='width: 100%;' src='"+article.src+"'> " );
		
		
		  var tk = this.resizeHeight('.main-article-cover');
		 log("taken height= "+ tk);
		$('.main-article-content-wrapper').css({"top":tk});
		$('.main-content')
		.html(title+Base64.decode(article.content));
		
		$('a.article-author').html(
				"<i class='fa fa-user'></i>" + article.user.name);
		$('div.article-date').html(
				"<i class='fa fa-calendar'></i> posted on  <b>&#58;</b> " + article.date);
		$('.author-bio').html("<p><i class='fa fa fa-quote-left  fa-pull-left fa-border'></i>" +
				  article.user.bio +  "</p>");
		MainArticle.buildtags(article.tags, "article-tags");
		MainArticle.updateLikes();
		MainArticle.processCommentAuthor();
	}
	else{
		log('no article present');
        util.showProblemStatement('.article-wrapper','#container');
	
	}
	

};

MainArticle.resizeHeight = function(clazz){
	
	 var takenHeight = $(clazz).height();
	if(takenHeight > 550){
		return (-(takenHeight)/3 )+"px";
	}
	else return "";
	
};

MainArticle.getMoreButton = function(){
	return "<li> <a class=' showmore_c button-a blue-button push-5 small-push-4'>" +
			"<i class='fa fa-chevron-circle-down'></i>show more</a></li>";
};
MainArticle.removeMoreButton = function(){
	
	$('.showmore_c').remove();
};
MainArticle.getMoreComments = function(){
	
	$('.comment-wrapper').on('click','.showmore_c', function(){
		$('.showmore_c').html("<i class='fa fa-circle-o-notch fa-spin'></i> fetching");
		++getcommentAjax.next;
		Ajax.GET(getcommentAjax);
	});
};

MainArticle.createComment = function(username, commentContent,date) {
	return "<li class='comment-user '>"+
			"<ul class=' comment-auth-list no-list-style '>"+
			"<li><a class='commented-author'><i class='fa fa-user'></i>"+ username + "</a></li>"+ 
			"<li class='right pull-1'><a class='commented-author'><i class='fa fa-calendar'></i> "+
			date + "</a></li>"+
			"</ul>"+
		
			"</li>" + "<li class='comment-content'>"+
			 Base64.decode(commentContent) + "</li>";
};

MainArticle.attachComments = function(comments) {

	var commentString = "";
	for (i = 0 ; i < comments.length; i++) {
		var comment = comments[i];

		commentString += this.createComment(comment.username, comment.content,comment.date);
	}
	log('CommentCOunt= '+this.commentcount);
	
	if((getcommentAjax.next+1) * 10 < this.commentcount){
		log('more comments exeecuting.'+ (getcommentAjax.next+1)*10);
		commentString += this.getMoreButton();
	}
	else{
		getcommentAjax.next = 0;
		this.removeMoreButton();
		log('Next after removal is :'+getcommentAjax.next);
	}
	
	return " <ul class='no-bullet comments'>" + commentString + "</ul>";

};

MainArticle.syncComments = function(comments) {
     this.removeMoreButton();
     $('.comment-wrapper').append(this.attachComments(comments));

};

MainArticle.showHideComments = function() {
	$('.comment-wrapper').hide();
	$('#write-comment-content').hide();
	$('#post-comment').hide();
	if(MainArticle.user){
		$('#write-comment-content').show();
		$('#post-comment').show();
	}
	$('#show-comment').on('click', function() {
		$('.comment-wrapper').show();
		$('.comment-write-wrapper').hide();
	    $('.comment-wrapper').html('');
		Ajax.GET(getcommentAjax);

	});
	$('#write-comment').on('click', function() {
		$('.comment-wrapper').hide();
		$('.comment-write-wrapper').show();

	});

};
MainArticle.activeCommentLength = function(){
	var isActivated = false;
	$('#write-comment-content').on('click',function(){
		if(!isActivated) {autosize($(this)); isActivated= true;}
		log('min activated');
	});
	
};


MainArticle.validateCommentOnSubmit = function() {

	var emptyContent = "<i class='fa fa-diamond'></i> You didnt write a comment";
	$('#comment-content-error').hide();
	$('#write-comment-content').val('');
	$('#post-comment').html(' <i class="fa fa-chevron-right "></i>post');
	$('#post-comment').on('click',function() {

	    var content = $('#write-comment-content').val().trim();
		 if (!content)
		  $('#comment-content-error').html(emptyContent).show();
		else {
			$('#comment-content-error').hide();
			$(this)	.html('<i class="fa fa-circle-o-notch fa-spin"></i>posting');
			postcommentAjax.getData(new Comment(Base64.encode(content)));
			Ajax.POST(postcommentAjax);
			$('.comment-wrapper').html(''); //clear the html of comment preview
			}

	});

};

//below are topic methods

MainArticle.getTopArticleString = function(article) {
	var tr_id = 'tr_'+article.id;
	var fp = article.user.username+'/articles/'+article.id+"/"+Base64.decode(article.title).split(" ").join("-");
	var h_href = "./"+fp;

	var string= "<dt><a  id= '"+tr_id+"'>" +
		Base64.decode(article.title) + "</a></dt>"+
		"<dd><a><span class='fa fa-user'></span>"+
		article.user.name + "</a></dd>";

	$('.suggest-wrapper').on('click','#'+tr_id,function(){
		$("html, body").animate({ scrollTop: 0 }, 300);
			setTimeout(function(){
			location.href = h_href;
			location.reload();
		}, 1000);

	});
	
return string;
};
MainArticle.attachTopArticles = function(articleString) {
	
	return "<dl class='dl-top-articles'>" + articleString + "</dl>";

};
MainArticle.createTopArticles = function(articleArray) {
	if(articleArray.length === 0){
		errorcode.showNoData("We got no trending  articles", ".suggest-wrapper","fa-frown-o");
	return;
	}
	
	var str = "";
	for (i = 0; i < articleArray.length; i++) {
		str += MainArticle.getTopArticleString(articleArray[i]);
	}
	var finalString = "";
	finalString = MainArticle.attachTopArticles(str);

	$(".suggest-wrapper").html(finalString);
};

MainArticle.buildtopArticles = function() {
	var isAlreadyFetched = false;
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();	
		if (scrollTop > 1000 && !isAlreadyFetched) {
			Ajax.GET(trendingArticlsAjax);
			isAlreadyFetched = true;
		}
	});

};


MainArticle.updateLikes = function(){
	log('updated likes');
	var like = (this.article.likes === 1) ? " person  liked" : " people liked";
	
	$('#likeCount').html("<a class='likeBorder lowerCase'><b>"+this.article.likes+"</b></a> "+like);
	 if(Auth.loggedIn() && !this.article.isliked)
		{ log("like--- logged in . article not liked");
		   $('.a_like').html("<i class='fa  fa-heart-o'></i> like ");
			MainArticle.processLikes();
		}
	else  if(Auth.loggedIn() && this.article.isliked){
		log("like--- logged in . article liked");
		$('.a_like').html("<i class='fa  fa-heart'></i> liked").hide().fadeIn(500);
	 }
	else $('.a_like').html("").hide().fadeIn(500);
	
};
MainArticle.processLikes = function(){
	log('updated likes');
	$('.a_like i').on('click',function(){	
		log('updated likes');
		Ajax.PUT(putLikes);
		//here update the div content to likes
		$(this).parent().html("<i class='fa fa-lg fa-heart'></i>");
	});
};


MainArticle.animateArticle = function(){
	$('.main-top-bar').css({'visibility':"visible"}).hide().fadeIn(1000);
	$('.main-article-cover').css({'visibility':"visible"}).hide().fadeIn(1000);
	$('.main-content').css({'visibility':"visible"}).hide().fadeIn(1000);
	$('.main-comments-wrapper,.main-article-suggest-wrapper').css({'visibility':"visible"}).hide().fadeIn(1500);
};
var putLikes = {
		url : "",
		data : "{}",
		encodedAuth : "",
		getData : function(dataObj) {
			this.data = JSON.stringify(dataObj);
		},

		prejax : function() {
			var cl = MainArticle.article.likes+1;
			this.url = MainArticle.article.links[0].url+"?likes="+cl;
			log("put likes url is:" + this.url);
			this.encodedAuth = sessionStorage.getItem('_auth');
			log('put like auth' + this.encodedAuth);
			
		},
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', this.encodedAuth);
		},
		success : function(obj) {
			log("put like success");
			log(obj);
			//update the article in session
			util.storeObjectInSession('_cA', obj);
			MainArticle.article = obj;
			MainArticle.updateLikes();
		},
		error : function(data) {
			log(" error like");
			log(data);
			
	        
		}
	};



var  mainArticleAjax = {
		url : "",
		role: "",
		isProgress: true,
		prejax : function() {
			 var h_ref = window.location.href;
			var f_url = h_ref.split("/");
			var a_id = f_url[5];
			var username = f_url[3];
            this.url = Ajax.AllUserURL+"/"+username+"/articles/"+a_id;
			log("URL part in window= "+f_url);
			log("url is:" + this.url);
			progressBar.append = false;
			progressBar.height = 10;
			progressBar.position= 'fixed';
			progressBar.build('body', 0);
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
			progressBar.success(obj);
			log("success in mainarticle");
			log(obj); 
			util.storeObjectInSession('_cA', obj);
			this.isProgress = false;
		},
		error : function(data) {
			progressBar.error(data);
			this.isProgress = false;
			log('fail in mainarticle');
			log(data);
		}

	};



var getcommentAjax = {
	url : "",
	next:0,
	prejax : function() {
		progressBar.append = false;
		progressBar.position= 'absolute';
		progressBar.height =5;
		progressBar.build('.comment-but-wrapper', 0);
		this.url = MainArticle.article.links[2].url+'?next='+this.next;
		log("url is:" + this.url);
	},
	progress : function(event) {
		if (event.lengthComputable) {
			progressBar.set_MIN_MAX_with();
		}
		log("progressing in comments get");
		progressBar.progress(event);
	},
	loadStart : function(event) {
		progressBar.initialize(event);
	},
	loadEnd : function(event) {
		progressBar.end(event);
	},
	
	success : function(obj) {
		progressBar.success(obj);
		log("success in all comments");
		log(obj);

		errorcode.removeNoData();
		MainArticle.syncComments(obj);
	},
	error : function(data) {
		log('fail in all comments');
		progressBar.error(data);
		log(data);
		errorcode.append=true;
		if(data.status === errorcode.NOT_FOUND)
		util.showNoComment(".comment-wrapper");
		else errorcode.showNoData(data.responseJSON.error_message,  ".comment-wrapper","fa-frown-o");
	}

};

var postcommentAjax = {
	url : "",
	data : "",
	encodedAuth : "",
	getData : function(dataObj) {
		this.data = JSON.stringify(dataObj);
	},

	prejax : function() {
		progressBar.append = false;
		progressBar.position= 'absolute';
		progressBar.height =1;
		progressBar.build('.main-comments-wrapper', 0);
		this.url = MainArticle.article.links[2].url;
		log("post url is:" + this.url);
		this.encodedAuth = sessionStorage.getItem('_auth');
		log('post auth' + this.encodedAuth);
	},
	beforeSend : function(request) {
		request.setRequestHeader('Authorization', this.encodedAuth);
	},
	progress : function(event) {

		if (event.lengthComputable) {
			
			progressBar.set_MIN_MAX_with();

		}
		log("post progess");
		progressBar.progress(event);
	},
	loadStart : function(event) {
		log("inside load start-post");
		progressBar.initialize(event);
	},
	loadEnd : function(event) {
		log('post progess END');
		progressBar.end(event);
	},
	success : function(data) {
		progressBar.progress(data);
		log('success post user');
		$('#post-comment').html(' <i class="fa fa-chevron-right "></i>post');
		errorcode.removeNoData();
		//MainArticle.commentcount++; //changed to updated the total comments here
		getcommentAjax.next = 0;
		Ajax.GET(getcommentAjax);
		$('.comment-wrapper').show();
		$('.comment-write-wrapper').hide();
		$('#write-comment-content').val("");
	},
	error : function(data) {
		progressBar.error(data);
		log(" error post comment");
		log(data);
		errorcode.removeNoData();
		errorcode.showNoData("Unable to post Comment", ".comment-wrapper", "fa-frown-o");
		$('.comment-wrapper').show();
		$('.comment-write-wrapper').hide();
        
	}
};
//end of post comment

var trendingArticlsAjax = {
	url : "",
	prejax : function() {
		progressBar.append = false;
		progressBar.position= 'absolute';
		progressBar.height =1;
		progressBar.build('.main-article-suggest-wrapper', 0);
		this.url = "http://backendapi-vbr.rhcloud.com/api/public/top";
		log("url is:" + this.url);
	},
	progress : function(event) {
		if (event.lengthComputable) {
			progressBar.set_MIN_MAX_with();
		}
		log("progressing in comments get");
		progressBar.progress(event);
	},
	loadStart : function(event) {
		progressBar.initialize(event);
	},
	loadEnd : function(event) {
		progressBar.end(event);
	},
	success : function(obj) {
		progressBar.success(obj);
		log("success in latest");
		log(obj); 
		MainArticle.createTopArticles(obj);

	},
	error : function(data) {
		log('fail in all comments');
		progressBar.error(data);
		log(data);
		errorcode.showNoData("Not able to fetch anything",".suggest-wrapper","fa-frown-o");
	}

};

MainArticle.preprocess = function(){
	MainArticle.init();
	MainArticle.buildCurrentArticle(this.article);
	MainArticle.animateArticle();
	MainArticle.activeCommentLength();
	MainArticle.showHideComments();
	MainArticle.getMoreComments();
	MainArticle.validateCommentOnSubmit();
	MainArticle.buildtopArticles();
};

MainArticle.processAllArticle = function() {

     if(util.isUrlPresent()){
    	 Ajax.GET(mainArticleAjax);
    	 var t = setInterval(function(){
    		 log('polling in main article');
    		 if(mainArticleAjax.isProgress === false){
    			
    			 MainArticle.preprocess();
    			 clearInterval(t);
    		 }
    		 
    	 }, 5);
    	 
     }
     else MainArticle.preprocess();
	  

    
	

};

$(MainArticle.processAllArticle());