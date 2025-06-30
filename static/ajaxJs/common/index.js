

/**
 * @Description: 获取当前日期
 * @author:Howe
 * @param  start  下标开始
 * @param  end  下标结束
 * @return
 * @createTime: 2024-11-08  
 * @Copyright by 红逸
 */

const getCurrentDate=()=>{
	var date = new Date();
	var year = date.getFullYear(); // 获取当前年份
	var month = date.getMonth() + 1; // 获取当前月份（注意月份从0开始，需要加1）
	var day = date.getDate(); // 获取当前日期
	const currentDate = `${year}-${month}-${day}`;
	return  currentDate;
}
 

/**
 * @Description: 根据下标区间删除对象的值
 * @author:Howe
 * @param  start  下标开始
 * @param  end  下标结束
 * @return
 * @createTime: 2024-11-08  
 * @Copyright by 红逸
 */

const deletePropertiesByIndex = (obj, start, end) => {
	const keys = Object.keys(obj);
	for (let i = start; i <= end; i++) {
		delete obj[keys[i]];
	}
	return obj;
}

/**
 * @Description: 判断是否移动端
 * @author:Howe 
 * @return
 * @createTime: 2024-11-08  
 * @Copyright by 红逸
 */
const isMobile = () => {
	// 判断是否为移动设备
	return (
		typeof window.orientation !== "undefined" || // 判断是否存在window.orientation属性，此属性在移动设备上一般存在
		navigator.userAgent.indexOf('IEMobile') !== -1 || // 判断是否为Windows Phone
		navigator.userAgent.indexOf('iPhone') !== -1 || // 判断是否为iPhone
		navigator.userAgent.indexOf('Android') !== -1 && navigator.userAgent.indexOf('Mobile') !== -1 ||
		// 判断是否为Android手机
		navigator.userAgent.indexOf('BlackBerry') !== -1 || // 判断是否为BlackBerry
		navigator.userAgent.indexOf('Opera Mini') !== -1 // 判断是否为Opera Mini浏览器
	);
}

/**
 * @Description: 是否是详情页
 * @author:Howe 
 * @return
 * @createTime: 2024-11-08  
 * @Copyright by 红逸
 */

const isSingleProduct = () => {
	// 判断是否详情页
	return $('.page-title').text() == 'SingleProduct';
}





/**
 * @Description:显示加载动画
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-07 22:22:21
 * @Copyright by 红逸
 */
const showLoading = () => {

	if ($('#loadingOverlay').length > 0) {
		$("#loadingOverlay").show()
	} else {
		$("body").append(`<div class="loading-overlay" id="loadingOverlay">
	    			<div class="circle-container">
	    				<div class="circle">
	    					<div class="dot"></div>
	    					<div class="dot"></div>
	    					<div class="dot"></div>
	    					<div class="dot"></div>
	    				</div>
	    			</div>
	    			<div class="loading-text">加载中...</div>
	    		</div>`)
		$("#loadingOverlay").show()
	}
}


/**
 * @Description:隐藏加载动画
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-07 22:22:21
 * @Copyright by 红逸
 */
const hideLoading = () => {
	$("#loadingOverlay").hide()
}
export default {
	hideLoading,
	showLoading,
	deletePropertiesByIndex,
	isMobile,
	isSingleProduct,
	getCurrentDate
	
	
	
}