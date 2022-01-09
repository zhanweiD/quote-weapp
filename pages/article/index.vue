<template>
	<view class="page">
		<view class="status-bar"></view>
		<view class="top">
			<!-- 页面标题 -->
			<!-- 搜索 -->
			<view v-if="!showPageLoading" class="search">
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
			<scroller @init="initScroller" @down="refreshData" @up="getData" :up="optUp" @scroll="navFloatShow(scroller)" :fixed="false">
				<!-- 轮播图 -->
				<view>
					<swiper v-if="slider.length > 0" class="swiper" :indicator-dots="true" :autoplay="true" :circular="true">
						<swiper-item v-for="(item, index) in slider" :key="index">
							<navigator class="item" hover-class="none" :url="'/pages/detail/detail?id=' + item.id">
								<image :lazy-load="true" :src="'https://zhichait.com/' + item" mode="aspectFill"></image>
								<view class="title">
									<text>{{ item.title }}</text>
								</view>
							</navigator>
						</swiper-item>
					</swiper>
				</view>
				<view class="navbar">
					<view
						v-for="item in navList" 
						:key="item.value" 
						class="nav-item" 
						:class="item.value === selectNavId ? 'selectNav' : ''"
						@click="changeNav(item.value)"
					>
						{{item.name}}
					</view>
				</view>
				<view class="pro-cate">
					<view
						class="cate-item" 
						v-for="item in cateList" 
						:class="selectCateId === item.id ? 'select-item' : ''"
						:key="item.id"
						@click="selectCate(item.id)"
					>
						{{item.name}}
					</view>
				</view>
				<!-- 列表 -->
				<view class="pro-list"><homeList :list="list" /></view>
			</scroller>
		</view>
		<pageLoading v-if="showPageLoading"></pageLoading>
	</view>
</template>

<script>
import scroller from '@/components/scroller/scroller.vue';
import homeList from '../components/proList/listHome.vue';
import pageLoading from '@/components/loading/pageLoading.vue';

export default {
	components: {
		homeList,
		pageLoading,
		scroller,
	},
	data() {
		return {
			scroller: {},
			optUp: { auto: true, onScroll: true, page: { size: 10 }, empty: { tip: '暂无内容~' } },
			category_id: 1,
			category_index: 0,
			currentSliderIndex: 0,
			category: [],
			slider: [],
			list: [],
			cateList: [],
			navList: [
				{name: '推荐', value: '0'},
				{name: '新品', value: '1'},
				{name: '二手', value: '2'},
				{name: '批发', value: '3'},
				{name: '图片', value: '4'},
			],
			selectNavId: '1',
			showNoData: false,
			showPageLoading: true,
			navBarHeight: '',
			barShow: true,
			searchName: '',
			selectCateId: '',
			isUpLoading: true,
		};
	},
	onShow() {
		/*导航栏高度*/
		if (this.navBarHeight == '') {
			this.navBarHeight = this.$app.getNaviBarHeight();
		}
	},
	
	onLoad(e) {
		uni.getStorage({
			key: 'openId',
			success: res => {
				this.getCategory();
				this.getImg()
			},
			fail: res => {
				uni.redirectTo({
					url: '/pages/components/wechat/miniAppLogin'
				});
			}
		})
	},
	
	onPullDownRefresh() {
		this.loadData();
	},
	methods: {
		searchContent(v) {
			this.searchName = v
			this.list = []
			this.getData()
		},
		selectCate(id) {
			this.selectCateId = id
			this.list = []
			this.getData()
		},
		// 切换一级分类
		changeNav(type) {
			this.selectNavId = type
			this.list = []
			this.getData()
		},
		
		/*初始化滚动*/
		initScroller(scroller) {
			this.scroller = scroller;
		},

		/*刷新数据*/
		refreshData() {
			// uni.showLoading({
			// 	title: '刷新中'
			// });
			this.scroller.resetUpScroll();
		},

		/*加载数据*/
		loadData() {
			this.slider = [];
			this.list = [];
			this.currentSliderIndex = 0;
			this.scroller.resetUpScroll();
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
		/*获取子类别数据*/
		getCategory() {
			this.$app.request({
				url: this.$api.article.category,
				method: 'POST',
				dataType: 'json',
				success: res => {
					const {success, data, message} = res
					if (success && data.length) {
						this.cateList = data
					} else {
						this.$alert(message);
					}
				},
			});
		},
		
		/*获取轮播图*/
		getImg() {
			this.$app.request({
				url: this.$api.article.getImg,
				method: 'GET',
				dataType: 'json',
				success: res => {
					if (res.code == 1) {
						this.slider = res.data
					} else {
						this.$alert(res.msg);
					}
					this.showPageLoading = false
				},
				complete: res => {}
			});
		},

		/*获取列表数据*/
		getData() {
			uni.getStorage({
				key: 'openId',
				success: res => {
					this.scroller.removeEmpty()
					this.scroller.showUpScroll()
					this.$app.request({
						url: this.$api.article.getData,
						data: {
							page: this.scroller.num,
							row: this.scroller.size,
							type: this.selectNavId,
							categId: this.selectCateId,
							name: this.searchName,
						},
						method: 'GET',
						dataType: 'json',
						success: res => {
							if (res.code == 1) {
								if (this.scroller.num == 1) {
									this.list = [];
								}
								this.list = this.list.concat(res.data);
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
				}
			})
		},
	}
};
</script>

<style scoped lang="scss">
page {
	height: 100%;
}
.page {
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	.status-bar, .top {
		background-color: #3B7ED5;
	}
}
.content {
	flex: 1;
	width: 100%;
	height: 100rpx;
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
.scroll {
	height: 100%;
}
/*幻灯片广告 */
.swiper {
	height: 350rpx;
	margin: 14rpx 24rpx 0;
	image {
		height: 350rpx;
		width: 100%;
		border-radius: 15rpx;
		//box-shadow: 0 0 12px #dddee1;
	}
	.current {
		width: 97%;
		height: 350rpx;
		margin: 1.5% 1.5%;
		transition: all 0.2s ease-in 0s;
	}
	.item {
		position: relative;
		.title {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			width: 100%;
			text {
				margin: 7% 6%;
				display: flex;
				align-items: center;
				color: #fff;
				display: -webkit-box;
				text-overflow: ellipsis;
				word-break: break-all;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				font-size: 34rpx;
				padding: 14rpx 20rpx;
				max-width: 610rpx;
				line-height: 1.3;
				border-radius: 5rpx;
			}
		}
	}
}

.pro-list {
	padding: 0rpx 12rpx;
	background-color: #f8f8f8;
}
.pro-cate {
	display: flex;
	overflow: auto;
	margin: 0 32rpx;
	padding-bottom: 36rpx;
	color: #666666;
	.cate-item {
		background-color: #f6f6f8;
		border-radius: 36rpx;
		padding: 8rpx 16rpx;
		margin-right: 16rpx;
		white-space: nowrap;
	}
	.select-item {
		color: #2f5aff;
	}
}
.navbar {
	display: flex;
	margin-left: 16rpx;
	color: #afafb2;
	.nav-item {
		width: 20%;
		margin: 32rpx 0;
		text-align: center;
		height: 36rpx;
		line-height: 36rpx;
	}
	.selectNav {
		color: #2f5aff;
		font-size: 36rpx;
	}
}

/deep/ .no-data {
	margin-top: 200rpx;
}
</style>
