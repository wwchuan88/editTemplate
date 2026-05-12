<template>
	<view class="ai-create-page">


		<main class="main-content">
			<!-- Hero Intro Section -->
			<section class="hero-section">
				<span class="hero-label">Creative Studio</span>
				<h2 class="hero-title">释放你的想象力</h2>
				<p class="hero-desc">在 Atelier DIY 实验室中，使用先进的 AI 工具打造独一无二的手机壳。</p>
			</section>

			<!-- Text-to-Image Card -->
			<section class="text-to-image-card">
				<div class="card-header">
					<div class="card-info">
						<span class="popular-badge">Popular</span>
						<h3 class="card-title">文字生图</h3>
						<p class="card-desc">描述你的灵感，AI 将瞬间为你创作精美图案。</p>
					</div>
					<view class="card-image-wrap">
						<image class="card-image" mode="aspectFit" :src="previewImageUrl1" />
					</view>
				</div>
				<view class="card-content">
					<textarea class="prompt-input" v-model="promptText" placeholder="例如：一只戴着墨镜在海滩冲浪的柯基猫..."></textarea>
					<view class="preview-btn" @click="handlePreviewHistory">
						<text class="material-symbols-outlined iconfont icon-lishi"></text>
						<span>预览已生成图片</span>
					</view>
					<button class="generate-btn" @click="handleGenerate">开始生成</button>
				</view>
				<view class="card-decoration">
					<text class="material-symbols-outlined">auto_fix_high</text>
				</view>
			</section>

			<!-- Other Tools Grid -->
			<section class="text-to-image-card">
				<!-- Face Swap Card -->
				<view class="tool-card face-swap-card">
					<div class="tool-info">
						<h3 class="tool-title">图片换脸</h3>
						<p class="tool-desc">将自拍完美融入艺术创作</p>
					</div>
					<view class="face-swap-content">
						<view class="face-source">
							<text class="material-symbols-outlined iconfont icon-icon-test" style="font-size: 48rpx;"></text>
							<span style="font-size: 24rpx;">上传模板</span>
						</view>
						<text class="material-symbols-outlined swap-icon iconfont icon-sort"></text>
						<view class="face-target" @click="handleUploadSource">
							<text class="material-symbols-outlined iconfont icon-zhaoxiangji" style="font-size: 48rpx;"></text>
							<span style="font-size: 24rpx;">上传人脸</span>
						</view>
					</view>
					<view class="preview-btn" @click="handlePreviewHistory">
						<text class="material-symbols-outlined iconfont icon-lishi"></text>
						<span>预览已生成图片</span>
					</view>
					<button class="tool-btn face-btn" @click="handleFaceSwap">一键换脸</button>
				</view>
			</section>

			<!-- Other Tools Grid -->
			<section class="text-to-image-card">
				<!-- Background Removal Card -->
				<view class="tool-card bg-remove-card">
					<div class="tool-info">
						<h3 class="tool-title">智能抠图</h3>
						<p class="tool-desc">精准提取主体，背景秒变透明</p>
					</div>
					<view class="bg-remove-preview">
						<view class="preview-bg"></view>
						<image class="preview-image" mode="aspectFit" :src="previewImageUrl3" />
						<view class="preview-divider"></view>
					</view>
					<view class="preview-btn" @click="handlePreviewHistory">
						<text class="material-symbols-outlined iconfont icon-lishi"></text>
						<span>预览已生成图片</span>
					</view>
					<button class="tool-btn bg-btn" @click="handleBgRemove">开始提取</button>
				</view>
			</section>



			<!-- Community Inspiration Section -->
			<section class="community-section">
				<div class="section-header">
					<h3 class="section-title">社区灵感</h3>
					<view class="view-all">查看全部</view>
				</div>
				<view class="community-grid">
					<view 
						v-for="(item, index) in communityItems" 
						:key="index" 
						class="community-item"
					>
						<image class="community-image" mode="aspectFill" :src="item.image" />
					</view>
				</view>
			</section>
		</main>


	</view>
</template>

<script setup>
import { ref } from 'vue'
import { buildUrl } from '@/config/env'
import previewImageUrl1 from '@/static/images/ai-unnamed-1.png'
import previewImageUrl2 from '@/static/images/ai-unnamed-3.png'
import previewImageUrl3 from '@/static/images/ai-unnamed-4.png'
const promptText = ref('')

const communityItems = [
	{
		image: buildUrl("/public/images/ai-unnamed-2.png")
	},
	{
		image: buildUrl("/public/images/ai-unnamed-5.png")
	}

]

function handleCart() {
	uni.showToast({ title: '购物车', icon: 'none' })
}

function handlePreviewHistory() {
	uni.showToast({ title: '预览历史', icon: 'none' })
}

function handleGenerate() {
	if (!promptText.value) {
		uni.showToast({ title: '请输入描述', icon: 'none' })
		return
	}
	uni.showToast({ title: '正在生成...', icon: 'loading' })
}

function handleFaceSwap() {
	uni.showToast({ title: '一键换脸', icon: 'none' })
}

function handleUploadSource() {
	uni.showToast({ title: '上传图片', icon: 'none' })
}

function handleBgRemove() {
	uni.showToast({ title: '开始抠图', icon: 'none' })
}

function switchTab(tab) {
	const tabNames = {
		studio: 'Studio',
		gallery: 'Gallery',
		ai: 'AI Tools',
		me: 'Me'
	}
	uni.showToast({ title: tabNames[tab], icon: 'none' })
}
</script>

<style scoped>
.ai-create-page {
	min-height: 100vh;
	background: #f6f6f6;
	padding-bottom: 180rpx;
}

.top-app-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 32rpx;
	background: #f0f1f1;
	position: sticky;
	top: 0;
	z-index: 50;
}

.top-bar-left {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.bar-icon {
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

.icon-btn {
	width: 72rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-btn .material-symbols-outlined {
	font-size: 40rpx;
	color: #6c5a00;
}

.main-content {
	margin: 0 auto;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
}

.hero-section {
	margin-bottom: 40rpx;
}

.hero-label {
	font-size: 20rpx;
	font-weight: 700;
	color: #166665;
	letter-spacing: 4px;
	text-transform: uppercase;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.hero-title {
	font-size: 64rpx;
	font-weight: 800;
	color: #2d2f2f;
	margin-top: 8rpx;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.hero-desc {
	font-size: 28rpx;
	color: #5a5c5c;
	margin-top: 16rpx;
}

.text-to-image-card {
	position: relative;
	background: #ffffff;
	border-radius: 32rpx;
	padding: 32rpx;
	box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.04);
	margin-bottom: 32rpx;
	overflow: hidden;
}

.card-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 32rpx;
}

.card-info {
	flex: 1;
}

.popular-badge {
	display: inline-flex;
	align-items: center;
	padding: 8rpx 16rpx;
	background: #ffd709;
	color: #5b4b00;
	border-radius: 100rpx;
	font-size: 18rpx;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 2px;
}

.card-title {
	font-size: 40rpx;
	font-weight: 800;
	color: #2d2f2f;
	margin-top: 12rpx;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.card-desc {
	font-size: 24rpx;
	color: #5a5c5c;
	margin-top: 8rpx;
	max-width: 400rpx;
}

.card-image-wrap {
	width: 160rpx;
	height: 160rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card-image {
	width: 100%;
	height: 100%;
	transition: transform 0.5s;
}

.text-to-image-card:active .card-image {
	transform: scale(1.1);
}

.card-content {
	position: relative;
	z-index: 10;
}

.prompt-input {
	width: 100%;
	height: 160rpx;
	background: #f0f1f1;
	border: none;
	border-radius: 24rpx;
	padding: 24rpx;
	font-size: 28rpx;
	color: #2d2f2f;
	box-sizing: border-box;
}

.prompt-input::placeholder {
	color: #767777;
}

.preview-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	margin-top: 48rpx;
	margin-bottom: 32rpx;
}

.preview-btn .material-symbols-outlined {
	font-size: 32rpx;
	color: #5a5c5c;
}

.preview-btn span {
	font-size: 20rpx;
	font-weight: 700;
	color: #5a5c5c;
}

.generate-btn {
	width: 100%;
	padding: 24rpx;
	background: linear-gradient(135deg, #ffd709 0%, #efc900 100%);
	color: #453900;
	border-radius: 100rpx;
	font-size:28rpx;
	font-family: 'Plus Jakarta Sans', sans-serif;
	box-shadow: 0 10rpx 24rpx rgba(255, 215, 9, 0.3);
}

.generate-btn:active {
	transform: scale(0.98);
}

.card-decoration {
	position: absolute;
	bottom: -32rpx;
	right: -32rpx;
	opacity: 0.1;
	pointer-events: none;
}

.card-decoration .material-symbols-outlined {
	font-size: 160rpx;
	color: #6c5a00;
}

.tools-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 24rpx;
	margin-bottom: 48rpx;
}

.tool-card {
	border-radius: 24rpx;
	padding: 24rpx;
}

.face-swap-card {
	background: rgba(168, 239, 237, 0.3);
}

.tool-info {
	margin-bottom: 24rpx;
}

.tool-title {
	font-size: 28rpx;
	font-weight: 700;
	color: #005c5b;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.tool-desc {
	font-size: 20rpx;
	color: #166665;
	margin-top: 4rpx;
}

.face-swap-content {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
}

.face-source {
	position: relative;
	width: 200rpx;
	height:200rpx;
	border-radius: 50%;
	border: 4rpx dashed #acadad;
	background: #f0f1f1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.face-image {
	width: 100%;
	height: 100%;
}

.face-badge {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 32rpx;
	height: 32rpx;
	background: #6c5a00;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2rpx solid #ffffff;
}

.face-badge .material-symbols-outlined {
	font-size: 20rpx;
	color: #ffffff;
}

.swap-icon {
	font-size: 48rpx;
	color: #767777;
	transform: rotate(90deg);
}

.face-target {
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	border: 4rpx dashed #acadad;
	background: #f0f1f1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.face-target .material-symbols-outlined {
	font-size: 32rpx;
	color: #767777;
}

.face-target span {
	font-size: 16rpx;
	font-weight: 700;
	color: #767777;
	margin-top: 4rpx;
	text-transform: uppercase;
}

.face-swap-card .preview-btn {
	margin-top: 48rpx;
	margin-bottom: 32rpx;
}

.face-swap-card .preview-btn span {
	color: #166665;
}

.tool-btn {
	width: 100%;
	padding: 24rpx;
	border-radius: 100rpx;
	font-size: 24rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.face-btn {
	background: #166665;
	color: #a8efed;
}

.bg-remove-card {
	background: rgba(255, 174, 188, 0.2);
}

.bg-remove-card .tool-title {
	color: #4b1825;
}

.bg-remove-card .tool-desc {
	color: #6f3541;
}

.bg-remove-preview {
	position: relative;
	height: 200rpx;
	background: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	border: 4rpx solid #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.preview-bg {
	position: absolute;
	inset: 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.preview-bg::before,
.preview-bg::after {
	content: '';
}

.preview-bg::before {
	background: #d3d5d5;
}

.preview-bg::after {
	background: radial-gradient(#dbdddd 1px, transparent 1px);
	background-size: 16rpx 16rpx;
}

.preview-image {
	position: relative;
	z-index: 10;
	width: 120rpx;
	transform: rotate(-12deg);
	transition: transform 0.5s;
}

.bg-remove-card:active .preview-image {
	transform: rotate(0deg);
}

.preview-divider {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 2rpx;
	background: #ffffff;
	z-index: 20;
	box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
}

.bg-remove-card .preview-btn {
	margin-top: 48rpx;
	margin-bottom: 32rpx;
}

.bg-remove-card .preview-btn span {
	color: #6f3541;
}

.bg-btn {
	background: #884855;
	color: #ffffff;
}

.community-section {
	margin-bottom: 32rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 24rpx;
}

.section-title {
	font-size: 40rpx;
	font-weight: 800;
	color: #2d2f2f;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.view-all {
	font-size: 24rpx;
	font-weight: 700;
	color: #6c5a00;
}

.community-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
}

.community-item {
	background: #f0f1f1;
	border-radius: 24rpx;
	overflow: hidden;
}

.community-image {
	width: 100%;
	height: 280rpx;
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
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(40rpx);
	border-radius: 48rpx 48rpx 0 0;
	box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.06);
	z-index: 50;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16rpx 32rpx;
	color: #5a5c5c;
	transition: all 0.2s;
}

.nav-item:active {
	transform: scale(0.9);
}

.nav-item .material-symbols-outlined {
	font-size: 40rpx;
}

.nav-label {
	font-size: 18rpx;
	font-weight: 500;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-top: 4rpx;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.nav-item-active {
	background: #6c5a00;
	color: #ffffff;
	border-radius: 100rpx;
	box-shadow: 0 4rpx 16rpx rgba(108, 90, 0, 0.3);
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined', sans-serif;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
