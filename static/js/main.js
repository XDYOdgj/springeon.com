(function(a) {
	var h = a(window);
	var g = a(".header-sticky");
	h.on("scroll", function() {
		var i = h.scrollTop();
		if (i < 300) {
			g.removeClass("is-sticky")
		} else {
			g.addClass("is-sticky")
		}
	});
	a("#mobile-menu-trigger").on("click", function() {
		a("#offcanvas-mobile-menu").removeClass("inactive").addClass("active")
	});
	a("#offcanvas-menu-close-trigger").on("click", function() {
		a("#offcanvas-mobile-menu").removeClass("active").addClass("inactive")
	});
	var c = a(".offcanvas-navigation"),
		d = c.find(".submenu2");
	d.parent().prepend('<span class="menu-expand"><i></i></span>');
	d.slideUp();
	// c.on("click", "li a, li .menu-expand", function(j) {
	// 	var i = a(this);
	// 	if ((i.parent().attr("class").match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && (i
	// 			.attr("href") === "#" || i.hasClass("menu-expand"))) {
	// 		j.preventDefault();
	// 		if (i.siblings("ul:visible").length) {
	// 			i.parent("li").removeClass("active");
	// 			i.siblings("ul").slideUp()
	// 		} else {
	// 			i.parent("li").addClass("active");
	// 			i.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
	// 			i.closest("li").siblings("li").find("ul:visible").slideUp();
	// 			i.siblings("ul").slideDown()
	// 		}
	// 	}
	// });
	var b = a(".bg-image");
	b.each(function() {
		var j = a(this),
			i = j.data("bg");
		j.css("background-image", "url(" + i + ")")
	});
	a(".hero-slider").slick({
		infinite: true,
		fade: true,
		dots: true,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				dots: true,
				arrows: false,
			}
		}, ]
	});
	a(".testimonial-slider").slick({
		infinite: true,
		fade: true,
		dots: true,
		arrows: false,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				dots: true,
				arrows: false,
			}
		}, ]
	});
	a(".blog-slider").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	
	a(".product-slider-five").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		rows: 2,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 4,
			}
		}, {
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a(".list-product-slider").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendArrows: ".on-sale-nav",
		rows: 3,
		prevArrow: '<button class="slick-prev slick-btn"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next slick-btn"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a(".list-product-slider-two").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendArrows: ".latest-nav",
		rows: 3,
		prevArrow: '<button class="slick-prev slick-btn"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next slick-btn"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a(".list-product-slider-three").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendArrows: ".top-rated-nav",
		rows: 3,
		prevArrow: '<button class="slick-prev slick-btn"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next slick-btn"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a(".list-product-slider-four").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendArrows: ".top-rated-nav-two",
		rows: 3,
		prevArrow: '<button class="slick-prev slick-btn"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next slick-btn"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
 
	a(".product-slider-three").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a(".countdown-product-slider").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1501,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a(".blog-gallery-slider").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 767,
			settings: {
				arrows: false,
				dots: false,
			}
		}, ]
	});
	a(".product-details-images").each(function() {
		var i = a(this);
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
	a(".product-details-thumbs").each(function() {
		var j = a(this);
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
	a(".product-details-images-2").each(function() {
		var i = a(this);
		var j = i.siblings(".product-details-thumbs-2");
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
	a(".product-details-thumbs-2").each(function() {
		var j = a(this);
		var i = j.siblings(".product-details-images-2");
		j.slick({
			arrows: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			vertical: true,
			verticalSwiping: true,
			dots: false,
			infinite: true,
			focusOnSelect: true,
			centerMode: false,
			centerPadding: 0,
			prevArrow: '<span class="slick-prev"><i class="fa fa-angle-up"></i></span>',
			nextArrow: '<span class="slick-next"><i class="fa fa-angle-down"></i></span>',
			asNavFor: i,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				}
			}, {
				breakpoint: 991,
				settings: {
					slidesToShow: 4,
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 4,
				}
			}, {
				breakpoint: 479,
				settings: {
					slidesToShow: 2,
				}
			}]
		})
	});
	a(".slider-lg-image-box").slick({
		infinite: true,
		arrows: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			}
		}, ]
	});
	a("#price-range").slider({
		range: true,
		min: 0,
		max: 1000,
		values: [0, 900],
		slide: function(i, j) {
			a("#price-amount").val("$" + j.values[0] + " - $" + j.values[1])
		}
	});
	a("#price-amount").val("$" + a("#price-range").slider("values", 0) + " - $" + a("#price-range").slider("values",
		1));
	a("[data-countdown]:not(.pro-countdown-1)").each(function() {
		var i = a(this),
			j = a(this).data("countdown");
		i.countdown(j, function(k) {
			i.html(k.strftime(
				'<div class="single-countdown-box"><span>%D</span>Day</div><div class="single-countdown-box"><span>%H</span>Hours</div><div class="single-countdown-box"><span>%M</span>Mins</div><div class="single-countdown-box"><span>%S</span>Secs</div>'
				))
		})
	});
	a("[data-countdown].pro-countdown-1").each(function() {
		var i = a(this),
			j = a(this).data("countdown");
		i.countdown(j, function(k) {
			i.html(k.strftime(
				'<div class="single-countdown-box-1"><span>%D</span>Day</div><div class="single-countdown-box-1"><span>%H</span>Hours</div><div class="single-countdown-box-1"><span>%M</span>Mins</div><div class="single-countdown-box-1"><span>%S</span>Secs</div>'
				))
		})
	});
	a("#sticky-sidebar").theiaStickySidebar({
		additionalMarginTop: 120
	});
	// a(".pro-qty").prepend('<button class="dec qtybtn">-</button>');
	// a(".pro-qty").append('<button class="inc qtybtn">+</button>');
	// a(".qtybtn").on("click", function() {
	// 	var i = a(this);
	// 	var k = i.parent().find("input").val();
	// 	if (i.hasClass("inc")) {
	// 		var j = parseFloat(k) + 1
	// 	} else {
	// 		if (k > 0) {
	// 			var j = parseFloat(k) - 1
	// 		} else {
	// 			j = 0
	// 		}
	// 	}
	// 	i.parent().find("input").val(j)
	// });
	// a(".venobox").venobox({
	// 	border: "10px",
	// 	titleattr: "data-title",
	// 	numeratio: true,
	// 	infinigall: true
	// });
	a(".card-header a").on("click", function() {
		a(".card").removeClass("actives");
		a(this).parents(".card").addClass("actives")
	});
	a("[data-acount]").on("click", function() {
		if (a("[data-acount]:checked").length > 0) {
			a("#acount-form").slideDown()
		} else {
			a("#acount-form").slideUp()
		}
	});
	a("[data-shipping]").on("click", function() {
		if (a("[data-shipping]:checked").length > 0) {
			a("#shipping-form").slideDown()
		} else {
			a("#shipping-form").slideUp()
		}
	});
	a('[name="payment-method"]').on("click", function() {
		var i = a(this).attr("value");
		a(".single-method p").slideUp();
		a('[data-method="' + i + '"]').slideDown()
	});
	// a("select").niceSelect();
	a.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: "linear",
		scrollSpeed: 900,
		animation: "fade"
	});
	a("#mc-form").ajaxChimp({
		language: "en",
		callback: f,
		url: "http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
	});

	function f(i) {
		if (i.result === "success") {
			a(".mailchimp-success").html("" + i.msg).fadeIn(900);
			a(".mailchimp-error").fadeOut(400)
		} else {
			if (i.result === "error") {
				a(".mailchimp-error").html("" + i.msg).fadeIn(900)
			}
		}
	}
	if (a(".contact-map").length) {
		function e() {
			var j = {
				zoom: 14,
				scrollwheel: false,
				center: new google.maps.LatLng(40.73061, -73.935242)
			};
			var i = new google.maps.Map(document.getElementById("contact-map"), j);
			var k = new google.maps.Marker({
				position: i.getCenter(),
				map: i,
				animation: google.maps.Animation.BOUNCE
			})
		}
		google.maps.event.addDomListener(window, "load", e)
	}
})(jQuery);