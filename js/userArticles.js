userarticle = {
		user : null,
		articlecount: 0,
		init : function(){
			this.user = util.getObjectFromSession('_user');
		}
};
userarticle.buildSearch = function() {
	var searchString = "<div class='search-your-articles row'>"+
			"<div class='small-12 large-10 medium-8 columns'>"+
			 " <input type='search' placeholder='search your articles by title' /></div>"+
			 "<div class='small-12 large-2 medium-4 columns'>"+
			 " <a class='button-a blue-button fade-border float-left '>search</a>"+
			 "   </div> </div>";
	$('.your-articles').prepend(searchString).hide().fadeIn(1000);

};
userarticle.getArticleString = function(article, a_id, p_id, t_id,href){
	
	var img = article.src;

	 var x =  "<article id='"+
			  a_id+"'"+
			" dt-ref='"+Base64.encode(article.links[0].url)+
			 "' class='user-article small-12 large-3 medium-4 columns left'>"+
			 "<div class='user-article-inside '>"+
			 "<div id='"+
			 p_id+
			 "' class='user-article-pic opacity-light' style ='background: "+
			 "linear-gradient(rgba(255, 255, 255, 0.1), rgba(25, 155, 255, .2)," +
				" rgba(25, 5, 255, .1)), " +
			 "url(" + img + ") no-repeat 100% 50% ; background-size:cover;'>"+
			 " <ul class='no-list-style object-info '>" + " <li>" +
			 "<a  href ='"+href+"' id='" + t_id+
			 "' class='art-info-title'>"+
			 Base64.decode(article.title) + "</a></li>" + "</ul>"+
			 "</div>" + 
			 "<div class='user-article-info '>"+
			 "<ul class='no-list-style comment-like '>"+
			 "<li><li><a><span class='fa fa-heart-o'></span><b>"+
			 article.likes + "</b></a></li>"+
			 "<li><li><a><span class='fa fa-comment-o'></span><b>"+
			 article.commentCount + "</b></a></li>"+
			 "<li><li><a><span class='fa fa-trash'></span></a></li>"+
			 "</ul> </div>  </div> </article> ";
	 
	
	 
	return x;
};
userarticle.getMoreButton = function(){
	return "<div class='showmore-wrapper large-12 small-12 medium-12 columns '>"+
            "<a class=' showmore button-a blue-button push-5 small-push-4'>" +
            "<i class='fa fa-chevron-circle-down'></i>show more</a></div> "+
            "</div>";
	
	
};

userarticle.getMoreArticles =function(){
	$('.your-articles').on('click','.showmore',function(){	
		$('.showmore').html("<i class='fa fa-circle-o-notch fa-spin'></i> fetching");
		Ajax.GET(userArticlesAjax);
	});
	
};
userarticle.removeMoreButton = function(next){
	log("the next value inside remove= "+next*4);
	log("user article count= "+this.user.articlecount);
	
	if((next * 4) >= this.articlecount){
		userArticlesAjax.next = 0;
		$('.showmore-wrapper').remove();
		log("all articles viewed. next set to 0");
		
	}
	
};

userarticle.buildArticleWithEvents = function(article) {
	var a_id = "a_" + article.id;
	var t_id = "t_" + article.id;
	var p_id = "t_" + article.id;
    var fp =  article.id+'/'+article.user.username+'/'+Base64.decode(article.title).split(" ").join("-");
	log(fp);
	var h_href = "./article#"+fp;
	
   var articleString = this.getArticleString(article, a_id, p_id, t_id,h_href);
   $('.your-articles').append(articleString);
   
	$('#' + a_id).hide().slideDown(300);
	$('.your-articles').on('click', '#' + t_id, function() {  
		 window.location.href = h_href;

	});
   //initialize articlecount 
	this.articlecount = article.user.articlecount;
	
};

userarticle.appendAllArticles = function(articleArray) {
	var arr = articleArray;
	var articlesString = "";
	log('REM');
	$('.showmore-wrapper').remove();
	log('ADD');
	for(i=0; i< arr.length; i++){
		this.buildArticleWithEvents(arr[i]);
	}
	
	$('.your-articles').append(this.getMoreButton());
	this.removeMoreButton(userArticlesAjax.next);
	
	
};


var userArticlesAjax = {
	url : "",
	next:0,
	encodedAuth : "",
	prejax : function() {
		progressBar.append = false;
		progressBar.counter = 2;
		progressBar.height = 3;
		progressBar.build(".body", 0);
		this.url = userarticle.user.links[2].url+"?next="+this.next;
		this.encodedAuth = sessionStorage.getItem('_auth');
		log(this.url);
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
	beforeSend : function(request) {
		log('inside the before send');
		request.setRequestHeader('Authorization', this.encodedAuth);
		log('BEFORE SEND DONE');
	},
	success : function(obj_array) {
		this.next++;
		progressBar.success();
		userarticle.appendAllArticles(obj_array);
		log('Your article bjects');
		log(obj_array);

	},
	error : function(data) {
		progressBar.error(data);
		log('fail');
		log(data);
		errorcode.append = true;
		errorcode.margin='0 0 0 20%';
		if(data.status === errorcode.NOT_FOUND)
			util.showNoArticles('.your-articles');
		else util.showProblemStatement(".your-articles", ".user-wrapper");
	}

};


userarticle.processUserArticles = function() {
	if (Auth.isLoggedIn()) { log("user logged in");
		this.init();
		userheader.processHeader(this.user);
		
		Ajax.GET(userArticlesAjax);
		userarticle.getMoreArticles();
		userarticle.buildSearch();

	}
};

$(userarticle.processUserArticles());