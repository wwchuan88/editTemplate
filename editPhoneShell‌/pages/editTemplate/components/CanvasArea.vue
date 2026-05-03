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
							{{ layer.text }}
						</view>
						<view v-else class="layer__text-editor">
							<textarea
								class="layer__text-input"
								:style="getTextStyle(layer)"
								:value="layer.text || ''"
								placeholder="请输入"
								@blur="handleTextBlur(layer.id)"
								@focus="handleInputFocus"
								@input="handleTextInput(layer.id, $event)"
								@mousedown="handleInputMouseDown"
								:ref="el => textInputRefs[layer.id] = el"
							></textarea>
							<view class="layer__delete-btn" @click.stop="handleDeleteLayer(layer.id)">
								<text class="iconfont icon-close layer__delete-btn-icon"></text>
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
					<view v-else-if="layer.type === 'icon'" class="layer__icon-container">
						<view class="layer__icon iconfont" :class="layer.text" :style="getIconStyle(layer)"></view>
						<view v-if="props.selectedLayerId === layer.id" class="layer__delete-btn" @click.stop="handleDeleteLayer(layer.id)">
							<text class="iconfont icon-close layer__delete-btn-icon"></text>
						</view>
						<view
							v-if="props.selectedLayerId === layer.id"
							class="layer__resize-handle"
							@touchstart="handleResizeStart($event, layer)"
							@touchmove="handleResizeMove($event)"
							@touchend="handleResizeEnd($event)"
							@mousedown="handleResizeStart($event, layer)"
						></view>
					</view>
					<image v-else-if="layer.type === 'image'" class="layer__image" :src="layer.url" mode="aspectFit"></image>
					<view v-else-if="layer.type === 'brush'" class="layer__brush-container">
						<image class="layer__brush-image" :src="layer.imageData" mode="scaleToFill"></image>
						<view v-if="props.selectedLayerId === layer.id" class="layer__delete-btn" @click.stop="handleDeleteLayer(layer.id)">
							<text class="iconfont icon-close layer__delete-btn-icon"></text>
						</view>
						<view
							v-if="props.selectedLayerId === layer.id"
							class="layer__resize-handle"
							@touchstart.stop="handleResizeStart($event, layer)"
							@touchmove.stop="handleResizeMove($event)"
							@touchend.stop="handleResizeEnd($event)"
							@mousedown.stop="handleResizeStart($event, layer)"
						></view>
					</view>
				</view>
				<view v-if="filterOverlay" class="filter-overlay" :style="filterOverlay"></view>

				<canvas 
					id="brushCanvas"
					class="brush-canvas"
					:style="brushCanvasStyle"
					type="2d"
					@mousedown.prevent="brushStartDraw"
					@mousemove.prevent="brushMoveDraw"
					@mouseup.prevent="brushEndDraw"
					@mouseleave.prevent="brushEndDraw"
					@touchstart="brushStartDraw"
					@touchmove.stop="brushMoveDraw"
					@touchend="brushEndDraw"
				></canvas>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref, shallowRef, nextTick, watch, onMounted, getCurrentInstance } from 'vue'

	const instance = getCurrentInstance()

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
		},
		brushColor: {
			type: String,
			default: '#ff7b54'
		},
		brushSize: {
			type: Number,
			default: 28
		}
	})

	const emit = defineEmits(['select-layer', 'add-text-layer', 'update-text', 'clear-tool', 'update-layer-position', 'delete-layer', 'update-layer-size', 'exit-edit', 'add-brush-layer'])

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

	const isH5 = ref(false)
	const brushCtx = shallowRef(null)
	const brushCanvasNode = shallowRef(null)
	const isDrawing = ref(false)
	const lastX = ref(0)
	const lastY = ref(0)
	const cachedRect = ref({ left: 0, top: 0, width: 0, height: 0 })
	const hasDrawnContent = ref(false)
	const brushCanvasVisible = ref(false)
	const isSavingBrush = ref(false)

	const brushCanvasStyle = computed(() => {
		if (brushCanvasVisible.value) {
			return { display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 20 }
		}
		return { display: 'none' }
	})

	onMounted(() => {
		isH5.value = typeof window !== 'undefined' && typeof document !== 'undefined'
	})

	watch(() => props.currentTool, (newTool, oldTool) => {
		if (oldTool === 'brush' && newTool !== 'brush') {
			isDrawing.value = false
			if (hasDrawnContent.value && !isSavingBrush.value) {
				isSavingBrush.value = true
				saveBrushLayer(() => {
					isSavingBrush.value = false
					hasDrawnContent.value = false
					brushCanvasVisible.value = false
					brushCtx.value = null
					brushCanvasNode.value = null
				})
			} else {
				hasDrawnContent.value = false
				brushCanvasVisible.value = false
				brushCtx.value = null
				brushCanvasNode.value = null
			}
		}
		if (newTool === 'brush') {
			brushCanvasVisible.value = true
			nextTick(() => {
				setTimeout(() => {
					initBrushCanvas()
				}, 300)
			})
		}
		if (newTool === 'text') {
			hasCreatedText.value = false
		}
	})

	function initBrushCanvas() {
		const proxy = instance && instance.proxy ? instance.proxy : instance
		if (!proxy) return

		const query = uni.createSelectorQuery().in(proxy)
		query.select('#brushCanvas')
			.fields({ node: true, size: true })
			.exec((res) => {
				if (!res || !res[0] || !res[0].node) return

				const canvas = res[0].node
				const dpr = isH5.value ? (window.devicePixelRatio || 1) : uni.getWindowInfo().pixelRatio
				canvas.width = res[0].width * dpr
				canvas.height = res[0].height * dpr
				const ctx = canvas.getContext('2d')
				ctx.scale(dpr, dpr)
				brushCtx.value = ctx
				brushCanvasNode.value = canvas

				if (isH5.value) {
					const el = document.getElementById('brushCanvas')
					if (el) {
						const rect = el.getBoundingClientRect()
						cachedRect.value = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
					}
				} else {
					const rectQuery = uni.createSelectorQuery().in(proxy)
					rectQuery.select('#brushCanvas').boundingClientRect()
					.exec((rectRes) => {
						if (rectRes && rectRes[0]) {
							cachedRect.value = { left: rectRes[0].left, top: rectRes[0].top, width: rectRes[0].width, height: rectRes[0].height }
						}
					})
				}
			})
	}

	function updateCachedRect() {
		if (isH5.value) {
			const canvas = document.getElementById('brushCanvas')
			if (canvas) {
				const rect = canvas.getBoundingClientRect()
				cachedRect.value = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
			}
		} else {
			const proxy = instance && instance.proxy ? instance.proxy : instance
			if (!proxy) return
			const rectQuery = uni.createSelectorQuery().in(proxy)
			rectQuery.select('#brushCanvas').boundingClientRect()
			.exec((res) => {
				if (res && res[0]) {
					cachedRect.value = { left: res[0].left, top: res[0].top, width: res[0].width, height: res[0].height }
				}
			})
		}
	}

	function getPointerPos(e) {
		let clientX = 0
		let clientY = 0
		let isCanvasRelative = false

		if (e.touches && e.touches.length > 0) {
			const touch = e.touches[0]
			if (touch.x !== undefined && touch.y !== undefined) {
				clientX = touch.x
				clientY = touch.y
				isCanvasRelative = true
			} else {
				clientX = touch.clientX || 0
				clientY = touch.clientY || 0
			}
		} else if (e.changedTouches && e.changedTouches.length > 0) {
			const touch = e.changedTouches[0]
			if (touch.x !== undefined && touch.y !== undefined) {
				clientX = touch.x
				clientY = touch.y
				isCanvasRelative = true
			} else {
				clientX = touch.clientX || 0
				clientY = touch.clientY || 0
			}
		} else if (e.clientX !== undefined) {
			clientX = e.clientX
			clientY = e.clientY
		}

		if (isCanvasRelative) {
			const x = clientX / props.scale
			const y = clientY / props.scale
			return { x, y }
		}

		const rect = cachedRect.value
		const x = (clientX - rect.left) / props.scale
		const y = (clientY - rect.top) / props.scale

		return { x, y }
	}

	function brushStartDraw(e) {
		if (props.currentTool !== 'brush') return

		if (!brushCtx.value) {
			initBrushCanvas()
			return
		}

		updateCachedRect()

		const pos = getPointerPos(e)

		const screenWidth = uni.getWindowInfo().windowWidth || 375
		const pxToRpx = 750 / screenWidth
		const clickRpxX = pos.x * pxToRpx
		const clickRpxY = pos.y * pxToRpx

		for (let i = props.layers.length - 1; i >= 0; i--) {
			const layer = props.layers[i]
			if (layer.type !== 'brush') continue
			const layerRight = layer.x + layer.width
			const layerBottom = layer.y + layer.height
			if (clickRpxX >= layer.x && clickRpxX <= layerRight && clickRpxY >= layer.y && clickRpxY <= layerBottom) {
				emit('select-layer', layer.id)
				return
			}
		}

		isDrawing.value = true
		lastX.value = pos.x
		lastY.value = pos.y

		const ctx = brushCtx.value

		ctx.beginPath()
		ctx.moveTo(pos.x, pos.y)
		ctx.strokeStyle = props.brushColor
		ctx.lineWidth = props.brushSize
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'
	}

	function brushMoveDraw(e) {
		if (!isDrawing.value) return
		if (props.currentTool !== 'brush') return

		const pos = getPointerPos(e)
		const ctx = brushCtx.value
		if (!ctx) return

		ctx.lineTo(pos.x, pos.y)
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(pos.x, pos.y)

		hasDrawnContent.value = true
		lastX.value = pos.x
		lastY.value = pos.y
	}

	function brushEndDraw() {
		if (!isDrawing.value) return
		isDrawing.value = false
	}

	function clearBrushCanvas() {
		const canvas = brushCanvasNode.value
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		ctx.save()
		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.restore()
	}

	function saveBrushLayer(onDone) {
		if (isH5.value) {
			const canvas = brushCanvasNode.value
			if (!canvas || canvas.width === 0 || canvas.height === 0) { onDone && onDone(); return }

			const dpr = window.devicePixelRatio || 1

			const tempCanvas = document.createElement('canvas')
			tempCanvas.width = canvas.width
			tempCanvas.height = canvas.height
			const tempCtx = tempCanvas.getContext('2d')
			tempCtx.drawImage(canvas, 0, 0)

			const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
			const data = imageData.data

			let minX = tempCanvas.width
			let minY = tempCanvas.height
			let maxX = 0
			let maxY = 0
			let found = false

			for (let y = 0; y < tempCanvas.height; y++) {
				for (let x = 0; x < tempCanvas.width; x++) {
					const idx = (y * tempCanvas.width + x) * 4
					if (data[idx + 3] > 0) {
						found = true
						if (x < minX) minX = x
						if (x > maxX) maxX = x
						if (y < minY) minY = y
						if (y > maxY) maxY = y
					}
				}
			}

			if (!found) {
				clearBrushCanvas()
				onDone && onDone()
				return
			}

			const padding = Math.max(4, Math.round(props.brushSize * dpr * 0.5))
			const cropX = Math.max(0, minX - padding)
			const cropY = Math.max(0, minY - padding)
			const cropRight = Math.min(tempCanvas.width, maxX + padding)
			const cropBottom = Math.min(tempCanvas.height, maxY + padding)
			const cropW = cropRight - cropX
			const cropH = cropBottom - cropY

			const cropCanvas = document.createElement('canvas')
			cropCanvas.width = cropW
			cropCanvas.height = cropH
			const cropCtx = cropCanvas.getContext('2d')
			cropCtx.drawImage(tempCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)

			const dataURL = cropCanvas.toDataURL('image/png')

			const screenWidth = uni.getWindowInfo().windowWidth || 375
			const pxToRpx = 750 / screenWidth

			const layerX = (cropX / dpr) / props.scale
			const layerY = (cropY / dpr) / props.scale
			const layerW = (cropW / dpr) / props.scale
			const layerH = (cropH / dpr) / props.scale

			emit('add-brush-layer', {
				imageData: dataURL,
				color: props.brushColor,
				size: props.brushSize,
				x: layerX * pxToRpx,
				y: layerY * pxToRpx,
				width: layerW * pxToRpx,
				height: layerH * pxToRpx
			})

			clearBrushCanvas()
			onDone && onDone()
		} else {
			const canvas = brushCanvasNode.value
			if (!canvas) { onDone && onDone(); return }

			const rect = cachedRect.value
			const screenWidth = uni.getWindowInfo().windowWidth || 375
			const pxToRpx = 750 / screenWidth
			const layerW = (rect.width || 480) / props.scale
			const layerH = (rect.height || 980) / props.scale

			uni.canvasToTempFilePath({
				canvas: canvas,
				x: 0,
				y: 0,
				width: canvas.width,
				height: canvas.height,
				destWidth: canvas.width,
				destHeight: canvas.height,
				success: (tempRes) => {
					emit('add-brush-layer', {
						imageData: tempRes.tempFilePath,
						color: props.brushColor,
						size: props.brushSize,
						x: 0,
						y: 0,
						width: layerW * pxToRpx,
						height: layerH * pxToRpx
					})

					const ctx = canvas.getContext('2d')
					ctx.save()
					ctx.setTransform(1, 0, 0, 1, 0, 0)
					ctx.clearRect(0, 0, canvas.width, canvas.height)
					ctx.restore()

					onDone && onDone()
				},
				fail: (err) => {
					console.warn('canvasToTempFilePath fail:', err)
					emit('add-brush-layer', {
						imageData: '',
						color: props.brushColor,
						size: props.brushSize,
						x: 0,
						y: 0,
						width: layerW * pxToRpx,
						height: layerH * pxToRpx
					})
					onDone && onDone()
				}
			})
		}
	}

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
		if (props.editingLayerId) {
			emit('exit-edit')
			return
		}
		if (props.currentTool === 'brush') {
			return
		}
		if (props.selectedLayerId) {
			emit('select-layer', null)
		}
		if (props.currentTool === 'text') {
			if (hasCreatedText.value) {
				emit('clear-tool')
				return
			}
			
			let x, y
			
			const screenWidth = uni.getWindowInfo().windowWidth || 375
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
			hasCreatedText.value = true
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

	function handleInputFocus() {
	}

	function handleInputMouseDown() {
	}

	function handleTextInput(layerId, event) {
		let value = ''
		
		if (event) {
			if (event.detail && event.detail.value !== undefined) {
				value = event.detail.value
			} else if (event.target && event.target.value !== undefined) {
				value = event.target.value
			} else if (typeof event === 'string') {
				value = event
			}
		}
		
		editingText.value = value
		
		const layer = props.layers.find(item => item.id === layerId)
		if (layer) {
			layer.text = value
		}
	}

	function handleTextBlur(layerId) {
		emit('update-text', layerId, editingText.value)
	}

	function handleDeleteLayer(layerId) {
		emit('delete-layer', layerId)
	}

	function handleLayerMouseDown(event, layer) {
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
		
		const screenWidth = uni.getWindowInfo().windowWidth || 375
		const pxToRpx = 750 / screenWidth
		
		const newX = layerStartPos.value.x + (deltaX * pxToRpx / props.scale)
		const newY = layerStartPos.value.y + (deltaY * pxToRpx / props.scale)	
		if (Number.isNaN(newX) || Number.isNaN(newY)) {
			return
		}
		emit('update-layer-position', draggingLayerId.value, newX, newY)
	}

	function handleLayerMouseUp() {
		draggingLayerId.value = ''
	}

	function handleLayerTouchStart(event, layer) {
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
		const screenWidth = uni.getWindowInfo().windowWidth || 375
		const pxToRpx = 750 / screenWidth
		
		const newX = layerStartPos.value.x + (deltaX * pxToRpx / props.scale)
		const newY = layerStartPos.value.y + (deltaY * pxToRpx / props.scale)
		if (Number.isNaN(newX) || Number.isNaN(newY)) {
			return
		}
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

		if (typeof document !== 'undefined' && document.addEventListener) {
			document.addEventListener('mousemove', handleResizeMove)
			document.addEventListener('mouseup', handleResizeEnd)
		}
	}

	function handleResizeMove(event) {
		if (!resizingLayerId.value) return

		const touch = event.touches ? event.touches[0] : event
		const pageX = touch.pageX || touch.clientX
		const pageY = touch.pageY || touch.clientY

		const deltaX = pageX - resizeStartPos.value.x
		const deltaY = pageY - resizeStartPos.value.y

		const screenWidth = uni.getWindowInfo().windowWidth || 375
		const pxToRpx = 750 / screenWidth

		const newWidth = Math.max(60, layerStartSize.value.width + (deltaX * pxToRpx / props.scale))
		const newHeight = Math.max(40, layerStartSize.value.height + (deltaY * pxToRpx / props.scale))

		emit('update-layer-size', resizingLayerId.value, newWidth, newHeight)
	}

	function handleResizeEnd() {
		resizingLayerId.value = ''
		if (typeof document !== 'undefined' && document.removeEventListener) {
			document.removeEventListener('mousemove', handleResizeMove)
			document.removeEventListener('mouseup', handleResizeEnd)
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
	position: relative;
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
	word-break: break-word;
}

.layer__text-input {
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background: transparent;
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
	top: -24rpx;
	right: -24rpx;
	width: 48rpx;
	height: 48rpx;
	background: #d9485f;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	cursor: pointer;
}

.layer__delete-btn-icon {
	color: #fff;
	font-size: 24rpx;
	font-weight: bold;
}

.layer__resize-handle {
	position: absolute;
	bottom: -24rpx;
	right: -24rpx;
	width: 36rpx;
	height: 36rpx;
	background: #f0b429;
	border: 4rpx solid #fff;
	border-radius: 4rpx;
	z-index: 10;
	cursor: nwse-resize;
}

.layer__icon-container {
	position: relative;
	width: 100%;
	height: 100%;
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

.layer__brush-container {
	position: relative;
	width: 100%;
	height: 100%;
}

.layer__brush-image {
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.filter-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
}

.brush-canvas {
	z-index: 20;
}

</style>
