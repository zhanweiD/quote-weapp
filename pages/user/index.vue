<template>
	<view class="wrap">
		<view class="status-bar"></view>
		<view class="content">
			<view class="user-info">
				<view class="avatar" :class="[user.userid > 0 && !user.icon ? 'default-avatar' : '']">
					<image src="/static/images/default_user_photo.jpg"></image>
				</view>
				<view class="info">
					<view class="btn-login" @tap="login()">{{ user.realname || loginText }}</view>
				</view>
			</view>
			
			<view class="middle-info">
				<view class="info-money">
					<view>0.00</view>
					<view>余额（元）</view>
				</view>
				<view class="info-money">
					<view>2020-12-12</view>
					<view>会员到期时间</view>
				</view>
			</view>
			<view class="nav">
				<view class="list">
					<navigator class="item" url="/pages/user/topUp">
						<view class="info">
							<view class="name">
								<image class="info-icon" src="/static/images/icon1.png"></image>
								<!-- <iconfont type="user-info"></iconfont> -->
								<text>我的充值中心</text>
							</view>
							<iconfont type="go"></iconfont>
						</view>
					</navigator>
					<navigator class="item" url="/pages/user/topUp">
						<view class="info">
							<view class="name">
								<image class="info-icon" src="/static/images/icon2.png"></image>
								<!-- <iconfont type="star-o"></iconfont> -->
								<text>我的商品</text>
							</view>
							<iconfont type="go"></iconfont>
						</view>
					</navigator>
				</view>
				<view class="list">
					<navigator class="item" url="/pages/user/feedback">
						<view class="info">
							<view class="name">
								<image class="info-icon" src="/static/images/icon3.png"></image>
								<!-- <iconfont type="feedback"></iconfont> -->
								<text>意见建议</text>
							</view>
							<iconfont type="go"></iconfont>
						</view>
					</navigator>
					<navigator class="item" url="/pages/user/about">
						<view class="info">
							<view class="name">
								<image class="info-icon" src="/static/images/icon4.png"></image>
								<!-- <iconfont type="about"></iconfont> -->
								<text>关于报价平台</text>
							</view>
							<iconfont type="go"></iconfont>
						</view>
					</navigator>
					<view class="item" @click="certification">
						<view class="info">
							<view class="name">
								<image class="info-icon" src="/static/images/icon4.png"></image>
								<!-- <iconfont type="about"></iconfont> -->
								<text>认证</text>
							</view>
							<iconfont type="go"></iconfont>
						</view>
					</view>
				</view>
			</view>
			<!-- <text @click="certification">认证</text> -->
			<view class="tab-bar"></view>
		</view>
		<view class="logout">
			<u-button type="primary" @click="logout()">退出登录</u-button>
		</view>
		<pageLoading v-if="showPageLoading"></pageLoading>
	</view>
</template>

<script>
import iconfont from '@/components/iconfont/iconfont.vue';
import pageLoading from '@/components/loading/pageLoading.vue';
import api from '@/config/api.js';

export default {
	components: {
		iconfont,
		pageLoading
	},
	data() {
		return {
			user: {},
			loginText: '登录',
			showPageLoading: false, 
		};
	},
	mounted() {
		uni.getStorage({
			key: 'userInfo',
			success: res => {
				console.log(this)
				this.user = res.data
			}
		})
	},
	onLoad() {
		uni.getStorage({
			key: 'openId',
			success: res => {
				if (!res.data) {
					uni.redirectTo({
						url: '/pages/components/wechat/miniAppLogin'
					});
				}
			}
		})
	},
	
	methods: {
		/*登录*/
		login() {
			if (!this.user.userId) {
				uni.redirectTo({
					url: '/pages/components/wechat/miniAppLogin'
				});
			}
		},
		
		certification() {
			console.log(111)
		},

		/*退出登录*/
		logout() {
			uni.showModal({
				title: '提示',
				content: '确定退出登录吗？',
				confirmText: '是',
				cancelText: '否',
				success: res => {
					if (res.confirm) {
						uni.clearStorage();
						uni.redirectTo({
							url: '/pages/components/wechat/miniAppLogin'
						});
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.top {
	/*页面标题*/
	.page-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90rpx;
		text-align: center;
		z-index: 9999;
		font-size: 38rpx;
		font-weight: bold;
		color: #ffffff;
	}
}
.logout{
	padding: 108rpx 48rpx;
}
.user-info {
	background: #3B7ED5;
	height: 280rpx;
	padding: 64rpx 32rpx;
	display: flex;
	align-item: center;
	justify-content: space-between;
	.avatar {
		flex-grow: 0;
		flex-shrink: 0;
		line-height: 0;
		border-radius: 50%;
		image {
			width: 144rpx;
			height: 144rpx;
			border-radius: 50%;
			border: 1rpx solid #fff;
		}
	}
	.default-avatar {
		margin-top: -12rpx;
	}
	.info {
		flex-grow: 1;
		flex-shrink: 1;
		padding-left: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.info-icon {
			width: 48rpx;
			height: 48rpx;
		}
		.nickname {
			font-size: 44rpx;
			color: #ffffff;
			margin-top: -14rpx;
		}
		.mobile {
			font-size: 34rpx;
			color: #fff;
			display: flex;
			align-items: center;
			line-height: normal;
			/deep/ .icon {
				margin-left: 30rpx;
				font-size: 28rpx;
				display: block;
			}
		}
		.user-type {
			display: flex;
			margin-top: 6rpx;
			text {
				font-size: 24rpx;
				color: #fff;
				background-color: #cd8202;
				padding: 0 24rpx;
				border-radius: 55px;
			}
		}
		.btn-login {
			font-size: 36rpx;
			background: transparent;
			color: #fff;
			text-align: left;
			// width: 200rpx;
		}
	}
	.setting {
		flex-grow: 0;
		flex-shrink: 0;
		.btn-setting {
			margin-top: 10rpx;
			/deep/ .icon {
				color: #fff;
				font-size: 48rpx;
			}
		}
	}
}
.middle-info {
	display: flex;
	background-color: #FFFFFF;
	justify-content: space-around;
	margin-bottom: 36rpx;
	.info-money {
		padding: 36rpx 0;
		text-align: center;
	}
}
.nav {
	margin-top: -15rpx;
	margin-bottom: calc(var(--window-bottom) + 20rpx);
	.list {
		margin-top: 0rpx;
		// margin-bottom: 20rpx;
		.item {
			padding-left: 24rpx;
			background: #ffffff;
			.info {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #e9ebee;
				padding: 4rpx 24rpx 4rpx 0;
				height: 100rpx;
				.name {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					font-size: 34rpx;
					line-height: normal;
					image {
						width: 45rpx;
						height: 45rpx;
						margin-right: 16rpx;
					}
					/deep/ .icon {
						color: #3B7ED5;
						font-size: 44rpx;
						margin-right: 16rpx;
						line-height: normal;
					}
					/deep/ .icon-car {
						font-size: 35rpx;
						margin-right: 14rpx;
					}

					/deep/ .icon-profile-o {
						font-size: 48rpx;
						margin-right: 12rpx;
					}

					/deep/ .icon-user-info {
						font-size: 50rpx;
						margin-left: -5rpx;
						margin-right: 10rpx;
					}
					/deep/ .icon-favorite {
						font-size: 42rpx;
					}
					/deep/ .icon-about {
						font-size: 44rpx;
						margin-left: -4rpx;
						margin-right: 12rpx;
					}
					/deep/ .icon-question {
						margin-right: 16rpx;
					}
				}

				/deep/ .icon {
					color: #c1c4c9;
					font-size: 24rpx;
				}
			}
		}
	}
}
.status-bar {
	background: #3B7ED5;
}
</style>
