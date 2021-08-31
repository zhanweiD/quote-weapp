let apiRoot = 'https://zhichait.com/';
// let apiRoot = 'https://life.weisite.org/api/';
let api = {
	common: {
		aboutUs: apiRoot + 'common/aboutUs.html',
		verify: apiRoot + 'common/verify.html',
	},
	article: {
		// 新
		index: apiRoot + 'app/ad/pic',
		
		category: apiRoot + 'article/category.html',
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
		// favoriteList: apiRoot + 'article/favoriteList.html',
		// index: apiRoot + 'article/index.html',
		// category: apiRoot + 'article/category.html',
		// detail: apiRoot + 'article/detail.html',
		// comment: apiRoot + 'article/comment.html',
		// commentDetail: apiRoot + 'article/commentDetail.html',
		// commentReply: apiRoot + 'article/commentReply.html',
		// addComment: apiRoot + 'article/addComment.html',
		// addReply: apiRoot + 'article/addReply.html',
		// like: apiRoot + 'article/like.html',
		// commentLike: apiRoot + 'article/commentLike.html',
		// commentReplyLike: apiRoot + 'article/commentReplyLike.html',
		// favorite: apiRoot + 'article/favorite.html',
		// favoriteList: apiRoot + 'article/favoriteList.html',
	},
	list: {
		// 新
		getCate: apiRoot + 'app/categ/query',
		getBrand: apiRoot + 'app/brand/query',
		getData: apiRoot + 'app/product/query'
	},
	user: {
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
		miniAppLogin: apiRoot + 'wx/login',
		mpLogin: apiRoot + 'app/wx',
		// devLogin: apiRoot + 'wechat/devLogin',
		// mpConfig: apiRoot + 'wechat/mpConfig',
		// miniAppLogin: apiRoot + 'wechat/miniAppLogin',
		// mpLogin: apiRoot + 'wechat/mpLogin',
		devLogin: apiRoot + 'wechat/devLogin',
		mpConfig: apiRoot + 'wechat/mpConfig',
	},
};
export default api;
