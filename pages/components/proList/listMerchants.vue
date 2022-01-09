<template>
	<view class="list" v-if="list.length > 0">
		<navigator 
			:url="`/pages/components/detail/listProduct?id=${item.id}`" 
			class="item" 
			v-for="(item, index) in list" 
			:key="index" 
			hover-class="none"
		>
			<view class="info">
				<view class="text">
					<!-- <view class="photo"><image :src="item.photo_url" mode="aspectFill"></image></view> -->
					<view class="title">{{ item.userName }}</view>
				</view>
				<view class="mt8">{{item.phone}}</view>
				<view class="mt8">{{item.address}}</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
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
.list {
	.mt8 {
		margin-top: 8rpx;
	}
	.item {
		padding: 24rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		margin: 12rpx;
		.text {
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			flex-direction: column;
			margin-left: 40rpx;
			font-size: 40rpx;
		}
		.photo {
			image {
				height: 48rpx;
				width: 48rpx;
				border-radius: 50%;
			}
		}
	}
}
</style>
