let apiRoot = 'https://zhichait.com/';
// let apiRoot = 'https://life.weisite.org/api/';
let api = {
	common: {
		aboutUs: apiRoot + 'common/aboutUs.html',
		verify: apiRoot + 'common/verify.html',
	},
	merchants: {
		getMerchants: apiRoot + 'app/seller',
		getGoods: apiRoot + 'app/seller/product',
	},
	article: {
		// 新
		getImg: apiRoot + 'app/ad/pic',
		category: apiRoot + 'app/categ/query',
		getData: apiRoot + 'app/product/query',
		// getImg: 'http://8.141.52.34:10011/app/ad/pic',
		// category: 'http://8.141.52.34:10011/app/categ/query',
		// getData: 'http://8.141.52.34:10011/app/product/query',
		
		detail: apiRoot + 'article/detail.html',
		comment: apiRoot + 'article/comment.html',
		commentDetail: apiRoot + 'article/commentDetail.html',
		commentReply: apiRoot + 'article/commentReply.html',
		addComment: apiRoot + 'article/addComment.html',
		addReply: apiRoot + 'article/addReply.html',
		like: apiRoot + 'article/like.html',
		commentLike: apiRoot + 'article/commentLike.html',
		commentReplyLike: apiRoot + 'article/commentReplyLike.html',
		favorite: apiRoot + 'article/favorite.html',
	},
	list: {
		// 新
		getCate: apiRoot + 'app/categ/query',
		getBrand: apiRoot + 'app/brand/query',
		getData: apiRoot + 'app/product/query',
		getDetail: apiRoot + 'app/product/info',
		// getCate: 'http://8.141.52.34:10011/app/categ/query',
		// getBrand:'http://8.141.52.34:10011/app/brand/query',
		// getData: 'http://8.141.52.34:10011/app/product/query',
		// getDetail: 'http://8.141.52.34:10011/app/product/info'
	},
	
	user: {
		// userLogin: apiRoot + 'user/login.html',
		userLogin: apiRoot + 'user/login.html',
		register: apiRoot + 'user/register.html',
		index: apiRoot + 'user/index.html',
		userInfo: apiRoot + 'user/userInfo.html',
		updateAvatar: apiRoot + 'user/updateAvatar.html',
		upload: apiRoot + 'user/upload.html',
		setting: apiRoot + 'user/setting.html',
		updatePassword: apiRoot + 'user/updatePassword.html',
		forgot: apiRoot + 'user/forgot.html',
		updatePasswordByMobile: apiRoot + 'user/updatePasswordByMobile.html',
		feedback: apiRoot + 'user/feedback.html',
		logout: apiRoot + 'user/logout.html',
	},
	
	wechat: {
		// 新
		miniAppLogin: apiRoot + 'app/wx/login',
		mpLogin: apiRoot + 'app/wx',
		
		// miniAppLogin: 'http://8.141.52.34:10011/app/wx/login',
		// mpLogin: 'http://8.141.52.34:10011/app/wx',
		
		// devLogin: apiRoot + 'wechat/devLogin',
		// mpConfig: apiRoot + 'wechat/mpConfig',
		// miniAppLogin: apiRoot + 'wechat/miniAppLogin',
		// mpLogin: apiRoot + 'wechat/mpLogin',
		devLogin: apiRoot + 'wechat/devLogin',
		mpConfig: apiRoot + 'wechat/mpConfig',
	},
};
export default api;
