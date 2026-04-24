<template>
	<scroll-view scroll-y class="home-page">
		<view class="home-page__hero">
			<view>
				<text class="home-page__eyebrow">AI 影像工作台</text>
				<text class="home-page__title">让图片、视频与试衣体验更自然</text>
				<text class="home-page__desc">聚焦实时预览、细节调节和跨端流畅体验的创作工具首页。</text>
			</view>
			<view class="home-page__badge">实时渲染</view>
		</view>

		<view class="home-page__grid">
			<view
				v-for="item in featureCards"
				:key="item.path"
				class="home-page__card"
				@click="goPage(item.path)"
			>
				<text class="home-page__card-tag">{{ item.tag }}</text>
				<text class="home-page__card-title">{{ item.title }}</text>
				<text class="home-page__card-desc">{{ item.desc }}</text>
			</view>
		</view>

		<view class="home-page__section">
			<text class="home-page__section-title">推荐流程</text>
			<view class="home-page__steps">
				<view v-for="step in steps" :key="step.title" class="home-page__step">
					<text class="home-page__step-index">0{{ step.index }}</text>
					<view>
						<text class="home-page__step-title">{{ step.title }}</text>
						<text class="home-page__step-desc">{{ step.desc }}</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
const featureCards = [
	{
		tag: 'Face',
		title: '图片换脸',
		desc: '智能识别面部区域，支持融合程度和匹配模式调节。',
		path: '/pages/face/image'
	},
	{
		tag: 'Video',
		title: '视频换脸',
		desc: '支持上传视频、实时跟踪与美颜增强的处理入口。',
		path: '/pages/face/video'
	},
	{
		tag: 'Fashion',
		title: '换装试衣',
		desc: '虚拟试穿不同服装风格，保留尺寸和颜色选择位。',
		path: '/pages/fashion/try-on'
	}
]

const steps = [
	{ index: 1, title: '上传素材', desc: '选择图片、视频或摄像头模式开始体验。' },
	{ index: 2, title: '调整参数', desc: '按需求调节融合、精度和风格参数。' },
	{ index: 3, title: '实时预览', desc: '在提交前即时查看效果，减少反复试错。' }
]

const tabBarPages = ['/pages/tabbar/home', '/pages/tabbar/mine']

const goPage = (url) => {
	const normalizedUrl = url?.startsWith('/') ? url : `/${url || ''}`

	if (!normalizedUrl || normalizedUrl === '/') {
		uni.showToast({ title: '页面路径无效', icon: 'none' })
		return
	}

	const method = tabBarPages.includes(normalizedUrl) ? 'switchTab' : 'navigateTo'

	uni[method]({
		url: normalizedUrl,
		fail(error) {
			console.error(`页面跳转失败: ${normalizedUrl}`, error)

			// #ifdef H5
			if (method === 'navigateTo' && typeof window !== 'undefined') {
				window.location.hash = normalizedUrl
				return
			}
			// #endif

			uni.showToast({ title: '页面跳转失败', icon: 'none' })
		}
	})
}
</script>

<style lang="scss" scoped>
.home-page {
	min-height: 100vh;
	padding: 32rpx 28rpx 40rpx;
	box-sizing: border-box;

	&__hero {
		display: flex;
		justify-content: space-between;
		gap: 24rpx;
		padding: 40rpx 32rpx;
		border-radius: 36rpx;
		background: linear-gradient(135deg, rgba(24, 36, 51, 0.98) 0%, rgba(41, 68, 99, 0.92) 100%);
		box-shadow: 0 24rpx 70rpx rgba(24, 36, 51, 0.22);
	}

	&__eyebrow,
	&__title,
	&__desc,
	&__badge,
	&__card-tag,
	&__card-title,
	&__card-desc,
	&__section-title,
	&__step-index,
	&__step-title,
	&__step-desc {
		display: block;
	}

	&__eyebrow {
		font-size: 24rpx;
		letter-spacing: 4rpx;
		color: rgba(255, 255, 255, 0.68);
	}

	&__title {
		margin-top: 24rpx;
		font-size: 52rpx;
		font-weight: 700;
		line-height: 1.2;
		color: #ffffff;
	}

	&__desc {
		max-width: 480rpx;
		margin-top: 18rpx;
		font-size: 26rpx;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.74);
	}

	&__badge {
		align-self: flex-start;
		padding: 16rpx 18rpx;
		border-radius: 26rpx;
		background: rgba(255, 255, 255, 0.14);
		font-size: 24rpx;
		color: #ffffff;
		white-space: nowrap;
	}

	&__grid {
		margin-top: 28rpx;
	}

	&__card {
		padding: 30rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		border-radius: 32rpx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 22rpx 48rpx rgba(24, 36, 51, 0.08);

		& + & {
			margin-top: 20rpx;
		}
	}

	&__card-tag {
		font-size: 22rpx;
		letter-spacing: 4rpx;
		text-transform: uppercase;
		color: #7a8697;
	}

	&__card-title {
		margin-top: 12rpx;
		font-size: 36rpx;
		font-weight: 700;
		color: #182433;
	}

	&__card-desc {
		margin-top: 16rpx;
		font-size: 26rpx;
		line-height: 1.7;
		color: #5d6b7d;
	}

	&__section {
		margin-top: 28rpx;
		padding: 32rpx 28rpx;
		border-radius: 32rpx;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.84) 0%, rgba(242, 246, 251, 0.96) 100%);
		box-shadow: 0 18rpx 42rpx rgba(24, 36, 51, 0.06);
	}

	&__section-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #182433;
	}

	&__steps {
		margin-top: 24rpx;
	}

	&__step {
		display: flex;
		gap: 24rpx;
		align-items: flex-start;

		& + & {
			margin-top: 22rpx;
		}
	}

	&__step-index {
		width: 76rpx;
		height: 76rpx;
		border-radius: 22rpx;
		background: #e4edf8;
		box-shadow: inset 0 2rpx 0 rgba(255, 255, 255, 0.8);
		font-size: 28rpx;
		font-weight: 700;
		line-height: 76rpx;
		text-align: center;
		color: #294463;
	}

	&__step-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #182433;
	}

	&__step-desc {
		margin-top: 10rpx;
		font-size: 25rpx;
		line-height: 1.7;
		color: #627083;
	}
}
</style>
