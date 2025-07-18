import appConfig from '../config/appConfig.js';
//存储key
const storageKey = appConfig.storageKey;

//默认数据
let storageData = {
	userInfo: null,
	token: "",
	remember: false,
	rememberAccount: { //记住账号信息
		nickname: "",
		password: ""
	},
	cart: [], //购物车
	category_list: [], //商品分类
	siteConfig:null,
	siteUpdateDate: "", //最后一次站点更新日期

}
//修改数据
const setStorageData = (key, data) => {
	let storage = JSON.parse(localStorage.getItem(storageKey)) || storageData;
	storage[key] = data;
	localStorage.setItem(storageKey, JSON.stringify(storage));
}
//获取数据
const getStorageData = (key) => {
	let storage = JSON.parse(localStorage.getItem(storageKey)) || storageData;
	return storage[key];
}

export default {
	setStorageData,
	getStorageData
}