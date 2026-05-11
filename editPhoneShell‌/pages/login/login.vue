<template>
	<view class="login-page">
		<view class="bg-gradient"></view>
		<view class="glow-container">
			<view class="glow-top"></view>
			<view class="glow-bottom"></view>
			<view class="glow-center"></view>
		</view>

		<view class="main-content">
			<header class="header">
				<view class="header-brand">
					<text class="brand-name">CaseCraft</text>
					<text class="brand-slogan">设计你的梦想</text>
				</view>
				<view class="header-icon">
					<text class="material-symbols-outlined">brush</text>
				</view>
			</header>

			<section class="trending-section">
				<view class="trending-header">
					<h2 class="trending-title">热门推荐</h2>
					<text class="trending-link">查看全部</text>
				</view>
				<scroll-view class="trending-scroll" scroll-x="true" show-scrollbar="false">
					<view class="case-item" v-for="(item, index) in trendingCases" :key="index">
						<view class="case-card" :style="{ transform: `rotate(${item.rotation}deg)` }">
							<image class="case-image" mode="aspectFill" :src="item.image" :alt="item.alt"></image>
							<p class="case-name">{{ item.name }}</p>
						</view>
					</view>
				</scroll-view>
			</section>

			<section class="login-actions">
				<button class="btn-phone" @click="handlePhoneLogin">
					<text>手机号登录</text>
				</button>

				<button class="btn-apple" @click="handleAppleLogin">

					<text>Apple 登录</text>
				</button>

				<view class="divider">
					<view class="divider-line"></view>
					<text class="divider-text">或使用以下方式</text>
					<view class="divider-line"></view>
				</view>

				<view class="social-area">
					<view class="signup-area">
						<p class="signup-hint">还没有账号？</p>
						<view class="btn-signup" @click="handleSignup">新用户注册</view>
					</view>
				</view>
			</section>

			<footer class="legal-footer">
				<view>登录即表示您同意我们的</view>
				<view class="legal-text">
					<view>登录即表示您同意我们的</view>
					<view class="legal-links">
						<a class="legal-link" href="#">服务条款</a>和<a class="legal-link" href="#">隐私政策</a>
					</view>
				</view>
			</footer>
		</view>
	</view>

	<view class="background-filter">
		<view class="background-filter-up"></view>
		<view class="background-filter-down"></view>
	</view>

</template>

<script setup>
const trendingCases = [
	{
		name: 'Pastel Dream',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSyQ5ee0dVXGqZ5lmh-edWSyPfCdf8vkWwy7eKvs8nAOsSUYoNhKYR4VntXahtPCxKVLh6t0xbRp7MkWpP0dabHF9-ynlh3JDgvnMRewop_P6W5HM7-_upuXvNTZ_LeLZomRcrIR1l_VNNrAPzMWT3uag_DLzBxRLX5XliJfwxNOIZVbx1AJ4az4_u_sl-W78RnXYR7-Ad22LeF1Qp8bZi16Od5RFDDA3gG0rwJBqXgHMImi5gtXkL4bUUqglEQx09utdC9p6uoCo',
		alt: 'Modern minimalist aesthetic phone case with abstract pastel organic shapes',
		rotation: -2
	}
]

function handlePhoneLogin() {
	uni.showToast({ title: '手机登录功能开发中', icon: 'none' })
}

function handleAppleLogin() {
	uni.showToast({ title: 'Apple登录功能开发中', icon: 'none' })
}

function handleGoogleLogin() {
	uni.showToast({ title: 'Google登录功能开发中', icon: 'none' })
}

function handleSignup() {
	uni.showToast({ title: '注册功能开发中', icon: 'none' })
}
</script>

<style scoped>
.login-page {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	background: #f8f7f4;
}



.glow-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 2;
}

.glow-top {
	position: absolute;
	top: -200rpx;
	right: -200rpx;
	width: 600rpx;
	height: 600rpx;
	background: radial-gradient(circle, rgba(255, 174, 188, 0.4) 0%, transparent 70%);
	filter: blur(100rpx);
}

.glow-bottom {
	position: absolute;
	bottom: -300rpx;
	left: -200rpx;
	width: 700rpx;
	height: 700rpx;
	background: radial-gradient(circle, rgba(255, 230, 150, 0.5) 0%, transparent 70%);
	filter: blur(120rpx);
}

.glow-center {
	position: absolute;
	top: 60%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400rpx;
	height: 400rpx;
	background: radial-gradient(circle, rgba(255, 200, 180, 0.2) 0%, transparent 70%);
	filter: blur(80rpx);
}

.main-content {
	position: relative;
	z-index: 10;
	width: 100%;
	max-width: 600rpx;
	padding: 48rpx 48rpx;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 96rpx;
}

.header-brand {
	display: flex;
	flex-direction: column;
}

.brand-name {
	font-size: 48rpx;
	font-weight: 800;
	font-style: italic;
	color: #6c5a00;
	letter-spacing: -1px;
}

.brand-slogan {
	font-size: 24rpx;
	font-weight: 500;
	color: #166665;
	opacity: 0.7;
}

.header-icon {
	width: 96rpx;
	height: 96rpx;
	background: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.header-icon .material-symbols-outlined {
	color: #166665;
	font-size: 48rpx;
}

.trending-section {
	margin-bottom: 96rpx;
}

.trending-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 32rpx;
}

.trending-title {
	font-size: 40rpx;
	font-weight: 800;
	letter-spacing: -0.5px;
	color: #2d2f2f;
}

.trending-link {
	font-size: 20rpx;
	font-weight: 700;
	color: #884855;
}

.trending-scroll {
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	padding-bottom: 32rpx;
	gap: 40rpx;
}

.trending-scroll::-webkit-scrollbar {
	display: none;
}

.case-item {
	flex-shrink: 0;
	width: 352rpx;
}

.case-card {
	background: #ffffff;
	border-radius: 32rpx;
	padding: 24rpx;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
}

.case-image {
	width: 100%;
	height: 448rpx;
	object-fit: cover;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
}

.case-name {
	font-size: 20rpx;
	font-weight: 700;
	text-align: center;
	color: #5a5c5c;
}

.login-actions {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 32rpx;
}

.btn-phone,
.btn-apple {
	width: 100%;
	height: 100rpx;
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 24rpx;
	font-size: 32rpx;
	font-weight: 700;
	transition: transform 0.15s;
}

.btn-phone {
	background: linear-gradient(135deg, #ffd709 0%, #f5c800 100%);
	color: #453900;
	box-shadow: 0 8rpx 24rpx rgba(255, 215, 9, 0.4);
}

.btn-phone:active {
	transform: scale(0.98);
}

.btn-apple {
	background: #1a1a1a;
	color: #ffffff;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
}

.btn-apple:active {
	transform: scale(0.98);
}

.btn-icon {
	font-size: 40rpx;
	font-variation-settings: 'FILL' 1;
}

.apple-icon {
	width: 48rpx;
	height: 48rpx;
}

.divider {
	display: flex;
	align-items: center;
	padding: 48rpx 0;
	gap: 24rpx;
}

.divider-line {
	flex: 1;
	height: 2rpx;
	background: rgba(22, 102, 101, 0.1);
}

.divider-text {
	font-size: 20rpx;
	font-weight: 700;
	color: rgba(22, 102, 101, 0.4);
	letter-spacing: 1px;
}

.social-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 48rpx;
}

.btn-google {
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	background: #ffffff;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.15s;
}

.btn-google:active {
	transform: scale(0.95);
}

.google-icon {
	width: 64rpx;
	height: 64rpx;
}

.signup-area {
	text-align: center;
}

.signup-hint {
	font-size: 24rpx;
	font-weight: 500;
	color: #5a5c5c;
}

.btn-signup {
	font-size: 32rpx;
	font-weight: 800;
	color: #166665;
	margin-top: 8rpx;
}

.btn-signup:active {
	color: #6c5a00;
}

.legal-footer {
	margin-top: auto;
	padding-top: 64rpx;
	text-align: center;
}

.legal-text {
	font-size: 18rpx;
	color: rgba(22, 102, 101, 0.4);
	line-height: 1.8;
	letter-spacing: 0.5px;
}

.legal-link {
	text-decoration: underline;
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.legal-links {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
