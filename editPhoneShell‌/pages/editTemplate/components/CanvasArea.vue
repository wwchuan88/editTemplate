<template>


		<view class="phone-frame" :style="{ transform: `scale(${scale})`, transformOrigin: 'center center' }">
			<view class="phone-camera"></view>
			<view class="phone-screen" :style="screenStyle">
				<movable-area class="canvas-area">
					<movable-view
						v-for="layer in layers"
						:key="layer.id"
						class="layer"
						:class="{ 'layer--selected': selectedLayerId === layer.id }"
						:x="layer.x"
						:y="layer.y"
						:direction="layer.locked ? 'none' : 'all'"
						:damping="30"
						:style="getLayerBoxStyle(layer)"
						@change="emitMove(layer.id, $event)"
						@click="$emit('select-layer', layer.id)"
					>
						<view v-if="layer.type === 'text'" class="layer__text" :style="getTextStyle(layer)">
							{{ layer.text || '输入文字' }}
						</view>
						<view v-else-if="layer.type === 'icon'" class="layer__icon" :style="getIconStyle(layer)">
							{{ layer.text }}
						</view>
						<image v-else-if="layer.type === 'image'" class="layer__image" :src="layer.url" mode="aspectFit"></image>
						<view v-else-if="layer.type === 'brush'" class="layer__brush" :style="getBrushStyle(layer)"></view>
					</movable-view>
				</movable-area>
				<view v-if="filterOverlay" class="filter-overlay" :style="filterOverlay"></view>
			</view>
		</view>

</template>

<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		layers: {
			type: Array,
			default: () => []
		},
		selectedLayerId: {
			type: String,
			default: ''
		},
		activeFilter: {
			type: String,
			default: 'none'
		},
		scale: {
			type: Number,
			default: 1
		}
	})

	const emit = defineEmits(['select-layer', 'move-layer'])

	const activeFilterLabel = computed(() => {
		const map = {
			none: '滤镜：原图',
			warm: '滤镜：暖调',
			cool: '滤镜：冷调',
			retro: '滤镜：复古',
			night: '滤镜：夜幕'
		}
		return map[props.activeFilter] || '滤镜：原图'
	})

	const filterOverlay = computed(() => {
		switch (props.activeFilter) {
			case 'warm':
				return { background: 'rgba(255, 183, 77, 0.18)' }
			case 'cool':
				return { background: 'rgba(91, 141, 239, 0.16)' }
			case 'retro':
				return { background: 'rgba(201, 153, 97, 0.2)' }
			case 'night':
				return { background: 'rgba(31, 41, 55, 0.24)' }
			default:
				return null
		}
	})

	const screenStyle = computed(() => {
		const colorMap = {
			none: '#fffdf8',
			warm: '#fff7ed',
			cool: '#eef6ff',
			retro: '#f9f1e7',
			night: '#e8edf5'
		}
		return {
			backgroundColor: colorMap[props.activeFilter] || '#fffdf8'
		}
	})

	function emitMove(id, event) {
		emit('move-layer', {
			id,
			x: event.detail.x,
			y: event.detail.y
		})
	}

	function getLayerBoxStyle(layer) {
		return {
			width: `${layer.width}px`,
			height: `${layer.height}px`
		}
	}

	function getTextStyle(layer) {
		return {
			color: layer.color,
			fontSize: `${layer.size}px`,
			fontFamily: layer.font || 'Microsoft YaHei'
		}
	}

	function getIconStyle(layer) {
		return {
			color: layer.color,
			fontSize: `${layer.size}px`
		}
	}

	function getBrushStyle(layer) {
		return {
			backgroundColor: layer.color,
			width: `${layer.width}px`,
			height: `${layer.height}px`
		}
	}
</script>

<style scoped>
	.stage-card {
		padding: 24rpx;
		padding-top: 150rpx;
		border-radius: 32rpx;
		box-shadow: 0 20rpx 60rpx rgba(80, 56, 30, 0.08);
	}

	.stage-card__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.stage-card__title {
		font-size: 30rpx;
		font-weight: 700;
		color: #2f241f;
	}

	.stage-card__meta {
		font-size: 22rpx;
		color: #876652;
	}

	.phone-frame {
		position: relative;
		width: 450rpx;
		height: 900rpx;
		margin: 0 auto;
		padding: 18rpx;
		border-radius: 56rpx;
		background: linear-gradient(135deg, #2d2d33 0%, #575761 100%);
		box-shadow: 0 28rpx 80rpx rgba(33, 27, 22, 0.22);
	}

	.phone-camera {
		position: absolute;
		top: 28rpx;
		left: 28rpx;
		width: 112rpx;
		height: 112rpx;
		border-radius: 28rpx;
		background: rgba(18, 18, 20, 0.75);
		z-index: 4;
	}

	.phone-screen {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 42rpx;
		overflow: hidden;
	}

	.canvas-area {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 2;
	}

	.layer {
		border: 2rpx dashed transparent;
	}

	.layer--selected {
		border-color: #e86f2d;
	}

	.layer__text,
	.layer__icon {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-weight: 700;
	}

	.layer__text {
		padding: 8rpx;
		line-height: 1.35;
		word-break: break-word;
	}

	.layer__image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}

	.layer__brush {
		border-radius: 999rpx;
		opacity: 0.82;
	}

	.filter-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 3;
	}
</style>
