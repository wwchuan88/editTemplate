<template>
	<view class="index-page">
		<!-- TopAppBar -->


		<main class="main-content">
			<!-- Top Banner -->
			<section class="banner-section">
				<div class="banner-content">
					<span class="banner-badge">专属定制</span>
					<h2 class="banner-title">专属你的定制手机壳</h2>
					<p class="banner-desc">随心所欲，拼出个性</p>
					<button class="banner-btn" @click="handleStartCustomize">立即开启</button>
				</div>
				<div class="banner-illustration">
					<view class="phone-case">
						<view class="case-inner"></view>
					</view>
					<view class="decor-circle"></view>
					<view class="decor-square"></view>
				</div>
				<view class="banner-blur"></view>
				<view class="banner-pattern"></view>
			</section>

			<!-- Video Tutorials Section -->
			<section class="video-section">
				<div class="section-header">
					<div class="section-info">
						<h3 class="section-title">视频教程</h3>
						<p class="section-desc">教你如何定制手机壳</p>
					</div>
					<view class="view-more" @click="handleViewMore">查看更多</view>
				</div>
				<view class="video-list">
					<view 
						v-for="(video, index) in videos" 
						:key="index"
						class="video-card"
						@click="handleVideoPlay(video)"
					>
						<view class="video-thumbnail-wrap">
							<image class="video-thumbnail" mode="aspectFill" :src="video.thumbnail" />
							<view class="play-overlay">
								<view class="play-btn">
									<text class="material-symbols-outlined iconfont icon-right-fill"></text>
								</view>
							</view>
							<view class="video-duration">{{ video.duration }}</view>
						</view>
						<div class="video-info">
							<h4 class="video-title">{{ video.title }}</h4>
							<div class="video-stats">
								<view class="stat-item">
									<text class="material-symbols-outlined">visibility</text>
									<span>{{ video.views }}</span>
								</view>
								<view class="stat-item">
									<text class="material-symbols-outlined">thumb_up</text>
									<span>{{ video.likes }}</span>
								</view>
							</div>
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

const videos = [
	{
		thumbnail: buildUrl("/public/images/ai-unnamed-2.png"),
		title: '小白入门：三步拼出你的专属外壳',
		duration: '05:24',
		views: '2.8w',
		likes: '1.2k'
	},
	{
		thumbnail: buildUrl("/public/images/ai-unnamed-5.png"),
		title: '进阶指南：如何使用艺术滤镜与贴纸组合',
		duration: '08:12',
		views: '1.5w',
		likes: '856'
	},
	{
		thumbnail: buildUrl("/public/images/ai-unnamed-5.png"),
		title: '灵感分享：当下最火的手机壳设计趋势',
		duration: '04:45',
		views: '3.2w',
		likes: '2.4k'
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

function handleViewMore() {
	uni.showToast({ title: '查看更多教程', icon: 'none' })
}

function handleVideoPlay(video) {
	uni.showToast({ title: `播放：${video.title}`, icon: 'none' })
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
.index-page {
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

.video-section {
	margin-top: 48rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 24rpx;
}

.section-info {
	display: flex;
	flex-direction: column;
}

.section-title {
	font-size: 48rpx;
	font-weight: 800;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.section-desc {
	font-size: 24rpx;
	color: #5a5c5c;
	font-weight: 500;
	margin-top: 4rpx;
}

.view-more {
	font-size: 26rpx;
	font-weight: 700;
	color: #166665;
}

.video-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.video-card {
	background: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
}

.video-thumbnail-wrap {
	position: relative;
	width: 100%;
	height: 360rpx;
}

.video-thumbnail {
	width: 100%;
	height: 100%;
}

.play-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.play-btn {
	width: 80rpx;
	height: 80rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
}

.play-btn .material-symbols-outlined {
	font-size: 48rpx;
	color: #6c5a00;
	font-variation-settings: 'FILL' 1;
	margin-left: 4rpx;
}

.video-duration {
	position: absolute;
	bottom: 12rpx;
	right: 12rpx;
	padding: 6rpx 12rpx;
	background: rgba(0, 0, 0, 0.6);
	color: #ffffff;
	border-radius: 12rpx;
	font-size: 20rpx;
	font-weight: 700;
}

.video-info {
	padding: 20rpx;
}

.video-title {
	font-size: 30rpx;
	font-weight: 800;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.video-stats {
	display: flex;
	gap: 32rpx;
	margin-top: 12rpx;
}

.stat-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.stat-item .material-symbols-outlined {
	font-size: 24rpx;
	color: #767777;
}

.stat-item span {
	font-size: 22rpx;
	color: #5a5c5c;
	font-weight: 500;
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
