<template>
	<view class="toolbar-card">
		<!-- 上层导航 -->
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
		
		<!-- 下层内容 -->
		<view class="toolbar-bottom">
			<!-- 笔刷颜色 -->
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
			</view>
			
			<!-- 笔触粗细 -->
			<view v-if="activeNav === 'size'" class="nav-content">
				<view class="size-slider">
					<text class="size-label">笔触粗细: {{ brushSize }}</text>
					<view class="slider-container">
						<slider min="10" max="50" step="1" :value="brushSize" @change="handleSizeChange" />
					</view>
				</view>
			</view>
			
			<!-- 工具 -->
			<view v-if="activeNav === 'tool'" class="nav-content">
				<view class="toolbar-actions">
					<u-button text="添加色点" type="primary" @click="$emit('submit')"></u-button>
				</view>
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

	const emit = defineEmits(['pick-color', 'pick-size', 'submit', 'exit'])

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

	/* 下层内容样式 */
	.toolbar-bottom {
		padding-top: 10rpx;
	}

	.nav-content {
		padding: 10rpx 0;
	}

	.color-row,
	.toolbar-actions {
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

	/* 滑动输入条样式 */
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

	/* 自定义滑块样式 */
	.slider {
		width: 100%;
		height: 8rpx;
		background: #f2e7da;
		border-radius: 4rpx;
		outline: none;
		-webkit-appearance: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 32rpx;
		height: 32rpx;
		background: #d86e33;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2rpx 8rpx rgba(216, 110, 51, 0.3);
	}

	.slider::-moz-range-thumb {
		width: 32rpx;
		height: 32rpx;
		background: #d86e33;
		border-radius: 50%;
		cursor: pointer;
		border: none;
		box-shadow: 0 2rpx 8rpx rgba(216, 110, 51, 0.3);
	}
</style>
