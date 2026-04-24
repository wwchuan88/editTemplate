<template>
	<view class="page">
		<u-notice-bar text="店管家UI 已接入，这里是一个首页示例" bgColor="#fff7e6" color="#9a5a00"></u-notice-bar>

		<view class="hero">
			<text class="hero__eyebrow">店管家</text>
			<text class="hero__title">在 店管家 页面里直接使用组件</text>
			<text class="hero__desc">配置 easycom 后，不需要单独 import，标签直接写成 u-组件名 就可以。</text>
		</view>

		<u-card title="常用组件示例" sub-title="pages/index/index.vue">
			<template #body>
				<view class="section">
					<u-line-progress :percentage="progress" activeColor="#e86f2d"></u-line-progress>
					<text class="tip">当前演示进度：{{ progress }}%</text>
				</view>

				<u-cell-group>
					<u-cell title="组件库版本" :value="version"></u-cell>
					<u-cell title="当前选中" :value="currentActionText"></u-cell>
				</u-cell-group>

				<view class="actions">
					<u-button type="primary" text="切换状态" @click="toggleAction"></u-button>
					<u-button plain text="打开弹窗" @click="showPopup = true"></u-button>
					<u-button type="success" plain text="进度 +10" @click="addProgress"></u-button>
				</view>
			</template>
		</u-card>

		<u-popup :show="showPopup" mode="bottom" round="16" @close="showPopup = false">
			<view class="popup">
				<text class="popup__title">uview-plus 使用方式</text>
				<text class="popup__item">1. 在 main.js 里通过 app.use(uviewPlus) 注册插件</text>
				<text class="popup__item">2. 在 pages.json 里配置 easycom 映射</text>
				<text class="popup__item">3. 页面中直接写 u-button、u-card 这类标签</text>
				<view class="popup__btn">
					<u-button type="primary" text="我知道了" @click="showPopup = false"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: '3.8.9',
				progress: 65,
				showPopup: false,
				actions: ['待开始', '开发中', '已完成'],
				currentActionIndex: 0
			}
		},
		computed: {
			currentActionText() {
				return this.actions[this.currentActionIndex]
			}
		},
		onLoad() {
		},
		methods: {
			toggleAction() {
				this.currentActionIndex = (this.currentActionIndex + 1) % this.actions.length
			},
			addProgress() {
				this.progress = this.progress >= 100 ? 10 : this.progress + 10
			}
		}
	}
</script>

<style>
	page {
		background: linear-gradient(180deg, #fff8ef 0%, #f6f1ea 100%);
	}

	.page {
		min-height: 100vh;
		padding: 24rpx;
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding: 36rpx 12rpx 28rpx;
	}

	.hero__eyebrow {
		font-size: 24rpx;
		letter-spacing: 4rpx;
		color: #b66a2c;
		text-transform: uppercase;
	}

	.hero__title {
		font-size: 48rpx;
		font-weight: 700;
		line-height: 1.3;
		color: #2f241f;
	}

	.hero__desc {
		font-size: 28rpx;
		line-height: 1.7;
		color: #6c5b52;
	}

	.section {
		margin-bottom: 24rpx;
	}

	.tip {
		display: block;
		margin-top: 16rpx;
		font-size: 24rpx;
		color: #7b6a60;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		margin-top: 24rpx;
	}

	.popup {
		padding: 36rpx 32rpx 48rpx;
		background: #fffaf5;
	}

	.popup__title {
		display: block;
		margin-bottom: 24rpx;
		font-size: 34rpx;
		font-weight: 700;
		color: #2f241f;
	}

	.popup__item {
		display: block;
		margin-bottom: 16rpx;
		font-size: 28rpx;
		line-height: 1.7;
		color: #5d4a40;
	}

	.popup__btn {
		margin-top: 24rpx;
	}
</style>
