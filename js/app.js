

$(function(){
	
	
util.activateTooltip();

var pathname= location.href;
log(pathname);
switch(pathname){
case './home':
		  userPage.processUserPage();
	      log("home");
	      
  break;
case "/home/sheikh/Liberary/Dropbox/development/eclipse-workspace-3/landpage/web/pages/preview.html":
	menu.scrollDivShow();  
	Preview.showPreview();
    log("this is  preview page");
break;  
case "/home/sheikh/Liberary/Dropbox/development/eclipse-workspace-3/landpage/web/pages/explore.html":
	menu.scrollDivShow(); 
	Explore.processExplorer(); 
    console.log("this is user explore page");
  break;
  
case "/home/sheikh/Liberary/Dropbox/development/eclipse-workspace-3/landpage/web/pages/article.html":
	menu.scrollDivShow(); 
	MainArticle.buildAllArticle();
    console.log("this is user main article page");
  break;    
case "/home/sheikh/Liberary/Dropbox/development/eclipse-workspace-3/landpage/web/pages/login.html":
	menu.scrollDivShow(); 
	Form.processLoginForm();  
    console.log("this is user login page");
  break;  	  
case "/home/sheikh/Liberary/Dropbox/development/eclipse-workspace-3/landpage/web/pages/signup.html":
	menu.scrollDivShow(); 
	Form.processLoginForm();  
    log("this is user singup page");
  break;
	    
default:
 log("these are other pages except userpage");
  menu.scrollDivShow();
  DisplayToggles.processToggles();
	        
 break;
}




     
  });


