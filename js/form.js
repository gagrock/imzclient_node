
var formjax = {
		 success : "<i class='fa fa-check-circle-o'></i>",
         failure : "<i class='fa fa-circle-o'></i>",
	  
};

formjax.rememberPassword = function(check_id,username_id,password_id){
    $('#'+check_id).on('click',function(){
	     
        if ($(this).is(":checked"))
        { 
         encodedUsername = Base64.encode($('#'+username_id).val());
	       encodedPassword = Base64.encode($('#'+password_id).val());
         localStorage.setItem(encodedUsername,encodedPassword);
         log("password Stored in session "+$("#"+password_id).val());
        }             	   
     });   
     this.processPassword(username_id, password_id);              
	};

formjax.processPassword = function(username_id,password_id){
	 
    $('#'+password_id).on('focus',function(){
	   log("password focus");
	   encodedUsername = Base64.encode($('#'+username_id).val());
	   var storedpassword = localStorage.getItem(encodedUsername);
	   if(storedpassword !== null){
		   $('#'+password_id).val(Base64.decode(storedpassword));
	   }
	   
   });
		
};

formjax.addPostMessage = function(clazz,msg){
	var message= "<div class='row '>"+
       " <div id ='register' class= '"+clazz+"' small-10 large-7" +
       		" medium-8 large-centered medium-centered  columns '>"+
       "<span id ='post_msg'class='fa fa-close right'></span>"+
        "<h5>"+msg+"</h5>"+
    " </div></div>";
	$("#register").remove();
	$(".form-class").prepend(message);
	//$("#register").hide().slideDown();
	
	setTimeout(function(){ $('#register').slideUp();}, 4000);
	$("#post_msg").on('click', function(){$(this).parent().slideUp(200);});
	
};

formjax.addVerifyMessage = function(clazz,msg,iclass){
	var message= "<div class='row '>"+
        "<div id ='verify' class=' "+clazz+" small-10 large-6 medium-8"+ 
        "large-centered medium-centered small-centered columns '>"+
       "<i class='fa fa-lg "+iclass+" left'></i>"+
       "<span id='verify-close' class='fa fa-close right'></span>"+
       "<h5>"+msg+"</h5>"+
       "</div></div>";
		
	$("#verify").remove();
	$(".form-login-class").prepend(message);
	setTimeout( function(){$('#verify').slideUp();}, 4000);
	$("#verify-close").on('click', function(){$(this).parent().slideUp(200);});
	
};

formjax.processLoginSuccess = function(user,auth){
	    sessionStorage.setItem('_user',Base64.encode(JSON.stringify(user)));
	    sessionStorage.setItem('_auth', auth);
	     var lastVisited = sessionStorage.getItem("_lv");//get the last visited
	    if( lastVisited !== null) location.replace(Base64.decode(lastVisited));
	    else location.replace("./articles");
	
};

var dataValidation = {
	   inputValue : "",
	   inputId : "",
	   errorId :"",
	   IsEmail : false,
	   url : "",
	   prejax : function(){
		   var params ="username="+this.inputValue;
			 if(this.IsEmail === true)
				 params ="email="+this.inputValue;
		      this.url = Ajax.AllUserURL+"?"+params;
	   },
	   success : function(data){
		   log("in success");
           Form.setFailure(data.value+" is not available",this.inputId,this.errorId);
	   },
	   error : function(data){
		   log(" error");
	 	      if(data.status === errorcode.NOT_FOUND)
	 	         Form.setSuccess(this.inputValue+" is available",this.inputId,this.errorId);  
	   }
    
	 
	
};

//this function assumes that if the page is loaded from a verification link
//in case the verify param is there, the function would try to verify the user
//if no query params as undefined, this method will not run;
var emailVerification = {
		url : "",
		prejax : function(){
			 var verifyString = util.getVerifyQueryString();
			 if(verifyString === undefined){
				 throw new Error("NO query String");
			 }
			 else{
				 this.url  = Ajax.AllUserURL+"?"+verifyString;
				 formjax.addVerifyMessage("register-success", "verifying..","fa-circle-o-notch fa-spin"); 
				 //when the query String is present. the run the verification
		      }
		},
	 success : 	function(obj){
		 log("in success verify USER");
      	message = "<b>"+obj.email+"</b> has been verified";
      	formjax.addVerifyMessage("register-success",message,"fa-check-square");	
		 
	 },
	 error: function(errorObj){
		 log(" error verify User");
	    	log(errorObj);
	    	if(errorObj.responseJSON !== undefined){
	    		formjax.addVerifyMessage("verify-fail", errorObj.responseJSON.error_message,"fa-exclamation-circle");
	    	}
	 }
				
};

var loginValidation = {
		username :"",
		password :"",
		url : "",
		encodedAuth : "",
		prejax : function(){
			  this.encodedAuth = Base64.encode(this.username+':'+this.password);
			  this.url = Ajax.AllUserURL+"/"+this.username;
			  log("url in login: "+this.url);
			},
		progress : function(event){
			 
					    if(event.lengthComputable){
						 var percentcomplete = (event.loaded/event.total)*100;
						 if(percentcomplete === 100){
							$("#login-submit").html("<i class='fa fa-sign-in'></i> sign up");
						 }
					 }
				},
		beforeSend : function(request){
			 request.setRequestHeader('Authorization',this.encodedAuth);
				},
		success : function(obj){
			     log("validate login success..");
			
	             formjax.processLoginSuccess(obj,this.encodedAuth);
				},
		error : function(data){
				log(" error login User");
	 	    	log('error thrown is:');
	 	    	log(data);
	 	    	formjax.addVerifyMessage("verify-fail","Invalid username or password","fa-exclamation-circle");
				}
		
};

var registerUser = {
		url : "",
        data : "",
        getData : function(dataObj){
        	this.data =JSON.stringify(dataObj);
        },
        prejax : function(){
               progressBar.append = false;
			   progressBar.build("body",0);
        	this.url = Ajax.AllUserURL;
        	log('post url: '+this.url);
        },
        
		progress : function(event){
			
				if(event.lengthComputable){
					 var percentcomplete = (event.loaded/event.total)*100;
					 progressBar.set_MIN_MAX_with(event.total/10, percentcomplete);
					 if(percentcomplete === 100){
						 $("#sign_up_button").html("<i class='fa fa-sign-in'></i> sign up");
					 }
				 }
				log("register progeess");
				progressBar.progress(event);
		},
		loadStart : function(event){
			log("inside load start-REGISSTER");
		    progressBar.initialize(event);
		},		
		loadEnd : function(event){
			log('register progess END');
			progressBar.end(event);
		},
		success : function(data){
			progressBar.progress();
			progressBar.success(data);
			
		   	log("in success");
        	log(data);
            formjax.addPostMessage("register-success","An email has been sent to <b>"+data.email+
            		                             "</b> for account verfication");
		},
		error : function(data){
			log(" error");
	    	log(data);
	    	progressBar.error(data);
	    	/*
	    	 * if(data.status === errorcode.CONFLICT)
	    	 { 
	    		var error = data.responseJSON;
	    		formjax.addPostMessage("register-fail", error.error_message);
	    	 }
	    	 * 
	    	 */	
	    	formjax.addPostMessage("register-fail", "error happened while registering");
		}
};


/*
 * form object starts here.
 */
Form={
	emailExpression : /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,	
    emailEmpty : "<i class='fa fa-remove'></i> Email is required",
    usernameEmpty : "<i class='fa fa-remove'></i> Username is required",
    usernameNotValid: "<i class='fa fa-remove'></i> username should 8-14 characters",
    emailNotValid: "<i class='fa fa-remove'></i> Email is not valid",
    passwordEmpty: "<i class='fa fa-remove'></i> Password is required",
    minPasswordlength : 8,
    maxPasswordlength : 25,
    passwordInvalidlength : "<i class='fa fa-unlock'></i> password should be 8 - 25 characters",
    passwordDoesNotMatch : "<i class='fa fa-thumbs-down'></i> Passwords does not match",
    passwordMatch : "<i class='fa fa-thumbs-up'></i> Passwords matched",
    borderSuccess : "2px solid #26a69a",
    borderFailure : "2px solid #D12B42  ",
    failureColor : "#D12B42",
    successColor : "#26a69a",
    emailNotAvailable: "<i class='fa fa-thumbs-down'></i> Email already registered",
    emailAvailable: "<i class='fa fa-thumbs-up  '></i> Email is available",
	
	initateLogin : function(){ 	$(".error-box").hide(); 
	                           
	},
	validateEmail : function(email){ return this.emailExpression.test(email); },
	validatePassword : function(password){ 
		if(password.length < Form.minPasswordlength || password.length > Form.maxPasswordlength) return false;
		return true;
		},
	validateUsername : function(username){
		if(username.length >= 8 && username.length <= 14) return true;
		return false;
	}
};

Form.setFailure =function(failureString,input,error){
	 var string = formjax.failure+failureString;
	 var errorId ="#"+error;
	 var inputId = "#"+input;
	
	 $(errorId).html(string).show();
	 $(errorId).css("color", Form.failureColor);
	  $(errorId).css("border-color", Form.failureColor);
	  $(inputId).css("border", Form.borderFailure); 
};

Form.setSuccess = function(successString,input,error){
	var string = formjax.success+successString;
	 var errorId ="#"+error;
	 var inputId = "#"+input;
	 
	 $(errorId).html(string).show();
	 $(errorId).css("color", Form.failureColor);
	  $(errorId).css("color", Form.successColor);
	  $(errorId).css("border-color", Form.successColor);
};
Form.showProgress = function(error){
	var errorId ="#"+error;
	$(errorId).html("<i class='fa-circle-o-notch fa-spin'></i> checking..");
};

Form.validateLoginInputOnkeyUp = function(){
	
	$('input').on("keyup",function(){
		var _this = this;
		var inputId = $(_this).attr('id');
		
		if(inputId === "username"){
			 var isValidUsername= Form.validateUsername($(_this).val());
			 if(isValidUsername){
				 $("#username_error").hide();
				 $(_this).css("border", Form.borderSuccess);
			   }
			  else{
				  $(_this).css("border", Form.borderFailure); 
			  }
		 }
		if(inputId === "password"){
			 
			var IsValidPassword = Form.validatePassword($(_this).val());
			
			if(IsValidPassword){
				 $("#password-error").hide();
				 $(_this).css("border", Form.borderSuccess);
			}
			else{
				  $(_this).css("border", Form.borderFailure); 
			}
			
		}
		
	});
};

Form.validateLoginFormOnSubmit = function(){
	
	
	$( "#login-submit" ).on('click', function( event ) {
		
		var usernameValue = $('#username').val();
		var passwordValue = $('#password').val();
		var isLoginCorrect = true;
		
		 if(!usernameValue){
			 console.log('empty username called ' +usernameValue);
			 $('#username').css("border", Form.borderFailure);
			 $("#username_error").html(Form.usernameEmpty).show(300);
			 isLoginCorrect =false;
			 event.preventDefault();
		  }
	
		 if( usernameValue && !Form.validateUsername(usernameValue)){
			 console.log('username length called ' +usernameValue);
			 $('#username').css("border", Form.borderFailure);
			 $("#username_error").html(Form.usernameNotValid).slideDown(300);
			 isLoginCorrect =false;
			 event.preventDefault();
		  }
		
		 if(!passwordValue){
			 console.log('empty password called ' +passwordValue);
			 $('#password').css("border", Form.borderFailure);
			 $("#password-error").html(Form.passwordEmpty).show(300);
			 isLoginCorrect =false;
			 event.preventDefault();
		  }
		 if( passwordValue && !Form.validatePassword(passwordValue)){
			 console.log('password length called ' +passwordValue);
			 $('#password').css("border", Form.borderFailure);
			 $("#password-error").html(Form.passwordInvalidlength).slideDown(300);
			 isLoginCorrect =false;
			 event.preventDefault();
		  }
		 
		 if(isLoginCorrect){
			 log('signing in');
			 $(this).html("<i class='fa fa-circle-o-notch fa-spin'></i> signing in");
			 loginValidation.username = usernameValue;
			 loginValidation.password = passwordValue;
			 Ajax.GET(loginValidation);
			 
			 
		 }
  });
};

Form.validateSignupInputOnkeyUp = function(){
	  
	
	$('input').on("keyup",function(){
		var _this = this;
		var inputId = $(_this).attr('id');
		
		if(inputId === "usermamep"){
			var username = $(_this).val().trim();
			 var isValidUsername= Form.validateUsername(username);
			 log("username is valid: "+isValidUsername);
			 
			 if(isValidUsername){
				 $(_this).css("border", Form.borderSuccess);	
				 dataValidation.inputValue = username;
				 dataValidation.inputId = 'usernamep';
				 dataValidation.errorId = 'usernamep-error';
				 Ajax.GET(dataValidation);
				 
			   }
			  else{
			
				  $("#usernamep-error").html(Form.usernameNotValid).show(300);
				  $(_this).css("border", Form.borderFailure); 
				  $("#usernamep-error").css("color", Form.failureColor);
				  $("#usernamep-error").css("border-color", Form.failureColor);
				 
			  }
			
		}
		
		if(inputId === "emailp"){
			 
			 var email = $(_this).val().trim();
			 var isCorrectEmail= Form.validateEmail(email);
			 if(isCorrectEmail){
				 //$("#emailp-error").hide(300);
				$(_this).css("border", Form.borderSuccess);
				 dataValidation.inputValue = email;
				 dataValidation.inputId = 'emailp';
				 dataValidation.errorId = 'emailp-error';
				 dataValidation.IsEmail = true;
				 Ajax.GET(dataValidation);
				 
			   }
			  else{
				  $("#emailp-error").html(Form.emailNotValid).show(300);
				  $(_this).css("border", Form.borderFailure); 
				  $("#emailp-error").css("color", Form.failureColor);
				  $("#emailp-error").css("border-color", Form.failureColor);
			  }
		 }
		
		if(inputId === "passwordp"){
			
			var IsValidPassword = Form.validatePassword($(_this).val());
			
			if(IsValidPassword){
				 $("#passwordp-error").hide(300);
				 $(_this).css("border", Form.borderSuccess);
			}
			else{
				$("#passwordp-error").html(Form.passwordInvalidlength).show(300);
				  $(_this).css("border", Form.borderFailure); 
			}
			
		}
		if(inputId === "password-g"){
			var password=$('#passwordp').val();
			var passg=$(_this).val();
			var ivp = Form.validatePassword(passg);
			
			if(ivp){
				$("#password-g-error").hide();
				 $("#password-g-error").css("color", Form.failureColor);
				  $("#password-g-error").css("border-color", Form.failureColor);
				
				if(password === passg)
				 {
				  $(_this).css("border", Form.borderSuccess); 
				  $("#password-g-error").css("color", Form.successColor);
				  $("#password-g-error").css("border-color", Form.successColor);
				  $("#password-g-error").html(Form.passwordMatch).show(300);
				 }
				else{
					$(_this).css("border", Form.borderFailure);
					$("#password-g-error").html(Form.passwordDoesNotMatch).show(300);
				}

			}
			else{	
				$("#password-g-error").html(Form.passwordInvalidlength).show(300);
				$(_this).css("border", Form.borderFailure); 
			}
			
			
			
		}
		
		
	});
};


Form.validateSignupFormOnSubmit = function(){
	
	$( "#sign_up_button" ).on("click",function( event ) {
		
		  
		var isFormCorrect = true;
		var usernameValue =$('#usermamep').val();
		var emailValue = $('#emailp').val();
		var passwordValue = $('#passwordp').val();
		var passagainValue=$('#password-g').val();
		
		if(!usernameValue){
			 console.log('empty username called ');
			 $('#usermamep').css("border", Form.borderFailure);
			 $("#usernamep-error").html(Form.usernameEmpty).show(300);
			 isFormCorrect =false;
			 event.preventDefault();
			
		} 
		
		 if(!Form.validateEmail(emailValue) ){
			 $('#emailp').css("border", Form.borderFailure );
			 $("#emailp-error").html(Form.emailNotValid).show(300);
			 isFormCorrect =false;
			 event.preventDefault();
		 }
		 if(!emailValue){
			 console.log('empty email called ');
			 $('#emailp').css("border", Form.borderFailure);
			 $("#emailp-error").html(Form.emailEmpty).show(300);
			 isFormCorrect =false;
			 event.preventDefault();
		 }
		 if(!passwordValue){
			 console.log('empty password called ' +passwordValue);
			 $('#passwordp').css("border", Form.borderFailure);
			 $("#passwordp-error").html(Form.passwordEmpty).show(300);
			 isFormCorrect =false;
			 event.preventDefault();
		  }
		 if( passwordValue && !Form.validatePassword(passwordValue)){
			 console.log('password length called ' +passwordValue);
			 $('#passwordp').css("border", Form.borderFailure);
			 $("#passwordp-error").html(Form.passwordInvalidlength).slideDown(300);
			 isFormCorrect = false;
			 event.preventDefault();
		  }
		 if(!passagainValue){
			 console.log('empty password called ' +passagainValue);
			 $('#password-g').css("border", Form.borderFailure);
			 $("#password-g-error").html(Form.passwordEmpty).show(300);
			 isFormCorrect = false;
			 event.preventDefault();
		  }
		 if( passagainValue && !Form.validatePassword(passagainValue)){
			 console.log('password length called ' +passagainValue);
			 $('#password-g').css("border", Form.borderFailure);
			 $("#password-g-error").html(Form.passwordInvalidlength).slideDown(300);
			 isFormCorrect= false;
			 event.preventDefault();
		  }
		 
		 if( passagainValue && (passagainValue !== passwordValue) ){
			 console.log('password length called ' +passagainValue);
			 $('#password-g').css("border", Form.borderFailure);
			 $("#password-g-error").html(Form.passwordDoesNotMatch).slideDown(300);
			 isFormCorrect = false;
			 event.preventDefault();
		  }
		if(isFormCorrect){
			log("form can be submitted");
			$(this).html("<i class='fa fa-circle-o-notch fa-spin'></i> signing up");
			var user = new postUser(usernameValue, emailValue, passwordValue);
			log(user);
			registerUser.getData(user);
			Ajax.POST(registerUser);
			
		} 
	
  });
	
};
Form.toggleLoginSingup = function(){

	
	$('#show-signup').on('click',function(){

		$('#sign-up-head, #sign-up-cont').css({'display':"block"});
		$('#sign-in-head, #sign-in-cont').css({'display':"none"});
	});
	$('#show-signin').on('click',function(){
		$('#sign-up-head, #sign-up-cont').css({'display':"none"});
		$('#sign-in-head, #sign-in-cont').css({'display':"block"});
	});
};




Form.processLoginForm = function(){
	Auth.ifLoggedIn();
	Form.toggleLoginSingup();
	Form.initateLogin();
    Form.validateLoginFormOnSubmit();
    Form.validateLoginInputOnkeyUp();
    Form.validateSignupFormOnSubmit();
    Form.validateSignupInputOnkeyUp();
    formjax.rememberPassword('remember_me', 'username', 'password');
    Ajax.GET(emailVerification);
  

};

$(Form.processLoginForm());
