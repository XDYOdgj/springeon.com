import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import fit from '../common/fit.js';
import common from '../common/index.js';
import cart from './cart.js';

let updateIndex = -1; //修改下标
let goods_id = 0; //商品id
let allSpecName = [];
let specName = []; //页面渲染的规格名  size 大小 color 颜色 model 型号 style 风格
let selSpec = {}; //已选规格值  按照选择顺序排
let selSpecItem = {}; //已选规格item
let specSelect = { //规格下拉值框数据
	size: [],
	color: [],
	model: [],
	style: []
};

$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
	let paramsIndex = urlParams.get('index');
	updateIndex = paramsIndex >= 0 && paramsIndex != null ? urlParams.get('index') : -1;

	goods_id = $('#goods_id').val();
	//获取商品有哪些规格
	specName = [];
	$('.label label').each(function() {
		specName.push($(this).text())
		allSpecName.push($(this).text())
	});
	//购物数量  加
	let childPlus = document.querySelectorAll('.quantity-plus-single')
	$(childPlus).click(function() {
		let index = $(childPlus).index(this);
		let num = Number($('#quantity').eq(index).val()) + 1;
		$('#quantity').eq(index).val(num);
	})
	//购物数量  减
	let childMinus = document.querySelectorAll(".quantity-minus-single")
	$(childMinus).click(function() {
		let index = $(childMinus).index(this);
		let num = Number($('#quantity').eq(index).val()) - 1;
		if (num <= 0) num = 1;
		$('#quantity').eq(index).val(num);
	})
	listenersInputEvent()
	getRecommendList(3)
	//getRecommendList(5)
	// 监听选择规格  size 大小 color 颜色 model 型号 style 风格
	$('#size').change(function() {
		//规格选择的顺序
		specSelOrder({
			'size': $(this).val()
		})
	});
	$('#color').change(function() {
		//规格选择的顺序
		specSelOrder({
			'color': $(this).val()
		})
	});
	$('#model').change(function() {
		//规格选择的顺序
		specSelOrder({
			'model': $(this).val()
		})
	});
	$('#style').change(function() {
		//规格选择的顺序
		specSelOrder({
			'style': $(this).val()
		})
	});
	initdefault()
	//评论的评分
	let childscore = document.querySelectorAll(".fa-star-state")
	$(childscore).click(function() {
		let index = $(childscore).index(this);

		$('.fa-star-state').each(function(i, item) {
			if (i <= index) {
				$(this).addClass("score-active");
			} else {
				$(this).removeClass("score-active")
			}
		});

	})

	setCommentInfo()
});

const initdefault = () => {
	if (specsArr && specsArr.length) {
		allSpecName.forEach(name => {
			let obj = {};
			obj[name] = specsArr[0][name]
			specSelOrder(obj)
			$('#' + name).val(specsArr[0][name]); // 设置默认值
		})
	}
}

/**
 * @Description:加入购物车  或 修改购物车数据
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-09 14:52:47
 * @Copyright by 红逸
 */

window.submitCart = async () => {
	if (specName.length != Object.keys(selSpec).length) {
		$.toast({
			text: 'Please select product specifications',
			icon: 'error',
		})
		return;
	}

	//缓存添加和修改
	if (updateIndex >= 0) { //修改




	} else { //添加

		let cover =  Object.keys(selSpecItem).length? selSpecItem.images[0] : $('.product-img').first().attr('src');
		let cartList = storage.getStorageData("cart");
		cartList.unshift({
			goods: {
				cover: cover,
				id: goods_id,
				name: $("#goods_title").val(),
				linkTitle: $("#goods_handleTitle").val(),
			},
			goods_id: goods_id,
			price: $("#price").html(),
			specification: selSpec,
			num: $('#quantity').val()
		})
		storage.setStorageData("cart", cartList)
		//加入购物车  计数
		httpRequest("/statistics/visit", "GET", {
			type: 3
		}).then(res => {

		}).catch().finally()

		if (!storage.getStorageData("token")) {
			$.toast("Add shopping cart successfully")

			await cart.init();
			return;
		}
	}

	await httpRequest("/shopping_cart/addShoppingCart", "POST", {
		goods_id: goods_id,
		num: $('#quantity').val(),
		specification: selSpec
	}).then(async (res) => {
		$.toast("Add shopping cart successfully")
		await cart.getCarUpdateStorage()
		await cart.init();
	}).catch().finally()

}

//提交评论
window.submitComment = () => {
	let formData = {
		type: 1,
		goods_id: goods_id
	};
	let isempty = false;
	$($("#commentform").serializeArray()).each(function() {
		formData[this.name] = this.value;
		if (!this.value) {
			isempty = true;
		}
	});

	if (isempty) {
		$.toast({
			text: 'Please provide complete information',
			icon: 'error',
		})
		return
	}
	formData.score = $(".fa-star-state.score-active").length;
	httpRequest("/consult/add", "POST", formData).then(res => {
		$.toast("Added successfully")
		setTimeout(() => {
			history.go(0);
		}, 1000)
	}).catch().finally()

}




/**
 * @Description:规格选顺序
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-08 17:54:58
 * @Copyright by 红逸
 */
const specSelOrder = (selOrder) => {
	let keys = Object.keys(selSpec); // 获取所有属性的键的数组
	let keyIndex = keys.indexOf(Object.keys(selOrder)[0]); //获取当前选的规格名在规格顺序排列中的下标
	if (keyIndex !== -1) { //如果selSpec里面存在  将它和后面的全部删掉
		selSpec = common.deletePropertiesByIndex(selSpec, keyIndex, Object.keys(selSpec).length)
	}
	//非空才添加
	if (selOrder[Object.keys(selOrder)[0]]) {
		selSpec = {
			...selSpec,
			...selOrder
		}
	}
	findSpecSelect();
}





/**
 * @Description:  更新下拉框的数据
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-08 18:17:00
 * @Copyright by 红逸
0*/
const findSpecSelect = () => {
	//遍历规格    根据已选数据   查找每个下拉框的选择值
	specSelect = {
		size: [],
		color: [],
		model: [],
		style: []
	};
	specsArr.forEach(spec => {
		let count = 0;
		Object.keys(selSpec).forEach(keyname => {
			if (selSpec[keyname] == spec[keyname]) {
				count++;
			}
		})
		if (count === Object.keys(selSpec).length) {

			allSpecName.forEach(name => {
				(!specSelect[name].includes(spec[name])) && spec[name] ? specSelect[name].push(spec[
					name]) : ''
			})
			//判断是否规格全部都选了
			if (specName.length == Object.keys(selSpec).length) {
				selSpecItem = spec;
				updateSpecImages(spec)
			}
		}
	})
	updateSpecSelect();
}

/**
 * @Description:只更新未选择的下拉框的数据
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-09 11:01:08
 * @Copyright by 红逸
 */
const updateSpecSelect = () => {
	allSpecName.forEach(item => {
		if (!Object.keys(selSpec).includes(item)) {
			let html = "<option data-type='' data-pa_size='' value=''>Choose an option</option>"
			specSelect[item].forEach(option => {
				html = html +
					`<option data-width="30" data-height="40" data-pa_size="1" value="${option}">${option}</option>`
			})
			$(`#${item}`).html(html);
		}
	})
	allSpecName.forEach(item => {
		//将空数据隐藏
		if (!specSelect[item].length) {
			$('#' + item).closest('tr').hide();
			//显示非空数据
		} else {
			$('#' + item).closest('tr').show();
		}
	})


	//获取商品显示有哪些规格
	specName = [];
	$('.label label').each(function() {
		if ($(this).is(":visible")) { //没有隐藏的
			specName.push($(this).text())
		}
	});
}

/**
 * @Description:更新图片组
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-09 11:01:08
 * @Copyright by 红逸
 */
const updateSpecImages = (specItem) => {
	//价格
	$("#price").html(specItem.selling_price);
	let title = $("#title").html();

	//轮缩略图
	let html = "";
	specItem.thumbnail_image.forEach(item => {
		html = html + `<div class="sm-image"><img  style="object-fit:contain;background-color:#fff;"  src="${item}"  class="product-img"
		alt="${title}"></div>`
	})
	let html2 = ``
	//轮播
	specItem.images.forEach(item => {
		html2 = html2 + `<div class="lg-image"><img src="${item}"   class="product-img"  style="object-fit:contain;background-color:#fff;" 
														alt=""><a href="${item}"
														class="popup-img venobox" data-gall="myGallery"><i
															class="fa fa-expand"></i></a></div> `
	})
	$(`.product-details-left`).html(`<div class="product-details-images slider-lg-image-1"> 
	  ${html2}	 
											</div>
											<div class="product-details-thumbs slider-thumbs-1"> 
											${html}	
											</div>`);
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
	}, 50)

	//图片大小根据屏幕大小自适应
	setTimeout(() => {
		$(".venobox").venobox({
			border: "10px",
			titleattr: "data-title",
			numeratio: true,
			infinigall: true
		});
		fit.adaptImgHeight(".product-img", 1);
	}, 100)



	// //价格
	// $("#price").html(specItem.selling_price);
	// let title = $("#title").html();

	// //轮缩略图
	// let html = "";
	// specItem.thumbnail_image.forEach(item => {
	// 	html = html + `	<div class="swiper-slide"><img class="imgSN"  alt="${title}"
	// 					src="${item}"></div>`
	// })
	// $(`.mySwiper`).html(`<div class="swiper-wrapper  thumbnail_image">${html} </div>`);

	// html = `<img style="display: none;" class="emoji" alt="🔍" src="/static/picture/1f50d.svg">`
	// //轮播
	// specItem.images.forEach(item => {
	// 	html = html + `<div class="swiper-slide  lynessa-product-gallery__image">
	// 					<img class="imgHD  "
	// 					alt="${title}"
	// 					src="${item}">
	// 					</div>`
	// })
	// $(`.mySwiper2`).html(
	// 	`<div class="swiper-wrapper  swiper-wrapper  lynessa-product-gallery lynessa-product-gallery--with-images lynessa-product-gallery--columns-4 images">${html}</div>
	// 	<div class="swiper-button-next"></div>
	// 	<div class="swiper-button-prev"></div>
	// 	`
	// );

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

	// if (!common.isMobile()) {
	// 	jQuery(function(productImageEnlarged) {
	// 		productImageEnlarged(".lynessa-product-gallery .lynessa-product-gallery__image").zoom()
	// 	})
	// } else {
	// 	var targetOffset = $('#product-27').offset().top;
	// 	$('html, body').animate({
	// 		scrollTop: targetOffset
	// 	}, 10); // 动画持续时间为10毫秒
	// }

}

/**
 * @Description:商品图放大
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-18 18:15:37
 * @Copyright by 红逸
 */
function productImageEnlarged() {
	var a = parseInt(d(".container").innerWidth()) - 30;
	d(".lynessa-menu-wapper.vertical.support-mega-menu").each(function() {
		var n = parseInt(d(this).actual("width")),
			e = a - n;
		0 < e && d(this).find(".megamenu").each(function() {
			var n = d(this).attr("style");
			n = (n = null == n ? "" : n) + " max-width:" + e + "px;", d(this).attr("style", n)
		})
	})
}


/**
 * @Description: 监听购物输入框  只允许输入正整数
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 15:44:16
 * @Copyright by 红逸
 */
const listenersInputEvent = () => {
	// 绑定键盘按键事件到input元素
	$('#quantity').on('keydown', function(e) {
		// 允许的按键：[0-9]、Backspace、Delete、左右箭头键、Home、End
		if (
			!((e.which >= 48 && e.which <= 57) || // 0-9键
				e.which === 8 || // Backspace
				e.which === 46 || // Delete
				(e.which >= 37 && e.which <= 40) || // 左右箭头键
				e.which === 36 || e.which === 35)) // Home键、End键
		{
			e.preventDefault(); // 阻止事件默认行为
		}
	});
	// 绑定input事件，确保输入的是正整数
	$('#quantity').on('input', function() {
		var inputVal = $(this).val();
		var integerRegex = /^\d*$/; // 正整数正则表达式
		if (!integerRegex.test(inputVal)) {
			$(this).val(1); // 输入非法，将值设为空字符串
		}
	});

	// 失去焦点
	let childInput = document.querySelectorAll('#quantity')
	$(childInput).blur(function() {
		var inputVal = $(this).val();
		if (!inputVal) {
			$(this).val(1); // 不输入默认1
		}

	})
}


//下面的两组商品轮播
const getRecommendList = (type) => {
	httpRequest("/goods/recommendList", "GET", {
		limit: 12,
		type: type,
		categoryId: $("#goods_classify").val()
	}).then(res => {
		let html = "";
		res.data.forEach(item => {
			html = html + ` 
								<div class="col-lg-12"><!--  Single Grid product Start -->
									<div class="single-grid-product mb-40">
										<div class="product-image">
											<div class="product-label"> </div><a  href="${item.linkTitle}" ><img
												  class="img-fluid product-img"  style="object-fit:contain;background-color:#fff;" src="${item.image}" alt="${item.name}"  > </a> 
										</div>
										<div class="product-content">
											<h3 class="title ellipsis-multiline2"><a  href="${item.linkTitle}">${item.name}</a></h3>
											<div class="product-category-rating">
												<p class="product-price"><span class="discounted-price">$${item.selling_price}</span></p><span
													class="rating">
													<span class="${item.score>=1?'fa fa-star active':'lnr lnr-star'}"></span>
													<span class="${item.score>=2?'fa fa-star active':'lnr lnr-star'}"></span>
										            <span class="${item.score>=3?'fa fa-star active':'lnr lnr-star'}"></span>
													 <span class="${item.score>=4?'fa fa-star active':'lnr lnr-star'}"></span>
													 <span class="${item.score>=5?'fa fa-star active':'lnr lnr-star'}"></span> 
											</div>
										</div>
									</div><!--  Single Grid product End -->
								</div>
								`
		})

		if (!res.data.length) {
			html = `<div style="text-align: center;font-size:20px"> 暂无商品</div>`
		}
		$(`#products-list`).html(html);
		//图片请求回来后渲染轮播
		setTimeout(() => {
			$(".product-slider-two").slick({
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
		}, 50)
		//图片大小根据屏幕大小自适应
		setTimeout(() => {
			fit.adaptImgHeight(".product-img", 1);
		}, 150)
	}).catch().finally()
}



const setCommentInfo = () => {
	let html =""
	commentsList.forEach((item, i) => {
		console.log(item)
		html = html + `<div class="single-review">
												<div class="space-between">
													<div class="name">${item.user}</div>
													<div class="specifications">
Purchased：${item.purchase_model}
													</div>
												</div>
												<div class="comment">
												 ${item.content}
												</div>
												<div class="space-between  rating-info-data">
													<div class="score">
													<div class="product-category-rating"> 
																<span class="${item.score>=1?'fa fa-star active':'lnr lnr-star'}"></span>
																 <span class="${item.score>=2?'fa fa-star active':'lnr lnr-star'}"></span>
																 <span class="${item.score>=3?'fa fa-star active':'lnr lnr-star'}"></span>
																<span class="${item.score>=4?'fa fa-star active':'lnr lnr-star'}"></span>
																<span class="${item.score>=5?'fa fa-star active':'lnr lnr-star'}"></span>	
													</div>
													</div>
													<div class="date">${item.date}</div>
												</div>
											</div>`
	})

	if (!commentsList.length) {
		html = `<div style="text-align: center;"> Purchased</div>`
	}

	$(`.comments-data`).html(html);
}
