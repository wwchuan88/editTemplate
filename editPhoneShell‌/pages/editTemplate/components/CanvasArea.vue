<template>
	<view class="phone-frame" :style="{ transform: `scale(${scale})`, transformOrigin: 'center center' }">
		<view class="phone-camera"></view>
		<view class="phone-screen" :style="screenStyle">
			<view 
				class="canvas-area" 
				@click="handleScreenClick"
			>
				<view
					v-for="layer in layers"
					:key="layer.id"
					class="layer"
					:class="{ 'layer--selected': selectedLayerId === layer.id, 'layer--dragging': draggingLayerId === layer.id }"
					:style="getLayerStyle(layer)"
					@touchstart="handleLayerTouchStart($event, layer)"
					@touchmove="handleLayerTouchMove($event)"
					@touchend="handleLayerTouchEnd"
					@mousedown="handleLayerMouseDown($event, layer)"
					@mousemove="handleLayerMouseMove($event)"
					@mouseup="handleLayerMouseUp"
					@click.stop="handleLayerClick(layer)"
				>
					<template v-if="layer.type === 'text'">
						<view v-if="props.editingLayerId !== layer.id" class="layer__text" :style="getTextStyle(layer)">
							{{ layer.text || '输入文字' }}
						</view>
						<input 
							v-else 
							class="layer__text-input" 
							v-model="editingText" 
							:style="getTextStyle(layer)"
							@blur="handleTextBlur(layer.id)"
							@keyup.enter="handleTextBlur(layer.id)"
							:ref="el => textInputRefs[layer.id] = el"
						/>
					</template>
					<view v-else-if="layer.type === 'icon'" class="layer__icon" :style="getIconStyle(layer)">
						{{ layer.text }}
					</view>
					<image v-else-if="layer.type === 'image'" class="layer__image" :src="layer.url" mode="aspectFit"></image>
					<view v-else-if="layer.type === 'brush'" class="layer__brush" :style="getBrushStyle(layer)"></view>
				</view>
				<view v-if="filterOverlay" class="filter-overlay" :style="filterOverlay"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref, nextTick, watch } from 'vue'

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
		},
		currentTool: {
			type: String,
			default: ''
		},
		editingLayerId: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['select-layer', 'add-text-layer', 'update-text', 'clear-tool', 'update-layer-position'])

	const editingText = ref('')
	const textInputRefs = ref({})
	const draggingLayerId = ref('')
	const dragStartPos = ref({ x: 0, y: 0 })
	const layerStartPos = ref({ x: 0, y: 0 })
	const hasMoved = ref(false)

	// 监听选中图层变化，当选择文字工具时自动开始编辑
	watch(() => props.selectedLayerId, (newId) => {
		if (props.currentTool === 'text' && newId) {
			const layer = props.layers.find(l => l.id === newId)
			if (layer && layer.type === 'text') {
				startEditing(layer)
			}
		}
	})

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

	function handleScreenClick(event) {
		if (props.currentTool === 'text') {
			let x, y
			
			const systemInfo = uni.getSystemInfoSync()
			const screenWidth = systemInfo.windowWidth || 375
			const pxToRpx = 750 / screenWidth
			
			if (event.detail && event.detail.x !== undefined && event.detail.y !== undefined) {
				x = (event.detail.x * pxToRpx) / props.scale
				y = (event.detail.y * pxToRpx) / props.scale
			} else if (event.clientX !== undefined && event.clientY !== undefined) {
				if (event.currentTarget && typeof event.currentTarget.getBoundingClientRect === 'function') {
					const rect = event.currentTarget.getBoundingClientRect()
					const relX = event.clientX - rect.left
					const relY = event.clientY - rect.top
					x = (relX * pxToRpx) / props.scale
					y = (relY * pxToRpx) / props.scale
				} else {
					x = (event.clientX * pxToRpx) / props.scale
					y = (event.clientY * pxToRpx) / props.scale
				}
			} else {
				emit('add-text-layer')
				return
			}
			
			emit('add-text-layer', x, y)
			emit('clear-tool')
		} else {
			emit('clear-tool')
		}
	}

	function handleLayerClick(layer) {
		if (hasMoved.value) {
			hasMoved.value = false
			return
		}
		if (layer.type === 'text') {
			startEditing(layer)
		} else {
			emit('select-layer', layer.id)
		}
	}

	function startEditing(layer) {
		editingText.value = layer.text || ''
		emit('select-layer', layer.id)
		nextTick(() => {
			if (textInputRefs.value[layer.id] && typeof textInputRefs.value[layer.id].focus === 'function') {
				textInputRefs.value[layer.id].focus()
			}
		})
	}

	function handleTextBlur(layerId) {
		emit('update-text', layerId, editingText.value || '输入文字')
		emit('clear-tool')
	}

	function handleLayerMouseDown(event, layer) {
		if (layer.locked) return
		if (props.editingLayerId === layer.id) return
		
		draggingLayerId.value = layer.id
		hasMoved.value = false
		emit('select-layer', layer.id)
		
		const clientX = event.clientX
		const clientY = event.clientY
		
		dragStartPos.value = { x: clientX, y: clientY }
		layerStartPos.value = { x: layer.x, y: layer.y }
	}

	function handleLayerMouseMove(event) {
		if (!draggingLayerId.value) return
		
		const deltaX = event.clientX - dragStartPos.value.x
		const deltaY = event.clientY - dragStartPos.value.y
		
		if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
			hasMoved.value = true
		}
		
		const newX = layerStartPos.value.x + (deltaX / props.scale)
		const newY = layerStartPos.value.y + (deltaY / props.scale)
		
		emit('update-layer-position', draggingLayerId.value, newX, newY)
	}

	function handleLayerMouseUp() {
		draggingLayerId.value = ''
	}

	function handleLayerTouchStart(event, layer) {
		if (layer.locked) return
		if (props.editingLayerId === layer.id) return
		
		draggingLayerId.value = layer.id
		hasMoved.value = false
		emit('select-layer', layer.id)
		
		const touch = event.touches[0]
		const clientX = touch.clientX
		const clientY = touch.clientY
		
		dragStartPos.value = { x: clientX, y: clientY }
		layerStartPos.value = { x: layer.x, y: layer.y }
	}

	function handleLayerTouchMove(event) {
		if (!draggingLayerId.value) return
		
		const touch = event.touches[0]
		const deltaX = touch.clientX - dragStartPos.value.x
		const deltaY = touch.clientY - dragStartPos.value.y
		
		if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
			hasMoved.value = true
		}
		
		const newX = layerStartPos.value.x + (deltaX / props.scale)
		const newY = layerStartPos.value.y + (deltaY / props.scale)
		
		emit('update-layer-position', draggingLayerId.value, newX, newY)
	}

	function handleLayerTouchEnd() {
		draggingLayerId.value = ''
	}

	function getLayerBoxStyle(layer) {
		return {
			width: layer.width + 'rpx',
			height: layer.height + 'rpx'
		}
	}

	function getTextStyle(layer) {
		return {
			fontSize: layer.size + 'rpx',
			color: layer.color,
			fontFamily: layer.font
		}
	}

	function getIconStyle(layer) {
		return {
			fontSize: layer.size + 'rpx',
			color: layer.color
		}
	}

	function getBrushStyle(layer) {
		return {
			background: layer.color,
			borderRadius: '50%'
		}
	}

	function getLayerStyle(layer) {
		return {
			position: 'absolute',
			left: layer.x + 'rpx',
			top: layer.y + 'rpx',
			width: layer.width + 'rpx',
			height: layer.height + 'rpx'
		}
	}
</script>

<style scoped>

.phone-frame {
	width: 375rpx;
	height: 812rpx;
	background: #292929;
	border-radius: 64rpx;
	position: relative;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
}

.phone-camera {
	width: 60rpx;
	height: 60rpx;
	background: #111;
	border-radius: 50%;
	position: absolute;
	top: 20rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
}

.phone-screen {
	width: 345rpx;
	height: 692rpx;
	background: #fffdf8;
	position: absolute;
	top: 60rpx;
	left: 15rpx;
	border-radius: 20rpx;
	overflow: hidden;
}

.canvas-area {
	width: 100%;
	height: 100%;
}

.layer {
	position: absolute;
	z-index: 1;
}

.layer--selected {
	border: 2rpx solid #d86e33;
	border-radius: 8rpx;
}

.layer--dragging {
	opacity: 0.8;
	cursor: move;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
}

.layer__text {
	padding: 10rpx;
	text-align: center;
	word-break: break-word;
}

.layer__text-input {
	width: 100%;
	padding: 10rpx;
	border: none;
	outline: none;
	background: transparent;
	text-align: center;
	word-break: break-word;
}

.layer__icon {
	font-size: 64rpx;
	text-align: center;
	padding: 10rpx;
}

.layer__image {
	width: 100%;
	height: 100%;
}

.layer__brush {
	width: 100%;
	height: 100%;
}

.filter-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
}

/* 提示文字 */
.hint-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 24rpx;
	color: #999;
	text-align: center;
	z-index: 0;
}

</style>