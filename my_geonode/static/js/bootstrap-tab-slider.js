/* custom Bootstrap 3 slider with tabs controls */
	$(document).ready( function() {
    $('#myCarousel').carousel({
    	interval:  4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slide.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('#nav-carousel').children().length -1;
			var current = $('#nav-carousel li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('#nav-carousel li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
});
