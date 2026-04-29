<template>
	<view class="sidebar" :class="{ 'sidebar--visible': visible }">
		<view class="sidebar-header">
			<view class="close-icon" @click="$emit('close')">
				<text class="close-icon__text">‹</text>
			</view>
		</view>
		<view class="sidebar-content">
			<view
				v-for="tool in tools"
				:key="tool.key"
				class="tool-item"
				:class="{ 'tool-item tool-item--active': currentTool === tool.key }"
				@click="$emit('select', tool.key)"
			>
				<text class="tool-item__icon">{{ getToolIcon(tool.key) }}</text>
				<text class="tool-item__label">{{ tool.label }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	const toolIcons = {
		text: '📝',
		icon: '🎭',
		upload: '🖼️',
		filter: '🎨',
		brush: '🖌️'
	}

	function getToolIcon(key) {
		return toolIcons[key] || '📌'
	}

	defineProps({
		currentTool: {
			type: String,
			default: 'default'
		},
		tools: {
			type: Array,
			default: () => []
		},
		visible: {
			type: Boolean,
			default: false
		}
	})

	defineEmits(['select', 'close'])
</script>

<style scoped>
	.sidebar {
		width: 132rpx;
		background: #fff;
		border-radius: 0 24rpx 24rpx 0;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 50%;
		left: -132rpx;
		transform: translateY(-50%);
		transition: left 0.3s ease;
		z-index: 1000;
		overflow: hidden;
	}

	.sidebar--visible {
		left: 0;
	}

	.sidebar-header {
		padding: 16rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.close-icon {
		width: 40rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-radius: 50%;
		transition: background-color 0.2s ease;
	}

	.close-icon:hover {
		background-color: #f5f5f5;
	}

	.close-icon__text {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		transform: rotate(0deg);
		transition: transform 0.2s ease;
	}

	.close-icon:hover .close-icon__text {
		transform: rotate(15deg);
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding: 16rpx 0;
	}

	.tool-item {
		padding: 24rpx 12rpx;
		border-radius: 0 24rpx 24rpx 0;
		background: #f8f8f8;
		margin: 0 12rpx;
		transition: all 0.2s ease;
	}


	.tool-item--active {
		background: linear-gradient(135deg, #ea7c42 0%, #e45d47 100%);
	}

	.tool-item__label {
		display: block;
		font-size: 24rpx;
		line-height: 1.4;
		text-align: center;
		color: #473126;
	}

	.tool-item__icon {
		display: block;
		font-size: 32rpx;
		margin-bottom: 8rpx;
		text-align: center;
	}

	.tool-item--active .tool-item__label {
		color: #fff9f2;
		font-weight: 700;
	}
</style>
