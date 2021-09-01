<template>
	<view class="page">
		<view class="content" :class="selectId === 0 ? 'content-select' : ''" @click="selectTopUp(0)">
			<view>充值一个月</view>
			<view>
				<view class="present-price">¥100.00</view>
				<view class="original-price">¥120.00</view>
			</view>
		</view>
		<view class="content" :class="selectId === 1 ? 'content-select' : ''" @click="selectTopUp(1)"> 
			<view>充值三个月</view>
			<view>
				<view class="present-price">¥540.00</view>
				<view class="original-price">¥560.00</view>
			</view>
		</view>
		<view class="content" :class="selectId === 2 ? 'content-select' : ''" @click="selectTopUp(2)">
			<view>充值六个月</view>
			<view>
				<view class="present-price">¥960.00</view>
				<view class="original-price">¥980.00</view>
			</view>
		</view>
		<view class="footer-btn">
			<u-button shape="circle" type="primary">充值</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectId: 0,
		};
	},
	onShow() {
	},
	methods: {
		// 选中充值项
		selectTopUp(id) {
			this.selectId = id
		},
		/*获取数据*/
		getData() {
			this.$app.request({
				url: this.$api.article.favoriteList,
				data: {
				},
				method: 'POST',
				dataType: 'json',
				success: res => {
					if (res.code == 0) {
					} else {
					}
				},
				fail: res => {
				},
			});
		}
	}
};
</script>

<style scoped lang="scss">
.page {
	background-color: #eee;
	.content-select {
		border: 2rpx solid #3b9bff;
		background-color: #d7ebff;
	}
}
.content {
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 40rpx;
	color: #666;
	background-color: #fff;
	padding: 24rpx 0;
	margin: 36rpx;
	border-radius: 24rpx;
	border: 2rpx solid #eee;
	.present-price {
		font-size: 48rpx;
		font-weight: 500;
		color: #000;
	}
	.original-price {
		font-size: 32rpx;
		text-decoration:line-through;
	}
}
.footer-btn {
	margin: 36rpx 36rpx;
	position: absolute;
	width: 90%;
	bottom: 36rpx;
}
</style>