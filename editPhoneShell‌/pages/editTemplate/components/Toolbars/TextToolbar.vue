<template>
	<view class="toolbar-card">
		<text class="iconfont toolbar-card-icondown" :class="isExpanded ? 'icon-down' : 'icon-up icon-down'"
			@click="togglePanel"></text>
		<!-- 上层导航 -->
		<view v-if="isExpanded" class="toolbar-top">
			<view class="toolbar-top-left">
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'font' }"
					@click="activeNav = 'font'">
					字体选择
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'size' }"
					@click="activeNav = 'size'">
					字体大小
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'color' }"
					@click="activeNav = 'color'">
					字体颜色
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>
		</view>

		<!-- 下层内容 -->
		<view v-if="isExpanded" class="toolbar-bottom">
			<!-- 字体选择 -->
			<view v-if="activeNav === 'font'" class="nav-content">
				<view class="font-scroll-container">
					<scroll-view scroll-x="true" style="width: 100%;" show-scrollbar="true">
						<view class="font-list">
							<view v-for="item in fonts" :key="item.value" class="font-item"
								:class="{ 'font-item--active': textFont === item.value }"
								@click="$emit('pick-font', item.value)">
								<view class="font-item-preview" :style="{ fontFamily: item.value }">Aa</view>
								<view class="font-item-name">{{ item.label }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 字体大小 -->
			<view v-if="activeNav === 'size'" class="nav-content">
				<view class="size-slider">
					<view class="size-slider-content">
						<text class="size-label">字体大小： {{ textSize }}</text>
						<view class="slider-container">
							<slider min="12" max="60" step="1" :value="textSize" @change="handleSizeChange" />
						</view>
					</view>
				</view>
				<view class="bold-switch">
					<text class="bold-label">是否加粗： </text>
					<switch :checked="textBold" @change="handleBoldChange" color="#d86e33" />
				</view>
			</view>

			<!-- 字体颜色 -->
			<view v-if="activeNav === 'color'" class="nav-content">
				<view class="color-row">
					<view v-for="item in colors" :key="item" class="color-chip" :style="{ backgroundColor: item }"
						:class="{ 'color-chip--active': textColor === item }" @click="$emit('pick-color', item)"></view>
				</view>
			</view>


		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const activeNav = ref('font')
const isExpanded = ref(true)

function togglePanel() {
	isExpanded.value = !isExpanded.value
}

const props = defineProps({
	textDraft: {
		type: String,
		default: ''
	},
	textColor: {
		type: String,
		default: '#2f241f'
	},
	textSize: {
		type: Number,
		default: 30
	},
	textFont: {
		type: String,
		default: 'Microsoft YaHei'
	},
	textBold: {
		type: Boolean,
		default: false
	},
	colors: {
		type: Array,
		default: () => [
			
		]
	},
	fonts: {
		type: Array,
		default: () => [
			{ label: '微软雅黑', value: 'Microsoft YaHei' },
			{ label: '宋体', value: 'SimSun' },
			{ label: '黑体', value: 'SimHei' },
			{ label: '楷体', value: 'KaiTi' },
			{ label: '华文细黑', value: 'STXihei' },
			{ label: '苹方', value: 'PingFang SC' },
			{ label: 'Arial', value: 'Arial' },
			{ label: 'Helvetica', value: 'Helvetica' },
			{ label: 'Times New Roman', value: 'Times New Roman' },
			{ label: 'Courier New', value: 'Courier New' }
		]
	},
	isEditing: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update-draft', 'pick-color', 'change-size', 'pick-font', 'toggle-bold', 'submit', 'exit'])

function handleSizeChange(e) {
	emit('change-size', e.detail.value - props.textSize)
}

function handleBoldChange(e) {
	emit('toggle-bold', e.detail.value)
}
</script>

<style scoped>


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

.font-scroll-container {
	width: 100%;
	overflow: hidden;
}

.font-list {
	display: flex;
	flex-direction: row;
	gap: 16rpx;
	padding-bottom: 10rpx;
}

.font-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16rpx;
	border-radius: 40rpx;
	background: #f0f1f1;
	border: 2rpx solid transparent;
	min-width: 120rpx;
}

.font-item--active {
	border-color: #166665;
	background: #d6eaea;
}

.font-item-preview {
	font-size: 32rpx;
	font-weight: 600;
	margin-bottom: 8rpx;
	color: #2f241f;
}

.font-item-name {
	font-size: 20rpx;
	color: #666;
	text-align: center;
	line-height: 1.2;
}

.size-slider {
	width: 100%;
}

.size-label {
	display: block;
	font-size: 24rpx;
	color: #2f241f;
	margin-bottom: 16rpx;
}

.slider-container {
	flex:1;
}

.text-input-container {
	margin-bottom: 20rpx;
}

.text-input {
	width: 100%;
	padding: 16rpx;
	border: 1rpx solid #f2e7da;
	border-radius: 16rpx;
	font-size: 28rpx;
}

.submit-button-container {
	margin-top: 20rpx;
}

.u-button {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background: #d86e33;
	color: #fff;
	border-radius: 16rpx;
	font-size: 28rpx;
	font-weight: 600;
	cursor: pointer;
}

.u-button::after {
	border: none;
}

.toolbar-card {
	width: 750rpx;
	background: rgba(255, 255, 255, 0.95);
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
}

.toolbar-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2rpx solid #f5f5f5;
	margin-bottom: 20rpx;
}

.toolbar-top-left {
	display: flex;
	gap: 56rpx;
}
.size-slider-content{
	display: flex;
	align-items: center;
}

.bold-switch {
	display: flex;
	align-items: center;
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 2rpx solid #f5f5f5;
}

.bold-label {
	font-size: 26rpx;
	color: #2f241f;
}
</style>