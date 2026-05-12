<template>
	<view class="product-show-page">

		<main class="main-content">
			<!-- Hero Section -->
			<section class="hero-section">
				<view class="hero-bg">
					<text class="material-symbols-outlined hero-icon iconfont icon-magic-stick"></text>
					<h2 class="hero-title">激发你的<br/>DIY 灵魂</h2>
					<p class="hero-desc">查看全球创作者的精选作品</p>
				</view>
			</section>

			<!-- Search Bar -->
			<section class="search-section">
				<view class="search-input-wrap">
					<text class="material-symbols-outlined search-icon-inner iconfont icon-sousuo"></text>
					<input 
						class="search-input" 
						type="text" 
						v-model="searchText"
						placeholder="搜索设计/模板" 
					/>
				</view>
			</section>

			<!-- Category Navigation -->
			<scroll-view class="category-scroll" scroll-x enable-flex>
				<view class="category-list">
					<view 
						v-for="(cat, index) in categories" 
						:key="index"
						:class="['category-item', { active: currentCategory === cat.name }]"
						@click="selectCategory(cat.name)"
					>
						{{ cat.label }}
					</view>
				</view>
			</scroll-view>

			<!-- Product Grid -->
			<section class="product-grid">
				<view 
					v-for="(product, index) in products" 
					:key="index"
					class="product-item"
					@click="handleProductClick(product)"
				>
					<view class="product-image-wrap">
						<image class="product-image" mode="aspectFill" :src="product.image" />
						<view v-if="product.isRecommended" class="recommend-badge">推荐</view>
					</view>
					<view class="product-footer">
						<view class="product-author">
							<image class="author-avatar" mode="aspectFill" :src="product.avatar" />
							<span class="author-name">{{ product.author }}</span>
						</view>
						<view class="product-likes">
							<text class="material-symbols-outlined iconfont icon-aixin" :class="{ liked: product.liked }"></text>
							<span>{{ product.likes }}</span>
						</view>
					</view>
				</view>
			</section>
		</main>

	</view>
</template>

<script setup>
import { ref } from 'vue'
import previewImageUrl from '@/static/images/ai-unnamed-3.png'
import { buildUrl } from '@/config/env.js'
const searchText = ref('')
const currentCategory = ref('推荐')

const categories = [
	{ name: '推荐', label: '推荐' },
	{ name: '热门', label: '热门' },
	{ name: '最新', label: '最新' },
	{ name: '插画', label: '插画' },
	{ name: '文字', label: '文字' },
	{ name: '照片', label: '照片' }
]

const products = [
	{
		image: buildUrl('/public/images/editPhoneShell/unnamed-1.png'),
		avatar: previewImageUrl,
		author: 'Luna_Vibes',
		likes: '1.2k',
		liked: true,
		isRecommended: true
	},
	{
		image: buildUrl('/public/images/editPhoneShell/unnamed-2.png'),
		author: 'NeonDream',
		likes: '2.4k',
		liked: true,
		isRecommended: false
	},
	{
		image: buildUrl('/public/images/editPhoneShell/unnamed-3.png'),
		author: 'Max_Design',
		likes: '856',
		liked: false,
		isRecommended: false
	},
	{
		image: buildUrl('/public/images/editPhoneShell/unnamed-4.png'),
		avatar: previewImageUrl,
		likes: '422',
		liked: false,
		isRecommended: false
	}
]

function handleMenu() {
	uni.showToast({ title: '菜单', icon: 'none' })
}

function handleCart() {
	uni.showToast({ title: '购物袋', icon: 'none' })
}

function handleStartCustomize() {
	uni.showToast({ title: '开始定制', icon: 'none' })
}

function handleFilter() {
	uni.showToast({ title: '筛选', icon: 'none' })
}

function selectCategory(name) {
	currentCategory.value = name
	uni.showToast({ title: `已选择 ${name}`, icon: 'none' })
}

function handleProductClick(product) {
	uni.showToast({ title: product.author, icon: 'none' })
}

function handleAdd() {
	uni.showToast({ title: '添加设计', icon: 'none' })
}

function switchTab(tab) {
	const tabNames = {
		home: '首页',
		explore: '探索',
		message: '消息',
		me: '我的'
	}
	uni.showToast({ title: tabNames[tab], icon: 'none' })
}
</script>

<style scoped>
.product-show-page {
	min-height: 100vh;
	background: #f6f6f6;
	padding-bottom: 200rpx;
}

.top-app-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 32rpx;
	background: #f6f6f6;
	position: sticky;
	top: 0;
	z-index: 40;
}

.top-bar-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.icon-btn {
	width: 64rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-btn .material-symbols-outlined {
	font-size: 40rpx;
	color: #6c5a00;
}

.brand-name {
	font-size: 40rpx;
	font-weight: 800;
	font-style: italic;
	color: #6c5a00;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.top-bar-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.search-icon {
	width: 64rpx;
	height: 64rpx;
	background: #f0f1f1;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.search-icon .material-symbols-outlined {
	font-size: 28rpx;
	color: #767777;
}
.hero-section {
	margin-top: 16rpx;
}

.hero-bg {
	position: relative;
	background: #ffd709;
	border-radius: 24rpx;
	padding: 48rpx 32rpx;
	min-height: 200rpx;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	overflow: hidden;
}

.hero-icon {
	position: absolute;
	top: 16rpx;
	right: 16rpx;
	font-size: 160rpx;
	color: rgba(91, 75, 0, 0.2);
}

.hero-title {
	font-size: 56rpx;
	font-weight: 800;
	color: #5b4b00;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 1.1;
}

.hero-desc {
	font-size: 26rpx;
	color: rgba(91, 75, 0, 0.8);
	font-weight: 500;
	margin-top: 8rpx;
}

.main-content {
	padding: 0 24rpx;
}

.banner-section {
	position: relative;
	background: #FFD700;
	border-radius: 24rpx;
	min-height: 360rpx;
	display: flex;
	align-items: center;
	padding: 32rpx;
	margin-top: 16rpx;
	overflow: hidden;
}

.banner-content {
	position: relative;
	z-index: 10;
}

.banner-badge {
	display: inline-block;
	padding: 8rpx 16rpx;
	background: #2d2f2f;
	color: #f6f6f6;
	border-radius: 100rpx;
	font-size: 18rpx;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 4px;
}

.banner-title {
	font-size: 56rpx;
	font-weight: 800;
	color: #2d2f2f;
	margin-top: 12rpx;
	font-family: 'Plus Jakarta Sans', sans-serif;
	font-style: italic;
}

.banner-desc {
	font-size: 28rpx;
	color: rgba(45, 47, 47, 0.8);
	font-weight: 600;
	margin-top: 8rpx;
}

.banner-btn {
	margin-top: 24rpx;
	padding: 20rpx 48rpx;
	background: #2d2f2f;
	color: #f6f6f6;
	border-radius: 100rpx;
	font-size: 28rpx;
	font-weight: 800;
}

.banner-btn:active {
	transform: scale(0.98);
}

.banner-illustration {
	position: absolute;
	right: 16rpx;
	top: 50%;
	transform: translateY(-50%);
	width: 45%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	pointer-events: none;
}

.phone-case {
	width: 160rpx;
	height: 240rpx;
	background: #ffffff;
	border-radius: 32rpx;
	border: 6rpx solid #2d2f2f;
	transform: rotate(12deg);
	box-shadow: 16rpx 16rpx 0 rgba(0, 0, 0, 0.1);
	overflow: hidden;
}

.case-inner {
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #ffaebc, #a8efed);
	display: flex;
	align-items: center;
	justify-content: center;
}

.decor-circle {
	position: absolute;
	top: -20rpx;
	right: -20rpx;
	width: 60rpx;
	height: 60rpx;
	background: #884855;
	border-radius: 50%;
	animation: bounce 2s infinite;
}

.decor-square {
	position: absolute;
	bottom: 20rpx;
	left: -30rpx;
	width: 50rpx;
	height: 50rpx;
	background: #166665;
	transform: rotate(45deg);
}

.banner-blur {
	position: absolute;
	bottom: -50rpx;
	left: -50rpx;
	width: 200rpx;
	height: 200rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	filter: blur(40rpx);
}

.banner-pattern {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	opacity: 0.1;
	pointer-events: none;
	background-image: radial-gradient(circle, #000 2px, transparent 2px);
	background-size: 40rpx 40rpx;
}

@keyframes bounce {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-20rpx); }
}

.search-section {
	margin-top: 24rpx;
}

.search-input-wrap {
	position: relative;
	display: flex;
	align-items: center;
}

.search-input {
	width: 100%;
	height: 96rpx;
	background: #ffffff;
	border-radius: 100rpx;
	padding: 0 120rpx 0 80rpx;
	font-size: 28rpx;
	color: #2d2f2f;
	box-sizing: border-box;
}

.search-input::placeholder {
	color: #767777;
}

.search-icon-inner {
	position: absolute;
	left: 32rpx;
	font-size: 36rpx;
	color: #6c5a00;
	font-weight: 700;
}

.filter-btn {
	position: absolute;
	right: 16rpx;
	width: 56rpx;
	height: 56rpx;
	background: #ffd709;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.filter-btn .material-symbols-outlined {
	font-size: 28rpx;
	color: #5b4b00;
}

.category-scroll {
	margin-top: 24rpx;
	white-space: nowrap;
}

.category-list {
	display: inline-flex;
	gap: 16rpx;
	padding: 8rpx 0;
}

.category-item {
	padding: 16rpx 32rpx;
	background: #e1e3e3;
	color: #5a5c5c;
	border-radius: 100rpx;
	font-size: 28rpx;
	font-weight: 600;
	white-space: nowrap;
}

.category-item.active {
	background: #6c5a00;
	color: #fff2cd;
	box-shadow: 0 4rpx 12rpx rgba(108, 90, 0, 0.3);
}

.product-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
	margin-top: 24rpx;
}

.product-item {
	background: #ffffff;
	border-radius: 24rpx;
	padding: 12rpx;
}

.product-image-wrap {
	position: relative;
	border-radius: 20rpx;
	overflow: hidden;
	margin-bottom: 12rpx;
}

.product-image {
	width: 100%;
	height: 400rpx;
	transition: transform 0.5s;
}

.product-item:active .product-image {
	transform: scale(1.1);
}

.recommend-badge {
	position: absolute;
	top: 8rpx;
	right: 8rpx;
	padding: 6rpx 12rpx;
	background: #6c5a00;
	color: #fff2cd;
	border-radius: 100rpx;
	font-size: 18rpx;
	font-weight: 700;
}

.product-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.product-author {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.author-avatar {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	border: 2rpx solid #f6f6f6;
}

.author-name {
	font-size: 22rpx;
	font-weight: 600;
	color: #2d2f2f;
	max-width: 140rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.product-likes {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.product-likes .material-symbols-outlined {
	font-size: 24rpx;
	color: #767777;
}

.product-likes .material-symbols-outlined.liked {
	color: #b02500;
	font-variation-settings: 'FILL' 1;
}

.product-likes span {
	font-size: 20rpx;
	font-weight: 700;
	color: #5a5c5c;
}

.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	padding: 12rpx 32rpx;
	padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(40rpx);
	border-radius: 96rpx 96rpx 0 0;
	box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.06);
	z-index: 50;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12rpx 24rpx;
	color: #5a5c5c;
	transition: all 0.2s;
}

.nav-item:active {
	transform: scale(0.9);
}

.nav-item .material-symbols-outlined {
	font-size: 36rpx;
}

.nav-label {
	font-size: 18rpx;
	font-weight: 500;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-top: 4rpx;
}

.nav-item-active {
	background: #f0c900;
	color: #2d2f2f;
	border-radius: 100rpx;
	transform: scale(1.1);
	margin-bottom: -8rpx;
}

.fab-container {
	position: relative;
	top: -40rpx;
}

.fab-btn {
	width: 112rpx;
	height: 112rpx;
	background: #884855;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 16rpx 50rpx rgba(136, 72, 85, 0.4);
	border: 8rpx solid #f6f6f6;
}

.fab-btn .material-symbols-outlined {
	font-size: 52rpx;
	color: #ffffff;
	font-weight: 700;
}

.fab-btn:active {
	transform: scale(0.95);
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
