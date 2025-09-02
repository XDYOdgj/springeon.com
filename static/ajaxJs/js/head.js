import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import calculation from '../common/calculation.js';
import appConfig from '../config/appConfig.js';
import common from '../common/index.js';

$(document).ready(function() {

	if (common.isSingleProduct()) {
		$('#foot').load('../static/html/foot.html  #footer-single-product', function() {
			getInit();
			$('.clickAccountBut').click(function() {
				if (storage.getStorageData("token")) {
					window.location.href = "../edit-account"
				} else {
					window.location.href = "../login"
				}
			});
		});
	} else {
		$('#foot').load('./static/html/foot.html #footer-html', function() {
			getInit();
			$('.clickAccountBut').click(function() {
				console.log("clickAccountBut")
				if (storage.getStorageData("token")) {
					window.location.href = "./edit-account"
				} else {
					window.location.href = "./login"
				}
			});
		});
	}

	if (storage.getStorageData("token")) {
		$(".angle-shape-pages").show();
		$(".AccountEditAccount").show();
		$(".AccountLogin").hide();
		$(".AccountLogOut").show();
	} else {
		$(".angle-shape-pages").hide();
		$(".AccountEditAccount").hide();
		$(".AccountLogin").show();
		$(".AccountLogOut").hide();
	}
	//监听输入框搜索回车搜索
	$('#livesearch1').keypress(function(event) {
		if (event.which === 13) { // 检查按键是否是回车键
			window.fnSearch(1)
		}
	});
	$('#livesearch2').keypress(function(event) {
		if (event.which === 13) { // 检查按键是否是回车键
			window.fnSearch(2)
		}
	});
});


/**
 * @Description:头部搜索
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */

window.fnSearch = (type) => {
	if (common.isSingleProduct()) {
		window.location.href = `../shop-list?search=${$('#livesearch' + type).val()}`
	} else {
		window.location.href = `./shop-list?search=${$('#livesearch' + type).val()}`
	}

}

/**
 * @Description:退出登录
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */
window.fnLogout = () => {
	if (confirm("Are you sure you want to log out ?")) { //if语句内部判断确认框
		storage.setStorageData("token", "");
		if (common.isSingleProduct()) {
			window.location.href = "../login"
		} else {
			window.location.href = "./login"
		}
	} else {}
}



//站点底部信息
const getInit = async () => {
	let siteUpdateDate = storage.getStorageData("siteUpdateDate");
	const currentDate = common.getCurrentDate();
	const siteConfig = storage.getStorageData("siteConfig");

	//加载头部分类
	var category_list = storage.getStorageData("category_list");

	if (!category_list.length || (currentDate != siteUpdateDate)) {
		await httpRequest("/goods_category/list", "GET").then(res => {
			category_list = res.data;
			storage.setStorageData("category_list", category_list);
		}).catch().finally()
	}

	setGoodsCategoryList(category_list);

	if (siteConfig && (currentDate === siteUpdateDate)) {
		$(".foot-la-phone").html(siteConfig.phone)
		$(".foot-la-email").html(siteConfig.mail)
		$(".foot-la-map").html(siteConfig.site)
		$("meta[itemprop='name']").attr("content", siteConfig.name || ' ');
		$(".copyright").html(siteConfig.bottonIinformation)
		return;
	};

	await httpRequest("/statistics/visit", "GET").then(res => {}).catch().finally()

	await httpRequest("/config", "GET", {
		type: ['phone', 'mail', 'site', 'bottonIinformation']
	}).then(res => {
		$(".foot-la-phone").html(res.data.phone)
		$(".foot-la-email").html(res.data.mail)
		$(".foot-la-map").html(res.data.site)
		$("meta[itemprop='name']").attr("content", res.data.name || ' ');
		$(".copyright").html(res.data.bottonIinformation)
		storage.setStorageData("siteConfig", res.data)
	}).catch().finally()

	storage.setStorageData("siteUpdateDate", currentDate);
}

//请求导航栏数据(分类)
const setGoodsCategoryList = async (category_list) => {
	let html = ""
	let mobileHtml = ""
	category_list.forEach(item => {

		let name = '';
		//pc
		let itemhtml = "";
		if (item.children && item.children.length) {
			item.children.forEach(listitem => {
				name = listitem.name.replace(/ /g, "_");
				itemhtml = itemhtml +
					`<li><a   href="${common.isSingleProduct() ?'../shop-list':'shop-list'}?id=${listitem.id}&title=`+name+`" >${listitem.name}</a></li>`
			})
		}
		name = item.name.replace(/ /g, "_");
		html = html + `<li>
		<a   class="menu-title"   href="${common.isSingleProduct()?'../shop-list':'shop-list'}?id=${item.id}&title=`+name+`" > ${item.name}</a>
														<ul>
															${itemhtml}
														</ul>
													</li>`
		//移动端
		let mobileItemhtml = "";
		if (item.children && item.children.length) {
			item.children.forEach(listitem => {
				name = listitem.name.replace(/ /g, "_");
				mobileItemhtml = mobileItemhtml +
					`<li><a   href="${common.isSingleProduct() ?'../shop-list':'shop-list'}?id=${listitem.id}&title=`+name+`" >${listitem.name}</a></li>`
			})
		}
		name = item.name.replace(/ /g, "_");
		mobileHtml = mobileHtml + `<li   class="menu-item-has-children" >
			<a    href="${common.isSingleProduct()?'../shop-list':'shop-list'}?id=${item.id}&title=`+name+`" > ${item.name}</a>
															<ul  class="submenu2">
																${mobileItemhtml}
															</ul>
														</li>`

	})
	$(".mega-menu").html(html)
	$("#mobile-shop-menu").append(mobileHtml)

	//移动端点击折叠
	var c = $(".offcanvas-navigation"),
		d = c.find(".submenu2");
	d.parent().prepend('<span class="menu-expand"><i></i></span>');
	d.slideUp();
	c.on("click", "li a, li .menu-expand", function(j) {
		var i = $(this);

		if ((i.parent().attr("class").match(
				/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && (i
				.attr("href") === "#" || i.hasClass("menu-expand"))) {
			j.preventDefault();
			if (i.siblings("ul:visible").length) {
				i.parent("li").removeClass("active");
				i.siblings("ul").slideUp()
			} else {
				i.parent("li").addClass("active");
				i.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
				i.closest("li").siblings("li").find("ul:visible").slideUp();
				i.siblings("ul").slideDown()
			}
		}
	});
}
