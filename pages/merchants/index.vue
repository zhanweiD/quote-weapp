<template>
	<view class="page">
		<!-- <view class="status-bar"></view> -->
		<view class="top">
			<!-- 页面标题 -->
			<!-- 搜索 -->
			<view v-if="!loading" class="search">
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
		<view class="cate-content">
			<view class="content-left">
				<view 
					class="left-item" 
					v-for="item in cateList" 
					:class="selectCateId === item.id ? 'select-item' : ''"
					:key="item.id"
					@click="selectCate(item.id)"
				>
					{{item.name}}
				</view>
			</view>
			<view class="content-right">
				<!-- <view>
					<image :lazy-load="true" :src="selectBrandImg" mode="aspectFill"></image>
				</view> -->
				<view class="right-brand">
					<view 
						class="brand-item" 
						v-for="item in brandList" 
						:key="item.id" 
						:class="selectBrandId === item.id ? 'select-brand' : ''"
						@click="selectBrand(item)"
					>
						{{item.name}}
					</view>
				</view>
				<scroller @init="initScroller" @down="refreshData" @up="getData" :up="optUp" @scroll="navFloatShow(scroller)" :fixed="false">
					<articleList :list="productList" />
				</scroller>
			</view>
		</view>
		<pageLoading v-if="loading"></pageLoading>
	</view>
</template>

<script>
	import api from '@/config/api.js';
	import pageLoading from '@/components/loading/pageLoading.vue';
	import scroller from '@/components/scroller/scroller.vue';
	import articleList from '@/components/article/list.vue';
	
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
				cateList: [], // 分类列表
				brandList: [], // 品牌列表
				selectCateId: '', // 选中的分类
				selectBrandId: '', // 选中的品牌
				// selectBrandImg: '', // 选中的品牌icon
				loading: true,
				searchName: '',
				
				scroller: {},
				optUp: { auto: true, onScroll: true, page: { size: 10 }, empty: { tip: '暂无数据~' } },
				category_index: 0,
				showNavFloat: false,
			}
		},
		mounted() {
			this.getCate()
		},
		methods: {
			searchContent(v) {
				this.searchName = v
				this.productList = []
				this.getData()
			},
			selectCate(id) {
				this.selectCateId = id
				this.getBrand(id)
				this.productList = []
				this.selectBrandId = ''
				this.getData()
			},
			selectBrand(item) {
				this.selectBrandId = item.id
				this.proLoading = true
				this.productList = []
				this.getData()
				// this.selectBrandImg = item.icon
			},
			// 获取品牌列表
			getBrand(id) {
				this.$app.request({
					url: api.list.getBrand,
					method: 'GET',
					dataType: 'json',
					data: {
						categId: id
					},
					success: res => {
						const {data, success, message} = res
						if (success && data.length) {
							this.brandList = data
							// this.selectBrand(data[0])
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
			// 获取分类列表
			getCate() {
				this.$app.request({
					url: api.list.getCate,
					method: 'GET',
					dataType: 'json',
					success: res => {
						const {data, success, message} = res
						if (success && data.length) {
							this.cateList = data
							this.selectCate(data[0].id)
						} else {
							uni.showToast({
								title: message,
								icon: 'none',
							});
						}
					}
				})
			},
		
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
					url: this.$api.list.getData,
					data: {
						page: this.scroller.num,
						row: this.scroller.size,
						type: '1',
						categId: this.selectCateId,
						brandId: this.selectBrandId,
						name: this.searchName,
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
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
.cate-content {
	border-top: #f5f5f5 8rpx solid;
	display: flex;
	background-color: #f5f5f5;
	height: 100%;
	overflow: hidden;
	.content-left {
		width: 200rpx;
		text-align: center;
		box-sizing: border-box;
		// color: #1660f5;
		overflow: auto;
		.left-item {
			padding: 24rpx 16rpx;
		}
		.select-item {
			background-color: #fff;
			// color: #1660f5;
		}
	}
	.content-right {
		padding: 24rpx;
		width: calc(100vw - 200rpx);
		background-color: #fff;
		flex: 1;
		min-height: calc(100vh - 200rpx);
		// overflow: auto;
		.right-brand {
			display: flex;
			overflow: auto;
			.brand-item {
				margin-right: 24rpx;
				white-space: nowrap;
				color: #afafb2;
			}
			.select-brand {
				font-weight: bold;
				color: #2f5aff;
			}
		}
	}
}

/*头部*/
.top {
	/*页面标题*/
	/*搜索*/
	margin-top: 50rpx;
	.search {
		padding: 32rpx 200rpx 0 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 124rpx;
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
