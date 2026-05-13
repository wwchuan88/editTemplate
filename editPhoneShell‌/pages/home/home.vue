<template>
	<view class="home-page">
		<!-- Top App Bar -->
		<header class="top-app-bar">
			<view class="top-bar-left">
				<view class="icon-btn-round" @click="handleMenu">
					<text class="material-symbols-outlined iconfont icon-menu-unfold"></text>
				</view>
				<h1 class="brand-name">My Atelier</h1>
			</view>
			<view class="top-bar-right">
				<view class="icon-btn-round" @click="handleSettings">
					<text class="material-symbols-outlined iconfont icon-setting"></text>
				</view>
			</view>
		</header>

		<main class="main-content">
			<!-- Profile Header -->
			<section class="profile-section">
				<view class="profile-avatar-wrap">
					<view class="avatar-outer">
						<image class="avatar-image" mode="aspectFill" :src="buildUrl('/public/images/atelier/ather-01.png')"/>
					</view>
					<view class="level-badge">Level 5</view>
				</view>
				<div class="profile-info">
					<h2 class="profile-name">Creative Maker</h2>
					<p class="profile-desc">Level 5 Designer • 创作达人</p>
				</div>
			</section>

			<!-- Stats Row -->
			<section class="stats-row">
				<view class="stat-item" @click="handleStatClick('works')">
					<div class="stat-number">24</div>
					<div class="stat-label">作品</div>
				</view>
				<view class="stat-item" @click="handleStatClick('fans')">
					<div class="stat-number">10</div>
					<div class="stat-label">AI图</div>
				</view>
				<view class="stat-item" @click="handleStatClick('following')">
					<div class="stat-number">382</div>
					<div class="stat-label">获赞</div>
				</view>
			</section>

			<!-- Action Grid -->
			<section class="action-grid">
				<view class="action-item action-secondary" @click="handleAction('orders')">
					<text class="material-symbols-outlined action-icon iconfont icon-gouwudai"></text>
					<span class="action-label">我的订单</span>
				</view>
				<view class="action-item action-tertiary" @click="handleAction('coupons')">
					<text class="material-symbols-outlined action-icon iconfont icon-biaoqian"></text>
					<span class="action-label">我的优惠券</span>
				</view>
				<view class="action-item action-surface" @click="handleAction('address')">
					<text class="material-symbols-outlined action-icon iconfont icon-wode-wodeshouhuodizhi"></text>
					<span class="action-label">收货地址</span>
				</view>
				<view class="action-item action-surface" @click="handleAction('support')">
					<text class="material-symbols-outlined action-icon iconfont icon-kefu"></text>
					<span class="action-label">联系客服</span>
				</view>
			</section>

			<!-- Portfolio Tabs -->
			<section class="portfolio-section">
				<view class="portfolio-tabs">
					<view 
						:class="['tab-item', { active: currentTab === 'works' }]"
						@click="selectTab('works')"
					>
						我的作品
					</view>
					<view 
						:class="['tab-item', { active: currentTab === 'favorites' }]"
						@click="selectTab('favorites')"
					>
						我的收藏
					</view>
				</view>

				<!-- Portfolio Grid -->
				<view class="portfolio-grid">
					<view 
						v-for="(item, index) in portfolioItems" 
						:key="index"
						:class="['portfolio-card', item.offset]"
						@click="handlePortfolioClick(item)"
					>
						<view class="portfolio-image-wrap">
							<image class="portfolio-image" mode="aspectFill" :src="item.image" />
							<view v-if="item.liked" class="portfolio-like">
								<text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">favorite</text>
							</view>
						</view>
						<div class="portfolio-info">
							<h3 class="portfolio-title">{{ item.title }}</h3>
							<p class="portfolio-date">{{ item.date }}</p>
						</div>
					</view>
				</view>
			</section>
		</main>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { buildUrl } from '@/config/env.js'
const currentTab = ref('works')

const portfolioItems = [
	{
		image: buildUrl("/public/images/editPhoneShell/unnamed-12.png"),
		title: '夏日柠黄限定',
		date: 'Created 2 days ago',
		liked: true,
		offset: ''
	},
	{
		image: buildUrl("/public/images/editPhoneShell/unnamed-10.png"),
		title: '梦幻云朵系列',
		date: 'Created 1 week ago',
		liked: false,
		offset: 'offset-top'
	}
]

function handleMenu() {
	uni.showToast({ title: '菜单', icon: 'none' })
}

function handleSettings() {
	uni.showToast({ title: '设置', icon: 'none' })
}

function handleStatClick(type) {
	const names = { works: '作品', fans: '粉丝', following: '关注' }
	uni.showToast({ title: names[type], icon: 'none' })
}

function handleAction(type) {
	const names = { orders: '我的订单', coupons: '我的优惠券', address: '收货地址', support: '联系客服' }
	uni.showToast({ title: names[type], icon: 'none' })
}

function selectTab(tab) {
	currentTab.value = tab
	uni.showToast({ title: tab === 'works' ? '我的作品' : '我的收藏', icon: 'none' })
}

function handlePortfolioClick(item) {
	uni.showToast({ title: item.title, icon: 'none' })
}

function switchTab(tab) {
	const tabNames = {
		studio: 'Studio',
		explore: 'Explore',
		orders: 'Orders',
		me: 'Me'
	}
	uni.showToast({ title: tabNames[tab], icon: 'none' })
}
</script>

<style scoped>
.home-page {
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
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 40;
}

.top-bar-left {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.icon-btn-round {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: #f0f1f1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-btn-round .material-symbols-outlined {
	font-size: 36rpx;
	color: #6c5a00;
}

.brand-name {
	font-size: 36rpx;
	font-weight: 700;
	color: #6c5a00;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.top-bar-right {
	display: flex;
	align-items: center;
}

.main-content {
	padding: 120rpx 24rpx 0;
	max-width: 1000rpx;
	margin: 0 auto;
}

.profile-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40rpx;
}

.profile-avatar-wrap {
	position: relative;
	margin-bottom: 24rpx;
	margin-top: 24rpx;
}

.avatar-outer {
	width: 256rpx;
	height: 256rpx;
	border-radius: 96rpx;
	padding: 8rpx;
	background: #ffd709;
	overflow: hidden;
	transform: rotate(3deg);
}

.avatar-image {
	width: 100%;
	height: 100%;
	border-radius: 64rpx;
}

.level-badge {
	position: absolute;
	bottom: -12rpx;
	right: -12rpx;
	padding: 8rpx 20rpx;
	background: #6c5a00;
	color: #fff2cd;
	border-radius: 100rpx;
	font-size: 22rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
	box-shadow: 0 8rpx 16rpx rgba(108, 90, 0, 0.3);
}

.profile-info {
	text-align: center;
}

.profile-name {
	font-size: 48rpx;
	font-weight: 800;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.profile-desc {
	font-size: 28rpx;
	color: #5a5c5c;
	margin-top: 8rpx;
}

.stats-row {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16rpx;
	margin-bottom: 24rpx;
}

.stat-item {
	background: #ffffff;
	padding: 32rpx;
	border-radius: 80rpx;
	text-align: center;
}

.stat-item:active {
	transform: scale(0.96);
}

.stat-number {
	font-size: 36rpx;
	font-weight: 800;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.stat-label {
	font-size: 20rpx;
	color: #5a5c5c;
	font-family: 'Plus Jakarta Sans', sans-serif;
	text-transform: uppercase;
	letter-spacing: 2px;
	margin-top: 8rpx;
}

.action-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
	margin-bottom: 24rpx;
}

.action-item {
	padding: 24rpx;
	border-radius: 64rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.action-item:active {
	transform: scale(0.96);
}

.action-icon {
	font-size: 64rpx;
}

.action-label {
	font-size: 28rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.action-secondary {
	background: #a8efed;
}

.action-secondary .action-icon {
	color: #005c5b;
}

.action-secondary .action-label {
	color: #005c5b;
}

.action-tertiary {
	background: #ffaebc;
}

.action-tertiary .action-icon {
	color: #652c39;
}

.action-tertiary .action-label {
	color: #652c39;
}

.action-surface {
	background: #f0f1f1;
}

.action-surface .action-icon {
	color: #5a5c5c;
}

.action-surface .action-label {
	color: #2d2f2f;
}

.portfolio-section {
	margin-top: 24rpx;
}

.portfolio-tabs {
	display: flex;
	justify-content: center;
	gap: 40rpx;
	border-bottom: none;
}

.tab-item {
	padding: 16rpx 0;
	font-size: 32rpx;
	font-weight: 700;
	color: #5a5c5c;
	font-family: 'Plus Jakarta Sans', sans-serif;
	position: relative;
}

.tab-item.active {
	color: #6c5a00;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 6rpx;
	background: #6c5a00;
	border-radius: 6rpx;
}

.portfolio-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 24rpx;
	margin-top: 24rpx;
}

.portfolio-card {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.portfolio-card:active {
	transform: scale(0.96);
}

.portfolio-card.offset-top {
	margin-top: 60rpx;
}

.portfolio-image-wrap {
	position: relative;
	border-radius: 64rpx;
	overflow: hidden;
	background: #e1e3e3;
	display: flex;
	justify-content: center;
	align-items: center;
}

.portfolio-image {
	width: 180rpx;
	transition: transform 0.5s;
}

.portfolio-card:active .portfolio-image {
	transform: scale(1.05);
}

.portfolio-like {
	position: absolute;
	top: 12rpx;
	right: 12rpx;
	padding: 12rpx;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 50%;
}

.portfolio-like .material-symbols-outlined {
	font-size: 28rpx;
	color: #6c5a00;
}

.portfolio-info {
	padding: 0 12rpx;
}

.portfolio-title {
	font-size: 28rpx;
	font-weight: 700;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.portfolio-date {
	font-size: 20rpx;
	color: #5a5c5c;
}

.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 12rpx 24rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(40rpx);
	border-radius: 48rpx 48rpx 0 0;
	box-shadow: 0 -10rpx 40rpx rgba(45, 47, 47, 0.05);
	z-index: 50;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12rpx 32rpx;
	color: #5a5c5c;
	transition: all 0.3s;
}

.nav-item:active {
	transform: scale(0.9);
}

.nav-item .material-symbols-outlined {
	font-size: 36rpx;
	margin-bottom: 4rpx;
}

.nav-label {
	font-size: 18rpx;
	font-weight: 500;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.nav-item-active {
	background: #ffd709;
	color: #5b4b00;
	border-radius: 100rpx;
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>