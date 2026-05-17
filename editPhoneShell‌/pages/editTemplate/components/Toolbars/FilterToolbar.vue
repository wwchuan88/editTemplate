<template>
	<view class="toolbar-card">
		<text class="iconfont toolbar-card-icondown" :class="isExpanded ? 'icon-down' : 'icon-up icon-down'"
			@click="togglePanel"></text>

		<!-- 上层导航 -->
		<view v-if="isExpanded" class="toolbar-top">
			<view class="toolbar-top-left">
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'featured' }"
					@click="activeNav = 'featured'">
					精选预设
				</view>
				<view class="nav-item" :class="{ 'nav-item--active': activeNav === 'youth' }"
					@click="activeNav = 'youth'">
					青春预设
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>
		</view>

		<!-- 下层内容 -->
		<view v-if="isExpanded" class="toolbar-bottom">
			<!-- 精选预设 -->

			<view v-if="activeNav === 'featured'" class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="filter-list">
						<view v-for="item in featuredFilters" :key="item.key" class="filter-card"
							:class="{ 'filter-card--active': activeFilter === item.key }"
							@click="$emit('pick', item.key)">
							<image :src="item.icon" class="filter-card__icon"></image>
							<view>
								<text class="filter-card__title">{{ item.label }}</text>
								<text class="filter-card__desc">{{ item.desc }}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>



			<!-- 青春预设 -->
			<view v-if="activeNav === 'youth'" class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="filter-list">
						<view v-for="item in youthFilters" :key="item.key" class="filter-card"
							:class="{ 'filter-card--active': activeFilter === item.key }"
							@click="$emit('pick', item.key)">
							<image :src="item.icon" class="filter-card__icon"></image>
							<view>
								<text class="filter-card__title">{{ item.label }}</text>
								<text class="filter-card__desc">{{ item.desc }}</text>
							</view>
						</view>
					</view>
				</scroll-view>

			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeNav = ref('featured')
const isExpanded = ref(true)
function togglePanel() {
	isExpanded.value = !isExpanded.value
}

const props = defineProps({
	options: {
		type: Array,
		default: () => []
	},
	activeFilter: {
		type: String,
		default: 'none'
	}
})

// 分类滤镜选项
const featuredFilters = computed(() => {
	// 精选预设：原图、暖调、冷调
	return props.options.filter(item => ['none', 'warm', 'cool'].includes(item.key))
})

const youthFilters = computed(() => {
	// 青春预设：复古、夜幕
	return props.options.filter(item => ['retro', 'night'].includes(item.key))
})

defineEmits(['pick', 'exit'])
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



/* 下层内容样式 */
.toolbar-bottom {
	padding-top: 10rpx;
}

.nav-content {
	padding: 10rpx 0;
}

.filter-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 16rpx;
}

.filter-card {
	padding: 16rpx;
	border-radius: 40rpx;
	background: #f0f1f1;
	border: 2rpx solid transparent;
	display: flex;
	flex-direction: row;
}

.filter-card--active {
	border-color: #166665;
	background: #d6eaea;
}

.filter-card__title {
	display: block;
	margin-bottom: 8rpx;
	font-size: 26rpx;
	font-weight: 700;
	color: #2f241f;
}

.filter-card__desc {
	display: block;
	font-size: 22rpx;
	line-height: 1.5;
	color: #826c60;
}

.filter-list {
	display: flex;
	gap: 16rpx;
}

.filter-card__icon {
	width: 100rpx;
	height: 100rpx;
	border-radius: 16rpx;
	margin-right: 16rpx;
}

.chip-scroll {
	white-space: nowrap;
}
</style>
