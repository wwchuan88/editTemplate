<template>
	<view class="phone-frame" :style="{ transform: `scale(${scale})`, transformOrigin: 'center center' }">
		<view class="phone-camera"></view>
		<view class="phone-screen" :style="screenStyle">
			<view class="canvas-area" @click="handleScreenClick">
				<view
					v-for="layer in layers"
					:key="layer.id"
					class="layer"
					:class="{ 'layer--selected': selectedLayerId === layer.id }"
					:style="getLayerStyle(layer)"
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

	const emit = defineEmits(['select-layer', 'add-text-layer', 'update-text', 'clear-tool'])

	const editingText = ref('')
	const textInputRefs = ref({})

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
			// 获取鼠标点击坐标
			let clientX, clientY
			
			// 兼容不同事件类型
			if (event.type === 'click') {
				// 鼠标点击事件
				clientX = event.clientX
				clientY = event.clientY
			} else if (event.type === 'touchstart' || event.type === 'touchmove') {
				// 触摸事件
				clientX = event.touches[0].clientX
				clientY = event.touches[0].clientY
			} else {
				// 其他事件类型，使用默认位置
				emit('add-text-layer')
				return
			}
			
			// 尝试获取canvas-area元素的位置
			let x, y
			const canvasArea = event.currentTarget
			if (canvasArea && typeof canvasArea.getBoundingClientRect === 'function') {
				// 计算相对于canvas-area的坐标
				const rect = canvasArea.getBoundingClientRect()
				// 计算相对于canvas-area的坐标（像素）
				const pixelX = clientX - rect.left
				const pixelY = clientY - rect.top
				// 转换为rpx坐标（假设屏幕宽度为750rpx）
				const rpxX = (pixelX / rect.width) * 345 // 345rpx是phone-screen的宽度
				const rpxY = (pixelY / rect.height) * 692 // 692rpx是phone-screen的高度
				// 应用缩放
				x = rpxX / props.scale
				y = rpxY / props.scale
			} else {
				// 无法获取canvas-area元素时使用默认位置
				x = 140
				y = 260
			}
			
			// 当选择了文字工具时，点击画布添加文字图层
			emit('add-text-layer', x, y)
			// 添加文字图层后，取消文字工具选择
			emit('clear-tool')
		} else {
			// 点击画布空白区域时，取消工具选择
			emit('clear-tool')
		}
	}

	function handleLayerClick(layer) {
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
		// 完成文字输入后，取消文字工具的选择
		emit('clear-tool')
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