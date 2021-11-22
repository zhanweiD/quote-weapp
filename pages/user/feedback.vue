<template>
	<view class="wrap">
		<view class="content">
			<view class="list">
				<view class="item"><textarea maxlength="100" v-model="content" placeholder="请输入您的意见或建议…"></textarea></view>
				<u-button shape="circle" type="primary" @tap="save">提 交</u-button>
				<!-- <view class="button" hover-class="button-hover" @tap="save"><text>提 交</text></view> -->
			</view>
		</view>
	</view>
</template>

<script>
import iconfont from '@/components/iconfont/iconfont.vue';
export default {
	components: {
		iconfont
	},
	data() {
		return {
			content: ''
		};
	},
	onShow() {
		this.$initPageTitle();//初始化页面标题
	},
	onLoad(e) {},
	onPullDownRefresh() {},
	methods: {
		/*提交*/
		save() {
			if (this.content == '') {
				this.$alert('请输入您的意见或建议');
				return;
			}
			uni.showLoading({
				title: '提交中…'
			});
			this.$app.request({
				url: this.$api.user.feedback,
				data: {
					content: this.content
				},
				method: 'POST',
				dataType: 'json',
				success: res => {
					console.log(res);
					if (res.code == 0) {
						uni.hideLoading();
						this.$alert('提交成功');
						this.content = '';
					} else {
						this.$alert(res.msg);
					}
				},
				complete: res => {
					uni.stopPullDownRefresh();
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.list {
	position: fixed;
	width: 100%;
	padding: 24rpx;

	.item {
		padding: 50upx 40upx 20rpx;
		background: #fff;
		margin-bottom: 48rpx;
		border-radius: 24rpx;

		textarea {
			height: 350rpx;
			font-size: 32rpx;
		}
	}
}
</style>
