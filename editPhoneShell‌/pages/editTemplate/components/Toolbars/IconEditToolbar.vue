<template>
	<view class="toolbar-card">
		<view class="toolbar-top">
			<view class="toolbar-top-left">
				<view class="nav-item nav-item--active">图标颜色</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>
		</view>

		<view class="toolbar-bottom">
			<view class="color-row">
				<view v-for="item in colors" :key="item" class="color-chip" :style="{ backgroundColor: item }"
					:class="{ 'color-chip--active': iconColor === item }" @click="$emit('pick-color', item)"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	iconColor: {
		type: String,
		default: '#2f241f'
	},
	colors: {
		type: Array,
		default: () => [
			'#2f241f', '#d86e33', '#df5f6c', '#ef7998', '#ff9f1c', '#f0b429',
			'#5b8def', '#00d4aa', '#9b59b6', '#34495e', '#7f8c8d', '#c0392b'
		]
	}
})

defineEmits(['pick-color', 'exit'])
</script>

<style scoped>
.toolbar-card {
	width: 750rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
}

.toolbar-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2rpx solid #f2e7da;
	margin-bottom: 20rpx;
}

.toolbar-top-left {
	display: flex;
	gap: 56rpx;
}

.nav-item {
	font-size: 26rpx;
	color: #826c60;
	cursor: pointer;
	transition: all 0.3s ease;
	padding: 16rpx 0;
}

.nav-item--active {
	color: #d86e33;
	font-weight: 600;
	border-bottom: 2rpx solid #d86e33;
}

.toolbar-top-right {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	justify-content: center;
}

.toolbar-top-right-exit {
	display: flex;
	width: 55rpx;
	height: 55rpx;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 4px 6px 0 #cccccc;
}

.toolbar-bottom {
	padding: 20rpx 24rpx;
}

.color-row {
	display: flex;
	gap: 16rpx;
	flex-wrap: wrap;
}

.color-chip {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	border: 2rpx solid #f2e7da;
}

.color-chip--active {
	border-color: #f2e7da;
	box-shadow: 0 0 0 4rpx #d86e33;
}
</style>
