(function($) {

	$(document).ready(function() {
	  $('body').addClass('js');
	  var $menu = $('#menu'),
	    $menulink = $('.menu-link');
	  
	$menulink.click(function() {
	  $menulink.toggleClass('active');
	  $menu.toggleClass('active');
	  return false;
	});});

    // $(".Modern-Slider").slick({
	//     autoplay:true,
	//     autoplaySpeed:10000,
	//     speed:600,
	//     slidesToShow:1,
	//     slidesToScroll:1,
	//     pauseOnHover:false,
	//     dots:true,
	//     pauseOnDotsHover:true,
	//     cssEase:'fade',
	//    // fade:true,
	//     draggable:false,
	//     prevArrow:'<button class="PrevArrow"></button>',
	//     nextArrow:'<button class="NextArrow"></button>', 
	// });

    $("div.features-post").hover(
	    function() {
	        $(this).find("div.content-hide").slideToggle("medium");
	    },
	    function() {
	        $(this).find("div.content-hide").slideToggle("medium");
	    }
	 );


	// $( "#tabs" ).tabs();


})(jQuery);