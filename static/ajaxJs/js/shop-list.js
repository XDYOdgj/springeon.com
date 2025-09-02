/**
 * @Description:
 * @author:Howe
 * @param 商品列表
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */


import httpRequest from '../common/http.js';
import fit from '../common/fit.js';

let from = {
	page: 1,
	limit: 16,
	category: null,
	search: ""
}
let totalCount = 0;

window.fnListSearch = () => {
	from.search = $('#lynessa-product-search-field-0').val();
	from.page = 1;
	getRecommendList();
}



$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
	from.category = urlParams.get('id');
	from.search = urlParams.get('search');
	if (from.search) {
		$('#lynessa-product-search-field-0').val(from.search);
	}
	from.page = 1;
	getRecommendList()


	//监听输入框搜索回车搜索
	$('#lynessa-product-search-field-0').keypress(function(event) {
		if (event.which === 13) { // 检查按键是否是回车键
			window.fnListSearch()
		}
	});

});

//商品列表
const getRecommendList = () => {

	$("#products-list").html(
		`<div style="font-size: 30px; text-align: center; width: 100%; color: #cf9163; margin: 20px 0; padding: 10px 0; background: linear-gradient(90deg, #f4e2d8, #f8f4e5); border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    loading...
</div>`
	);

	httpRequest("/goods/list", "GET", from).then(res => {
		let html = "";
		res.data.data.forEach(item => {
			html = html + `												<div class="col-lg-3 col-md-6 col-sm-12"> 
																	<div class="single-grid-product mb-40">
																		<div class="product-image"> 
																				<a  href="details/${item.linkTitle}" >
																						<img class="product-img1 img-fluid"  style="object-fit:contain;background-color:#fff;width：100%" src="${item.image}" alt="${item.name}" >
																				</a>    
																		</div>
																		<div class="product-content">
																			<h3 class="title"><a   class="ellipsis-omit" 
																			href="details/${item.linkTitle}" > ${item.name}</a></h3>
																			<div class="product-category-rating">
																				<p class="product-price"><span
																						class="discounted-price">$${item.selling_price}</span>
																				</p><span class="rating"><span
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
		if (res.data.data.length) {
			$(`#products-list`).html(html);
		} else {
			$(`#products-list`).html(
				`<div style="font-size:30px;text-align: center;width: 100%;color: #cf9163;">no data</div>`);
		}



		setTimeout(() => {
			fit.adaptImgHeight(".product-img1", 1);
		}, 100)


		totalCount = res.data.count;
		// 初始化分页条，默认显示第一页

		if (totalCount && Math.ceil(totalCount / from.limit) > 1) {
			$("#pagination").html(createPagination(from.page, Math.ceil(totalCount / from.limit)));
		} else {
			$("#pagination").html("");
		}
	}).catch().finally()
}


/**
 * @Description:创建分页条的函数
 * @author:Howe
 * @param currentPage  当前页面
 * @param totalPages  总页数
 * @return
 * @createTime: 2024-11-04 23:43:55
 * @Copyright by 红逸
 */
const createPagination = (currentPage, totalPages) => {

	let paginationHtml = ""; // 初始化一个字符串，用于存放分页条的HTML代码
	// 如果当前页不是第一页，则生成一个“上一页”按钮
	if (currentPage > 1) {
		paginationHtml += `<li><a><i class="fa fa-angle-left"></i></a></li>`;
	}
	// 始终显示第一页的页码
	paginationHtml += generatePageNumberHtml(1, currentPage);
	// 如果总页数大于1页，则继续生成分页条的其余部分
	if (totalPages > 1) {
		// 如果当前页码大于3，则在第一页和当前页之间添加省略号
		if (currentPage > 3) {
			paginationHtml += "<li><a>...</a></li>";
		}
		// 遍历当前页附近的页码，并生成对应的分页按钮
		for (
			let i = Math.max(currentPage - 2, 2); i <= Math.min(currentPage + 2, totalPages - 1); i++
		) {
			paginationHtml += generatePageNumberHtml(i, currentPage);
		}
		// 如果当前页码小于总页数减去2，则在当前页和最后一页之间添加省略号
		if (currentPage < totalPages - 2) {
			paginationHtml += " <li><a>...</a></li>";
		}
	}

	// 始终显示最后一页的页码
	paginationHtml += generatePageNumberHtml(totalPages, currentPage);

	// 如果当前页不是最后一页，则生成一个“下一页”按钮
	if (currentPage < totalPages) {
		paginationHtml += `<li><a><i class="fa fa-angle-right"></i></a></li>`;
	}
	// 返回生成的分页条HTML字符串
	return paginationHtml;
}

// 生成单个页码按钮的HTML的函数
const generatePageNumberHtml = (pageNumber, currentPage) => {

	// 返回一个格式化后的HTML字符串，包含激活状态的判断
	return (
		`<li  class="${pageNumber === currentPage ? "active" : ""}"><a>${pageNumber}</a></li>`
	);
}

// 选择页码的函数
const selectPage = (pageNumber) => {
	// 更新当前页码的变量，并重新生成分页条
	from.page = pageNumber;
	getRecommendList()
}


// 为分页条上的每个按钮绑定点击事件
$("#pagination").on("click", "li", function(event) {
	let pageNumber = $(this).text(); // 获取点击的页码或按钮文本

	// 如果点击的是省略号，则不执行任何操作
	if (pageNumber === "...") {
		event.preventDefault();
		return;
	}

	// 移动到页面顶部 加载动画
	$('html, body').animate({
		scrollTop: 350
	}, 100);

	var currentPage = from.page;

	pageNumber = $(this).html()
	// 根据点击的按钮，调用selectPage函数更新当前页码
	if (pageNumber.includes("fa-angle-left")) {
		selectPage(currentPage - 1);
	} else if (pageNumber.includes("fa-angle-right")) {
		selectPage(currentPage + 1);
	} else {
		pageNumber = $(this).text(); // 获取点击的页码或按钮文本
		selectPage(parseInt(pageNumber));
	}
});
