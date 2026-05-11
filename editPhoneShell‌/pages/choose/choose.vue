<template>
	<view class="choose-page">
		<!-- 顶部栏 -->
		<header class="header">
			<button class="btn-last-choice" @click="handleLastChoice">
				<span class="last-choice-label">上次选择</span>
				<span class="last-choice-value">iPhone 16 Pro</span>
				<text class="material-symbols-outlined last-choice-arrow iconfont icon-right"></text>
			</button>
			<view class="search-box">
				<text class="material-symbols-outlined search-icon iconfont icon-sousuo"></text>
				<input class="search-input" v-model="searchText" placeholder="搜索型号或组件..." />
			</view>
		</header>

		<!-- 内容区：左右分栏 -->
		<main class="main-content">
			<!-- 左侧：品牌选择列表 -->
			<aside class="brand-list">
				<nav class="brand-nav">
					<button 
						v-for="(brand, index) in brands" 
						:key="index"
						:class="['brand-item', { active: currentBrand === brand.name }]"
						@click="selectBrand(brand.name)"
					>
						<view v-if="currentBrand === brand.name" class="active-indicator"></view>
						<view class="brand-icon" :class="{ active: currentBrand === brand.name }">
							<text class="material-symbols-outlined iconfont "  :class="brand.icon"></text>
						</view>
						<span class="brand-name">{{ brand.label }}</span>
					</button>
				</nav>
			</aside>

			<!-- 右侧：具体型号展示 -->
			<section class="model-section">
				<view class="section-header">
					<h2 class="section-title">{{ currentBrandTitle }}</h2>
					<p class="section-desc">{{ currentBrandDesc }}</p>
				</view>

				<view class="model-grid">
					<view 
						v-for="(model, index) in currentModels" 
						:key="index"
						:class="['model-card', { active: selectedModel === model.name }]"
						@click="selectModel(model)"
					>
						<view v-if="selectedModel === model.name" class="check-badge">
							<text class="material-symbols-outlined iconfont icon-tick" style="font-size: 24rpx;"></text>
						</view>
						<view class="model-image-wrap">
							<image 
								class="model-image" 
								mode="aspectFit" 
								:src="model.image" 
								:alt="model.name"
							/>
						</view>
						<view class="model-info">
							<p class="model-name">{{ model.name }}</p>
							<p class="model-subtitle">{{ model.subtitle }}</p>
						</view>
					</view>

					<view class="model-card more-card" @click="showMoreModels">
						<text class="material-symbols-outlined more-icon iconfont icon-more"></text>
						<p class="more-text">更多型号</p>
					</view>
				</view>
			</section>
		</main>

		<!-- 底部固定按钮 -->
		<footer class="footer">
			<button class="btn-next" @click="handleNext">
				<span>下一步</span>
				<text class="material-symbols-outlined next-icon iconfont icon-left-arrow" style="transform: rotate(180deg);"></text>
			</button>
		</footer>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { buildUrl } from '@/config/env.js'

const searchText = ref('')
const currentBrand = ref('apple')
const selectedModel = ref('iPhone 16 Pro')

const brands = [
	{ name: 'apple', label: '苹果', icon: 'icon-apple-fill' },
	{ name: 'huawei', label: '华为', icon: 'icon-huawei' },
	{ name: 'xiaomi', label: '小米', icon: 'icon-xiaomi' },
	{ name: 'honor', label: '荣耀', icon: 'icon-H' }
]

const models = {
	apple: [
		{
			name: 'iPhone 16 Pro',
			subtitle: '钛金属系列',
			image: buildUrl('/public/images/models/unnamed.png')
		},
		{
			name: 'iPhone 16',
			subtitle: '灵动岛',
			image: buildUrl('/public/images/models/unnamed2.png')
		},
		{
			name: 'iPhone 15 Pro',
			subtitle: '操作按钮',
			image: buildUrl('/public/images/models/unnamed3.png')	
		},
		{
			name: 'iPhone 15',
			subtitle: 'USB-C 系列',
			image: buildUrl('/public/images/models/unnamed4.png')
		}
	],
	huawei: [
		{
			name: 'Mate 60 Pro',
			subtitle: '麒麟芯片',
			image: ''
		},
		{
			name: 'Pura 70 Pro',
			subtitle: '超高速摄影',
			image: ''
		}
	],
	xiaomi: [
		{
			name: '小米14',
			subtitle: '徕卡光学',
			image: ''
		},
		{
			name: '红米K70',
			subtitle: '电竞旗舰',
			image: ''
		}
	],
	honor: [
		{
			name: 'Magic6 Pro',
			subtitle: '青海湖电池',
			image: ''
		},
		{
			name: 'X50',
			subtitle: '一亿像素',
			image: ''
		}
	]
}

const currentModels = computed(() => {
	return models[currentBrand.value] || []
})

const currentBrandTitle = computed(() => {
	const titles = {
		apple: 'Apple iPhone',
		huawei: '华为手机',
		xiaomi: '小米手机',
		honor: '荣耀手机'
	}
	return titles[currentBrand.value] || ''
})

const currentBrandDesc = computed(() => {
	const descs = {
		apple: '选择您的 iPhone 型号以开始设计',
		huawei: '选择您的华为手机型号以开始设计',
		xiaomi: '选择您的小米手机型号以开始设计',
		honor: '选择您的荣耀手机型号以开始设计'
	}
	return descs[currentBrand.value] || ''
})

function selectBrand(brandName) {
	currentBrand.value = brandName
}

function selectModel(model) {
	selectedModel.value = model.name
}

function showMoreModels() {
	uni.showToast({ title: '更多型号开发中', icon: 'none' })
}

function handleLastChoice() {
	uni.showToast({ title: '上次选择已加载', icon: 'none' })
}

function handleNext() {
	uni.showToast({ title: `已选择 ${selectedModel.value}`, icon: 'none' })
}
</script>

<style scoped>
.choose-page {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background: #ffffff;
}

.header {
	display: flex;
	align-items: center;
	gap: 24rpx;
	padding: 24rpx 32rpx;
	background: #ffffff;
	border-bottom: 2rpx solid #e7e8e8;
	z-index: 50;
}

.btn-last-choice {
	display: flex;
	align-items: center;
	gap: 12rpx;
	background: #f0f1f1;
	border-radius: 100rpx;
	flex-shrink: 0;
	transition: all 0.2s;
	height: 72rpx;
	display: inline-flex;
	align-items: center;
	padding:0 16rpx;
}

.btn-last-choice:active {
	background: #e7e8e8;
}

.last-choice-label {
	font-size: 20rpx;
	font-weight: 700;
	color: #767777;
	letter-spacing: 1px;
}

.last-choice-value {
	font-size: 24rpx;
	font-weight: 700;
	color: #2d2f2f;
}

.last-choice-arrow {
	font-size: 28rpx;
	color: #767777;
	transition: transform 0.2s;
}

.btn-last-choice:active .last-choice-arrow {
	transform: translateX(4rpx);
}

.search-box {
	flex: 1;
	position: relative;
	max-width: 600rpx;
}

.search-icon {
	position: absolute;
	left: 24rpx;
	top: 50%;
	transform: translateY(-50%);
	font-size: 32rpx;
	color: #767777;
}

.search-input {
	height: 72rpx;
	padding-left: 88rpx;
	background: #f0f1f1;
	border: none;
	border-radius: 100rpx;
	font-size: 28rpx;
	color: #2d2f2f;
	box-sizing: border-box;
}

.search-input::placeholder {
	color: #acadad;
}

.main-content {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.brand-list {
	width: 160rpx;
	background: #f0f1f1;
	padding: 32rpx 0;
	overflow-y: auto;
}

.brand-nav {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.brand-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 24rpx 16rpx;
	transition: all 0.2s;
}

.active-indicator {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 6rpx;
	height: 32rpx;
	background: #ffd709;
	border-radius: 0 6rpx 6rpx 0;
}

.brand-icon {
	width: 96rpx;
	height: 96rpx;
	border-radius: 24rpx;
	background: #e7e8e8;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8rpx;
	transition: all 0.2s;
}

.brand-icon.active {
	background: #ffd709;
}
.brand-icon.active .material-symbols-outlined.iconfont{
	color:#fff;
}

.brand-icon .material-symbols-outlined {
	font-size: 55rpx;
}

.brand-item .material-symbols-outlined {
	color: #5a5c5c;
}

.brand-item.active .material-symbols-outlined {
	color: #5b4b00;
}

.brand-name {
	font-size: 20rpx;
	font-weight: 700;
	color: #5a5c5c;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.brand-item.active .brand-name {
	color: #6c5a00;
}

.model-section {
	flex: 1;
	background: #ffffff;
	padding: 32rpx;
	overflow-y: auto;
}

.section-header {
	margin-bottom: 32rpx;
}

.section-title {
	font-size: 40rpx;
	font-weight: 800;
	color: #2d2f2f;
	letter-spacing: -1px;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.section-desc {
	font-size: 24rpx;
	color: #5a5c5c;
	margin-top: 8rpx;
}

.model-grid {
	display: flex;
	grid-template-columns: repeat(2, 1fr);
	gap: 24rpx;
	padding-bottom: 200rpx;
	max-width: 600rpx;
	margin: 0 auto;
	flex-wrap: wrap;
	justify-content: space-between;
}

.model-card {
	position: relative;
	background: #f0f1f1;
	border-radius: 32rpx;
	padding: 24rpx;
	transition: all 0.3s;
	width: 46%;
	box-sizing: border-box;
}

.model-card.active {
	background: rgba(255, 215, 9, 0.1);
	border: 4rpx solid #ffd709;
}

.check-badge {
	position: absolute;
	top: 16rpx;
	right: 16rpx;
	width: 32rpx;
	height: 32rpx;
	background: #ffd709;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 8rpx rgba(255, 215, 9, 0.4);
}

.check-icon {
	font-size: 20rpx;
	color: #5b4b00;
	font-weight: bold;
}

.model-image-wrap {
	width: 100%;
	padding-bottom: 100%;
	background: rgba(255, 255, 255, 0.5);
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16rpx;
	overflow: hidden;
}

.model-image {
	width: 80%;
	height: 80%;
	transition: all 0.3s;
}

.model-card:active .model-image {
	transform: scale(1.05);
}

.model-info {
	text-align: center;
}

.model-name {
	font-size: 28rpx;
	font-weight: 700;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-bottom: 4rpx;
}

.model-subtitle {
	font-size: 20rpx;
	color: #5a5c5c;
}

.more-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 320rpx;
	border: 4rpx dashed #acadad;
	background: transparent;
}

.more-icon {
	font-size: 48rpx;
	color: #acadad;
	margin-bottom: 8rpx;
}

.more-text {
	font-size: 24rpx;
	font-weight: 700;
	color: #5a5c5c;
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 24rpx 32rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(20rpx);
	border-top: 2rpx solid #e7e8e8;
	z-index: 40;
}

.btn-next {
	width: 100%;
	height: 88rpx;
	background: linear-gradient(135deg, #ffd709 0%, #f5c800 100%);
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	font-size: 32rpx;
	font-weight: 800;
	color: #5b4b00;
	font-family: 'Plus Jakarta Sans', sans-serif;
	box-shadow: 0 10rpx 20rpx -5rpx rgba(255, 215, 9, 0.4);
	transition: all 0.2s;
}

.btn-next:active {
	transform: scale(0.98);
	box-shadow: 0 15rpx 30rpx -5rpx rgba(255, 215, 9, 0.6);
}

.next-icon {
	font-size: 36rpx;
	font-weight: bold;
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
