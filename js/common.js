$(function() {
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

});
