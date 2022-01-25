<template>
	<view class="page">
		<view 
			class="content" 
			v-for="(item, index) in list"
			:key="index" 
			:class="selectId === item.code ? 'content-select' : ''" 
			@click="selectTopUp(item)"
		>
			<view>{{ item.name }}</view>
			<view>
				<view class="present-price">{{ `¥${item.presentPrice}` }}</view>
				<view class="original-price">{{ `¥${item.originalPrice}` }}</view>
			</view>
		</view>
		<!-- <view class="content" :class="selectId === 1 ? 'content-select' : ''" @click="selectTopUp(1)"> 
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
		</view> -->
		<view class="footer-btn">
			<u-button shape="circle" type="primary" @click="topUp">充 值</u-button>
		</view>
	</view>
</template>

<script>
import MD5 from '@/common/sdk/md5.js';

export default {
	data() {
		return {
			selectId: '',
			list: [],
			originalPrice: 0,
			price: 0,
		};
	},
	onLoad() {
		this.topUpInfo()
	},
	methods: {
		// 选中充值项
		selectTopUp(item) {
			this.selectId = item.code
			this.price = item.presentPrice
		},
		topUp() {
			this.$app.request({
					url: this.$api.wechat.payorder,
					data: {
						dictCode: this.selectId,
						// price: this.price,
						price: 0.01,
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						if (res.code == 1) {
							console.log(res)
							const stringA=`nonceStr=${Date.now()}&package=prepay_id=${res.data.prepay_id}&timeStamp=${Date.now()}&key=KoZIhvcNAQEBBQADggEPADCCAQoCggE5`
							console.log(stringA)
							console.log(MD5(stringA))
							// app_id=wx08844cb78d30859a&mch_id=1614064413&
							wx.requestPayment({
								// "app_id": 'wx08844cb78d30859a',
								// "mch_id": '1614064413',
								"timeStamp": Date.now() + '',
								"nonceStr": Date.now() + '',
								"package": `prepay_id=${res.data.prepay_id}`,
								"signType": "MD5",
								"paySign": MD5(stringA).toUpperCase(),
								"success":function(res){
									console.log(res)
								},
								"fail":function(res){
									console.log(res)
								},
								"complete":function(res){
									console.log(res)
								}
							})
						}
					},
					fail: res => {
					},
				});
		},
		/*获取数据*/
		topUpInfo() {
			this.$app.request({
				url: this.$api.wechat.payment,
				data: {
				},
				method: 'GET',
				dataType: 'json',
				success: res => {
					if (res.code == 1) {
						const newList = res.data
						this.originalPrice = +res.data[0].des
						newList.splice(0, 1)
						this.list = newList.map((item, index) => {
							switch (index){
								case 0:
									item.originalPrice = this.originalPrice * 1
									item.presentPrice = this.originalPrice * 1 * item.des
									break;
								case 1:
									item.originalPrice = this.originalPrice * 3
									item.presentPrice = this.originalPrice * 3 * (item.des * 10) / 10
									break;
								default:
									item.originalPrice = this.originalPrice * 12
									item.presentPrice = this.originalPrice * 12 * (item.des * 10) / 10
									break;
							}
							return item
						})
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