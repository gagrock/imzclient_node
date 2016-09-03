
menu={};


$(document).on("ready",function(){
	$("body").addClass("no-scroll");
	
});


/*
 * home page menu 
 * scrollDivShow shows the topbar on the scrolling down. 
 */
menu.scrollDivShow = function(){
	$("body").removeClass("no-scroll");
	$(".sub-menu").hide();
	var lastScroll = 0;
    $(window).scroll(function(){
		var scrollTop=$(this).scrollTop();
		//log("scrolling.."+ scrollTop);
		
		if(scrollTop <= 10 || scrollTop > lastScroll){
			$("body").addClass("no-scroll");
			$('.sub-menu').hide();
			$(".app-header").css({'visibility': "visible"});
		}
		
		else if(  lastScroll - scrollTop >= 20 )
		{    $("body").addClass("no-scroll");
			$(".app-header").css({'visibility': "hidden"});
			$('.sub-menu').css({'top':'0px', 'position': "fixed"}).slideDown(300);
		}
		
		
		lastScroll = scrollTop;
	});
    
};
$(menu.scrollDivShow());
