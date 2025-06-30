import httpRequest from '../common/http.js';
$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
	var orderNo = urlParams.get('orderNo');
	var payState = urlParams.get('payState');
	$(".order-num").html(orderNo)
	if (!orderNo || (payState != 0 && payState != 1)) {
		$(".main-container-c").html("<div class='no-order'> Order does not exist</div>")
		return;
	}
	if (payState == 1) {

		// 请求订单详情
		httpRequest("/order/detail", "GET", {
			orderNo: orderNo
		}).then(res => {

			if (res.data == 1){
				$(".pay-flex-no").hide()
				$(".pay-flex-yes").show()
			}else{
				$(".pay-flex-no").show()
				$(".pay-flex-yes").hide()
			}

		})

	}else{
		$(".pay-flex-no").show()
		$(".pay-flex-yes").hide()
	}
});
