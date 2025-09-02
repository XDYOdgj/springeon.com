/**
 * @Description:加减乘除精确度
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-06 10:30:01
 * @Copyright by 红逸
 */




//加
const preciseAdd = (numeral1, numeral2) => {
	numeral1 = numeral1 || 0
	numeral2 = numeral2 || 0
	var r1, r2, m
	try {
		r1 = numeral1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = numeral2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (preciseMultiply(numeral1, m) + preciseMultiply(numeral2, m)) / m
}

//减
const preciseSubtract = (numeral1, numeral2) => {
	numeral1 = numeral1 || 0
	numeral2 = numeral2 || 0
	var r1, r2, m
	try {
		r1 = numeral1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = numeral2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (preciseMultiply(numeral1, m) - preciseMultiply(numeral2, m)) / m
}
//乘
const preciseMultiply = (numeral1, numeral2) => {
	numeral1 = numeral1 || 0
	numeral2 = numeral2 || 0
	var m = 0,
		s1 = numeral1.toString(),
		s2 = numeral2.toString()
	try {
		m += s1.split('.')[1].length
	} catch (e) {}
	try {
		m += s2.split('.')[1].length
	} catch (e) {}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
//除
const preciseDivide = (numeral1, numeral2) => {
	numeral1 = numeral1 || 0
	numeral2 = numeral2 || 0
	var t1 = 0,
		t2 = 0,
		r1, r2
	try {
		t1 = numeral1.toString().split('.')[1].length
	} catch (e) {}
	try {
		t2 = numeral2.toString().split('.')[1].length
	} catch (e) {}
	r1 = Number(numeral1.toString().replace('.', ''))
	r2 = Number(numeral2.toString().replace('.', ''))
	return (r1 / r2) * Math.pow(10, t2 - t1)
}


export default {
	preciseAdd,
	preciseSubtract,
	preciseMultiply,
	preciseDivide
}