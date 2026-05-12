<template>
	<view class="choose-edit-page">
		<!-- TopAppBar -->
		<header class="top-app-bar">
			<view class="top-bar-left">
				<view class="icon-btn" @click="handleMenu">
					<text class="material-symbols-outlined">menu</text>
				</view>
				<h1 class="brand-name">CaseCraft</h1>
			</view>
			<view class="icon-btn" @click="handleCart">
				<text class="material-symbols-outlined">shopping_bag</text>
			</view>
		</header>

		<main class="main-content">
			<!-- Premium Banner -->
			<section class="premium-banner" @click="handleUpgrade">
				<view class="banner-content">
					<view class="banner-header">
						<text class="material-symbols-outlined banner-icon">diamond</text>
						<text class="banner-label">高级模板</text>
					</view>
					<p class="banner-desc">解锁 500+ 独家手工设计与特效。</p>
				</view>
				<button class="banner-btn">立即升级</button>
				<view class="banner-decor-1"></view>
				<view class="banner-decor-2"></view>
			</section>

			<!-- Popular Templates Header -->
			<section class="section-header">
				<h2 class="section-title">热门模板</h2>
				<p class="section-desc">在最受创作者欢迎的风格中找到你的灵感。</p>
			</section>

			<!-- Horizontal Categories -->
			<section class="categories-section">
				<scroll-view class="categories-scroll" scroll-x show-scrollbar="false">
					<button 
						v-for="(cat, index) in categories" 
						:key="index"
						:class="['category-btn', { active: currentCategory === cat.name }]"
						@click="selectCategory(cat.name)"
					>{{ cat.label }}</button>
				</scroll-view>
			</section>

			<!-- Waterfall Grid -->
			<section class="template-grid">
				<!-- Column 1 -->
				<view class="grid-column">
					<view 
						v-for="(template, index) in column1Templates" 
						:key="template.id"
						class="template-card"
						@click="useTemplate(template)"
					>
						<view class="card-inner">
							<view class="card-image-wrap">
								<image class="card-image" mode="aspectFill" :src="template.image" />
								<view class="card-badge" v-if="template.badge">
									<text class="material-symbols-outlined badge-icon">bolt</text>
									<text class="badge-text">{{ template.badge }}</text>
								</view>
							</view>
							<view class="card-info">
								<view class="card-views">
									<text class="material-symbols-outlined view-icon">visibility</text>
									<text class="view-count">{{ template.views }} 次使用</text>
								</view>
								<h3 class="card-title">{{ template.name }}</h3>
							</view>
							<button class="card-btn" @click.stop="useTemplate(template)">使用此模板</button>
						</view>
					</view>
				</view>

				<!-- Column 2 -->
				<view class="grid-column column-2">
					<view 
						v-for="(template, index) in column2Templates" 
						:key="template.id"
						class="template-card"
						@click="useTemplate(template)"
					>
						<view class="card-inner">
							<view class="card-image-wrap">
								<image class="card-image" mode="aspectFill" :src="template.image" />
							</view>
							<view class="card-info">
								<view class="card-views">
									<text class="material-symbols-outlined view-icon">visibility</text>
									<text class="view-count">{{ template.views }} 次使用</text>
								</view>
								<h3 class="card-title">{{ template.name }}</h3>
							</view>
							<button class="card-btn" @click.stop="useTemplate(template)">使用此模板</button>
						</view>
					</view>
				</view>
			</section>
		</main>



		<!-- Color Selection Modal -->
		<view class="modal-overlay" v-if="showModal" @click="closeModal">
			<view class="modal-content" @click.stop>
				<h3 class="modal-title">定制您的外壳</h3>
				
				<view class="modal-preview">
					<image class="preview-image" mode="aspectFit" :src="selectedTemplate?.image" />
					<view class="preview-badge">
						<text class="preview-badge-text">PREVIEW</text>
					</view>
				</view>

				<view class="color-section">
					<p class="color-label">选择颜色</p>
					<view class="color-dots">
						<view 
							v-for="(color, index) in colors" 
							:key="index"
							:class="['color-dot-wrap', { selected: selectedColor === color.name }]"
							@click="selectColor(color)"
						>
							<view class="color-dot" :style="{ background: color.hex }"></view>
							<text class="color-name" v-if="color.label">{{ color.label }}</text>
						</view>
					</view>
				</view>

				<view class="modal-actions">
					<button class="modal-btn modal-btn-primary" @click="confirmTemplate">确认使用</button>
					<button class="modal-btn modal-btn-secondary" @click="closeModal">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { buildUrl } from '@/config/env.js'
const currentCategory = ref('极简')
const showModal = ref(false)
const selectedTemplate = ref(null)
const selectedColor = ref('pink')

const categories = [
	{ name: '极简', label: '极简' },
	{ name: '复古', label: '复古' },
	{ name: '可爱', label: '可爱' },
	{ name: '艺术', label: '艺术' },
	{ name: '渐变', label: '渐变' },
	{ name: '涂鸦', label: '涂鸦' }
]

const templates = [
	{
		id: 1,
		name: '柔和粉笔白',
		badge: '极简波浪',
		views: '24.5k',
		image: buildUrl('/public/images/editPhoneShell/unnamed-1.png'),
		aspectRatio: '3/4'
	},
	{
		id: 2,
		name: '棋盘格鼠尾草',
		badge: '',
		views: '45.2k',
		image: buildUrl('/public/images/editPhoneShell/unnamed-2.png'),
		aspectRatio: '1/1'
	},
	{
		id: 3,
		name: '日落旋涡',
		badge: '',
		views: '12.8k',
		image: buildUrl('/public/images/editPhoneShell/unnamed-3.png'),
		aspectRatio: '4/5'
	},
	{
		id: 4,
		name: '萌系涂鸦',
		badge: '',
		views: '31.9k',
		image: buildUrl('/public/images/editPhoneShell/unnamed-4.png'),
		aspectRatio: '3/4'
	}
]

const colors = [
	{ name: 'white', hex: '#F5F5F5', label: '柔和白', image: buildUrl('/public/images/editPhoneShell/unnamed-1.png') },
	{ name: 'pink', hex: '#FFD1DC', label: '粉彩粉', image: buildUrl('/public/images/editPhoneShell/unnamed-2.png')},
	{ name: 'yellow', hex: '#FFF44F', label: '柠檬黄', image: buildUrl('/public/images/editPhoneShell/unnamed-3.png') },
	{ name: 'mint', hex: '#AAF0D1', label: '薄荷绿', image: buildUrl('/public/images/editPhoneShell/unnamed-4.png') }
]

const column1Templates = computed(() => [templates[0], templates[2]])
const column2Templates = computed(() => [templates[1], templates[3]])

function selectCategory(name) {
	currentCategory.value = name
}

function useTemplate(template) {
	selectedTemplate.value = template
	selectedColor.value = 'pink'
	showModal.value = true
}

function selectColor(color) {
	selectedColor.value = color.name
	if (selectedTemplate.value) {
		selectedTemplate.value = {
			...selectedTemplate.value,
			image: color.image
		}
	}
}

function closeModal() {
	showModal.value = false
}

function confirmTemplate() {
	uni.showToast({ title: `已选择 ${selectedTemplate.value?.name}`, icon: 'none' })
	showModal.value = false
}

function handleMenu() {
	uni.showToast({ title: '菜单', icon: 'none' })
}

function handleCart() {
	uni.showToast({ title: '购物车', icon: 'none' })
}

function handleUpgrade() {
	uni.showToast({ title: '升级高级会员', icon: 'none' })
}

function switchTab(tab) {
	const tabNames = {
		home: '首页',
		explore: '探索',
		design: '设计',
		message: '消息',
		profile: '我的'
	}
	uni.showToast({ title: tabNames[tab], icon: 'none' })
}
</script>

<style scoped>
.choose-edit-page {
	min-height: 100vh;
	background: #f6f6f6;
	padding-bottom: 180rpx;
}

.top-app-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 32rpx;
	background: #f6f6f6;
	position: sticky;
	top: 0;
	z-index: 50;
}

.top-bar-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.icon-btn {
	width: 72rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.2s;
}

.icon-btn:active {
	background: rgba(255, 215, 9, 0.1);
}

.icon-btn .material-symbols-outlined {
	color: #ffd709;
	font-size: 40rpx;
}

.brand-name {
	font-size: 48rpx;
	font-weight: 800;
	font-style: italic;
	color: #ffd709;
	letter-spacing: -1px;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.main-content {
	margin: 0 auto;
	padding: 0 32rpx;
	box-sizing: border-box;
}

.premium-banner {
	position: relative;
	overflow: hidden;
	background: #166665;
	border-radius: 24rpx;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	margin-top: 16rpx;
	margin-bottom: 32rpx;
}

.banner-content {
	position: relative;
	z-index: 10;
}

.banner-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-bottom: 8rpx;
}

.banner-icon {
	font-size: 32rpx;
	color: #ffaebc;
	font-variation-settings: 'FILL' 1;
}

.banner-label {
	font-size: 24rpx;
	font-weight: 700;
	color: #ffaebc;
	letter-spacing: 2px;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.banner-desc {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.8);
	max-width: 400rpx;
}

.banner-btn {
	position: relative;
	z-index: 10;
	align-self: flex-start;
	padding: 20rpx 40rpx;
	background: #ffd709;
	color: #453900;
	border-radius: 100rpx;
	font-size: 24rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
	box-shadow: 0 8rpx 24rpx rgba(255, 215, 9, 0.4);
}

.banner-decor-1 {
	position: absolute;
	right: -32rpx;
	bottom: -32rpx;
	width: 256rpx;
	height: 256rpx;
	background: rgba(168, 239, 237, 0.2);
	border-radius: 50%;
	filter: blur(64rpx);
}

.banner-decor-2 {
	position: absolute;
	left: -32rpx;
	top: -32rpx;
	width: 192rpx;
	height: 192rpx;
	background: rgba(255, 174, 188, 0.1);
	border-radius: 50%;
	filter: blur(48rpx);
}

.section-header {
	margin-bottom: 24rpx;
}

.section-title {
	font-size: 56rpx;
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

.categories-section {
	margin-bottom: 32rpx;
	margin-left: -32rpx;
	margin-right: -32rpx;
}

.categories-scroll {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	overflow-x: auto;
	padding: 0 32rpx;
	gap: 16rpx;
	box-sizing: border-box;
	white-space: nowrap;
}

.categories-scroll::-webkit-scrollbar {
	display: none;
}

.category-btn {
	flex-shrink: 0;
	padding: 24rpx 48rpx;
	border-radius: 100rpx;
	font-size: 24rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
	transition: all 0.2s;
	background: #f0f1f1;
	color: #5a5c5c;
	display: inline-block;
}

.category-btn.active {
	background: #ffd709;
	color: #5b4b00;
	box-shadow: 0 4rpx 12rpx rgba(255, 215, 9, 0.3);
}

.template-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 32rpx;
}

.grid-column {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.column-2 {
	padding-top: 96rpx;
}

.template-card {
	background: #f0f1f1;
	border-radius: 24rpx;
	padding: 16rpx;
	transition: all 0.2s;
}

.template-card:active {
	transform: scale(0.98);
}

.card-inner {
	display: flex;
	flex-direction: column;
}

.card-image-wrap {
	position: relative;
	border-radius: 16rpx;
	overflow: hidden;
	margin-bottom: 16rpx;
	background: #d3d5d5;
}

.card-image {
	width: 100%;
	height: auto;
	display: block;
}

.card-badge {
	position: absolute;
	top: 16rpx;
	right: 16rpx;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(20rpx);
	padding: 8rpx 16rpx;
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	gap: 4rpx;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.badge-icon {
	font-size: 24rpx;
	color: #6c5a00;
	font-variation-settings: 'FILL' 1;
}

.badge-text {
	font-size: 18rpx;
	font-weight: 700;
	color: #2d2f2f;
}

.card-info {
	padding: 0 8rpx;
	margin-bottom: 16rpx;
}

.card-views {
	display: flex;
	align-items: center;
	gap: 4rpx;
	margin-bottom: 8rpx;
}

.view-icon {
	font-size: 24rpx;
	color: #5a5c5c;
}

.view-count {
	font-size: 20rpx;
	color: #5a5c5c;
	font-weight: 500;
}

.card-title {
	font-size: 28rpx;
	font-weight: 800;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.card-btn {
	width: 100%;
	padding: 24rpx;
	background: #166665;
	color: #bcfffd;
	border-radius: 100rpx;
	font-size: 24rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
	box-shadow: 0 4rpx 12rpx rgba(22, 102, 101, 0.3);
}

.card-btn:active {
	transform: scale(0.98);
}

.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 16rpx 32rpx;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(40rpx);
	border-radius: 80rpx 80rpx 0 0;
	box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.06);
	z-index: 50;
}

.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(10rpx);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx;
	z-index: 100;
}

.modal-content {
	position: relative;
	background: #f6f6f6;
	border-radius: 32rpx;
	width: 100%;
	padding: 48rpx 32rpx;
	box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
	box-sizing: border-box;
}

.modal-title {
	font-size: 40rpx;
	font-weight: 800;
	color: #2d2f2f;
	text-align: center;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-bottom: 32rpx;
}

.modal-preview {
	position: relative;
	background: #f0f1f1;
	border-radius: 24rpx;
	padding: 32rpx;
	margin-bottom: 32rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.preview-image {
	width: 384rpx;
	height: auto;
}

.preview-badge {
	position: absolute;
	bottom: 16rpx;
	right: 16rpx;
	background: rgba(255, 215, 9, 0.2);
	padding: 8rpx 16rpx;
	border-radius: 100rpx;
}

.preview-badge-text {
	font-size: 18rpx;
	font-weight: 700;
	color: #6c5a00;
	font-style: italic;
}

.color-section {
	margin-bottom: 48rpx;
}

.color-label {
	font-size: 20rpx;
	font-weight: 700;
	color: #5a5c5c;
	text-align: center;
	letter-spacing: 2px;
	text-transform: uppercase;
	margin-bottom: 24rpx;
}

.color-dots {
	display: flex;
	justify-content: center;
	gap: 32rpx;
}

.color-dot-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
}

.color-dot {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	border: 4rpx solid #ffffff;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
	transition: all 0.2s;
}

.color-dot-wrap.selected .color-dot {
	transform: scale(1.2);
	box-shadow: 0 0 0 6rpx #ffd709;
}

.color-name {
	font-size: 18rpx;
	font-weight: 700;
	color: #2d2f2f;
	opacity: 0;
	transition: opacity 0.2s;
}

.color-dot-wrap.selected .color-name {
	opacity: 1;
}

.modal-actions {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.modal-btn {
	width: 100%;
	padding: 28rpx;
	border-radius: 100rpx;
	font-size: 28rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
	transition: all 0.2s;
}

.modal-btn:active {
	transform: scale(0.98);
}

.modal-btn-primary {
	background: #ffd709;
	color: #453900;
}

.modal-btn-secondary {
	background: #e7e8e8;
	color: #5a5c5c;
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
