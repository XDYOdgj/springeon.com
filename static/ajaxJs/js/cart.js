import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import calculation from '../common/calculation.js';
import common from '../common/index.js';


/**
 * @Description:购物车
 * @author:Howe
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */

var userInfo = storage.getStorageData("userInfo")

if (userInfo) {
	$(".userName").text(userInfo.nickname)
}
$(document).ready(function() {
	init();
});

const init = () => {
	setTimeout(() => {
		// 购物车数量
		let num = storage.getStorageData("cart") && storage.getStorageData("cart").length;
		$(".cart-num").html(num);
	}, 100)

	htmlCartList()
	htmlCartRightSide()
	listenersCartNum()
	listenersCartEdit()
	listenersCartDel()
	if ($('title').text() == "Cart") {
		listenersInputEvent()
	}
	$("#cart-view").click(async function() {
		if (storage.getStorageData("cart").length) {
			if (common.isSingleProduct()) {
				window.location.href = "../cart"
			} else {
				window.location.href = "./cart"
			}
		} else {
			$.toast({
				text: 'The shopping cart is empty',
				icon: 'error',
			})
		}
	})


	$("#checkout-view, #checkout-view-list").click(async function() {
		if (storage.getStorageData("cart").length) {
			if (common.isSingleProduct()) {
				window.location.href = "../checkout"
			} else {
				window.location.href = "./checkout"
			}
		} else {
			$.toast({
				text: 'The shopping cart is empty',
				icon: 'error',
			})
		}
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
	$('.integerInput').on('keydown', function(e) {
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
	$('.integerInput').on('input', function() {
		var inputVal = $(this).val();
		var integerRegex = /^\d*$/; // 正整数正则表达式
		if (!integerRegex.test(inputVal)) {
			$(this).val(1); // 输入非法，将值设为空字符串
		}
	});

	// 失去焦点
	let childInput = document.querySelectorAll('.integerInput')
	$(childInput).blur(function() {
		var inputVal = $(this).val();
		if (!inputVal) {
			$(this).val(1); // 不输入默认1
		}
		let idx = $(childInput).index(this);

		let cartList = storage.getStorageData("cart");
		cartList[idx].num = $(this).val();
		storage.setStorageData("cart", cartList)
		if (storage.getStorageData("token") && cartList[idx].id) {
			updateShoppingCart([cartList[idx]])
		}
		init();
	})
}

/**
 * @Description: 购物车加减数量
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 15:44:35
 * @Copyright by 红逸
 */

const listenersCartNum = () => {
	$(document).ready(function() {
		//加
		let childPlus = document.querySelectorAll('.quantity-plus-cart')
		$(childPlus).click(function() {
			let index = $(childPlus).index(this);
			let num = Number($('.integerInput').eq(index).val()) + 1;
			$('.integerInput').eq(index).val(num);

			let cartList = storage.getStorageData("cart");
			cartList[index].num = num;
			storage.setStorageData("cart", cartList)
			if (storage.getStorageData("token") && cartList[index].id) {
				updateShoppingCart([cartList[index]])
			}
			init();
		})
		//减
		let childMinus = document.querySelectorAll(".quantity-minus-cart")
		$(childMinus).click(function() {
			let index = $(childMinus).index(this);
			let num = Number($('.integerInput').eq(index).val()) - 1;
			if (num <= 0) num = 1;
			$('.integerInput').eq(index).val(num);

			let cartList = storage.getStorageData("cart");
			cartList[index].num = num;
			storage.setStorageData("cart", cartList)
			if (storage.getStorageData("token") && cartList[index].id) {
				updateShoppingCart([cartList[index]])
			}
			init();
		})
	});
}


/**
 * @Description: 编辑购物车
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 15:44:35
 * @Copyright by 红逸
 */

const listenersCartEdit = () => {
	// let childCart = document.querySelectorAll('.cart-edit')
	// $(childCart).click(function () {
	// 	let idx = $(childCart).index(this);
	// 	window.location.href = "./single-product.html?index=" + idx
	// })
}

/**
 * @Description: 购物车点击删除按钮
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 15:44:35
 * @Copyright by 红逸
 */
const listenersCartDel = () => {
	//购物车列表
	let chilListDel = document.querySelectorAll(".cart-remove-list")
	$(chilListDel).click(async function() {
		let idx = $(chilListDel).index(this);
		fnDelCart(idx)
	})
	//右侧购物车弹框-pc
	let childDel = document.querySelectorAll(".cart-remove")
	$(childDel).click(async function() {
		let idx = $(childDel).index(this);
		fnDelCart(idx)
	})
	//右侧购物车弹框-移动端
	let childMiniDel = document.querySelectorAll(".cart-remove_mini")
	$(childMiniDel).click(async function() {
		let idx = $(childMiniDel).index(this);
		fnDelCart(idx)
	})
}

const fnDelCart = async (idx) => {
	let cart = storage.getStorageData("cart");
	if (storage.getStorageData("token") && cart[idx]) {
		if (cart[idx].id) {
			await delShoppingCart(cart[idx].id)
		}
	}
	cart = cart.filter((_, index) => index !== idx);
	storage.setStorageData("cart", cart);
	let num = storage.getStorageData("cart") && storage.getStorageData("cart").length;
	$(".cart-num").html(num);

	await init()
}

/**
 * @Description:购物车列表
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 17:29:20
 * @Copyright by 红逸
 */
const htmlCartList = () => {
	let html = "";
	let totalAmount = 0;
	storage.getStorageData("cart").forEach(item => {
		let specificationsHtml = ""
		Object.entries(item.specification).forEach(item => {
			specificationsHtml = specificationsHtml +
				`<div  style="line-height:1"><span style="font-size:12px;color:#999;">${item[0]} : ${item[1]}</span></div>`
		})
		html = html + `<tr>
											<td class="pro-thumbnail"><a href="details/${item.goods.linkTitle}" ><img src="${item.goods.cover}" alt="${item.goods.name}"   style="object-fit:contain;width:80px;height:80px" ></a></td>
											<td class="pro-title"><a href="details/${item.goods.linkTitle}">${item.goods.name}</a>
											${specificationsHtml}
											</td>
											<td class="pro-price"><span>$${item.price}</span></td>
										 
											 <td class="pro-quantity">
											 	<div class="pro-qty">
												<button class="dec qtybtn  quantity-minus-cart">-</button> 
												<input   value="${ item.num}" class="integerInput"> 
												<button class="inc qtybtn  quantity-plus-cart">+</button>
												</div> 
											</td>
											<td class="pro-subtotal"><span>$${calculation.preciseMultiply(Number(item.price), item.num)}</span></td>
											<td class="pro-remove"><a href="javascript:void(0)" ><i class="fa fa-trash-o  cart-remove-list"></i></a></td>
										</tr> `
		let goodsAmount = calculation.preciseMultiply(Number(item.price), item.num);
		totalAmount = calculation.preciseAdd(totalAmount, goodsAmount);
	})
	$(".cart-tbody").html(html)
	$(".total-amount-goods").html(totalAmount)
}
/**
 * @Description:右侧购物车列表
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 17:29:20
 * @Copyright by 红逸
 */
const htmlCartRightSide = () => {
	let html = "";
	let totalAmount = 0;
	storage.getStorageData("cart").forEach(item => {
		let specificationsHtml = ""
		Object.entries(item.specification).forEach(item => {
			specificationsHtml = specificationsHtml +
				`<div><span style="font-size:12px;color:#999">${item[0]} : ${item[1]}</span></div>`
		})

		html = html + `<li class="single-cart-item">
												<div class="cart-img"><a href="${common.isSingleProduct()?'../cart':'cart'}"><img   style="object-fit:contain;width:50px;height:50px" src="${item.goods.cover}" alt="${item.goods.name}"></a></div>
												<div class="cart-content">
													<h5 class="product-name"><a  class="ellipsis-multiline2" href="${common.isSingleProduct()?(item.goods.linkTitle+''):('details/'+ item.goods.linkTitle+'')}">${item.goods.name}</a></h5><span class="product-quantity">${item.num}  ×</span><span
														class="product-price">£${item.price}</span>
												</div>
												<div class="cart-item-remove"><a title="Remove"><i
															class="fa fa-trash  cart-remove"></i></a></div>
						</li> `
		let goodsAmount = calculation.preciseMultiply(Number(item.price), item.num);
		totalAmount = calculation.preciseAdd(totalAmount, goodsAmount);
	})


	$("#right_product_list").html(html)
	// html = html.replaceAll("cart-remove", "cart-remove_mini");
	// $("#right_product_list_mini").html(html)
	$(".total-amount-goods").html(totalAmount)
}

/**
 * @Description:购物车删除接口
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 14:15:35
 * @Copyright by 红逸
 */
const delShoppingCart = async (id) => {
	await httpRequest("/shopping_cart/deleteShoppingCart", "GET", {
		id
	}).then(res => {


	}).catch().finally()
}

/**
 * @Description:添加购物车接口
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 14:15:35
 * @Copyright by 红逸
 */
const addShoppingCart = async (item) => {
	await httpRequest("/shopping_cart/addShoppingCart", "POST", item).then(res => {

	}).catch().finally()
}

/**
 * @Description:更新购物车接口
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 14:15:35
 * @Copyright by 红逸
 */
const updateShoppingCart = async (arr) => {

	await httpRequest("/shopping_cart/updateShoppingCart", "POST", {
		param: arr
	}).then(res => {


	}).catch().finally()
}

/**
 * @Description:获取购物车列表接口
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 13:54:29
 * @Copyright by 红逸
 */
const getCarUpdateStorage = async () => {
	await httpRequest("/shopping_cart/shoppingCartList", "GET").then(res => {
		storage.setStorageData("cart", res.data);
	}).catch().finally()
}


/**
 * @Description:缓存里面新数据添加到数据库
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 13:54:29
 * @Copyright by 红逸
 */
const storageUpdateCar = async () => {
	let cartList = storage.getStorageData("cart");
	for (const item of cartList) {
		if (!item.id) {
			await addShoppingCart(item)
		}
	}
}

export default {
	getCarUpdateStorage,
	storageUpdateCar,
	init
}
