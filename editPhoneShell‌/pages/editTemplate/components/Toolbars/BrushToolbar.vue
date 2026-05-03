<template>
	<view class="toolbar-card">
		<view class="toolbar-top">
			<view class="toolbar-top-left">
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'color' }" @click="activeNav = 'color'">
					笔刷颜色
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'size' }" @click="activeNav = 'size'">
					笔触粗细
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>
		</view>
		
		<view class="toolbar-bottom">
			<view v-if="activeNav === 'color'" class="nav-content">
				<view class="color-row">
					<view
						v-for="item in colors"
						:key="item"
						class="color-chip"
						:style="{ backgroundColor: item }"
						:class="{ 'color-chip--active': brushColor === item }"
						@click="$emit('pick-color', item)"
					></view>
				</view>
				<view class="brush-hint">在画布上拖动绘制线条</view>
			</view>
			
			<view v-if="activeNav === 'size'" class="nav-content">
				<view class="size-slider">
					<text class="size-label">笔触粗细: {{ brushSize }}</text>
					<view class="slider-container">
						<slider min="10" max="50" step="1" :value="brushSize" @change="handleSizeChange" />
					</view>
				</view>
				<view class="brush-hint">在画布上拖动绘制线条</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const activeNav = ref('color')
	
	defineProps({
		colors: {
			type: Array,
			default: () => []
		},
		brushColor: {
			type: String,
			default: '#ff7b54'
		},
		brushSize: {
			type: Number,
			default: 28
		}
	})

	const emit = defineEmits(['pick-color', 'pick-size', 'exit'])

	function handleSizeChange(e) {
		emit('pick-size', e.detail.value)
	}
</script>

<style scoped>
	.toolbar-card {
		padding: 24rpx;
		border-radius: 32rpx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 18rpx 60rpx rgba(80, 56, 30, 0.08);
	}

	.toolbar-bottom {
		padding-top: 10rpx;
	}

	.nav-content {
		padding: 10rpx 0;
	}

	.color-row {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		align-items: center;
	}

	.color-chip {
		width: 48rpx;
		height: 48rpx;
		border-radius: 999rpx;
		border: 4rpx solid transparent;
	}

	.color-chip--active {
		border-color: #f2e7da;
		box-shadow: 0 0 0 4rpx #d86e33;
	}

	.size-slider {
		padding: 10rpx 0;
	}

	.size-label {
		display: block;
		margin-bottom: 16rpx;
		font-size: 24rpx;
		color: #6d594d;
		text-align: center;
	}

	.slider-container {
		padding: 0 20rpx;
	}

	.brush-hint {
		margin-top: 16rpx;
		font-size: 22rpx;
		color: #9a8a7e;
		text-align: center;
	}
</style>
