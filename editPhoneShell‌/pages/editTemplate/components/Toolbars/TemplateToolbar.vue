<template>
	<view class="toolbar-card">
		<text 
			class="iconfont toolbar-card-icondown"
			:class="isExpanded ? 'icon-down' : 'icon-up icon-down'"
			@click="togglePanel"
		></text>

		<!-- 上层导航 -->
		<view v-if="isExpanded" class="toolbar-top">	
			<view class="toolbar-top-left">
				<view class="nav-item" :class="{ 'nav-item--active': activeCategory === 'literary' }"
					@click="activeCategory = 'literary'">
					文艺
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeCategory === 'classic' }"
					@click="activeCategory = 'classic'">
					经典
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeCategory === 'trendy' }"
					@click="activeCategory = 'trendy'">
					网红
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>
		</view>

		<!-- 下层内容 -->
		<view v-if="isExpanded" class="toolbar-bottom">
			<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
				<view class="template-list">
					<view v-for="(item, index) in currentTemplates" :key="index" class="template-item toolbar-bottom-item"
						@click="$emit('select-template', item)">
						<image class="template-item__image" :src="item.icon" mode="aspectFill"></image>
						<text class="template-item__label">{{ item.label }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { buildUrl } from '@/config/env'

const activeCategory = ref('literary')
const isExpanded = ref(true)
function togglePanel() {
	isExpanded.value = !isExpanded.value
}

const templateCategories = {
	literary: [
		{ icon: buildUrl("/public/images/editTemplate/literary-1.png"), label: '文艺1' },
		{ icon: buildUrl("/public/images/editTemplate/literary-2.png"), label: '文艺2' },
		{ icon: buildUrl("/public/images/editTemplate/literary-3.png"), label: '文艺3' },
	],
	classic: [
		{ icon: buildUrl("/public/images/editTemplate/classic-1.jpeg"), label: '经典1' },
		{ icon: buildUrl("/public/images/editTemplate/classic-2.jpeg"), label: '经典2' },
		{ icon: buildUrl("/public/images/editTemplate/classic-3.jpeg"), label: '经典3' },
	],
	trendy: [
		{ icon: buildUrl("/public/images/editTemplate/trendy-1.png"), label: '网红1' },
		{ icon: buildUrl("/public/images/editTemplate/trendy-2.png"), label: '网红2' },
	]
}

const currentTemplates = computed(() => templateCategories[activeCategory.value])

defineEmits(['select-template', 'exit'])
</script>

<style scoped>
.chip-scroll {
	white-space: nowrap;
}

.toolbar-card {
	width: 750rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
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

.template-list {
	display: inline-flex;
	gap: 16rpx;
}


.template-item:active {
	background: #d6eaea;
}

.template-item__image {
	width: 120rpx;
	height: 120rpx;
	border-radius: 20rpx;
	margin-bottom: 8rpx;
}

.template-item__label {
	font-size: 22rpx;
	color: #6d594d;
}
</style>
