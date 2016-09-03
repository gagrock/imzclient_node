function clientArticle(title, image, content, tags){
	this.title = title;
	this.image = image;
	this.content = content;
	this.tags = tags;
	
}

EditorSync = {
		

saveContentBeforeUnload : function(textAreaId,previewDivId){
		
	$(textAreaId).on('keyup',function(){
		util.setItemInSession("contentValue", $(textAreaId).val());
		util.setItemInSession("htmlContent", $(previewDivId).html());
		
	});
	
	
	
},
updateContentAfterload : function(textArea, preview){
	
    $(textArea).val(util.getItemFromSession("contentValue"));
    $(preview).html(util.getItemFromSession("htmlContent"));
     
},

syncEditorContents : function(){
	   EditorSync.updateContentAfterload("#wmd-input", "#wmd-preview");
	   EditorSync.saveContentBeforeUnload("#wmd-input", "#wmd-preview");
}

};



/*userPage object to hold the operations related to editor visibilty of different elements in user page*/
userPage={
		user : null,
		auth: null,
		isheadClicked : false,
		init : function(){
			this.user = util.getObjectFromSession("_user");
			this.auth = util.getItemFromSession('_auth');
		},
		minViewPortWidth : 768,	
		MAX_TAGS : 5,
		hideEditor_not : function(){
            util.showNoEditor('.editor-not');
			$('.editor-not').hide();}
};

userPage.showControls = function(){

	var controlString = "<a id='ed-hd' class='editor-head-done right hide-for-small'"+
		"title='save the article'><span class='fa  fa-hdd-o fa-border-sleeks'></span></a> ";
   $('.ul-tools').append(controlString);
	
	
	$('.editor-head-done span, .editor-head-pre span').hide();
	
		$(window).scroll(function(){
			var top = $(this).scrollTop();
			if(top > 35)
			 {
				$('.editor-head-done span, .editor-head-pre span').slideDown(200);
			 }
			else $('.editor-head-done span, .editor-head-pre span').hide();
			
		});
};

userPage.showEditorPreview = function(){
	$('#wmd-input, #wmd-button-bar').on("click",function(){
    	if($('.editor').is(':visible') === true){
		 $("#wmd-preview").slideDown(1000);
		}
	});
	 
};

userPage.hideEditorOnResize = function(){
	userPage.hideEditor_not();
	$('.editor').hide();
    if($(window).width() < userPage.minViewPortWidth){
    	$('.editor').hide();
		 $('.editor-not').show();
    	
    }	
	
	
	$(window).resize(function(){
		var currentWidth = $(window).width();
		 if(currentWidth < userPage.minViewPortWidth){
			 
			 $('.editor').hide();
			 $('.editor-not').show();
			 
		 }
		 if(currentWidth >= userPage.minViewPortWidth){
			 
			 $('.editor-not').html();
			 
			 $('.editor').show();
			 userPage.hideEditor_not();
		 }
		 
		 console.log("resize called  " +currentWidth);  
	});
	
};




userPage.clickUpload = function(){
	$(".editor-upload").on("click",function(){ $("#upload").click(); });
	
};
userPage.setCover = function(id,result){
	 $(id).css("background-image", "url(" + result + ")");
     $(id).slideDown(600);
	
};
userPage.loadImage = function(file){
	
	// Create a new instance of the FileReader
    var reader = new FileReader();
    // Read the local file as a DataURL
    reader.readAsDataURL( file);

    // When loaded, set image data as background of page
    reader.onloadend = function(){
    	sessionStorage.setItem("cover", this.result);//save the obj for preview in local storage
       userPage.setCover("#uploaded-image",this.result);
   
     log(this.result);
    };

	
};

userPage.processUploadImage = function(){
	
	$("#upload").on("change",function(){
		// Get a reference to the fileList
	    var files = !!this.files ? this.files : [];

	    // If no files were selected, or no FileReader support, return
	    if ( !files.length || !window.FileReader ) return;

	    // Only proceed if the selected file is an image
	    if ( /^image/.test( files[0].type ) ) {
   
	        userPage.loadImage(files[0]);
	        
	    }
		
	});
	
};

userPage.getCoverAfterRefresh = function(){
	if(sessionStorage.getItem("cover")){
	 userPage.setCover("#uploaded-image",sessionStorage.getItem("cover"));
	 $('h1.cover-title-heading').html(sessionStorage.getItem("cover-title"));
	}
	//else $('#uploaded-image').hide();
};

userPage.manageCoverTitle =  function(){
    autosize($(".cover-title-input"));
    $('.cover-title-heading').hide();
      if(!Base64.decode(sessionStorage.getItem("cover-title")))
        $('.cover-title-input').focus().val("").val("Type a title here");
     else
    	 $('.cover-title-input').focus().val("").val(Base64.decode(sessionStorage.getItem("cover-title")));
      
	$('.cover-title-input').on('mouseout',function(){

		var val=$(this).val();
		log(val);
		sessionStorage.setItem("cover-title", Base64.encode(val));
		$('.cover-title-heading').html(val).show();
		$(this).hide();
	});
	
	$('.cover-title-heading').on('mouseover',function(){
		   var val= Base64.decode(sessionStorage.getItem("cover-title"));
		   $('.cover-title-input').show().focus().val("").val(val); 
		    
		$(this).hide();
		
	});
	
};
userPage.processTags = function(){
    
    
    $('input.tags').val(""); //clear the tags on refresh
    $("#tag-error").hide();
 
    $('input.tags').on('keyup',function(){
    	$("#tag-error").hide();//hide the error box
         var tagArray=[];
 	     tagArray=$(this).val().split(/[ ,]+/); //split the string in tokens and store in array
 	 	 var count = tagArray.length;
 	 	 
 	 	 if(count <= userPage.MAX_TAGS ){
 	 		var tagString="";
 	 		
 	 	 	for(i=0; i< count; i++){
 	 	 	   tagString +="<small id= "+i+" >"+tagArray[i]+" <i class='fa fa-close'></i></small>" ;
 	 	 	  }
 	 	 	
 	 	 	$(".tag-list").html(tagString);
 	 	 	util.storeArrayInSession("tag-array", tagArray);
 	 		
 	 	}
 	 	else{
 	 		$("#tag-error").html("Maximum 5 tags are allowed!").show();
 	 	}
 		  
 	 	//clear the tags when input is clear
 	    if(tagArray.length === 1 && tagArray.pop() === ""){
 	    	$(".tag-list").html("");
 	    }
		  
 	   
    });
    
     $('div.tag-list').on('click','i.fa',function(){
     	
    	 var id=$(this).parent().attr("id"); //get id of close
     	 var tags=[];
     	 tags = util.getArrayFromSession("tag-array"); //store in session
     	 tags.splice(id,1); //remove the closed element 
     	 util.storeArrayInSession("tag-array", tags); //update array in session
         $(this).parent().hide();  //hide the closed element
        
         
     });

	
};
userPage.openPreview = function(){
	
	$(".editor-pre, .editor-head-pre").on("click",function(){
	
		window.open("./article/preview");
		
		
	});
	
};

userPage.resetArticle = function(){
	 var fixedtitle = "Type a title here";
	 sessionStorage.removeItem('htmlContent');
	 sessionStorage.removeItem('contentValue');
	 sessionStorage.removeItem('cover');
	 sessionStorage.removeItem('tag-array');
	 $("#uploaded-image").css("background-image", "none");
	 $('#wmd-input').val('');
	 $('#wmd-preview').html('');
	 $('input.tags').val('');
	 $(".tag-list").html("");
	
	
};
userPage.setProgressOnButton = function(obj){
	
	
		$('.editor-head-done, .editor-done').html("<span class='fa fa-circle-o-notch fa-spin'></span>")
	    .css('color','rgba(180,0,0,0.8)');

		if($(obj).attr('id') !== 'ed-hd'){
			$('.editor-head-done span').hide();
		}
};
userPage.resetProgressOnButton = function(){

	$('.editor-done ').html("<span class='fa fa-hdd-o fa-border-sleek'></span>")
	 .css('color','#333');	
	$('.editor-head-done').html("<span class='fa fa-hdd-o fa-border-sleeks'></span>")
	 .css('color','#333');	
	
	if($(window).scrollTop() <= 35)
		$('.editor-head-done span').hide();
	
};

userPage.saveArticle = function(){
	 var fixedtitle = "Base VHlwZSBhIHRpdGxlIGhlcmU=";
		log("check if visible: "+$('.editor-head-done').css('visibility'));
		
		$('.editor-done ,.editor-head-done').on('click',function(){
		  
			if($(this).attr('id') === 'ed-sl') 
			  this.isheadClicked = false;
		    else this.isheadClicked = true;
          
		    userPage.setProgressOnButton(this);
			var htmlcontent = sessionStorage.getItem('htmlContent');
			var image = sessionStorage.getItem('cover');
			var tags = util.getArrayFromSession('tag-array');
			var ct = sessionStorage.getItem('cover-title');
			if(Base64.decode(ct) && ct !== fixedtitle)
			{
			var covertitle = ct;
	      	var articleobj = new clientArticle(covertitle, image, htmlcontent, tags);
			log(articleobj);
			NewArticlePost.setData(articleobj);
			Ajax.POST(NewArticlePost);
			  
			}
			 
			 
		});
	
};


var NewArticlePost = {
		url : "",
		data: "",
		encodedAuth : "",
		setData : function(dataObj) {
			this.data = JSON.stringify(dataObj);
		},
		prejax : function() {
			progressBar.height = 4;
			progressBar.build("body", 0);
			this.url = userPage.user.links[2].url;
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
			request.setRequestHeader('Authorization', this.encodedAuth);
		},
		success : function(obj) {
			progressBar.success();
			userPage.resetProgressOnButton();
			log("success in post article");
			log(obj);
			  swal({
				  title : "SUCCESS",
				  text : "Article has been submitted",
				  type :"success", 
				  confirmButtonColor: "#333",
				  confirmButtonText: "OK",
				  closeOnConfirm: true	
				  
			  });
		 userPage.resetArticle();
		},
		error : function(data) {
			progressBar.error(data);
			userPage.resetProgressOnButton();
			log('fail in post article');
			
			log(data);
		 
			  swal({
				  title : "error",
				  text : data.responseJSON.error_message,
				  type :"error", 
				  confirmButtonColor: "rgba(120,0,0,0.8)",
				  confirmButtonText: "let me update it",
				  closeOnConfirm: true	
				  
			  });
		}

	};
//post article end
userPage.checkUserInfo = function(obj){
	if(obj.name === "" || obj.bio === ""){
	   swal({
		  title:  "Incomplete Details",
		  text: "Please provide your name and bio. you require that to represent your article",
		  type: "warning",
		  animation: "slide-from-top",
		  showCancelButton: false,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "take me to settings",
		  closeOnConfirm: false,
		  
	   },
	   function(){
		   location.replace("./setting");
	   }
	   );	
	}
};

userPage.processUserPage = function(){
	if (Auth.isLoggedIn()) {
		log("user logged in");
		this.init();
		userheader.processHeader(this.user);
		this.checkUserInfo(this.user);
		EditorSync.syncEditorContents();
		userPage.showControls();
		userPage.hideEditorOnResize();
	    userPage.showEditorPreview();
	    userPage.clickUpload();
		userPage.processUploadImage();
		userPage.getCoverAfterRefresh();
		userPage.manageCoverTitle();
		userPage.processTags();
	    userPage.saveArticle();
}

	
};

$(function(){
	$('.error-box').hide();
	userPage.processUserPage();
});
