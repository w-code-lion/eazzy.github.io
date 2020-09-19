$(function() {

	$(".scroll-top").on("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 777);
		e.preventDefault();
		return false;
	});

	$('.beefup').beefup({
		openSingle: true,
	});

	$('.popup-link').magnificPopup();

	// BurgerMenu
	
	const menuToggle = document.querySelector('#menu__togle');
	const mobileNavContainer = document.querySelector('#mobile__nav');
	
	menuToggle.onclick = function(){
	  menuToggle.classList.toggle('menu-icon-active');
	  mobileNavContainer.classList.toggle('mobile-nav--active');
	}


	tippy('.help-msg', {
		followCursor: true,
		arrow: false
	});


	var options = {
	  valueNames: [ 'name']
	};

	var userList = new List('faqinfo', options);

});
