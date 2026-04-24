<template>
	<view class="toolbar-card">


		<!-- 上层导航 -->
		<view class="toolbar-top">
			<view class="toolbar-top-left">
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'graphics' }"
					@click="activeNav = 'graphics'">
					图形
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'people' }"
					@click="activeNav = 'people'">
					人物
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'cartoon' }"
					@click="activeNav = 'cartoon'">
					卡通
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>


		</view>

		<!-- 下层内容 -->
		<view class="toolbar-bottom">
			<!-- 图形 -->
			<view v-if="activeNav === 'graphics'" class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="emoji-row">
						<view v-for="item in graphicsOptions" :key="item.label" class="emoji-card"
							@click="$emit('add', item)">
							<text class="emoji-card__icon">{{ item.icon }}</text>
							<text class="emoji-card__label">{{ item.label }}</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 人物 -->
			<view v-if="activeNav === 'people'" class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="emoji-row">
						<view v-for="item in peopleOptions" :key="item.label" class="emoji-card"
							@click="$emit('add', item)">
							<text class="emoji-card__icon">{{ item.icon }}</text>
							<text class="emoji-card__label">{{ item.label }}</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 卡通 -->
			<view v-if="activeNav === 'cartoon'" class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="emoji-row">
						<view v-for="item in cartoonOptions" :key="item.label" class="emoji-card"
							@click="$emit('add', item)">
							<text class="emoji-card__icon">{{ item.icon }}</text>
							<text class="emoji-card__label">{{ item.label }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeNav = ref('graphics')

const props = defineProps({
	options: {
		type: Array,
		default: () => []
	}
})

// 根据导航选项过滤图标
const graphicsOptions = computed(() => {
	// 为没有category的图标分配默认类别
	return props.options.filter((item, index) => {
		// 简单分配：前两个为图形，中间两个为人物，最后两个为卡通
		if (item.category) {
			return item.category === 'graphics'
		} else {
			return index < 2
		}
	})
})

const peopleOptions = computed(() => {
	return props.options.filter((item, index) => {
		if (item.category) {
			return item.category === 'people'
		} else {
			return index >= 2 && index < 4
		}
	})
})

const cartoonOptions = computed(() => {
	return props.options.filter((item, index) => {
		if (item.category) {
			return item.category === 'cartoon'
		} else {
			return index >= 4
		}
	})
})

defineEmits(['add'])
</script>

<style scoped>
.toolbar-card {
	padding: 24rpx;
	border-radius: 32rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 18rpx 60rpx rgba(80, 56, 30, 0.08);
}

.toolbar-card__title {
	display: block;
	margin-bottom: 8rpx;
	font-size: 30rpx;
	font-weight: 700;
	color: #2f241f;
}

.toolbar-card__desc {
	display: block;
	margin-bottom: 20rpx;
	font-size: 24rpx;
	line-height: 1.7;
	color: #826c60;
}

/* 上层导航样式 */
.toolbar-top {
	display: flex;
	border-bottom: 2rpx solid #f2e7da;
	margin-bottom: 20rpx;
}

.nav-item {
	flex: 1;
	padding: 16rpx 0;
	text-align: center;
	font-size: 26rpx;
	color: #826c60;
	cursor: pointer;
	transition: all 0.3s ease;
}

.nav-item--active {
	color: #d86e33;
	font-weight: 600;
	border-bottom: 4rpx solid #d86e33;
}

/* 下层内容样式 */
.toolbar-bottom {
	padding-top: 10rpx;
}

.nav-content {
	padding: 10rpx 0;
}

.chip-scroll {
	white-space: nowrap;
}

.emoji-row {
	display: inline-flex;
	gap: 16rpx;
}

.emoji-card {
	width: 132rpx;
	padding: 20rpx 12rpx;
	border-radius: 24rpx;
	background: #fff7ef;
	text-align: center;
}

.emoji-card__icon {
	display: block;
	margin-bottom: 8rpx;
	font-size: 44rpx;
}

.emoji-card__label {
	font-size: 22rpx;
	color: #6d594d;
}
</style>
