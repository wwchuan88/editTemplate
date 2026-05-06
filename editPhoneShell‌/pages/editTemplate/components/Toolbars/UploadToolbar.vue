<template>
	<view class="toolbar-card">

		<!-- 上层导航 -->
		<view class="toolbar-top">
			<view class="toolbar-top-left">
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'local' }"
					@click="activeNav = 'local'">
					本地图片
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'template' }"
					@click="activeNav = 'template'">
					推荐图片
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>
		</view>

		<!-- 下层内容 -->
		<view class="toolbar-bottom">
			<!-- 本地图片 -->
			<view v-if="activeNav === 'local'" class="nav-content">
				<view class="toolbar-actions">
					<u-button text="选择图片" type="primary" @click="$emit('choose')"></u-button>
				</view>
			</view>

			<!-- 模板 -->
			<view v-if="activeNav === 'template'" class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="template-list">
						<view v-for="(item, index) in templateOptions" :key="index" class="template-item"
							@click="$emit('select-template', item)">
							<image class="template-item__image" :src="item.icon"></image>
							<text class="template-item__label">{{ item.label }}</text>
						</view>
					</view>
				</scroll-view>


			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { buildUrl } from '@/config/env'

console.log("aaaaaaaaaaaacccc", buildUrl("/images/file-1775810384284-738004091.png"))

const activeNav = ref('local')

const templateOptions = [
	{ icon: buildUrl("/images/editTemplate/0001.jpeg"), label: '星空模板' },
	{ icon: buildUrl("/images/editTemplate/0002.jpeg"), label: '樱花模板' },
	{ icon: buildUrl("/images/editTemplate/0003.jpeg"), label: '海洋模板' },
	{ icon: buildUrl("/images/editTemplate/0004.jpeg"), label: '森林模板' },
	{ icon: buildUrl("/images/editTemplate/0001.jpeg"), label: '森林模板' }
]

defineEmits(['choose', 'demo', 'exit', 'select-template'])
</script>

<style scoped>
.chip-scroll {
	white-space: nowrap;
}
.toolbar-card {
	padding: 24rpx;
	border-radius: 32rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 18rpx 60rpx rgba(80, 56, 30, 0.08);
}

.toolbar-card__title {
	display: block;
	margin-bottom: 8rpx;
	font-size: 30rpx;
	font-weight: 700;
	color: #2f241f;
}

.toolbar-card__desc {
	display: block;
	margin-bottom: 20rpx;
	font-size: 24rpx;
	line-height: 1.7;
	color: #826c60;
}


.nav-content {
	padding: 10rpx 0;
}

.toolbar-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}

.template-list {
	display: inline-flex;
	gap: 16rpx;
}

.template-item {
	padding: 20rpx;
	border-radius: 24rpx;
	background: #fff7ef;
	text-align: center;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.template-item:active {
	background: #f2e7da;
}

.template-item__icon {
	display: block;
	margin-bottom: 8rpx;
	font-size: 44rpx;
}

.template-item__label {
	font-size: 22rpx;
	color: #6d594d;
}

.template-item__image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 24rpx;
}
</style>
