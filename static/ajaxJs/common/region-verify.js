import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import appConfig from '../config/appConfig.js';
import common from '../common/index.js';


let levelArr = ['country', 'state', 'city'];
//
let coordinate_bill = "";
let coordinate_ship = "";

let allCountry = [
	"Åland Islands",
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belau",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bonaire, Saint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands",
	"Colombia",
	"Comoros",
	"Congo (Brazzaville)",
	"Congo (Kinshasa)",
	"Cook Islands",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Falkland Islands",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao S.A.R., China",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"North Korea",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palestinian Territory",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Reunion",
	"Romania",
	"Russia",
	"Rwanda",
	"São Tomé and Príncipe",
	"Saint Barthélemy",
	"Saint Helena",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (Dutch part)",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia/Sandwich Islands",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom (UK)",
	"United States (US)",
	"United States (US) Minor Outlying Islands",
	"United States (US) Virgin Islands",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican",
	"Venezuela",
	"Vietnam",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe"
];

let country = {
	ship_country: [],
	bill_country: []
}


window.showOption = (type) => {
	var html = "";
	// 筛选的数据
	if (country[type].length == 0) {
		country[type] = allCountry;
	}
	country[type].forEach(item => {
		html = html +
			`<div    class="${type}_country_iop iop">${item}</div>`
	})

	if ($(`.${type}_iop-list.select-hidden`).length > 0) {
		$(`.${type}_iop-list`).removeClass('select-hidden');
	} else {
		$(`.${type}_iop-list`).addClass('select-hidden');
	}
 
	// setTimeout 不加不显示
	setTimeout(() => {
		$(`.${type}_iop-list`).html(html);
	}, 30)
}

/**
 * @Description:点击下拉框值
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-27
 * @Copyright by 红逸
 */

$(document).on('click', '.iop', function() {
	let className = $(this).attr('class');
	className = className.split("_");
	$(`.${className[0]}_${className[1]}_iop-list`).addClass('select-hidden');
	var text = $(this).text();
	$(`#${className[0]}_${className[1]}`).val(text);

	if (className[0] == "bill") {
		coordinate_bill = $(this).attr(`${className[0]}coordinate`) || "";
	} else {
		coordinate_ship = $(this).attr(`${className[0]}coordinate`) || "";
	}


	if (className[1] == "country" && (!coordinate_bill || !coordinate_ship)) {
		
		$(`#${className[0]}_${className[1]}_spinner`).show()
		
		// 请求国家的经纬度
		let data = {
			apiKey: appConfig.mapKey,
			format: 'json',
			text: $(`#${className[0]}_${className[1]}`).val(),
			type: "country"
		}
		$.ajax({
			dataType: 'json',
			url: appConfig.mapAddressSearch,
			type: 'get',
			data,
			success: function(res) {
				if (res.results.length) {
					res = res.results[0];
					if (className[0] == "bill") {
						coordinate_bill =
							`rect:${res.bbox.lon1},${res.bbox.lat1},${res.bbox.lon2},${res.bbox.lat2}`
					} else {
						coordinate_ship =
							`rect:${res.bbox.lon1},${res.bbox.lat1},${res.bbox.lon2},${res.bbox.lat2}`
					}
				}
				$(`#${className[0]}_${className[1]}_spinner`).hide()
			},
			error: function(err) {}
		});
	}

	//将后面的数据重置
	let isfind = false;
	levelArr.forEach(item => {
		if (className[1] == item) {
			isfind = true;
			return;
		}
		if (isfind) {
			$(`#${className[0]}_${item}`).val("");
			$(`.${className[0]}_${item}_iop-list`).html("");
			$(`.${className[0]}_${item}_iop-list`).addClass('select-hidden');
		}
	})
	//列表将其他全部清空且隐藏
	clearList(className[1], className[0])
})

/**
 * @Description:搜索
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-14 11:09:30
 * @Copyright by 红逸
 */
window.selectSearch = (value, level, type) => {
	country[type] = []
	//  Country国家    State 州（省）   City  市
	if (value.length < 3) {
		// 3个字之内 用自带数据  
		if (level == 'country') {
			if (value.length) {
				console.log(1)
				let html = '';
				allCountry.forEach(item => {
					//比较是否包含
					if (item.toLowerCase().indexOf(value.toLowerCase()) != -1) {
						country[type].push(item)
						html = html +
							`<div    class="${type}_country_iop iop">${item}</div>`
					}
				})
				$(`.${type}_country_iop-list`).html(html);
			} else {
				showOption(`${type}_${level}`)
			}
			return;
		}
		$(`.${type}_${level}_iop-list`).html("");
		return;
	}

	//第一个搜索时清空经纬度
	if (type == "bill" && level == "country") {
		coordinate_bill = ""
	}
	if (type == "ship" && level == "country") {
		coordinate_ship = ""
	}

	let data = {
		apiKey: appConfig.mapKey,
		format: 'json',
		text: value,
		type: level
	}
	if (type == "bill" && coordinate_bill) {
		data.filter = coordinate_bill;
	}

	if (type == "ship" && coordinate_ship) {
		data.filter = coordinate_ship;
	}
	
	$(`#${type}_${level}_spinner`).show()
	
	$.ajax({
		dataType: 'json',
		url: appConfig.mapAddressSearch,
		type: 'get',
		data,
		success: function(res) {
			let html = ""

			if (res.results.length != 0) {
				$(`.${type}_${level}_iop-list`).removeClass('select-hidden');
				$(`.${type}_${level}_iop`).show();
				//列表将其他全部清空且隐藏
				clearList(type, level)
			} else {
				$(`.${type}_${level}_iop-list`).addClass('select-hidden');
				$(`.${type}_${level}_iop`).hide();
			}

			res.results.forEach(item => {
				if (item.bbox) {
					let latLong =
						`rect:${item.bbox.lon1},${item.bbox.lat1},${item.bbox.lon2},${item.bbox.lat2}`
					html = html +
						`<div  ${type}coordinate=${latLong} class="${type}_${level}_iop iop">${item[level]}</div>`
				}
			})

			$(`.${type}_${level}_iop-list`).html(html);
			if (res.results.length) {
				$(`.${type}_${level}_iop-list`).show();
				$(`.${type}_${level}_iop`).show();
			}
			
			
			$(`#${type}_${level}_spinner`).hide()
		},
		error: function(err) {

		}
	});
}

const clearList = (level, type) => {
	levelArr.forEach(item => {
		if (level != item) {
			$(`.${type}_${item}_iop-list`).html("");
			$(`.${type}_${item}_iop-list`).addClass('select-hidden');
		}
	})


}



/**
 * @Description:地区校验
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-27 
 * @Copyright by 红逸
 */
const verifyAddress = (country, state, city, street, postcode) => {
	const ACCEPT_LEVEL = 0.95;
	const DECLINE_LEVEL = 0.2;
	const validationResult = {};
	let data = {
		apiKey: appConfig.mapKey,
		country,
		state,
		city,
		postcode
	}

	return new Promise((resolve, reject) => {
		$.ajax({
			dataType: 'json',
			url: appConfig.mapAddressCheck,
			type: 'get',
			data,
			success: function(result) {
				if (result.features.length === 0) {
					//未查到地址  地址错误
					validationResult.code = 0;
					validationResult.msg =
						'The address is incorrect, please check the information';
					resolve(validationResult);
				}
				const address = result.features[0].properties;
				if (address.rank.confidence >= ACCEPT_LEVEL) {
					//地址校验正确
					validationResult.code = 1;
					validationResult.msg = 'The address is correct';
				} else if (address.rank.confidence < DECLINE_LEVEL) {
					//查到地址但正确率低   地址错误
					validationResult.code = 0;
					validationResult.msg =
						'The address is incorrect, please check the information';
				} else {
					//地址部分正确
					if (address.rank.confidence_city_level === 0 || address.rank
						.confidence_city_level < ACCEPT_LEVEL) {
						validationResult.code = 0;
						validationResult.validation_details =
							'City is incorrect,please check the information';
					} else if (address.rank.confidence_street_level === 0 || address.rank
						.confidence_street_level < ACCEPT_LEVEL) {
						validationResult.code = 0;
						validationResult.validation_details =
							'Street is incorrect,please check the information';
					} else if (address.rank.confidence_building_level === 0) {
						validationResult.code = 0;
						validationResult.msg =
							'The address is incorrect, please check the information';
					} else if (address.rank.confidence_building_level > 0) {
						validationResult.code = 0;
						validationResult.msg =
							'The address is incorrect, please check the information';
					}
				}
				common.hideLoading()
				resolve(validationResult);
			},
			error: function(err) {
				common.hideLoading()
				$.toast({
					text: 'Server error',
					icon: 'error',
				})
			}
		});
	})
}

export default {
	verifyAddress
}