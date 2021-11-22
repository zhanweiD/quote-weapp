<template>
	<view class="container">
		<view class="content">
			<view class="login">
				<block v-if="canIUse">
					<view class="photo"><image src="/static/images/default_user_photo.jpg" class="avatar"></image></view>
					<view class="loginForm">
						<u-form ref="loginForm" :model="loginForm">
							<u-form-item label="账号" prop="account">
								<u-input v-model="loginForm.account" placeholder="请输入账号" />
							</u-form-item>
							<u-form-item label="密码" prop="password">
								<u-input v-model="loginForm.password" type="password" :password-icon="true" placeholder="请输入密码" />
							</u-form-item>
						</u-form>
					</view>
					<view class="auth">
						<u-button shape="circle" type="primary" open-type="getUserInfo" @getuserinfo="bindGetuserInfo">登录</u-button>
						<navigator v-if="!hasAuth" class="btn-cancel" url="/pages/index/index" open-type="switchTab">取消</navigator>
					</view>
				</block>
				<block v-else><view class="upgrade">当前微信版本太低不支持该小程序部分功能，请升级微信版本</view></block>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hasAuth: true,
			canIUse: true,
			rules: {
				account: [
					{
						required: true,
						message: '请输入账号',
					},
				],
				password: [
					{
						required: true,
						message: '请输入密码',
					}
				]
			},
			loginForm: {
				account: '',
				password: '',
			}
		};
	},
	onReady() {
		this.$refs.loginForm.setRules(this.rules);
	},
	onLoad() {
		this.canIUse = uni.canIUse('button.open-type.getUserInfo');
		/*是否授权*/
		uni.getSetting({
			success: res => {
				console.log(res)
				/*已经授权直接登录*/
				if (res.authSetting['scope.userInfo']) {
					// this.$app.wechatAppLogin(true); //登录
				} else {
					this.hasAuth = false;
				}
			}
		});
	},
	methods: {
		submit() {
			this.$refs.loginForm.validate(valid => {
				console.log(valid)
				// if (valid) {
				// 	console.log('验证通过');
				// } else {
				// 	console.log('验证失败');
				// }
			});
		},
		bindGetuserInfo() {
			this.submit()
			console.log(this.loginForm)
			this.$app.wechatAppLogin(true, this.loginForm); //登录
		}
	}
};
</script>

<style lang="scss" scoped>
.login {
	view {
		padding: 50rpx;
		text-align: center;
		image {
			width: 250rpx;
			height: 250rpx;
		}
	}
	.loginForm {
		text-align: left;
		padding: 78rpx;
	}
	.auth {
		.btn-cancel {
			margin-top: 20rpx;
			border-radius: 100px;
			font-size: 32rpx;
			color: #999;
		}
	}

	.upgrade {
		font-size: 30rpx;
	}
}

button::after {
	border: 0;
}
</style>
