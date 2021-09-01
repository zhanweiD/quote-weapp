<template>
	<view class="detail-page">
		<view><image :url="data.icon"></image></view>
		<view class="detail-content">
			<view class="pro-name">{{data.name}}</view>
			<view><span class="title">商品详情:</span>{{data.params}}</view>
			<view><span class="title">商品属性:</span>{{data.typeName}}</view>
			<view>
				<span class="title">商品报价:</span>
				<span class="symbol">¥</span>
				<span class="price">{{data.price}}</span>
			</view>
			<view class="userName">{{data.userName}}</view>
		</view>
		<view class="bottom-btn">
			<view v-if="merchants === '1'" class="offer">立即报价</view>
			<view class="collection">加入收藏</view>
		</view>
		
		<pageLoading v-if="loading"></pageLoading>
	</view>
</template>

<script>
	import pageLoading from '@/components/loading/pageLoading.vue';
	
	export default {
		components: {
			pageLoading,
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.merchants = e.merchants
		},
		data() {
			return {
				id: '',
				merchants: false,
				data: {},
				loading: true,
			}
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				this.$app.request({
					url: this.$api.list.getDetail,
					method: 'GET',
					dataType: 'json',
					data: {
						productId: this.id
					},
					success: res => {
						const {data, success, message} = res
						if (success) {
							switch (data.type){
								case '1':
									data.typeName = '零售'
									break;
								case '2':
									data.typeName = '批发'
									break;
								case '3':
									data.typeName = '图片'
									break;
								default:
									data.typeName = '二手'
									break;
							}
							this.data = data
						} else {
							uni.showToast({
								title: message,
								icon: 'none',
							});
						}
						this.loading = false
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.detail-page {
	.detail-content {
		margin: 30rpx;
		color: #999;
		.pro-name {
			color: #000;
			font-size: 36rpx;
		}
		.title {
			color: #666;
			margin-right: 8rpx;
		}
		.symbol {
			color: #ff3461;
		}
		.price {
			color: #ff3461;
			font-size: 36rpx;
		}
		.userName {
			color: #000;
			border-top: 1px solid #ededed;
			margin-top: 24rpx;
			padding-top: 48rpx;
		}
	}
	.bottom-btn {
		display: flex;
		justify-content: flex-end;
		position: absolute;
		bottom: 0;
		font-size: 36rpx;
		width: 100%;
		.offer, .collection {
			width: 30%;
			height: 100rpx;
			line-height: 100rpx;
			color: #fff;
			text-align: center;
		}
		.offer {
			background: #1890ff;
		}
		.collection {
			background: #f99500;
		}
	}
}
	
</style>
