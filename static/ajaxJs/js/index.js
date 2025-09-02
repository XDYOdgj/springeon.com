import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import fit from '../common/fit.js';

/**
 * @Description:首页
 * @author:Howe
 * @param 商品列表
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */


$(document).ready(function() {
	httpRequest("/goods/recommendList", "GET", {
		limit: 12,
		type: 3
	}).then(res => {
		let html = "";
		res.data.forEach(item => {
			html = html + `	<div class="col-lg-12"> 
							<div class="single-grid-product mb-40">
								<div class="product-image"> 
								<a  href="details/${item.linkTitle}" ><img
										class=" product-img1 img-fluid"  style="object-fit:contain;background-color:#fff;" src="${item.image}" alt="${item.name}" >
										</a> 
								</div>
								<div class="product-content">
									<h3 class="title"><a class="ellipsis-omit"  href="details/${item.linkTitle}" >${item.name}</a></h3>
									<div class="product-category-rating">
										<p class="product-price"><span class="discounted-price">$${item.selling_price}</span></p>
										<span
											class="rating"> 
															<span class="${item.score>=1?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=2?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=3?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=4?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=5?'fa fa-star active':'lnr lnr-star'}"></span>
											</span>
									</div>
								</div>
							</div>
						</div> `
		})

		$(`.product-slider-two`).html(html);
		setTimeout(() => {
			fit.adaptImgHeight(".product-img1", 1);
		}, 100)

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
	}).catch().finally()


	category()
});


/**
 * @Description:商品类型
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-27 16:33:44
 * @Copyright by 红逸
 */
const getRecommendList = (type, id) => {
	httpRequest("/goods/recommendList", "GET", {
		limit: 8,
		type: type,
		// categoryId: id
	}).then(res => {
		let html = "";
		res.data.forEach(item => {
			html = html + `<div class="col-lg-12">
											<div class="single-grid-product mb-40">
												<div class="product-image">
													<div class="product-label"> </div><a  href="details/${item.linkTitle}"> 
															<img  class=" product-img1 img-fluid"  style="object-fit:contain;background-color:#fff;" src="${item.image}" alt="${item.name}" >
															</a>
												</div>
												<div class="product-content">
													<h3 class="title"><a  href="details/${item.linkTitle}"
															class="ellipsis-omit">${item.name}</a></h3>
													<div class="product-category-rating">
														<p class="product-price"><span
																class="discounted-price">$${item.selling_price}</span></p><span
															class="rating"> 
															<span class="${item.score>=1?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=2?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=3?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=4?'fa fa-star active':'lnr lnr-star'}"></span>
															<span class="${item.score>=5?'fa fa-star active':'lnr lnr-star'}"></span>
													</div>
												</div>
											</div> 
										</div>`
		})


		$(`#response-product_${type}`).html(html);
		setTimeout(() => {
			$(".product-slider").slick({
				infinite: true,
				arrows: true,
				dots: false,
				slidesToShow: 4,
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
		}, 50)
		window.adaptImgHeight()
	}).catch().finally()
}


// 商品分类 随机取
const category = async () => {
	var category_list = storage.getStorageData("category_list");

	if (!category_list.length) {
		await httpRequest("/goods_category/list", "GET").then(res => {
			category_list = res.data;
			storage.setStorageData("category_list", category_list);
		}).catch().finally()
	}
	var categorys = [];
	var categorys5 = [];
	category_list.forEach(item => {
		if (item.children && item.children.length) {
			item.children.forEach(listitem => {
				categorys.push(listitem)
				categorys5.push(listitem)
			})
		}
	});


	// 随机取categorys中的3个
	let randomCategorys = [];
	for (let i = 0; i < 3; i++) {
		let index = Math.floor(Math.random() * categorys.length);
		randomCategorys.push(categorys[index]);
		categorys.splice(index, 1);
	}

	let randomCategorys5 = [];
	for (let i = 0; i < 5; i++) {
		let index = Math.floor(Math.random() * categorys5.length);
		randomCategorys5.push(categorys5[index]);
		categorys5.splice(index, 1);
	}


	getRecommendList(2, randomCategorys[0].id)
	getRecommendList(4, randomCategorys[0].id)
	getRecommendList(6, randomCategorys[0].id)

	randomCategorys.forEach((item, index) => {
		let name = item.name.replace(/ /g, "_");
		let html =
			`<a class="ht-btn white-btn" href="shop-list?id=${item.id}&title=`+name+`">${item.name}</a>`
		$(`#random_classify_${index+1}`).append(html)
	})

	randomCategorys5.forEach((item, index) => {
		let name = item.name.replace(/ /g, "_");
		let html =
			`<a href="shop-list?id=${item.id}&title=`+name+`">${item.name}</a>`
		$(`.random_categories_${index+1}`).append(html)
	})

}

window.adaptImgHeight = () => {
	setTimeout(() => {
		fit.adaptImgHeight(".product-img1", 1);
	}, 100)
}
