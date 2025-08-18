import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import calculation from '../common/calculation.js';
import regionVerify from '../common/region-verify.js';
import common from '../common/index.js';
import verify from '../common/verify.js';

const paypalOption = document.getElementById('paypal');
const creditCardOption = document.getElementById('credit-card');
const creditCardForm = document.getElementById('credit-card-form');
const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvcInput = document.getElementById('cvc');
const cardError = document.getElementById('card-error');
const cardType = document.getElementById('card-type');
const cardBrandIcon = document.getElementById('card-brand-icon');

paypalOption.addEventListener('change', updatePaymentMethod);
creditCardOption.addEventListener('change', updatePaymentMethod);

cardNumberInput.addEventListener('input', handleCardNumberInput);
expiryDateInput.addEventListener('input', handleExpiryDateInput);
cvcInput.addEventListener('input', handleCvcInput);

updatePaymentMethod();

/**
 * Updates the UI based on the selected payment method
 */
function updatePaymentMethod() {
	if (paypalOption.checked) {
		creditCardForm.classList.add('hidden');
	} else if (creditCardOption.checked) {
		creditCardForm.classList.remove('hidden');
	}
}

/**
 * Handles card number input, formatting, and validation
 */
function handleCardNumberInput(e) {
	let value = e.target.value.replace(/\D/g, '');

	const cardTypeValue = detectCardType(value);
	updateCardBrandIcon(cardTypeValue);

	if (cardTypeValue === 'American Express') {
		value = value.replace(/(\d{4})(\d{6})?(\d{0,5})?/, function(match, p1, p2, p3) {
			let result = p1;
			if (p2) result += ' ' + p2;
			if (p3) result += ' ' + p3;
			return result;
		});
	} else {
		value = value.replace(/(\d{4})(\d{4})?(\d{4})?(\d{0,4})?/, function(match, p1, p2, p3, p4) {
			let result = p1;
			if (p2) result += ' ' + p2;
			if (p3) result += ' ' + p3;
			if (p4) result += ' ' + p4;
			return result;
		});
	}

	cardNumberInput.value = value;

	const sanitized = value.replace(/\D/g, '');

	if (sanitized.length > 0) {
		cardType.textContent = cardTypeValue;
	} else {
		cardType.textContent = '';
	}

	if (sanitized.length >= 15) {
		if (!validateLuhn(sanitized)) {
			cardError.textContent = 'Invalid card number';
			cardNumberInput.classList.add('error');
		} else {
			cardError.textContent = '';
			cardNumberInput.classList.remove('error');
		}
	} else if (sanitized.length > 0) {
		cardError.textContent = 'Card number incomplete';
		cardNumberInput.classList.add('error');
	} else {
		cardError.textContent = '';
		cardNumberInput.classList.remove('error');
	}
}

/**
 * Updates the card brand icon based on the detected card type
 * @param {string} cardType - The detected card type
 */
function updateCardBrandIcon(cardType) {
	cardBrandIcon.className = 'card-brand-icon';

	if (!cardType || cardType === 'Unknown') {
		return;
	}

	const brandClasses = {
		'Visa': 'card-brand-visa',
		'Mastercard': 'card-brand-mastercard',
		'American Express': 'card-brand-amex',
		'Discover': 'card-brand-discover',
		'JCB': 'card-brand-jcb',
		'Diners Club': 'card-brand-diners'
	};

	if (brandClasses[cardType]) {
		cardBrandIcon.classList.add(brandClasses[cardType]);
	}
}

/**
 * Handles expiry date input and formatting
 */
function handleExpiryDateInput(e) {
	let value = e.target.value.replace(/\D/g, '');

	if (value.length > 0) {
		if (value.length <= 2) {
			expiryDateInput.value = value;
		} else {
			expiryDateInput.value = value.substring(0, 2) + '/' + value.substring(2, 4);
		}
	} else {
		expiryDateInput.value = '';
	}
}

/**
 * Handles CVC input (numbers only)
 */
function handleCvcInput(e) {
	let value = e.target.value.replace(/\D/g, '');
	cvcInput.value = value;
}

/**
 * Validates a credit card number using the Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - Whether the card number is valid
 */
function validateLuhn(cardNumber) {
	if (!cardNumber) return false;

	let sum = 0;
	let shouldDouble = false;

	for (let i = cardNumber.length - 1; i >= 0; i--) {
		let digit = parseInt(cardNumber.charAt(i));

		if (shouldDouble) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	return (sum % 10) === 0;
}

/**
 * Detects the credit card type based on the card number
 * @param {string} cardNumber - The card number
 * @returns {string} - The detected card type
 */
function detectCardType(cardNumber) {
	const patterns = {
		'Visa': /^4/,
		'Mastercard': /^5[1-5]/,
		'American Express': /^3[47]/,
		'Discover': /^6(?:011|5)/,
		'JCB': /^(?:2131|1800|35\d{3})/,
		'Diners Club': /^3(?:0[0-5]|[68])/
	};

	for (const [type, pattern] of Object.entries(patterns)) {
		if (pattern.test(cardNumber)) {
			return type;
		}
	}

	return 'Unknown';
}

//邮费
let shippingMoney = 0;
//小结
let subtotal = 0;
//合计总金额
let settlementMoney = 0;
//是否勾选运费
let isShipping = false;

$(document).ready(function() {

	//邮费
	getShippingMoney();
	// //注册折叠
	// $('#toggle-checkbox').click(function() {
	// 	$('#collapsible-content').slideToggle();
	// });
	// //地址折叠
	// $('#toggle2-checkbox').click(function() {
	// 	$('#collapsible2-content').slideToggle();
	// });
	init();
	$('#place_order').click(function() {
		submitForm()
	});

	//表单校验
	let formData = {};
	$($("#checkout-form").serializeArray()).each(function() {
		$('#' + this.name).change((e) => {
			if (!$('#' + this.name).val()) {
				$(`#${this.name}`).css('border', ' 1px solid red')
			} else {
				$(`#${this.name}`).css('border', '1px solid #ebebeb')
			}
		})
	});

	//点击勾选运费
	$('input[type="radio"][name="shipping"]').change(function() {
		if ($(this).val() == 0) {
			$("#settlementMoney").html(settlementMoney)
			isShipping = true;
		} else {
			$("#settlementMoney").html(calculation.preciseAdd(settlementMoney, shippingMoney))
			isShipping = false;
		}
	});

});

const init = () => {
	shopCart()
	fnMonth()
	fnYear()
	getUserInfo()
}




const getUserInfo = () => {
	if (!storage.getStorageData("token")) return;
	//复显
	httpRequest("/account/getUserInfo", "get").then(res => {
		let param = res.data.param;
		if (param) {
			$.each(param.bill, function(key, value) {
				$('#' + key).val(value);
			});
			$.each(param.ship, function(key, value) {
				$('#' + key).val(value);
			});
		}
	}).catch().finally()
}

const fnYear = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	let html = ""
	for (let i = year; i <= 2050; i++) {
		html = html + `<option value="${i}"  ${year === i?'selected':''}>${i}</option>`
	}
	$("#ExpYear").append(html);
}

const fnMonth = () => {
	const currentDate = new Date();
	const month = currentDate.getMonth() + 1; // 月份是从 0 开始计数的，因此要加1
	let html = ""
	for (let i = 1; i <= 12; i++) {
		html = html + `<option value="${i}"  ${month === i?'selected':''}>${i}</option>`
	}
	$("#ExpMonth").append(html);
}

const shopCart = () => {
	let html = "";
	storage.getStorageData("cart").forEach(item => {
		html = html +
			`<li>${item.goods.name} X ${item.num} <span>$${calculation.preciseMultiply(Number(item.price), item.num)}</span></li> `

		let amountMoney = calculation.preciseMultiply(Number(item.price), item.num);
		subtotal = calculation.preciseAdd(amountMoney, subtotal);
	})

	$("#checkout-tbody").html(html)
	$("#subtotal").html(subtotal)
	settlementMoney = subtotal;
	$("#settlementMoney").html(settlementMoney)

}

const submitForm = async () => {
	// if (!storage.getStorageData("token") && (!$("#toggle-checkbox").is(':checked'))) {
	// 	$.toast({
	// 		text: 'please log in first',
	// 		icon: 'error',
	// 	})
	// 	return;
	// };
	common.showLoading()
	//表单校验
	let formData = {};
	let isError = false;

	$($("#checkout-form").serializeArray()).each(function() {
		formData[this.name] = this.value;
		if (this.name == "remark") return true;
		if (!$("#toggle2-checkbox").is(':checked') && this.name.includes("ship_")) {
			//如果没有勾选  将原数据赋值给‘ship_’数据
			let tail = this.name.replace("ship_", "");
			formData[this.name] = formData['bill_' + tail]
			return true;
		}
		if (!formData[this.name]) {
			$(`#${this.name}`).css('border', ' 1px solid red')
			isError = true;
		} else {
			$(`#${this.name}`).css('border', '1px solid #ebebeb')
		}
	});

	if (isError) {
		common.hideLoading()
		$.toast({
			text: 'Please provide complete information',
			icon: 'error',
		})
		return;
	}

	/*if (!verify.luhnCheck($("#card_no").val())) {
		common.hideLoading()
		$.toast({
			text: 'Card Number format error',
			icon: 'error',
		})
		return;
	}*/

// 获取name 为 payment-method的选项值
	let paymentMethod = $('input[name="payment-method"]:checked').val();
	formData.payment_method = paymentMethod;

	if (paymentMethod == 'credit-card'){
		// 把expiryDateInput 的值拆分成年月
		const [expMonth, expYear] = expiryDateInput.value.split('/');

		formData.card_no = cardNumberInput.value;
		formData.ExpYear = expYear;
		formData.ExpMonth = expMonth;
		formData.cvv = cvcInput.value;

		if (!cardNumberInput.value) {
			common.hideLoading()
			$.toast({
				text: 'Please fill in the card number',
				icon: 'error',
			})
			return;
		}
	}

	//校验地址Billing
	let res = await regionVerify.verifyAddress(formData.bill_country, formData.bill_state, formData.bill_city,
		formData.bill_street, formData.bill_zip);


	if (res.code == 0) {
		// common.hideLoading()
		// $.toast({
		// 	text: res.msg,
		// 	icon: 'error',
		// })
		// return
		formData.errorInfo = 'Billing address error';
	}
	common.showLoading()
	//校验地址Ship
	res = await regionVerify.verifyAddress(formData.ship_country, formData.ship_state, formData.ship_city,
		formData.ship_street, formData.ship_zip)
	if (res.code == 0) {
		// common.hideLoading()
		// $.toast({
		// 	text: res.msg,
		// 	icon: 'error',
		// })
		// return
		formData.errorInfo = 'Shipping address error';

	}
	common.showLoading()
	formData.goods = storage.getStorageData("cart");
	formData.goods.map(item => {
		item.goods_num = item.num;
	})

	//账号注册
	if ($("#toggle-checkbox").is(':checked')) {
		fnRegister(formData)
		return;
	}
	submitCheckout(formData)

}
const fnRegister = (formData) => {
	var reg =
		/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //正则表达式
	if ($("#bill_email").val() === "") {
		common.hideLoading()
		$.toast({
			text: 'Email cannot be empty',
			icon: 'error',
		})
		return false;
	} else if (!reg.test($("#bill_email").val())) {
		common.hideLoading()
		$.toast({
			text: 'Email format error',
			icon: 'error',
		})
		return false;
	}

	if (!$("#ship_phone").val()) {
		common.hideLoading()
		$.toast({
			text: 'Nickname cannot be empty',
			icon: 'error',
		})
		return;
	}

	if (!$("#ship_password").val()) {
		common.hideLoading()
		$.toast({
			text: 'Password cannot be empty',
			icon: 'error',
		})
		return;
	}


	if (!$("#ship_username").val()) {
		common.hideLoading()
		$.toast({
			text: 'Account username cannot be empty',
			icon: 'error',
		})
		return;
	}

	httpRequest("/account/register", "post", {
		nickname: $("#ship_username").val(),
		password: $("#ship_password").val(),
		email: $("#bill_email").val(),
	}).then(res => {
		//注册成功
		storage.setStorageData("userInfo", res.data.userInfo)
		storage.setStorageData("token", res.data.token)
		common.showLoading()
		submitCheckout(formData)
	}).catch().finally()
}

const submitCheckout = (formData) => {
	formData.shipping = isShipping ? 0 : shippingMoney;

	httpRequest("/order/submit", "post", formData).then(res => {
		//提交订单后
		window.location.href = res.data.url;
	}).catch().finally()
}


const getShippingMoney = () => {
	httpRequest("/config", "GET", {
		type: 'shipping'
	}).then(res => {
		$("#shipping-cost").html(res.data.us)
		shippingMoney = res.data.us;
	}).catch().finally()

}
