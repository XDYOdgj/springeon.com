import appConfig from '../config/appConfig.js';
import storage from './storage.js';
import common from '../common/index.js';


const httpRequest = (path, method = 'GET', data = {}, contenType = true) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			contentType: 'application/x-www-form-urlencoded',
			headers: {
				'Authorization': 'Bearer ' + storage.getStorageData("token"),
				'Verify': appConfig.cookie
			},
			dataType: 'json',
			url: appConfig.domain + appConfig.apiUrl + path,
			type: method,
			data,
			success: function (res) {
				common.hideLoading()
				if (res.code == 1) {
					resolve(res);
				} else {
					$.toast({
						text: res.msg,
						icon: 'error',
					})
					reject(res);
				}
			},
			error: function (err) {
				common.hideLoading()
				if (err.responseJSON) err = err.responseJSON
				if (err && err.code && err.msg) {
					$.toast({
						text: err.msg,
						icon: 'error',
					})
					reject(err);
					return;
				}
				$.toast({
					text: 'Server error',
					icon: 'error',
				})
				reject(err);
			}
		});
	})
};

export default httpRequest;