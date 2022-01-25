<template>
	<view class="wrap">
		<view class="content" @click="useOutClickSide">
			<view class="list">
				<view class="FBH">
					<view class="left">反馈类型</view>
					<easy-select 
						ref="easySelect" 
						size="medium" 
						:value="type" 
						@selectOne="selectOne"
						:options="options"
					></easy-select>
				</view>
				<view class="item">
					<textarea maxlength="100" v-model="content" placeholder="请输入您的意见或建议…"></textarea>
				</view>
				<u-button shape="circle" type="primary" @click="save">提 交</u-button>
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
			content: '',
			type: '',
			options: [],
		};
	},
	onShow() {
		this.$initPageTitle();//初始化页面标题
	},
	onLoad() {
		this.getFeedbackType()
	},
	methods: {
		selectOne(option) {
			this.type = option.label
		},
		useOutClickSide(e) {
			this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
		},
		
		getFeedbackType() {
			this.$app.request({
				url: this.$api.user.getFeedbackType,
				data: {
				},
				method: 'GET',
				dataType: 'json',
				success: res => {
					if (res.code == 1) {
						const {data = []} = res
						this.options = data.map(item => ({
							label: item.des,
							value: item.des,
						}))
					}
				},
				fail: res => {
				},
			});
		},
		/*提交*/
		save() {
			if (this.content == '' || this.type == '') {
				this.$alert('请完善意见信息');
				return;
			}
			uni.showLoading({
				title: '提交中…'
			});
			this.$app.request({
				url: this.$api.user.saveFeedback,
				data: {
					discr: this.content,
					type: this.type
				},
				method: 'POST',
				dataType: 'json',
				success: res => {
					if (res.code == 1) {
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
	.FBH {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		.left {
			margin-right: 24rpx;
		}
	}
	.item {
		padding: 36upx 40upx 20rpx;
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
