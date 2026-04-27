<template>
	<view class="page-shell">
		<view style="width: 200rpx;position: fixed;top: 20rpx;right: 20rpx;z-index: 1000;">
				<up-button type="warning" shape="circle" size="medium" text="保存设计" style="width: 100%;"></up-button>
			</view>
		<view class="tool-bar tool-bar-move" :style="{
			display: 'flex',
			justifyContent: 'flex-end',
			marginTop: '16rpx',
			position: 'fixed',
			left: toolbarPosition.left + 'rpx',
			top: toolbarPosition.top + 'rpx',
			cursor: isDragging ? 'move' : 'default',
			zIndex: 1000
		}" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @mousedown="startDrag" @mousemove="drag"
			@mouseup="endDrag" @mouseleave="endDrag">
			<view class="tool-bar-button" @click="toggleMoveMode">
				<text class="iconfont icon-baseline-drag_indicator"></text>
			</view>
			<view class="tool-bar-button" @click="undo">
				<text class="iconfont icon-revoke"></text>
			</view>
			<view class="tool-bar-button" @click="redo">
				<text class="iconfont icon-recovery"></text>
			</view>
			<view class="tool-bar-button" @click="zoomIn">
				<text class="iconfont icon-zoomin"></text>
			</view>
			<view class="tool-bar-button" @click="zoomOut">
				<text class="iconfont icon-zooout"></text>
			</view>
			<view class="tool-bar-button" @click="clearAll">
				<text class="iconfont icon-empty"></text>
			</view>
		</view>

		<view class="workspace">
			<SideDrawers :current-tool="currentTool" :tools="toolList" :visible="sidebarVisible"
				@select="currentTool = $event" @close="sidebarVisible = false" />
			<DecorSideDrawers :current-tool="currentDecorTool" :tools="decorToolList" :visible="decorSidebarVisible"
				@select="currentDecorTool = $event" @close="decorSidebarVisible = false" />

			<view class="workspace__main">
				<view class="stage-card">
					<CanvasArea :layers="layers" :selected-layer-id="selectedLayerId" :active-filter="activeFilter" :scale="phoneFrameScale" :current-tool="currentTool" :editing-layer-id="editingLayerId"
				@select-layer="selectLayer" @add-text-layer="handleAddTextLayer" @update-text="handleUpdateText" @clear-tool="handleClearTool" />

				</view>
			</view>
		</view>

		<view class="toolbar-wrap">
			<TextToolbar v-if="currentTool === 'text'" :text-draft="textDraft" :text-color="textColor"
				:text-size="textSize" :text-font="textFont" :colors="textColors" :is-editing="selectedLayer && selectedLayer.type === 'text'"
				@update-draft="textDraft = $event" @pick-color="pickTextColor" @change-size="changeTextSize"
				@pick-font="pickTextFont" @submit="upsertTextLayer" @exit="exitTool" />
			<IconToolbar v-else-if="currentTool === 'icon'" :options="iconOptions" @add="addIconLayer"
				@exit="exitTool" />
			<UploadToolbar v-else-if="currentTool === 'upload'" @choose="chooseImage" @demo="addDemoImage"
				@exit="exitTool" />
			<FilterToolbar v-else-if="currentTool === 'filter'" :options="filterOptions" :active-filter="activeFilter"
				@pick="activeFilter = $event" @exit="exitTool" />
			<BrushToolbar v-else-if="currentTool === 'brush'" :colors="brushColors" :brush-color="brushColor"
				:brush-size="brushSize" @pick-color="brushColor = $event" @pick-size="brushSize = $event"
				@submit="addBrushDot" @exit="exitTool" />
		</view>

		<!-- 悬浮按钮 -->
		<view class="floating-buttons">
			<view class="floating-button" @click="toggleSidebar">
				<text class="floating-button__icon">🎨</text>
				<text class="floating-button__text">版面设计</text>
			</view>
			<view class="floating-button" @click="toggleDecorSidebar">
				<text class="floating-button__icon">✨</text>
				<text class="floating-button__text">款式装饰</text>
			</view>
		</view>
	</view>
</template>
<script setup>
import { computed, ref } from 'vue'
import SideDrawers from './components/SideDrawers.vue'
import DecorSideDrawers from './components/DecorSideDrawers.vue'
import CanvasArea from './components/CanvasArea.vue'
import TextToolbar from './components/Toolbars/TextToolbar.vue'
import IconToolbar from './components/Toolbars/IconToolbar.vue'
import UploadToolbar from './components/Toolbars/UploadToolbar.vue'
import FilterToolbar from './components/Toolbars/FilterToolbar.vue'
import BrushToolbar from './components/Toolbars/BrushToolbar.vue'

const toolList = [
	{ key: 'text', label: '文字' },
	{ key: 'icon', label: '图标' },
	{ key: 'upload', label: '图片' },
	{ key: 'filter', label: '滤镜' },
	{ key: 'brush', label: '画笔' }
]

const decorToolList = [
	{ key: 'sticker', label: '贴纸' },
	{ key: 'stand', label: '支架' },
	{ key: 'style', label: '换款式' }
]

const iconOptions = [
	{ label: '星星', icon: '★', color: '#f0b429' },
	{ label: '爱心', icon: '♥', color: '#df5f6c' },
	{ label: '闪电', icon: '⚡', color: '#ff9f1c' },
	{ label: '花朵', icon: '✿', color: '#ef7998' },
	{ label: '音符', icon: '♪', color: '#5b8def' },
	{ label: '笑脸', icon: '☺', color: '#18a058' }
]

const filterOptions = [
	{ key: 'none', label: '原图', desc: '保持自然底色' },
	{ key: 'warm', label: '暖调', desc: '增加柔和暖光' },
	{ key: 'cool', label: '冷调', desc: '适合清爽风格' },
	{ key: 'retro', label: '复古', desc: '偏奶油复古色' },
	{ key: 'night', label: '夜幕', desc: '压低亮度层次' }
]

const textColors = ['#2f241f', '#d9485f', '#3c6e71', '#2b59c3', '#9c6644']
const brushColors = ['#ff7b54', '#ffb703', '#5b8def', '#18a058', '#b565d9']

const currentTool = ref('')
const currentDecorTool = ref('')
const layers = ref([])
const selectedLayerId = ref('')
const editingLayerId = ref('')
const activeFilter = ref('none')
const textDraft = ref('店管家')
const textColor = ref('#2f241f')
const textSize = ref(30)
const textFont = ref('Microsoft YaHei')
const brushColor = ref('#ff7b54')
const brushSize = ref(28)
const sidebarVisible = ref(false)
const decorSidebarVisible = ref(false)
const isDragging = ref(false)
const toolbarPosition = ref({ left: 20, top: 10 })
const dragOffset = ref({ x: 0, y: 0 })
const phoneFrameScale = ref(1)

const emit = defineEmits(['edit-text-layer'])

const selectedLayer = computed(() => layers.value.find((item) => item.id === selectedLayerId.value) || null)
const activeFilterLabel = computed(() => {
	const match = filterOptions.find((item) => item.key === activeFilter.value)
	return match ? `滤镜：${match.label}` : '滤镜：原图'
})

function createId(prefix) {
	return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

function getCenterPosition(width, height) {
	return {
		x: Math.max(12, Math.floor((280 - width) / 2)),
		y: Math.max(16, Math.floor((520 - height) / 2))
	}
}

function addTextLayer(x, y) {
	const width = 180
	const height = Math.max(48, textSize.value + 20)
	let position
	if (x !== undefined && y !== undefined) {
		// 使用鼠标点击坐标作为图层位置
		position = {
			x: Math.max(12, Math.floor(x - width / 2)),
			y: Math.max(16, Math.floor(y - height / 2))
		}
	} else {
		// 否则使用中心位置
		position = getCenterPosition(width, height)
	}
	const layer = {
		id: createId('text'),
		type: 'text',
		text: '请输入', // 默认文字改为"请输入"
		color: textColor.value,
		size: textSize.value,
		font: textFont.value,
		width,
		height,
		x: position.x,
		y: position.y,
		locked: false
	}
	layers.value.push(layer)
	selectedLayerId.value = layer.id
	// 触发编辑状态
	editingLayerId.value = layer.id
}

function handleAddTextLayer(x, y) {
	// 只有当当前工具是文字工具时，点击画布才添加文字图层
	if (currentTool.value === 'text') {
		addTextLayer(x, y)
	}
}

function upsertTextLayer() {
	if (selectedLayer.value && selectedLayer.value.type === 'text') {
		selectedLayer.value.text = textDraft.value || '输入文字'
		selectedLayer.value.color = textColor.value
		selectedLayer.value.size = textSize.value
		selectedLayer.value.font = textFont.value
		selectedLayer.value.height = Math.max(48, textSize.value + 20)
		return
	}
	addTextLayer()
}

function addIconLayer(item) {
	const size = 64
	const position = getCenterPosition(size, size)
	const layer = {
		id: createId('icon'),
		type: 'icon',
		text: item.icon,
		label: item.label,
		color: item.color,
		size: 38,
		width: size,
		height: size,
		x: position.x,
		y: position.y,
		locked: false
	}
	layers.value.push(layer)
	selectedLayerId.value = layer.id
}

function addImageLayer(url) {
	const width = 150
	const height = 150
	const position = getCenterPosition(width, height)
	const layer = {
		id: createId('image'),
		type: 'image',
		url,
		width,
		height,
		x: position.x,
		y: position.y,
		locked: false
	}
	layers.value.push(layer)
	selectedLayerId.value = layer.id
}

function addDemoImage() {
	addImageLayer('/static/logo.png')
}

function addBrushDot() {
	const size = brushSize.value
	const position = getCenterPosition(size, size)
	const layer = {
		id: createId('brush'),
		type: 'brush',
		color: brushColor.value,
		size,
		width: size,
		height: size,
		x: position.x,
		y: position.y,
		locked: false
	}
	layers.value.push(layer)
	selectedLayerId.value = layer.id
}

function handleUpdateText(id, text) {
	const layer = layers.value.find((item) => item.id === id)
	if (!layer) return
	layer.text = text
	if (selectedLayerId.value === id) {
		textDraft.value = text
	}
}

function selectLayer(id) {
	selectedLayerId.value = id
	const layer = layers.value.find((item) => item.id === id)
	if (!layer) return
	if (layer.type === 'text') {
		textDraft.value = layer.text
		textColor.value = layer.color
		textSize.value = layer.size
		currentTool.value = 'text'
	} else {
		// 点击非文字图层时，清空工具选择
		currentTool.value = ''
	}
}

function resizeSelectedLayer(delta) {
	const layer = selectedLayer.value
	if (!layer) return
	if (layer.type === 'text' || layer.type === 'icon') {
		layer.size = Math.max(18, layer.size + delta)
		layer.height = Math.max(48, layer.size + 20)
		if (layer.type === 'icon') {
			layer.width = Math.max(48, layer.width + delta)
			layer.height = Math.max(48, layer.height + delta)
		}
	}
	if (layer.type === 'image' || layer.type === 'brush') {
		layer.width = Math.max(36, layer.width + delta)
		layer.height = Math.max(36, layer.height + delta)
	}
}

function toggleLayerLock() {
	if (!selectedLayer.value) return
	selectedLayer.value.locked = !selectedLayer.value.locked
}

function removeSelectedLayer() {
	if (!selectedLayerId.value) return
	layers.value = layers.value.filter((item) => item.id !== selectedLayerId.value)
	selectedLayerId.value = ''
}

function chooseImage() {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			const filePath = res.tempFilePaths && res.tempFilePaths[0]
			if (filePath) addImageLayer(filePath)
		}
	})
}

function changeTextSize(delta) {
	textSize.value = Math.max(20, textSize.value + delta)
	if (selectedLayer.value && selectedLayer.value.type === 'text') {
		selectedLayer.value.size = textSize.value
		selectedLayer.value.height = Math.max(48, textSize.value + 20)
	}
}

function pickTextColor(color) {
	textColor.value = color
	if (selectedLayer.value && selectedLayer.value.type === 'text') {
		selectedLayer.value.color = color
	}
}

function pickTextFont(font) {
	textFont.value = font
	if (selectedLayer.value && selectedLayer.value.type === 'text') {
		selectedLayer.value.font = font
	}
}

function getLayerSummary(layer) {
	if (layer.type === 'text') return `文字：${layer.text}`
	if (layer.type === 'icon') return `图标：${layer.label}`
	if (layer.type === 'image') return '图片图层'
	return '笔刷色点'
}

function saveDesign() {
	uni.showToast({ title: '已保存当前配置', icon: 'success' })
}

function exitTool() {
	currentTool.value = ''
}

function goBack() {
	const pages = getCurrentPages()
	if (pages.length > 1) {
		uni.navigateBack()
		return
	}
	uni.switchTab({ url: '/pages/index/index' })
}

function toggleSidebar() {
	sidebarVisible.value = !sidebarVisible.value
}

function toggleDecorSidebar() {
	decorSidebarVisible.value = !decorSidebarVisible.value
}

function toggleMoveMode() {
	// 切换移动模式
	console.log('切换移动模式')
}

function startDrag(e) {
	isDragging.value = true

	const clientX = e.touches ? e.touches[0].clientX : e.clientX
	const clientY = e.touches ? e.touches[0].clientY : e.clientY

	dragOffset.value = {
		x: clientX - toolbarPosition.value.left,
		y: clientY - toolbarPosition.value.top
	}

	console.log('开始拖拽:', dragOffset.value)
}

function drag(e) {
	if (!isDragging.value) return

	e.preventDefault()

	const clientX = e.touches ? e.touches[0].clientX : e.clientX
	const clientY = e.touches ? e.touches[0].clientY : e.clientY

	toolbarPosition.value = {
		left: clientX - dragOffset.value.x,
		top: clientY - dragOffset.value.y
	}

	console.log('拖拽中:', toolbarPosition.value)
}

function endDrag() {
	isDragging.value = false
	console.log('结束拖拽')
}

function undo() {
	// 撤销操作
	console.log('撤销操作')
}

function redo() {
	// 重做操作
	console.log('重做操作')
}

function zoomIn() {
	// 放大
	if (phoneFrameScale.value < 2) {
		phoneFrameScale.value += 0.1
		console.log('放大到:', phoneFrameScale.value)
	}
}

function zoomOut() {
	// 缩小
	if (phoneFrameScale.value > 0.5) {
		phoneFrameScale.value -= 0.1
		console.log('缩小到:', phoneFrameScale.value)
	}
}

function clearAll() {
	// 清空所有内容
	console.log('清空所有内容')
	layers.value = []
	selectedLayerId.value = ''
}

function handleClearTool() {
	// 清空当前工具选择
	currentTool.value = ''
	// 清除编辑状态，隐藏输入框
	editingLayerId.value = ''
	console.log('清除工具选择，editingLayerId:', editingLayerId.value)
}
</script>

<style>
page {
	background: linear-gradient(180deg, #f7efe3 0%, #efe6da 100%);
}

.page-shell {
	min-height: 100vh;
	padding: 24rpx;
	position: relative;
}

.tool-bar {
	background: rgba(255, 255, 255, 0.82);
	border-radius: 20px;
	padding: 8rpx;
	box-shadow: 0 8rpx 24rpx rgba(80, 56, 30, 0.08);
	height: 40px;
	display: inline-flex;
	position: fixed;
	justify-content: center;
	align-items: center;
	left: 20rpx;
	box-sizing: border-box;
}

.tool-bar .iconfont {
	font-size: 28rpx;
	color: #473126;
	padding: 0 20rpx;
	display: inline-block;
}

.tool-bar__button {
	width: 48rpx;
	height: 48rpx;
	border-radius: 12rpx;
	background: #f8f8f8;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 8rpx;
	cursor: pointer;
	transition: all 0.2s ease;
}

.tool-bar__button:first-child {
	margin-left: 0;
}

.tool-bar__button:hover {
	background: #f0f0f0;
	transform: translateY(-2rpx);
}

.tool-bar__button text {
	font-size: 24rpx;
	color: #473126;
}

.workspace {
	display: flex;

	align-items: flex-start;
	margin-top: 24rpx;
}

.workspace__main {
	flex: 1;
}

.selection-panel {
	margin-top: 24rpx;
	padding: 24rpx;
	border-radius: 24rpx;
	background: rgba(255, 248, 241, 0.95);
	box-shadow: 0 18rpx 50rpx rgba(80, 56, 30, 0.08);
}

.selection-panel__head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
	margin-bottom: 12rpx;
}

.selection-panel__title {
	font-size: 28rpx;
	font-weight: 700;
	color: #352821;
}

.selection-panel__desc {
	display: block;
	font-size: 24rpx;
	line-height: 1.7;
	color: #6d594d;
}

.selection-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	margin-top: 20rpx;
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
	border-bottom: 2rpx solid #d86e33;
}

/* 下层内容样式 */
.toolbar-bottom {
	padding-top: 10rpx;
}


.toolbar-wrap {
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 750rpx;
}

.toolbar-card {
	flex: 1;
	width: 100vw;
	box-sizing: border-box;
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
	background: #fff;
	padding: 24rpx;
}

.toolbar-top {
	display: flex;
	align-items: center;

}

.toolbar-top-left {
	display: flex;
	gap: 56rpx;

}

.toolbar-top-right {
	position: absolute;
	right: 0;
	width: 80rpx;
	height: 80rpx;
	display: flex;

}

.toolbar-top-right-exit {
	display: flex;
	width: 55rpx;
	height: 55rpx;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 4px 6px 0 #cccccc;
}

/* 悬浮按钮样式 */
.floating-buttons {
	position: fixed;
	top: 350rpx;
	left: 0;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	z-index: 999;
}

.page-shell .sidebar {
	top: 500rpx !important;
}

.floating-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16rpx;
	background: rgba(255, 255, 255, 0.95);
	border-radius: 0 24rpx 24rpx 0;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.3s ease;
}

.floating-button:hover {
	background: rgba(255, 255, 255, 1);
	box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.15);
	transform: translateY(-4rpx);
}

.floating-button__icon {
	font-size: 40rpx;
	margin-bottom: 12rpx;
}

.floating-button__text {
	writing-mode: vertical-rl;
	text-orientation: upright;
	font-size: 24rpx;
	font-weight: 600;
	color: #352821;
	letter-spacing: 8rpx;
}

.workspace__main {
	position: absolute;
	top: 100rpx;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 24rpx;
	padding-top: 50rpx;
	box-sizing: border-box;
}
</style>
