import httpRequest from '../common/http.js';


$(document).ready(function () {
	httpRequest("/config", "get", {
		type: 'contact'
	}).then(res => {
		$("#rich-content").html(res.data);
	}).catch().finally()


	$("#Send").click(function () {
		let formData = {
			type: 2
		};
		let isempty = false;
		$($("#commentform").serializeArray()).each(function () {
			formData[this.name] = this.value;
			if (!this.value) {
				isempty = true;
			}
		});

		if (isempty) {
			$.toast({
				text: 'Please provide complete information',
				icon: 'error',
			})
			return
		}
		httpRequest("/consult/add", "POST", formData).then(res => {
			$.toast("Added successfully")
			setTimeout(() => {
				history.go(0);
			}, 1000)
		}).catch().finally()

	});

});