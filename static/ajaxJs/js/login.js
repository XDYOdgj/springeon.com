import cart from './cart.js';
import httpRequest from '../common/http.js';
import storage from '../common/storage.js';

/**
 * @Description:登录  忘记密码切换
 * @author:Howe
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */
window.showUpdatePassword = (bool) => {
	if (bool) {
		$("#my-account-login").hide();
		$("#my-account-update-pwd").show();
	} else {
		$("#my-account-login").show();
		$("#my-account-update-pwd").hide();
	}
}

window.showUpdatePassword(false);

//记住密码 赋值
if (storage.getStorageData("remember")) {
	$('.login-nickname').val(storage.getStorageData("rememberAccount").nickname);
	$('.login-password').val(storage.getStorageData("rememberAccount").password);
	$("#rememberme").prop("checked", true)
}

/**
 *
 *
 *
 * @Description: 注册
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-01 11:27:25
 * @Copyright by 红逸
 */
window.fnRegister = () => {
	let formData = {};
	$($("#registerForm").serializeArray()).each(function () {
		formData[this.name] = this.value;
	});

	if (!formData.nickname) {
		$.toast({
			text: 'Nickname cannot be empty',
			icon: 'error',
		})
		return;
	}
	var reg =
		/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //正则表达式
	if (formData.email === "") {
		$.toast({
			text: 'Email cannot be empty',
			icon: 'error',
		})
		return false;
	} else if (!reg.test(formData.email)) {
		$.toast({
			text: 'Email format error',
			icon: 'error',
		})
		return false;
	}
	if (formData.password != formData.repassword) {

		$.toast({
			text: 'Two passwords are inconsistent',
			icon: 'error',
		})
		return;
	}
	httpRequest("/account/register", "post", formData).then(res => {
		//注册成功
		storage.setStorageData("userInfo", res.data.userInfo)
		storage.setStorageData("token", res.data.token)
		$.toast("successfully registered")
		setTimeout(() => {
			window.location.href = "./index"
		}, 1400)
	}).catch().finally()
}
/**
 * @Description: 登录
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-01 11:27:25
 * @Copyright by 红逸
 */
window.fnLogin = async () => {
	let formData = {};
	$($("#loginForm").serializeArray()).each(function () {
		formData[this.name] = this.value;
	});
	if (!formData.nickname) {
		$.toast({
			text: 'Nickname or email cannot be empty',
			icon: 'error',
		})
		return;
	}
	if (!formData.password) {
		$.toast({
			text: 'Password cannot be empty',
			icon: 'error',
		})
		return;
	}
	await httpRequest("/account/login", "POST", formData).then(async (res) => {
		storage.setStorageData("userInfo", res.data.userInfo)
		storage.setStorageData("token", res.data.token)
		if (formData.rememberme) {
			storage.setStorageData("remember", true);
			storage.setStorageData("rememberAccount", {
				nickname: formData.nickname,
				password: formData.password
			})
		} else {
			storage.setStorageData("remember", false);
		}
		//判断购物车缓存是否有数据
		if (!storage.getStorageData("cart").length) {
			await cart.getCarUpdateStorage()
		} else {
			//将缓存数据更新到数据库
			await cart.storageUpdateCar()
			await cart.getCarUpdateStorage()
		}
		window.location.href = "./index"
	}).catch().finally()
}
/**
 * @Description: 忘记密码
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-01 11:27:25
 * @Copyright by 红逸
 */
window.fnUpdatePwd = () => {
	let formData = {};
	$($("#updatePwdForm").serializeArray()).each(function () {
		formData[this.name] = this.value;
	});
	if (!formData.nickname) {
		$.toast({
			text: 'Nickname or email cannot be empty',
			icon: 'error',
		})
		return;
	}
	if (!formData.password) {
		$.toast({
			text: 'Password cannot be empty',
			icon: 'error',
		})
		return;
	}
	if (formData.password != formData.repassword) {
		$.toast({
			text: 'Two passwords are inconsistent',
			icon: 'error',
		})
		return;
	}
	httpRequest("/account/changePassword", "POST", formData).then(res => {

	}).catch().finally()
}
