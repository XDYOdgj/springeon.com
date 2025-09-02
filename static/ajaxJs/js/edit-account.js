import httpRequest from '../common/http.js';
import storage from '../common/storage.js';


$(document).ready(function () {
	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('id')) {
		$(".default-0").removeClass("active")
		$(".fade-0").removeClass("show active")


		$(".default-" + urlParams.get('id')).addClass("active")
		$(".fade-" + urlParams.get('id')).addClass("show active")
	}


	let userInfo = storage.getStorageData("userInfo");
	$("#nickname").val(userInfo.nickname)
	$("#email").val(userInfo.email)
});

window.saveChanges = async () => {
	var reg =
		/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //正则表达式
	if ($('#email').val() === "") {
		$.toast({
			text: 'Email cannot be empty',
			icon: 'error',
		})
		return false;
	} else if (!reg.test($('#email').val())) {
		$.toast({
			text: 'Email format error',
			icon: 'error',
		})
		return false;
	}

	if ($('#nickname').val() === "") {
		$.toast({
			text: 'Nickname cannot be empty',
			icon: 'error',
		})
		return false;
	}

	let isresult = false;
	//保存密码 
	if ($('#oldpassword').val() && $('#newpassword').val() && $('#repassword').val()) {
		await httpRequest("/account/changePassword", "POST", {
			nickname: $('#nickname').val(),
			oldpassword: $('#oldpassword').val(),
			newpassword: $('#newpassword').val(),
			repassword: $('#repassword').val(),
		}).then(res => {
			isresult = true;
		}).catch(error => {}).finally()
	} else {
		isresult = true;
	}
	if (!isresult) return;
	//保存昵称邮箱  
	await httpRequest("/account/changeNickName", "POST", {
		nickname: $('#nickname').val(),
		email: $('#email').val(),
	}).then(res => {
		$.toast("Successfully saved")
		storage.setStorageData("userInfo", res.data);
	}).catch(err => {
		return;
	}).finally()




}