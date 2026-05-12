<template>
	<view class="index-page2">
		<!-- Top AppBar -->
		<header class="top-app-bar">
			<view class="top-bar-left">
				<view class="icon-btn" @click="handleBack">
					<text class="material-symbols-outlined">arrow_back</text>
				</view>
				<h1 class="brand-name">灵感广场</h1>
			</view>
			<view class="top-bar-right">
				<view class="icon-btn" @click="handleSearch">
					<text class="material-symbols-outlined">search</text>
				</view>
				<view class="icon-btn" @click="handlePalette">
					<text class="material-symbols-outlined">palette</text>
				</view>
			</view>
		</header>

		<main class="main-content">
			<!-- Hero Section -->
			<section class="hero-section">
				<view class="hero-bg">
					<text class="material-symbols-outlined hero-icon">auto_awesome</text>
					<h2 class="hero-title">激发你的<br/>DIY 灵魂</h2>
					<p class="hero-desc">查看全球创作者的精选作品</p>
				</view>
			</section>

			<!-- Filters -->
			<scroll-view class="filter-scroll" scroll-x enable-flex>
				<view class="filter-list">
					<view 
						v-for="(filter, index) in filters" 
						:key="index"
						:class="['filter-item', { active: currentFilter === filter.name }]"
						@click="selectFilter(filter.name)"
					>
						{{ filter.label }}
					</view>
				</view>
			</scroll-view>

			<!-- Inspiration Grid -->
			<section class="inspiration-grid">
				<view class="grid-container">
					<view 
						v-for="(item, index) in inspirationItems" 
						:key="index"
						:class="['grid-item', item.offset]"
						@click="handleItemClick(item)"
					>
						<view class="item-image-wrap">
							<image class="item-image" mode="aspectFill" :src="item.image" />
							<view v-if="item.liked" class="like-icon">
								<text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">favorite</text>
							</view>
						</view>
						<view class="item-footer">
							<view class="item-author">
								<image class="author-avatar" mode="aspectFill" :src="item.avatar" />
								<span class="author-name">{{ item.author }}</span>
							</view>
							<span class="item-likes">{{ item.likes }}</span>
						</view>
					</view>
				</view>
			</section>
		</main>

		<!-- FAB Button -->
		<view class="fab-btn" @click="handleCreate">
			<text class="material-symbols-outlined">add</text>
		</view>

		<!-- Bottom Navigation Bar -->
		<nav class="bottom-nav">
			<view class="nav-item" @click="switchTab('studio')">
				<text class="material-symbols-outlined">draw</text>
				<span class="nav-label">Studio</span>
			</view>
			<view class="nav-item nav-item-active" @click="switchTab('gallery')">
				<text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">grid_view</text>
				<span class="nav-label">Gallery</span>
			</view>
			<view class="nav-item" @click="switchTab('logos')">
				<text class="material-symbols-outlined">camera</text>
				<span class="nav-label">Logos</span>
			</view>
			<view class="nav-item" @click="switchTab('me')">
				<text class="material-symbols-outlined">person</text>
				<span class="nav-label">Me</span>
			</view>
		</nav>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const currentFilter = ref('全部')

const filters = [
	{ name: '全部', label: '全部' },
	{ name: '可爱风', label: '可爱风' },
	{ name: '极简主义', label: '极简主义' },
	{ name: '艺术插画', label: '艺术插画' },
	{ name: '赛博朋克', label: '赛博朋克' }
]

const inspirationItems = [
	{
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJF3cGg57Eg2AaIZ9Uqv-yyPncDK0gPHYxz5Jrb2Osv-teOBld-JLjTA--K7_skYsi0Qxu3tROFKEeu5dT171G9dADY5JUbi2SldN__c4VNOldF9R1mvhpqWg5RYeQKXNQLUgb1bNWga0WRBPccTseoM_avHaXYiN6WGFDVEeMYapGdiyDhHrrT3JjMO3LMxTt3Utxaa317KqTmth4DJZHCgM2o8AZ7YuB2CHQqpZnXNNnTNlWvtpr1rZKxFLK4aY_VTeWYLap3tg',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGww-Rllh4CcnfVUtiiJcEXrZXeQcGliP4f2SvB0HaWYy-bp7fzUIeLU9yqOPysvTFyMFnOM7dGs1ME18DrjjadPR-0vrqzCBaJB4WEffjnvuqSsVDwVWmeIq849VDhtyFZ33R2QTMUpSgj_Vfc78-4iS5xB3u5F6izlIErqGxVd2gPKUmmpgqLyGacOJrG6WcZcvy7zC94jwAlpEB-Knay5OudtR9zvT1DJoghVNYJMn355R_RdZrXCvnmIbz2zw1BAd_teL9BGE',
		author: '小草莓酱',
		likes: '1.2k',
		liked: true,
		offset: ''
	},
	{
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-MQvCFciYKsK4DxVO7awM34AzYCEP4RlDz9NTDxMrlNIEfZDtdOXFT-vLhi0xm2tj3-k2eJNPwRnnixtlaYWM_v_BYaao-edUbkH3Nt6yXmE12ybLjofYNeTPcNExUIMuPXII7bLzc5Kt4vTll5HdxqIzbOOirUIa3D3I7ueL2dmgdZ-qVJbPyU_QtBTTiIcV_UzIeO9m6aJbbdge_mZ1m2Ud3oc_sJRFbKC4W43KPFGgTFt4MTdaQntWqsJIRxXQCczzr7l-MrQ',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0ffrriCik-Oeu6X7HOnF0x5oh7S9hVWQ7WuALk5i0dOApWL5NOQA1A6lCkIxxGmDYlJhfFZeScN-cL2_pHlhgSdF7U8yHLWkXlpMC6pvm_pZ5o2mtlmotrLBv9zscIxxPkJfUSfnbSU-6QBWH27Tf8IJl6Y7VgsLMKEFJHLuJvKvdD7PfhkQ0k72CQ4lFwSlLpjxHdpLFqtMd41yxGKS3m8iLbCdEm3I0qKvk4XvQoopM2xn_QoSNJgg9q2MbdrgZAQBDPAnCrRA',
		author: '阿哲工作室',
		likes: '856',
		liked: false,
		offset: 'offset-top'
	},
	{
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX--CRXhQhDd97rdOj8vRmGUxxpu3z7BRZY3CoOh_7gmSJr1ep16TFZsWc76HsT0Zd2kSd26WL5gyeVh-pwwBb8_PguLC53wwd7sMQy9-2pXhxrP0viHygGJqcY9wnQoRc7x4yTvo6AyGMGx_7_9cdK7MPC8rVVJhEZJcAEfGKStCFfxsJY3NvA-Pkgd_PRszFlw3vpVflr_ygZwwG2RatKkU9dMuKdsl-qWiBZ3AakUG4877sdfazk-TcCzJKUTxltyPSHDedMe8',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmFK8y_NyudeeoFmBxWwEudm24yszyd3l6q2Vo0fEBr34kPE_-uxakMswFMYv5Qf7W9td6o6njMYB_43ZEYW30l1aq4sG1Ll2oRPf9h3UtfWp3_Au9gZe9AHgS69MMbEtu5IdUPc0QvIHuc9MzzfVYHUbmEP0_v4_0sfLeeYR9uNp8HNaE3pXsMeYhzA2h5NzJyfAmSbYRlCuN0C5DAK5QMm7H0PbojWxxG5WLwgGCtBs-7v3OQOy2RvccYGhsNIjJ-2kEGO5NuM',
		author: '灵感捕手',
		likes: '2.4k',
		liked: false,
		offset: ''
	},
	{
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8z2cPKDEWRvEK8etxNcpqYNBo7o8EWOrI_zL50ly_VTEn_1ejcaYKEoNhox-MKGaLVZXsoWZQtCJHzdhi9GvyJGC6wM8Z710pvek2Y0kdoviiu5q5fONohRGKf6CoXZK3NBTs0iCvoebZ-3qsmJ7RIXKIQMnSJIA2Ygow3YD_3f7npYXkLGKn9toh8s60WfRaeXoKg_xxeqW9_llAPm5z5Fe8j-_AD2t1mzGNq0f0s6LDuyTZEyQ35Hbo6RJ_8YD3H9459P4gwuA',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmCQfEKYJ6DN2QG2ymDnc74IVNpdSaHE4egc2GzDUxmSM_WXyl_OM3XqBHeaJpmSo76oCKePEO--3_qTdMtlMlt5Ogkbd4QGxTmNs9H_pbPtKluVod-Mn2nVYzaCvQeUCDHuFT2IF7j4xdvflwkjTrGaDrPmbcUUEA_M-F4_K_qea76MgjFnsitZ9FD-HFuNXV8JsQ4ygyClijptNZrhKQO338v_Hv13a2FzyokaPwPcHlgMmIuQ2V9lzZOtwNIjKDSocSJ25bu7o',
		author: 'CaseMe',
		likes: '542',
		liked: false,
		offset: 'offset-bottom'
	}
]

function handleBack() {
	uni.navigateBack()
}

function handleSearch() {
	uni.showToast({ title: '搜索', icon: 'none' })
}

function handlePalette() {
	uni.showToast({ title: '调色板', icon: 'none' })
}

function selectFilter(name) {
	currentFilter.value = name
	uni.showToast({ title: `已选择 ${name}`, icon: 'none' })
}

function handleItemClick(item) {
	uni.showToast({ title: item.author, icon: 'none' })
}

function handleCreate() {
	uni.showToast({ title: '创建新设计', icon: 'none' })
}

function switchTab(tab) {
	const tabNames = {
		studio: 'Studio',
		gallery: 'Gallery',
		logos: 'Logos',
		me: 'Me'
	}
	uni.showToast({ title: tabNames[tab], icon: 'none' })
}
</script>

<style scoped>
.index-page2 {
	min-height: 100vh;
	background: #f6f6f6;
	padding-bottom: 180rpx;
}

.top-app-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 32rpx;
	background: rgba(246, 246, 246, 0.8);
	backdrop-filter: blur(40rpx);
	position: sticky;
	top: 0;
	z-index: 40;
}

.top-bar-left {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.icon-btn {
	width: 64rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-btn .material-symbols-outlined {
	font-size: 36rpx;
	color: #5a5c5c;
}

.brand-name {
	font-size: 40rpx;
	font-weight: 800;
	color: #166665;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.top-bar-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.main-content {
	padding: 0 24rpx;
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

.filter-scroll {
	margin-top: 24rpx;
	white-space: nowrap;
}

.filter-list {
	display: inline-flex;
	gap: 12rpx;
	padding: 8rpx 0;
}

.filter-item {
	padding: 16rpx 32rpx;
	background: #ffffff;
	color: #2d2f2f;
	border-radius: 100rpx;
	font-size: 26rpx;
	font-weight: 700;
	white-space: nowrap;
}

.filter-item.active {
	background: #166665;
	color: #bcfffd;
}

.inspiration-grid {
	margin-top: 24rpx;
}

.grid-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
}

.grid-item {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.grid-item.offset-top {
	margin-top: 60rpx;
}

.grid-item.offset-bottom {
	margin-top: -30rpx;
}

.item-image-wrap {
	position: relative;
	border-radius: 24rpx;
	overflow: hidden;
	background: #dbdddd;
}

.item-image {
	width: 100%;
	height: 100%;
	transition: transform 0.5s;
}

.grid-item:active .item-image {
	transform: scale(1.1);
}

.like-icon {
	position: absolute;
	top: 12rpx;
	right: 12rpx;
}

.like-icon .material-symbols-outlined {
	font-size: 36rpx;
	color: #ffffff;
	text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.item-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 4rpx;
}

.item-author {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.author-avatar {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	border: 2rpx solid #ffffff;
}

.author-name {
	font-size: 22rpx;
	font-weight: 700;
	color: #2d2f2f;
	max-width: 120rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.item-likes {
	font-size: 20rpx;
	font-weight: 700;
	color: #5a5c5c;
}

.fab-btn {
	position: fixed;
	right: 32rpx;
	bottom: 180rpx;
	width: 96rpx;
	height: 96rpx;
	background: #ffd709;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 24rpx rgba(255, 215, 9, 0.4);
	z-index: 50;
}

.fab-btn .material-symbols-outlined {
	font-size: 44rpx;
	color: #5b4b00;
}

.fab-btn:active {
	transform: scale(0.92);
}

.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 16rpx 24rpx;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	background: #ffffff;
	border-radius: 96rpx 96rpx 0 0;
	box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.04);
	z-index: 50;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12rpx 32rpx;
	color: #5a5c5c;
	transition: all 0.2s;
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
	font-weight: 700;
	font-family: 'Be Vietnam Pro', sans-serif;
	text-transform: uppercase;
	letter-spacing: 2px;
}

.nav-item-active {
	background: #ffd709;
	color: #166665;
	border-radius: 100rpx;
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
