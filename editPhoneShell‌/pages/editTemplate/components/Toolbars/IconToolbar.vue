<template>
	<view class="toolbar-card">

		<text 
			class="iconfont toolbar-card-icondown"
			:class="isExpanded ? 'icon-down' : 'icon-up icon-down'"
			@click="togglePanel"
		></text>
		<!-- 上层导航 -->
		<view v-if="isExpanded" class="toolbar-top">
			<view class="toolbar-top-left">
				<view v-for="item in options" :key="item.label" class="nav-item"
					:class="{ 'nav-item--active': activeNav === item.type }" @click="changeNav(item.type)">
					{{ item.label }}
				</view>
			</view>
			<view class="toolbar-top-right" @click="$emit('exit')">
				<text class="toolbar-top-right-exit"></text>
			</view>

		</view>

		<!-- 下层内容 -->
		<view v-if="isExpanded" class="toolbar-bottom">
			<view  class="nav-content">
				<scroll-view scroll-x class="chip-scroll" show-scrollbar="false">
					<view class="emoji-row">
						<view v-for="item in cartoonOptions.icons" :key="item.type" class="emoji-card toolbar-bottom-item"
							@click="$emit('add', item)">
							<text class="emoji-card__icon iconfont " :class="item.icon"></text>
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
const activeNav = ref('graph')
const isExpanded = ref(true)

function togglePanel() {
	isExpanded.value = !isExpanded.value
}

const cartoonOptions = computed(() => {
	let obj = {}
	props.options.filter((item, index) => {
		if(item.type === activeNav.value){
			obj.icons = item.icons;
		}
	})
	return obj;
})

console.log("cartoonOptions", cartoonOptions)

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



const changeNav = (type) => {
	activeNav.value = type
}

defineEmits(['add'])
</script>

<style scoped>
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


.chip-scroll {
	white-space: nowrap;
}

.emoji-row {
	display: inline-flex;
	gap: 16rpx;
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
