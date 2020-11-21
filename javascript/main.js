// Menu
$(document).ready(function(){
	// menu click event
	$('.menuBtn').click(function() {
		$(this).toggleClass('act');
			if($(this).hasClass('act')) {
				$('.mainMenu, #mob-menu').addClass('act');
			}
			else {
				$('.mainMenu, #mob-menu').removeClass('act');
			}
	});
});

// Menu Scroll
$(window).scroll(function() {
    if ($(this).scrollTop() > 1 ) {
        $('.header-wrapper').css('box-shadow',' 0 1px 2px #0000001c');
    } else {
        $('.header-wrapper').css('box-shadow', 'none');
    }
});

// Search Toggler
$(document).ready(function(){
  $(".header-wrapper .search .btn").click(function(){
    $(".header-wrapper .searchtoggle").fadeOut(100);
  });
  $(".header-wrapper .main .btn ").click(function(){
    $(".header-wrapper .searchtoggle").fadeIn(100);
  });
});
