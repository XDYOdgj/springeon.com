import fit from '../common/fit.js';


// var swiper = new Swiper(".mySwiper", {
// 	spaceBetween: 10,
// 	slidesPerView: 4,
// 	freeMode: true,
// 	watchSlidesProgress: true,
// });
// var swiper2 = new Swiper(".mySwiper2", {
// 	spaceBetween: 10,
// 	navigation: {
// 		nextEl: ".swiper-button-next",
// 		prevEl: ".swiper-button-prev",
// 	},
// 	thumbs: {
// 		swiper: swiper,
// 	},
// });





setTimeout(() => {
	$(".product-details-images").each(function() {
		var i = $(this);
		var j = i.siblings(".product-details-thumbs");
		i.slick({
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			dots: false,
			infinite: true,
			centerMode: false,
			centerPadding: 0,
			asNavFor: j,
		})
	});
	$(".product-details-thumbs").each(function() {
		var j = $(this);
		var i = j.siblings(".product-details-images");
		j.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			dots: false,
			infinite: true,
			focusOnSelect: true,
			centerMode: true,
			centerPadding: 0,
			prevArrow: '<span class="slick-prev"><i class="fa fa-angle-left"></i></span>',
			nextArrow: '<span class="slick-next"><i class="fa fa-angle-right"></i></span>',
			asNavFor: i,
			responsive: [{
				breakpoint: 1024,
				settings: {}
			}, {
				breakpoint: 600,
				settings: {}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			}]
		})
	}); 
}, 100)

//图片大小根据屏幕大小自适应
setTimeout(() => {
	
	$(".venobox").venobox({
		border: "10px",
		titleattr: "data-title",
		numeratio: true,
		infinigall: true
	});
	
	fit.adaptImgHeight(".product-img", 1);
}, 200)