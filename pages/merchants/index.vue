<template>
	<view class="page">
		<view class="status-bar"></view>
		<view class="top">
			<!-- 页面标题 -->
			<!-- 搜索 -->
			<view class="search">
				<u-search :show-action="false" @search="searchContent()" placeholder="iphone 12" height="70"></u-search>
			</view>
			<u-notice-bar  
				:show="barShow"
				type="primary" 
				mode="horizontal" 
				:close-icon="true"
				:speed="100"
				@close="barShow = false"
				:list="['点击右上方添加到我的小程序,微信首页下拉即可快速访问']"
			></u-notice-bar>
		</view>
		<view class="content">
			<scroller 
				@init="initScroller" 
				@down="refreshData" 
				@up="getData" 
				:up="optUp" 
				@scroll="navFloatShow(scroller)" 
				:fixed="false"
				class="list-content"
			>
				<articleList :list="productList" />
			</scroller>
		</view>
		<!-- <pageLoading v-if="loading"></pageLoading> -->
	</view>
</template>

<script>
	import api from '@/config/api.js';
	import pageLoading from '@/components/loading/pageLoading.vue';
	import scroller from '@/components/scroller/scroller.vue';
	import articleList from '../components/proList/listMerchants.vue';
	
	export default {
		components: {
			pageLoading,
			scroller,
			articleList,
		},
		data() {
			return {
				productList: [], // 商品列表
				selectProductId: '', // 选中的商品列表
				loading: true,
				searchName: '',
				
				scroller: {},
				optUp: { auto: true, onScroll: true, page: { size: 10 }, empty: { tip: '暂无数据~' } },
				showNavFloat: false,
			}
		},
		
		methods: {
			/*初始化滚动*/
			initScroller(scroller) {
				this.scroller = scroller;
			},
			/*刷新数据*/
			refreshData() {
				uni.showLoading({
					title: '刷新中'
				});
				this.scroller.resetUpScroll();
			},
			/*加载数据*/
			loadData() {
				this.list = [];
				this.scroller.resetUpScroll();
			},
			
			/*获取列表数据*/
			getData() {
				this.scroller.removeEmpty()
				this.scroller.showUpScroll()
				
				this.$app.request({
					url: this.$api.merchants.getMerchants,
					data: {
						page: this.scroller.num,
						row: this.scroller.size,
					},
					method: 'GET',
					dataType: 'json',
					success: res1 => {
						const res = {
							code: 1,
							count: 7,
							data: [{
								name: '111',
								phone: 18848895880,
								dizhi: '菩提院',
							}, {
								name: '222',
								phone: 18848895880,
								dizhi: '菩提院',
							}],
							success: true
						}
						if (res.code == 1) {
							if (this.scroller.num == 1) {
								this.productList = [];
							}
							this.productList = this.productList.concat(res.data);
							this.scroller.endByPage(res.data.length, Math.ceil(res.count / this.scroller.size));
						} else {
							this.scroller.endSuccess();
							this.$alert(res.msg);
						}
					},
					fail: res => {
						this.scroller.endErr();
					},
					complete: res => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				});
			},
			/*滚动时导航栏浮动*/
			navFloatShow(scroller) {
				if (scroller) {
					if (scroller.scrollTop > 60) {
						if (!this.showNavFloat) {
							this.showNavFloat = true;
						}
					} else {
						if (this.showNavFloat) {
							this.showNavFloat = false;
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.page {
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
}
.content {
	flex: 1;
	width: 100%;
	height: 100rpx;
	display: flex;
	background-color: #f5f5f5;
	border-top: #f5f5f5 8rpx solid;
}
.list-content {
	width: 100%;
}

/*头部*/
.top {
	/*页面标题*/
	/*搜索*/
	.search {
		margin: 0rpx 200rpx 0rpx 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		z-index: 9999;
		.logo {
			height: 60rpx;
			width: 474rpx;
			margin-right: 30rpx;
		}
		.input {
			margin-left: 0 !important;
			display: flex;
			align-items: center;
			height: 70rpx;
			width: 100%;
			background: #f5f5f5;
			border-radius: 34rpx;
			/deep/ .icon {
				margin-left: 28rpx;
				color: #aaaaaa;
				font-size: 32rpx;
				line-height: 1;
			}
			text {
				margin-left: 14rpx;
				font-size: 30rpx;
				color: #aaaaaa;
				line-height: 1;
			}
		}
		.user{
			display: flex;
			align-items: center;
			/deep/ .icon {
				margin-left: 24rpx;
				color: #aaaaaa;
				font-size: 38rpx;
				margin-top: 4rpx;
			}
			image{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				margin-left: 25rpx;
			}
		}
	}
}
</style>
