import api from '@/config/api.js';

const objectToUrlParams = function(obj) {
	var str = '';
	for (var key in obj) {
		str += '&' + key + '=' + obj[key];
	}
	return str.substr(1);
};

/**
 * 是否登录
 */
const isLogin = function() {
	if (uni.getStorageSync('userInfo')) {
		return true;
	}
	return false;
};

/**
 * 初始化登录
 */
const initLogin = function() {
	if (!isLogin()) {
	}
};

/*微信小程序登录初始化*/
const wechatAppLoginInit = function() {
	/*检测是否授权*/
	uni.getSetting({
		success: function(res) {
		}
	});
};

const certification = (info) => {
	console.log(222);
};

// 登录成功跳转
const toHome = info => {
	alert('登录成功');
	/*更新登录状态,保存用户数据*/
	uni.setStorageSync('userInfo', info);
	// 	/*登录后跳转*/
	uni.switchTab({
	  url: '/pages/user/index',
		success(){
			let page = getCurrentPages().pop(); //跳转页面成功之后
			if (!page) return; 
			page.onLoad(); //如果页面存在，则重新刷新页面
		}
	});
};

/*微信小程序登录*/
const wechatAppLogin = function(isBack = false, userData) {
	uni.showLoading({
		title: '正在登录',
		mask: true
	});

	/*微信登录*/
	uni.login({
		provider: 'weixin',
		success: loginResult => {
			let code = loginResult.code;
			/*获取用户信息*/
			uni.getUserInfo({
				success: result => {
					// 获取openid
					request({
						url: api.wechat.mpLogin,
						data: {code: code},
						method: 'POST',
						dataType: 'json',
						success: res1 => {
							if (res1.success) {
								const {data, data: {sessionId, openid, userId, certified}} = res1;
								uni.setStorageSync('accessToken',sessionId);
								uni.setStorageSync('openId',openid);
								// 绑定微信否
								if (userId) {
									if (certified) toHome(data);
									else certification(data);
								}
								else {
									// 登录绑定微信
									request({
									url: api.wechat.miniAppLogin,
									data: {
										userCode: userData.account,
										password: userData.password,
										openid: openid,
										icon: result.userInfo.avatarUrl,
									},
									method: 'POST',
									dataType: 'json',
									success: res2 => {
										if (res2.success) {
											if (certified) toHome(res2.data);
											else certification(res2.data);
										}
										else alert(res.msg);
									}
								});
							};
							} else {
								uni.showToast({
									title: '网络错误，请稍后重试',
									icon: 'none',
								});
								uni.hideLoading();
							}
						},
					});
				},
				fail: result => {
					uni.hideLoading();
				}
			});
		}
	});
};

/**
 * 网络请求
 * @param {Object} req
 */
const request = function(req) {
	let accessToken = uni.getStorageSync('accessToken');
	let openId = uni.getStorageSync('openId');
	let header = {
		'Cookie': `JSESSIONID=${accessToken}`,
		'Content-type': 'application/x-www-form-urlencoded'
	};
	if (req.header) {
		header = Object.assign(header, req.header);
	}
	uni.request({
		url: req.url,
		data: {
			...req.data,
			openId,
		},
		header: header,
		method: req.method || 'GET',
		dataType: req.dataType || 'json',
		success: function(res) {
			if (req.success) {
				req.success(res.data);
			}
		},
		fail: function(res) {
			uni.showToast({
				title: '网络异常~',
				icon: 'none'
			});
			if (req.fail) {
				req.fail(res);
			}
		},
		complete: function(res) {
			if (res.statusCode != 200) {
				if (res.code == '1000') {
					login();
				}
			}
			if (req.complete) {
				req.complete(res);
			}
		}
	});
};

/*无状态提示信息*/
const alert = function(msg = '', icon = 'none', url = '', openType = 'navigate') {
	/*消息强制转字符串*/
	if (typeof(msg) != 'string') {
		msg = msg.toString();
	}

	if (msg.length > 7) {
		//长度超过7个字符，用示模态弹窗展示
		uni.showModal({
			title: '提示',
			content: msg,
			showCancel: false
		});
	} else {
		if (icon == 'warning') {
			uni.showToast({
				title: msg,
				image: '/static/images/icon-warning.png'
			});
		} else {
			uni.showToast({
				title: msg,
				icon: icon
			});
		}
	}
	if (url || openType == 'back') {
		setTimeout(() => {
			if (openType == 'redirect') {
				uni.redirectTo({
					url: url
				});
			} else if (openType == 'switchTab') {
				uni.switchTab({
					url: url
				});
			} else if (openType == 'reLaunch') {
				uni.reLaunch({
					url: url
				});
			} else if (openType == 'back') {
				uni.navigateBack();
			} else {
				uni.navigateTo({
					url: url
				});
			}
		}, 1500);
	}
};

/*弹出加载框*/
const loading = function(msg = '', mask = true) {
	/*消息强制转字符串*/
	if (typeof(msg) != 'string') {
		msg = msg.toString();
	}
	uni.showLoading({
		title: msg,
		mask: mask
	});
};

/*获取平台类型 */
const getNaviBarHeight = function() {
	let height = '90rpx';
	// #ifdef MP
	let device = uni.getSystemInfoSync();
	console.log(device);
	if (device.system.indexOf('iOS') > -1) {
		if (device.model.indexOf('iPhone X') > -1) {
			height = '44px;margin-top: 25px;padding-bottom: 5px;';
		} else {
			height = '44px';
		}
	} else {
		height = '48px';
	}
	// #endif
	console.log(height);
	return height;
};

export default {
	isLogin,
	initLogin,
	wechatAppLogin,
	request,
	alert,
	loading,
	getNaviBarHeight,
};
