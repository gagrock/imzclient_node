/**
 *  settings of user
 */

var setting ={
		
		emailExpression : /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,	
	    usernameNotValid: "<i class='fa fa-remove'></i>  8-14 characters are allowed",
	    bioNotValid: "<i class='fa fa-remove'></i>  10-200 characters are allowed",
	    bioNotPresent : "<i class='fa fa-bell-o'></i> Tell us about yourself!",
	    NameNotPresent : "<i class='fa fa-bell-o'></i> Provide your full name ",
	    emailNotValid: "<i class='fa fa-remove'></i> Email is not valid",
	    genericUpdationError : "<i class='fa fa-clock-o '></i>Update failed. Please try again",
	    minPasswordlength : 8,
	    maxPasswordlength : 25,
	    passwordInvalidlength : "<i class='fa fa-unlock'></i> password should be 8 - 25 characters",
	    passwordDoesNotMatch : "<i class='fa fa-thumbs-down'></i> Passwords does not match",
	    passwordSuccess : "<i class='fa fa-thumbs-up'></i> Passwords updated successfully",
	    emailNotAvailable: "<i class='fa fa-thumbs-down'></i> Email already registered",
	    emailAvailable: "<i class='fa fa-thumbs-up  '></i> Email is available",
	    emailAlreadyPresent: "<i class='fa fa-thumbs-down  '></i> Email already present",
	    errorBox : "<li  role='sett-err' class='small-12 large-5 medium-4  columns'></li>",
		erroSpan : function(message){
			     return  "<span  class='error-sett-box'>"+message+"</span>" ;
		},
		successSpan : function(message){
		     return  "<span  class='success-sett-box'>"+message+"</span>" ;
	    },
		IfValuEmpty : function(value){
			if(value === '' || value === null) 
				return false;
			else return true;
			},
		validateEmail : function(email){ return this.emailExpression.test(email); },
		validatePassword : function(password){ 
			if(password.length < this.minPasswordlength || password.length > this.maxPasswordlength) return false;
			return true;
			},
		validateUsername : function(username){
			if(username.length >= 8 && username.length <= 14) return true;
			return false;
		},
		validateBio : function(bio){
			if(bio.length >= 10 && bio.length <= 200) return true;
			return false;
		},
		user : null,
		init : function(){
			this.user = util.getObjectFromSession('_user');
		}
		
		
};

setting.UL_remove_prof_timeLine = function(){
   $('.user-prof-timeline').remove();
};
setting.Ul_user_prof_timeLine = function(){
	$('.user-get-info').append(" <ul class='user-prof-timeline no-list-style " +
			" small-12 large-10 medium-12 columns'></ul>");
};

setting.buildProfHeading = function(icon,message){
	      $('.user-prof-timeline').append(" <li> <h5><i class='fa fa-lg "+icon+"'></i>"+message+"</h5>   </li>");         
};

setting.buildContentwraperLI = function(id){
	
	var vid ='';
	if(id === 'pass'){vid ='passwd';}
	var c = " <li id='"+vid+"' class= 'prof-content medium-12 large-12 small-12 '> </li>" ;
	 $('.user-prof-timeline').append(c);
};
setting.buildContentSubWrapperUL = function(id){
	var vid ='';
	var element ='.prof-content';
		if(id === 'pass'){
			vid ='pass';
			element ='#passwd';
		}
	
	$(element).append("<ul id='"+vid+"' class='user-prof-cont no-list-style medium-12 large-12 small-12 '></ul>");
};

setting.displayErrorOnEmptyValue = function(role,value){
	 if(role === 'name' && !value){
		 $('#'+role).parent().after(this.errorBox);
		 $('#'+role).parent().next().html(this.erroSpan(this.NameNotPresent)).hide().fadeIn(500);
		 log('name found and value not present');
	 }
	 if(role === 'bio' && !value){
		 $('#'+role).parent().after(this.errorBox);
		 $('#'+role).parent().next().html(this.erroSpan(this.bioNotPresent)).hide().fadeIn(500);
		 log('bio found and value not present'); 
	 }
	
};

setting.builduserAttributes = function(role,title,value){
	var dv = ''; 
	if(role === 'username'){dv ="style='display:none;'";}
	
	var x2 = " <li class='small-12 medium-12 large-12 columns '>" +
			" <ul class='no-list-style row'>" +
			"<li class='small-12 large-2 medium-3  columns'><i class='fa fa-square-o'></i>"+title+"</li>" +
			" <li class='small-12 large-5 left medium-5  columns'>" +
			" <span id='"+role+"'>"+value+"</span>" +
			" <i role='"+role+"' "+dv+" class=' prof-edit fa fa-pencil fa-border' ></i>" +
			"</li> </ul> </li>";	
	
	 $('.user-prof-cont').append(x2);
	 this.displayErrorOnEmptyValue(role,value);
	 
	 log('build prfo name');
};

setting.buildPassword = function(){
	var x3 = " <li class='small-12 medium-12 large-12 columns '>" +
			" <ul class='no-list-style row'>" +
			"<li class='small-12 large-4 medium-4  columns'>" +
			"<input id='c-p' type='password' placeholder='current password'></li>" +
			"<li class='small-12 large-4 left medium-4   columns'>" +
			"<input id='n-p' type='password' placeholder='new password'>" +
			"</li>" +
			"<li class= 'small-12 large-4 medium-4 columns  '>" +
			"<a class='pass-upd button-a blue-button'> <i class='fa fa-lock'></i> update password " +
			"</a></i>" +
			"</li>" +
			" </ul> </li>" +
			"<li class=' cpass-msg small-12 medium-6 large-5 columns  '>" +
			"<li class=' npass-msg small-12 medium-6 large-5 large-pull-3 medium-pull-3 columns  '>" +
			 "</li>";
	$('#pass').append(x3);
};

setting.buildUserProfile = function(){
	setting.UL_remove_prof_timeLine();
	  this.Ul_user_prof_timeLine();
	  this.buildProfHeading('fa-gear', 'account information');
	   this.buildContentwraperLI();
	   this.buildContentSubWrapperUL();
	    this.builduserAttributes('username', 'username', this.user.username);
	    this.builduserAttributes('name', 'name', this.user.name);
	    this.builduserAttributes('email', 'email', this.user.email);
	    this.builduserAttributes('bio', 'about you', this.user.bio);
	    
	    //update and change other things
	    this.buildUpdatePassword();
		this.buildDeleteAccount();
	
};

setting.buildUpdatePassword = function(){
	this.buildProfHeading('fa-lock', 'update password');
	this.buildContentwraperLI('pass');
	this.buildContentSubWrapperUL('pass');
	this.buildPassword();
	this.updatePassword();
    
};


setting.buildDeleteAccount = function(){
	 var x4 = "  <li class='li-del'> <h5 class='prof-del'> <i class=' fa fa-trash-o '></i>danger zone</h5> </li>" +
	 		" <li id='prof-del' class='prof-content medium-12 large-12 small-12'>" +
	 			"<ul class='user-prof-cont no-list-style medium-12 large-12 small-12  '>" +
	 		"<li class='small-12 large-8 medium-7  columns'>" +
	 		"<p class='del'> Note: After deleting your account, all your " +
	 		"articles would stay with us and would be made anonymous!" +
	 		" </p>" +
	 		"</li>" +
	 		"<li class='small-12 large-4 pull-1  medium-5 columns'>"+
	 		" <a id='del-ac' class='button-a red-button small-push-3" +
	 		" large-push-5 medium-push-4 center'><i class='fa fa-trash'></i> delete your account</a>" +
	 		"</li></ul></li>";
	 		
	 $('.user-prof-timeline').append(x4);		
};
setting.processDeleteAccount = function(){
	$('a#del-ac').on('click',function(){
		 log('your account will be deleted');
		 swal({
			  title: "Are you sure?",
			  text: "You will not be able to recover your account details or gain ownership of your articles again!",
			  type: "warning",
			  animation: "slide-from-top",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  closeOnConfirm: false
			},
			function(){
				log('processing delete account');
				swal({
					  title: "Password",
					  text: "Enter your current password",
					  type: "input",
					  inputType: "password",
					  showCancelButton: true,
					  closeOnConfirm: false,
					  animation: "slide-from-top",
					  inputPlaceholder: "Password"
					},
					function(inputValue){
					  if (inputValue === false) return false;
					  
					  if (inputValue === "") {
					    swal.showInputError("please type your password");
					    return false;
					  }
					  var da = Base64.decode(sessionStorage.getItem('_auth'));
						var pass = da.split(':')[1];
						if(inputValue !== pass)
							{
							swal.showInputError("Password does not match");
							return false;
							}
					  
							Ajax.DELETE(setting.deleteUser);
					});
				  
			});
	});
};


setting.buildArticleHistorywrapper = function(){
	var h1= "<li><h5><i class='fa fa-history'></i>Article history <span class='right'>200 articles</span></h5> </li>" +
			"<li class='prof-content medium-12 large-12 small-12'>" +
			"<ul class='user-prof-cont no-list-style medium-12 large-12 small-12  '>" +
			" <li class='article-hist small-12 medium-12 large-12 columns '>" +
			"</li></ul></li>";
			$('.user-prof-timeline').append(h1);
	   this.buildArticleHistory();
	   this.buildArticleHistory();
	   this.buildArticleHistory();
	   this.buildArticleHistory();
	   this.buildArticleHistory();
	   this.buildArticlePagination();
	
};

setting.buildArticleHistory = function(){
	   var a1 = "<ul class='no-list-style row'>" +
	   		"<li class='  small-12 large-6 medium-6  columns'>" +
	   		" <span class='set-art-title'><i class='fa fa-square-o'></i> article big title here and the nasty one</span>" +
	   		"</li>" +
	   		"<li class='small-12 large-3 medium-3  columns'>" +
	   		" <span class='set-date'><i class='fa fa-calendar'></i>12/12/2014</span>" +
	   		"</li>" +
	   		"<li class='small-12 large-3 medium-3  columns'>" +
	   		"<span class='set-comment'><i class='fa fa-comment-o'></i>10 comments</span>" +
	   		"</li></ul>";
	   $('.article-hist').append(a1);
};

setting.buildArticlePagination = function(){
	var p1 = " <ul class='pagination '>" +
			"<li class='arrow unavailable'><a href=''>&laquo;</a></li>" +
			"<li class='current'><a href=''>1</a></li>" +
			" <li><a href=''>2</a></li>" +
			"<li><a href=''>3</a></li>" +
			"<li><a href=''>4</a></li>" +
			" <li class='unavailable'><a href=''>&hellip;</a></li>" +
			"<li class='arrow'><a href=''>&raquo;</a></li>" +
			"</ul>";
	$('.article-hist').append(p1);
};


//=comment histr
setting.buildCommentHistoryWrapper = function(){
	var c1 = "<li><h5><i class='fa fa-comments'></i>comment history" +
			" <span class='right'>200 comments</span></h5> </li>" +
	"<li class='prof-content medium-12 large-12 small-12'>" +
	"<ul class='user-prof-cont no-list-style medium-12 large-12 small-12  '>" +
	" <li class='comment-hist small-12 medium-12 large-12 columns '>" +
	"</li></ul></li>";
	$('.user-prof-timeline').append(c1);
	this.buildCommentHistory();
	this.buildCommentHistory();
	this.buildCommentHistory();
	this.buildCommentHistory();
	this.buildCommentHistory();
	this.buildCommentPagination();
	
};
setting.buildCommentHistory = function(){
	
	   var c1 = "<ul class='no-list-style row'>" +
  		"<li class='  small-12 large-8 medium-8  columns'>" +
  		" <span class='set-art-title'><i class='fa fa-square-o'></i> " +
  		"Lot of comment values are heree a big para and minature actusa nd " +
  		"mannually trying to get it so much high that i would not even talk about it</span>" +
  		"</li>" +
  		"<li class='small-12 large-4 medium-4  columns'>" +
  		" <span class='set-date'><i class='fa fa-calendar'></i>12/12/2014</span>" +
  		"</li>" +
  		"</ul>";
  $('.comment-hist').append(c1);
};

setting.buildCommentPagination = function(){
	var p1 = " <ul class='pagination '>" +
			"<li class='arrow unavailable'><a href=''>&laquo;</a></li>" +
			"<li class='current'><a href=''>1</a></li>" +
			" <li><a href=''>2</a></li>" +
			"<li><a href=''>3</a></li>" +
			"<li><a href=''>4</a></li>" +
			" <li class='unavailable'><a href=''>&hellip;</a></li>" +
			"<li class='arrow'><a href=''>&raquo;</a></li>" +
			"</ul>";
	$('.comment-hist').append(p1);
};

setting.buildHistory = function(){
	
	   setting.UL_remove_prof_timeLine();
	   setting.Ul_user_prof_timeLine();
	   setting.buildArticleHistorywrapper();
	   this.buildCommentHistoryWrapper();

};

setting.buildNav = function(){
	var nav ="<nav class='user-info  small-12 large-2 medium-12 columns '>" +
			"<ul class='side-nav '>" +
			"<li class='active'><a id='profile'> <i class='fa fa-lg fa-qq'></i>profile</a></li>" +
			"<li class='divider'></li>" +
			"<li><a id='history'><i class='fa fa-lg fa-history'></i>history</a></li>" +
			"<li class='divider'></li>" +
			"<li><a id='logout'><i class='fa fa-lg fa-power-off'></i>sign out</a></li>" +
			"<li class='divider'></li></ul></nav>" +
			"<div class='user-get-info  small-12 large-10 medium-12 columns '></div>" ;
	
		$('.user-wrapper').append(nav);
};

setting.toggleNav = function(){
	this.buildNav();
	this.buildUserProfile();
	setting.processEdit();
	$('#profile').on('click',function(){
		setting.buildUserProfile();
		$(this).parent().addClass('active');
		$('#history').parent().removeClass('active');
		setting.processEdit();
	});
	$('#history').on('click',function(){
		setting.buildHistory();
		$(this).parent().addClass('active');
		$('#profile').parent().removeClass('active');
	
	});
	$('#logout').on('click',function(){
		Auth.logout();
	});
	
	// Register method to delete account
		this.processDeleteAccount();
};


setting.validateElement = function(role,value){
	switch (role) {
	case 'username':
		   return this.validateUsername(value);
	case 'name':
		   return this.IfValuEmpty(value);	   
		
	case 'email':
		    return this.validateEmail(value);
		
	case 'password':
		     return this.validatePassword(value);
		
	case 'bio':
	     return this.validateBio(value);
	default:
		return true;
		
	}
	
};
setting.showErrorBox = function(role,element){
	 $(element).parent().after(this.errorBox);
	 
	   if(role === 'username'){
		   $(element).parent().next().html(this.erroSpan(this.usernameNotValid)).hide().fadeIn(500);
	   }
	   if(role === 'name'){
		   $(element).parent().next().html(this.erroSpan(this.NameNotPresent)).hide().fadeIn(500);
	   }
	   else if(role === 'email'){
		   $(element).parent().next().html(this.erroSpan(this.emailNotValid)).hide().fadeIn(500);
	   }
	   else if(role === 'bio'){
		   $(element).parent().next().html(this.erroSpan(this.bioNotValid)).hide().fadeIn(500);
	   }
};
setting.ifErrorBoxPresent = function(element){
	 var rid = $(element).parent().next().attr('role');
	 if(rid === 'sett-err') return true;
	 else return false;
	
} ;
setting.editUpdate = function(role, element){
	
	var editId = role+'_edit';
	var updateId = role+'_update';
	
	var id = $(element).attr('id');
    
    if(id === updateId){
   	 log('element cant be updated');
       	$(element).removeAttr('id').attr('id',editId);
       	var updatedVal =	$(element).prev().val();
           $(element).prev().remove();
           $(element).before("<span id='"+role+"'></span>");
           $(element).prev().html(updatedVal).hide().fadeIn(500);
           $(element).removeClass('fa-arrow-circle-right ').addClass('fa-pencil');
           
           if(!this.validateElement(role, updatedVal)){
        	   //if the element validation is not true 
        	   //check if already error has been shown
        	   if(this.ifErrorBoxPresent(element)){
        		   $(element).parent().next().remove(); //remove the previous error and show the updated one
        		}
        		  this.showErrorBox(role,element); //show the error
           }
           else {
        	   //if the validation  is true.
        	   //remove all the errors related to this element
        	   //Update the data in server
        	    var rid = $(element).parent().next().attr('role');
        	    if(rid === 'sett-err') $(element).parent().next().remove();
        	    // update the user object
        	    setting.updateUser.element = element;
        	    setting.updateUser.setData(role, updatedVal);
        	    Ajax.PUT(setting.updateUser);
           }
       	
    }
    else {
       	log('element cant be edited');
       	$(element).removeAttr('id').attr('id',updateId);
       	var previousVal =	$(element).prev().html();
           $(element).prev().remove();
           if(role === 'bio'){
        	   $(element).before("<textarea> </textarea>");
           }
           else {  $(element).before("<input type='text' />");}
           $(element).prev().val(previousVal).hide().fadeIn(500);
           $(element).addClass('fa-arrow-circle-right').removeClass('fa-pencil');
        }
  
};

setting.processEdit= function(){
	$('i.prof-edit').on('click',function(){
		log('inside setting edit');
		var role = $(this).attr('role');
		
		
		switch (role) {
		case 'username':
			    setting.editUpdate(role,this);
			 
			break;
		case 'name':
		    setting.editUpdate(role,this);
		  
		break;	
		case 'email':
		    setting.editUpdate(role,this);
		   
		break;
		case 'bio':
		    setting.editUpdate(role,this);
		   
		break;

		}
		
	});
	
};


setting.updatePassword = function(){
	$('.pass-upd').on('click',function(){
	  var val = $('#n-p').val();
	  setting.updateUser.setData('password', val);
	    Ajax.PUT(setting.updateUser);
	  
	});
};

setting.processSuccess = function(role){
	switch (role) {
	case 'password':
		$('.cpass-msg , .npass-msg').html('');
		$('.cpass-msg ').html(setting.successSpan(this.passwordSuccess));
		setTimeout(function(){Auth.logout();}, 1000);
		
		break;

	default:
		break;
	}
	
};
setting.removeErrorBox = function(element){
	 setTimeout(function(){
		 $(element).parent().next().fadeOut(2000).remove(); 
	 }, 4000);
};

setting.processError = function(role,element,status){
	
	log('inside process error');
	log('role = '+role);
	log(element);
	log('status = '+status);
	
	switch (role) {
	case 'email':
		 $(element).parent().after(this.errorBox);
				if(status === errorcode.CONFLICT){
					 $(element).parent().next()
					    .html(this.erroSpan(this.emailAlreadyPresent))
				        .hide().fadeIn(200);
					this.removeErrorBox(element);
				}
				else {
					$(element).parent().next()
						.html(this.erroSpan(this.genericUpdationError))
					    .hide().fadeIn(300);
					  this.removeErrorBox(element);
				}
		break;
	case 'password':
		$('.cpass-msg , .npass-msg').html('');
		$('.cpass-msg ').html(setting.erroSpan(this.genericUpdationError));
		break;

	default:
		 $(element).parent().after(this.errorBox);
		    $(element).parent().next()
			    .html(this.erroSpan(this.genericUpdationError))
			    .hide().fadeIn(300);
			this.removeErrorBox(element);
		break;
	}
};

setting.validatePasswordOnUpdate = function(data){
	var da = Base64.decode(sessionStorage.getItem('_auth'));
	var pass = da.split(':')[1];
	log('old password from auth = '+pass);
	var cp = $('#c-p').val();
	if(!setting.validatePassword(cp)){
		$('.cpass-msg').html(setting.erroSpan(setting.passwordInvalidlength)).hide().fadeIn(500);
		$('.npass-msg').html('');
		throw new Error('NP');
	}
	else if(cp !== pass){
		$('.cpass-msg').html(setting.erroSpan(setting.passwordDoesNotMatch)).hide().fadeIn(500);
		$('.npass-msg').html('');
		throw new Error('NP');
	}
	else if(!setting.validatePassword(data))
		{
		$('.cpass-msg').html('');
		$('.npass-msg').html(setting.erroSpan(setting.passwordInvalidlength)).hide().fadeIn(500);
		throw new Error('NP');
		}
	else{
		$('.cpass-msg , .npass-msg').html('');
		return data;
		
	} 
};

setting.updateUser = {
		url : "",
		data: "",
		role: '',
		element: '',
		user:null,
		encodedAuth : "",
		updateUser : function(data,role){
			var obj ={};
			switch (role) {
			case 'password':
			       obj.password = setting.validatePasswordOnUpdate(data);
			       return obj;
			case 'name':
				obj.name = data;
				return obj;
			case 'email':
				obj.email = data;
				return obj;
			case 'bio':	
				obj.bio = data;
				return obj;
			}
		},
		setData : function(role,data) {
			this.user = util.getObjectFromSession('_user');
			this.url = Ajax.AllUserURL+"/"+this.user.username;
			this.encodedAuth = sessionStorage.getItem('_auth');
			var dataObj = this.updateUser(data, role);
			this.data = JSON.stringify(dataObj);
			this.role = role;
		},
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', this.encodedAuth);
		},
		success : function(obj) {
			log("success in update user");
		
			util.storeObjectInSession('_user', obj);
			setting.processSuccess(this.role);
		},
		error : function(data) {
			log('fail in update user');
		    log(data);
			setting.processError(this.role, this.element, data.status);
		
		}
	};


setting.deleteUser = {
		url : "",
		user: null,
		encodedAuth : "",
		prejax : function() {
			this.user = util.getObjectFromSession('_user');
			this.url = Ajax.AllUserURL+"/"+this.user.username;
			this.encodedAuth = sessionStorage.getItem('_auth');
		},
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', this.encodedAuth);
		},
		success : function(obj) {
			log("success in delete user");
			swal({
				  title: "Deleted !",
				  text: "Account has been deleted successfully..",
				  type: "success",
				  confirmButtonText: "done",
				  closeOnConfirm: false
				},
				function(){
					Auth.logout();		
					  
				});
			
		},
		error : function(data) {
			log('fail in delete user');
			swal("Error!", "Unable to delete account. Please try again", "error");
		
		}
	};




setting.buildSettings= function(){
	
	if(Auth.isLoggedIn()){
		this.init();
		userheader.processHeader(this.user);
        this.toggleNav();
   
	}
	
};


$(setting.buildSettings());