<template>
	<view class="list-home" v-if="list.length > 0">
		<navigator :url="`/pages/components/detail/detail?id=${item.id}&merchants=${0}`" class="item" v-for="(item, index) in list" :key="index" hover-class="none">
			<view class="info">
				<view class="text">
					<view class="title">{{ item.name }}</view>
					<view class="other">
						{{item.params}}
					</view>
					<view class="price">
						<span>¥</span>
						<span class="number">{{item.price}}</span>
						<span class="userInfo">{{item.userName}}</span>
					</view>
					<!-- <view class="userInfo">
						<image class="userIcon" :src="item.userIcon ? 'https://zhichait.com:9006/skin/' + item.userIcon : '/static/images/personalHeader.png'"></image>
						<view>{{item.userName}}</view>
						<image class="userIconAuth" src="/static/images/authentication.jpg"></image>
						<view>实名认证</view>
					</view> -->
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	name: 'homeList',
	props: {
		list: {
			type: Array,
			default: function(e) {
				return [];
			}
		}
	}
};
</script>

<style lang="scss">
/*文章列表*/
.list-home {
	overflow: auto;
	.item {
		background-color: #fff;
		padding: 24rpx 36rpx;
		border-radius: 36rpx;
		margin-top: 12rpx;
		.info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-bottom: 4rpx;
			.userInfo {
				color: #000;			
				margin-left: 16rpx;

				.userIcon {
					width: 64rpx;
					height: 64rpx;
					margin-right: 24rpx;
				}
				.userIconAuth {
					width: 28rpx;
					height: 32rpx;
				}
			}
			.text {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				margin-right: 40rpx;
				.price {
					color: #fe7070;
					.number {
						font-size: 36rpx;
					}
				}
				.title {
					flex-grow: 1;
					flex-shrink: 1;
					font-size: 34rpx;
					line-height: 1.5;
					display: -webkit-box;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.other {
					flex-grow: 1;
					flex-shrink: 1;
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #999;
					line-height: normal;
					margin: 12rpx 0;
					.other-conter {
						// border-left: 2rpx solid #ccc;
					}
					.other-vertical {
						color: #ccc;
					}
					
					.view {
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 5rpx;
						}
					}
				}
			}
		}
		.photo {
			image {
				height: 48rpx;
				width: 48rpx;
				border-radius: 50%;
			}
		}
		&:last-child {
			.line {
				//display: none;
			}
			//padding-bottom: 30rpx;
		}
	}
}
</style>
