/**
 *  has html for all the common files of user
 */

userheader ={
};
headerhtml = {
		header: "<header class='home-header '></header>",
		ul_header : " <section class=' ul-header large-4 medium-12 small-12 columns  ' >" +
		"<a id='home' class='float-left' >" +
		"<span class='fa fa-lg fa-bars black-color'></span>home</a>" +
		" <a id='self_user' class='float-left push-1' >" +
		"</a></section>",
		ul_tools : " <section class='ul-tools large-6  medium-12 small-12 columns '>" +
				"<a " +
				"class='float-left' id='write'>" +
				"<span class='fa fa-lg fa-pencil-square-o'></span><b class='hide-for-small-only'> write</b>  </a>" +
				"<a  class='float-left' id='your-article'>" +
				"<span  class='fa fa-lg fa-list-alt'></span><b class='hide-for-small-only'> past articles </b>" +
				"	</a>" +
				"<a  class='float-left' id='explore'>" +
				"<span  class='fa fa-lg fa-folder '></span> <b class='hide-for-small-only'> explore</b> </a>" +
				"<a " +
				"class='float-left' id='account'>" +
				"<span  class='fa fa-lg  fa-gear '></span> <b class='hide-for-small-only'>account </b></a>" +
				"</section> ",
		logout : "<a " +
		"class='float-left' id='logout'>" +
		"<span  class='fa fa-lg fa-power-off '></span> <b class='hide-for-small-only'>sign out </b></a>"		

	
};

userheader.processHeader = function(user){
	
	log("inside header: user is "+user.username);
	
	$('.body').prepend(headerhtml.header);
	$('.home-header').append(headerhtml.ul_header).append(headerhtml.ul_tools);
	//add the logout to the header except the setting page
      if(location.href.split('/').pop() !== 'setting'){
    	  $('.ul-tools').append(headerhtml.logout);
      }
	
	$('.ul-tools a').on('click',function(){
		var id = $(this).attr('id');
		if(id === 'write') {location.replace('./editor');}
		if(id === 'explore') {location.replace('./explore');}
		if(id === 'your-article') {location.replace('./articles');}
		if(id === 'account') {location.replace('./setting');}
		if(id === 'logout') {Auth.logout();}
	
	});
	
	$('.ul-header a').on('click',function(){
		var id = $(this).attr('id');
		if(id === 'home') location.replace('../../');
		if(id === 'self_user') location.replace('./setting');
	});
	$('#u_title').html(user.username+"| wemater.org");
	$('#self_user').html("<span class='fa fa-lg fa-user'></span>"+user.username);
	
};



