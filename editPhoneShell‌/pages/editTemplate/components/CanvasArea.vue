<template>
	<view class="phone-frame" :style="{ transform: `scale(${scale})`, transformOrigin: 'center center' }">		
		<view class="phone-screen" :style="screenStyle">
			<view 
				class="canvas-area" 
				ref="canvasAreaRef"
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
						<view v-else class="layer__text-editor">
							<textarea
								class="layer__text-input"
								:style="getTextStyle(layer)"
								:value="editingText"
								placeholder="请输入"
								@blur="handleTextBlur(layer.id)"
								@focus="handleInputFocus"
								@input="handleTextInput($event)"
								@mousedown="handleInputMouseDown"
								:ref="el => textInputRefs[layer.id] = el"
							></textarea>
							<view class="layer__delete-btn" @click.stop="handleDeleteLayer(layer.id)">
								<text class="iconfont icon-close"></text>
							</view>
							<view
								class="layer__resize-handle"
								@touchstart="handleResizeStart($event, layer)"
								@touchmove="handleResizeMove($event)"
								@touchend="handleResizeEnd($event)"
								@mousedown="handleResizeStart($event, layer)"
							></view>
						</view>
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

	const emit = defineEmits(['select-layer', 'add-text-layer', 'update-text', 'clear-tool', 'update-layer-position', 'delete-layer', 'update-layer-size', 'exit-edit'])

	const editingText = ref('')
	const textInputRefs = ref({})
	const draggingLayerId = ref('')
	const dragStartPos = ref({ x: 0, y: 0 })
	const layerStartPos = ref({ x: 0, y: 0 })
	const hasMoved = ref(false)
	const hasCreatedText = ref(false)
	const canvasAreaRef = ref(null)
	const resizingLayerId = ref('')
	const resizeStartPos = ref({ x: 0, y: 0 })
	const layerStartSize = ref({ width: 0, height: 0 })

	function getCanvasOffset() {
		let left = 0, top = 0
		if (canvasAreaRef.value) {
			if (typeof canvasAreaRef.value.getBoundingClientRect === 'function') {
				const rect = canvasAreaRef.value.getBoundingClientRect()
				left = rect.left || 0
				top = rect.top || 0
			} else if (canvasAreaRef.value.$el && typeof canvasAreaRef.value.$el.getBoundingClientRect === 'function') {
				const rect = canvasAreaRef.value.$el.getBoundingClientRect()
				left = rect.left || 0
				top = rect.top || 0
			}
		}
		return { left, top }
	}

	// 监听选中图层变化，当选择文字工具时自动开始编辑
	watch(() => props.selectedLayerId, (newId) => {
		if (props.currentTool === 'text' && newId) {
			const layer = props.layers.find(l => l.id === newId)
			if (layer && layer.type === 'text') {
				startEditing(layer)
			}
		}
	})

	// 监听当前工具变化，当选择文字工具时重置创建标志
	watch(() => props.currentTool, (newTool) => {
		if (newTool === 'text') {
			hasCreatedText.value = false
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
		if (props.editingLayerId) {
			emit('exit-edit')
			return
		}
		if (props.currentTool === 'text') {
			// 如果已经创建过文字，不再创建新的文字，直接取消工具
			if (hasCreatedText.value) {
				emit('clear-tool')
				return
			}
			
			// 计算点击位置
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
			
			// 触发添加文字图层，并标记已经创建过文字
			emit('add-text-layer', x, y)
			hasCreatedText.value = true
		} else if (props.currentTool === 'brush') {
			// 画笔工具点击空白区域取消画笔
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
			// 点击已生成的文字时，不重置创建标志，保持 hasCreatedText 为 true
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

	function handleInputFocus() {
		// 输入框获得焦点，什么也不做，只是阻止事件冒泡
	}

	function handleInputMouseDown() {
		// 输入框鼠标按下，阻止事件冒泡到父层，避免触发拖拽
	}

	function handleTextInput(event) {
		if (event) {
			if (event.target && event.target.value !== undefined) {
				editingText.value = event.target.value
			} else if (typeof event === 'string') {
				editingText.value = event
			} else if (event.detail && event.detail.value !== undefined) {
				editingText.value = event.detail.value
			}
		}
	}

	function handleTextBlur(layerId) {
		emit('update-text', layerId, editingText.value || '输入文字')
	}

	function handleDeleteLayer(layerId) {
		emit('delete-layer', layerId)
	}

	function handleLayerMouseDown(event, layer) {
		if (layer.locked) return
		
		// 如果正在编辑，不阻止输入框获得焦点，但也不启动拖拽
		if (props.editingLayerId === layer.id) {
			return
		}
		
		draggingLayerId.value = layer.id
		hasMoved.value = false
		emit('select-layer', layer.id)
		
		const pageX = event.pageX || event.clientX
		const pageY = event.pageY || event.clientY
		
		dragStartPos.value = { x: pageX, y: pageY }
		layerStartPos.value = { x: layer.x, y: layer.y }
	}

	function handleLayerMouseMove(event) {
		if (!draggingLayerId.value) return
		
		const pageX = event.pageX || event.clientX
		const pageY = event.pageY || event.clientY
		
		const deltaX = pageX - dragStartPos.value.x
		const deltaY = pageY - dragStartPos.value.y
		
		if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
			hasMoved.value = true
		}
		
		const systemInfo = uni.getSystemInfoSync()
		const screenWidth = systemInfo.windowWidth || 375
		const pxToRpx = 750 / screenWidth
		
		const newX = layerStartPos.value.x + (deltaX * pxToRpx / props.scale)
		const newY = layerStartPos.value.y + (deltaY * pxToRpx / props.scale)
		
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
		
		const touch = event.touches ? event.touches[0] : event
		if (!touch) return
		
		const pageX = touch.pageX || touch.clientX
		const pageY = touch.pageY || touch.clientY
		
		dragStartPos.value = { x: pageX, y: pageY }
		layerStartPos.value = { x: layer.x, y: layer.y }
	}

	function handleLayerTouchMove(event) {
		if (!draggingLayerId.value) return
		
		const touch = event.touches ? event.touches[0] : event
		if (!touch) return
		const pageX = touch.pageX || touch.clientX
		const pageY = touch.pageY || touch.clientY
		
		const deltaX = pageX - dragStartPos.value.x
		const deltaY = pageY - dragStartPos.value.y
		
		if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
			hasMoved.value = true
		}
		
		const systemInfo = uni.getSystemInfoSync()
		const screenWidth = systemInfo.windowWidth || 375
		const pxToRpx = 750 / screenWidth
		
		const newX = layerStartPos.value.x + (deltaX * pxToRpx / props.scale)
		const newY = layerStartPos.value.y + (deltaY * pxToRpx / props.scale)
		
		emit('update-layer-position', draggingLayerId.value, newX, newY)
	}

	function handleLayerTouchEnd() {
		draggingLayerId.value = ''
		resizingLayerId.value = ''
	}

	function handleResizeStart(event, layer) {
		resizingLayerId.value = layer.id
		const touch = event.touches ? event.touches[0] : event
		const pageX = touch.pageX || touch.clientX
		const pageY = touch.pageY || touch.clientY

		resizeStartPos.value = { x: pageX, y: pageY }
		layerStartSize.value = { width: layer.width, height: layer.height }

		document.addEventListener('mousemove', handleResizeMove)
		document.addEventListener('mouseup', handleResizeEnd)
	}

	function handleResizeMove(event) {
		if (!resizingLayerId.value) return

		const touch = event.touches ? event.touches[0] : event
		const pageX = touch.pageX || touch.clientX
		const pageY = touch.pageY || touch.clientY

		const deltaX = pageX - resizeStartPos.value.x
		const deltaY = pageY - resizeStartPos.value.y

		const systemInfo = uni.getSystemInfoSync()
		const screenWidth = systemInfo.windowWidth || 375
		const pxToRpx = 750 / screenWidth

		const newWidth = Math.max(60, layerStartSize.value.width + (deltaX * pxToRpx / props.scale))
		const newHeight = Math.max(40, layerStartSize.value.height + (deltaY * pxToRpx / props.scale))

		emit('update-layer-size', resizingLayerId.value, newWidth, newHeight)
	}

	function handleResizeEnd() {
		resizingLayerId.value = ''
		document.removeEventListener('mousemove', handleResizeMove)
		document.removeEventListener('mouseup', handleResizeEnd)
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
	width: 500rpx;
	height: 1000rpx;
	background: #292929;
	border-radius: 50rpx;
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
	width: 480rpx;
	height: 980rpx;
	background: #fffdf8;
	position: absolute;
	top: 10rpx;
	left: 10rpx;
	border-radius: 50rpx;
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
}

.layer__text {
	padding: 10rpx;
	text-align: center;
	word-break: break-word;
}

.layer__text-input {
	width: 100%;
	height: 100%;
	padding: 10rpx;
	border: none;
	outline: none;
	background: transparent;
	text-align: center;
	word-break: break-word;
	min-height: 40rpx;
	resize: none;
	overflow: hidden;
	box-sizing: border-box;
}

.layer__text-editor {
	position: relative;
	width: 100%;
	height: 100%;
}

.layer__delete-btn {
	position: absolute;
	top: -20rpx;
	right: -20rpx;
	width: 40rpx;
	height: 40rpx;
	background: #d9485f;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}

.layer__delete-btn text {
	color: #fff;
	font-size: 24rpx;
	font-weight: bold;
}

.layer__resize-handle {
	position: absolute;
	bottom: -10rpx;
	right: -10rpx;
	width: 24rpx;
	height: 24rpx;
	background: #f0b429;
	border: 4rpx solid #fff;
	border-radius: 4rpx;
	z-index: 10;
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
