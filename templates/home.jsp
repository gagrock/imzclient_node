<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Home | imzah.com</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
 <meta name="copyright" content="imzah is the registered trademark representing imzah.com, www.imzah.com">
 <meta name="description" content="read the curated tutorials from different jonors of education,politics,technology. ">
 <meta  name="keywords" content="imzah, imzah.com, www.imzah.com, tutorials,education,politics,VR,news,startup,science, medicine">
 <meta name="robots" content="index,follow">
 <meta name= "DC.title" content="www.imzah.com/home">

 <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
 
 
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/pushy.css">
<link rel="stylesheet" href="css/app.css">
<link rel="stylesheet" href="css/app-font.css">
<link rel="stylesheet" href="css/foundation.css">

<script src="https://use.fontawesome.com/1083451c67.js"></script>

</head>

<body class="home-body">
	    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->	
	
	<!-- Pushy Menu -->
	<nav class="pushy pushy-left nav-side">
	
	    <div class="small-12 large-12 medium-12  nav-badge">
	    	
	    	<div class="box">IMZAH</div>
	    
	    </div>
	    <div class="small-12 large-12 medium-12 nav-wrapper "> 
	    
	    	 <ul class="side-nav" role="navigation" >
			   <li role="menuitem">
				   <a href="${pageContext.request.contextPath}/">
				   		<i class="fa fa-lg fa-home align" aria-hidden="true"></i>home
				   </a>
			   </li>
			   <li role="menuitem">
				   	<a href="${pageContext.request.contextPath}/home/explore">
				   		<i class="fa fa-lg fa-industry align" aria-hidden="true"></i>explore
				   	</a>
			   	</li>
			   <li role="menuitem">
				   	<a href="${pageContext.request.contextPath}/home/user/editor">
				   		<i class="fa fa-lg fa-pencil-square-o align" aria-hidden="true"></i>write
				   	</a>
			   </li>
			   <li role="menuitem">
				   	<a href="${pageContext.request.contextPath}/home/user/signup">
				   		<i class="fa fa-lg fa-sign-in align" aria-hidden="true"></i>sign-in
				   	</a>
			   	</li>
			  
				<li class="nav-break"></li>
				 <li class="divider"></li>
				 
			 </ul>
			 
			 <ul class="inline-list social">
				  <li><a href="#"><i class="fa  fa-facebook align" aria-hidden="true"></i></a></li>
				  <li><a href="#"><i class="fa  fa-google-plus align" aria-hidden="true"></i></a></li>
				  <li><a href="#"><i class="fa  fa-twitter align" aria-hidden="true"></i></a></li>
				  <li><a href="#"><i class="fa  fa-medium align" aria-hidden="true"></i></a></li>
				  <li><a href="#"><i class="fa  fa-instagram align" aria-hidden="true"></i></a></li>
			</ul>
			 <ul class="side-nav" role="navigation" >
				 <li class="divider"></li>
			</ul>
			<ul class="inline-list side-nav-footer">
			  <li><a href="#">about</a></li>
			  <li><a href="#">privacy</a></li>
			  <li><a href="#">feedback</a></li>
			
			</ul>	
			 
	    </div>
		
	</nav>
	<!-- Site Overlay -->
	<div class="site-overlay"></div>

	<!-- Your Content -->
	<div id="container">
		<div class="sub-menu ">
			<i class="fa fa-2x  fa-bars menu-btn menu " id="menu"></i> <a
				href="${pageContext.request.contextPath}/home/user/signup"
				class=" button-a signUp blue-button fade-border 
				hide-for-small float-right font-runda-heading-link ">sign in/sign up</a> 
				 <a href="${pageContext.request.contextPath}/home/explore"
				class=" header-link-black fade-border font-runda-heading-link float-right hide-for-small ">
				<span class="fa fa-lg fa-newspaper-o"></span>explore
			</a>
		</div>
		<div class="poster-container  " id="mainNav">
			<header class="app-header index-header">
				<i class="fa fa-2x  fa-bars menu-btn " id="menu"></i> <a
					href="${pageContext.request.contextPath}/home/user/signup"
					class=" button-a signUp fade-border hide-for-small
					 float-right font-runda-heading-link white-button">sign in/sign up</a> 
					 <a href="${pageContext.request.contextPath}/home/explore"
					class=" header-link fade-border font-runda-heading-link float-right hide-for-small ">
					<span class="fa fa-lg fa-newspaper-o"></span> explore
				</a>

			</header>

			<section class="poster  ">
				  <ul class="no-list-style">
				  <li><h3 id="logo">i.m.z.a.h</h3></li>
				  <li><h1>read the words you love</h1></li>
				  <li> <h3>discover new articles and start writing your own</h3></li>
				  <li class='hide-for-small'><a class='chev-down'> <i class='  fa fa-lg fa-chevron-down'></i></a></li>
				  <li>
				  <div class="row searchHome">
				  
				
				  <div class='small-12 large-12 medium-12 columns  '>
				  <a class='button-a  small-centered medium-centered large-centered small-10 large-2 medium-3 columns white-button' 
				  href="${pageContext.request.contextPath}/home/user/signup">start writing</a>
				  </div>
				  </div>
				  
				  
				  </li>
				  </ul>
				
			</section>
		</div>

		<div class=" container-g ">
	    <div class = "card-row" id="i_cards">
	       <section class="trending-headline small-12 large-2 medium-3 columns ">
	       
				
				<h3>latest writeups</h3>
			
			
			
				
		</section>
	    </div>
          

			<!-- card row -->
			<section id='cards' class=" card-row">
			   
				<!-- card START -->
		        <div class='home-trends '>
		          
		        </div> 
				
				<!-- card END-->

			</section>
			<!-- trending row ends here -->
           <section class="home-invite small-12 large-12 medium-12  columns ">
           <div class="row  ">
           <div class=' invite-heading small-12 large-12 medium-12 columns '>
              <h4>We are still Developing <b>I.M.Z.A.H</b></h4>
              <h4>Thank you for visiting..</h4>
              
              </div>
              <img class="devc" alt="we are still developing it.." src="img/dvl.svg">
           </div>
                
           </section>


		

		</div>
		<!-- container-g END -->

	</div>
	<!-- Container END -->
	<footer id='footer' class=" small-12 large-12 medium-12 columns">	
		<i class="fa fa-copyright"></i> Copyright 2001-2016
			<a href="www.imzah.com">imzah.com </a>- All Rights Reserved 
	</footer>

	<!-- Pushy JS -->
   	<script src='js/jquery-1.11.3.js'></script>
	<script src="js/modernizr.js"></script>
  	<script src="js/pushy.min.js"></script>
	<script src="js/util.js"></script>
	<script src="js/menu.js"></script>
	<script src="js/home.js"></script>
	
	
	<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-80383703-1', 'auto');
		  ga('send', 'pageview');

</script>
        

</body>
</html>
