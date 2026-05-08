<template>
	<view class="page-shell" :class="{ 'page-shell--3d': is3DMode }">
		<view v-if="!is3DMode" style="width: 200rpx;position: fixed;top: 20rpx;right: 20rpx;z-index: 1000;">
			<up-button type="warning" shape="circle" size="medium" text="保存设计" style="width: 100%;"></up-button>
		</view>
		<view v-if="!is3DMode" class="tool-bar tool-bar-move" :style="{
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
			<view class="tool-bar-button">
				<text class="iconfont icon-eye" @click="toggle3DMode"></text>
			</view>
		</view>

		<view class="workspace" :class="{ 'workspace--3d': is3DMode }">

			<view v-if="!is3DMode" class="workspace__sidebars">
				<SideDrawers :current-tool="currentTool" :tools="toolList" :visible="sidebarVisible"
					@select="selectDesignTool" @close="sidebarVisible = false" />
				<DecorSideDrawers :current-tool="currentDecorTool" :tools="decorToolList" :visible="decorSidebarVisible"
					@select="currentDecorTool = $event" @close="decorSidebarVisible = false" />
			</view>




			<view class="workspace__main" :class="{ 'workspace__main--3d': is3DMode }" @click="exitTool">
				<view class="stage-card" :class="{ 'stage-card--3d': is3DMode }" :style="is3DMode ? {
					transform: `rotateX(${rotate3D.x}deg) rotateY(${rotate3D.y}deg)`,
					transformStyle: 'preserve-3d',
					perspective: '1200px'
				} : {}" @click.stop @touchstart="is3DMode ? handle3DTouchStart($event) : null"
					@touchmove="is3DMode ? handle3DTouchMove($event) : null"
					@touchend="is3DMode ? handle3DTouchEnd() : null"
					@mousedown="is3DMode ? handle3DMouseDown($event) : null"
					@mousemove="is3DMode ? handle3DMouseMove($event) : null"
					@mouseup="is3DMode ? handle3DMouseUp() : null" @mouseleave="is3DMode ? handle3DMouseUp() : null">
					<CanvasArea :layers="layers" :selected-layer-id="selectedLayerId" :active-filter="activeFilter"
						:scale="is3DMode ? phoneFrameScale * 1.2 : phoneFrameScale" :current-tool="currentTool"
						:editing-layer-id="editingLayerId" :brush-color="brushColor" :brush-size="brushSize"
						:disabled="is3DMode" @select-layer="selectLayer" @add-text-layer="handleAddTextLayer"
						@update-text="handleUpdateText" @clear-tool="handleClearTool"
						@update-layer-position="updateLayerPosition" @delete-layer="deleteLayer"
						@update-layer-size="updateLayerSize" @exit-edit="exitEdit"
						@add-brush-layer="handleAddBrushLayer" />


						<view  class="tool-bar-button-text">店管家移动端自定组件</view>
				</view>
			</view>
		</view>

		<view v-if="is3DMode" class="reset-3d-btn" @click="reset3DView">
			<text class="reset-3d-btn__text">回正</text>
		</view>

		<view v-if="is3DMode" class="exit-3d-btn" @click="toggle3DMode">
			<text class="exit-3d-btn__text">退出</text>
		</view>

		<view v-if="!is3DMode" class="toolbar-wrap">
			<TextToolbar v-if="currentTool === 'text' || (selectedLayer && selectedLayer.type === 'text')"
				:text-draft="textDraft" :text-color="textColor" :text-size="textSize" :text-font="textFont"
				:colors="textColors" :is-editing="selectedLayer && selectedLayer.type === 'text'"
				@update-draft="textDraft = $event" @pick-color="pickTextColor" @change-size="changeTextSize"
				@pick-font="pickTextFont" @submit="upsertTextLayer" @exit="exitTool" />
			<IconEditToolbar v-else-if="selectedLayer && selectedLayer.type === 'icon'"
				:icon-color="selectedLayer.color" :colors="textColors" @pick-color="updateIconColor" @exit="exitTool" />
			<IconToolbar v-else-if="currentTool === 'icon'" :options="iconOptions" @add="addIconLayer"
				@exit="exitTool" />
			<UploadToolbar v-else-if="currentTool === 'upload'" @choose="chooseImage" @demo="addDemoImage"
				@select-template="handleSelectTemplate" @exit="exitTool" />
			<TemplateToolbar v-else-if="currentTool === 'template'" @select-template="handleSelectTemplate"
				@exit="exitTool" />
			<FilterToolbar v-else-if="currentTool === 'filter'" :options="filterOptions" :active-filter="activeFilter"
				@pick="activeFilter = $event" @exit="exitTool" />
			<BrushToolbar v-else-if="currentTool === 'brush'" :colors="textColors" :brush-color="brushColor"
				:brush-size="brushSize" @pick-color="brushColor = $event" @pick-size="brushSize = $event"
				@exit="exitTool" />
		</view>

		<!-- 悬浮按钮 -->
		<view v-if="!is3DMode" class="floating-buttons">
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
import IconEditToolbar from './components/Toolbars/IconEditToolbar.vue'
import UploadToolbar from './components/Toolbars/UploadToolbar.vue'
import TemplateToolbar from './components/Toolbars/TemplateToolbar.vue'
import FilterToolbar from './components/Toolbars/FilterToolbar.vue'
import BrushToolbar from './components/Toolbars/BrushToolbar.vue'
import { buildUrl } from '@/config/env.js'

const toolList = [
	{ key: 'text', label: '文字' },
	{ key: 'icon', label: '图标' },
	{ key: 'upload', label: '图片' },
	{ key: 'brush', label: '画笔' },
	{ key: 'template', label: '模板' },
	{ key: 'filter', label: '滤镜' },
]

const decorToolList = [
	{ key: 'sticker', label: '贴纸' },
	{ key: 'stand', label: '支架' },
	{ key: 'style', label: '换款式' }
]

const iconOptions = [
	{
		key: 'graph',
		label: '图形',
		icon: '★',
		type: 'graph',
		icons: [
			{ label: '星星', icon: 'wwchuan-star-full', color: '#f0b429', size: 40 },
			{ label: '星星', icon: 'wwchuan-xingxing', color: '#df5f6c', size: 40 },
			{ label: '爱心', icon: 'wwchuan-keaide', color: '#ff9f1c', size: 40 },
			{ label: '爱心', icon: 'wwchuan-hearts-fill', color: '#ef7998', size: 40 },
			{ label: '四叶草', icon: 'wwchuan-shuyeu', color: '#5b8def', size: 40 },
		]
	},
	{
		key: 'emotion',
		label: '表情',
		icon: '😊',
		type: 'emotion',
		icons: [
			{ label: '吃惊', icon: 'wwchuan-chijing', color: '#f0b429', size: 40 },
			{ label: '尴尬', icon: 'wwchuan-ganga', color: '#df5f6c', size: 40 },
			{ label: '亲亲', icon: 'wwchuan-qin', color: '#ff9f1c', size: 40 },
			{ label: '生气', icon: 'wwchuan-shengqi', color: '#ef7998', size: 40 }
		]
	},
	{
		key: 'pet',
		label: '萌物',
		icon: '😊',
		type: 'pet',
		icons: [
			{ label: '小鸡', icon: 'wwchuan-xiaojidongwuniao', color: '#f0b429', size: 40 },
			{ label: '小熊', icon: 'wwchuan-a-ziyuan21', color: '#df5f6c', size: 40 },
			{ label: '脚印', icon: 'wwchuan-dongwu', color: '#ff9f1c', size: 40 }
		]
	},

]

const filterOptions = [
	{ key: 'none', label: '原图', desc: '保持自然底色' },
	{ key: 'warm', label: '暖调', desc: '增加柔和暖光' },
	{ key: 'cool', label: '冷调', desc: '适合清爽风格' },
	{ key: 'retro', label: '复古', desc: '偏奶油复古色' },
	{ key: 'night', label: '夜幕', desc: '压低亮度层次' }
]

const textColors = ['#2f241f', '#d9485f', '#3c6e71', '#2b59c3', '#9c6644','#ff7b54', '#ffb703', '#5b8def', '#18a058', '#b565d9', '#3498db']  //字体和图标颜色
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
const brushSize = ref(3)
const sidebarVisible = ref(false)
const decorSidebarVisible = ref(false)
const isDragging = ref(false)
const is3DMode = ref(false)
const is3DRotating = ref(false)
const rotate3D = ref({ x: -15, y: 15 })
const last3DPos = ref({ x: 0, y: 0 })
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
		position = {
			x: Math.max(0, Math.floor(x - 200)),
			y: Math.max(0, Math.floor(y - 200))
		}
	} else {
		position = getCenterPosition(width, height)
	}
	const layer = {
		id: createId('text'),
		type: 'text',
		text: '请输入',
		color: textColor.value,
		size: textSize.value,
		font: textFont.value,
		width,
		height,
		x: position.x,
		y: position.y,
		locked: false,
		rotation: 0
	}
	layers.value.push(layer)
	selectedLayerId.value = layer.id
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
		selectedLayer.value.text = textDraft.value
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

function handleSelectTemplate(template) {
	console.log('handleSelectTemplate:', template)
	if (template && template.icon) {
		addImageLayer(template.icon)
		uni.showToast({ title: '已添加推荐图片', icon: 'success' })
	}
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

function uploadImage(filePath) {
	console.log('uploadImage called, filePath:', filePath)
	console.log('buildUrl test:', buildUrl(''))
	uni.showLoading({ title: '上传中...' })

	const uploadUrl = buildUrl('') + '/upload/image?uploadDir=editTemplate'
	console.log('uploadUrl:', uploadUrl)

	uni.uploadFile({
		url: uploadUrl,
		filePath: filePath,
		name: 'file',
		success: (res) => {
			uni.hideLoading()
			console.log('upload success res:', res)
			try {
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
				console.log('upload data:', data)
				if (data.err_code === 0 && data.data && data.data.imageUrl) {
					const imageUrl = buildUrl('') + data.data.imageUrl
					console.log('addImageLayer with url:', imageUrl)
					addImageLayer(imageUrl)
					uni.showToast({ title: '上传成功', icon: 'success' })
				} else {
					uni.showToast({ title: data.message || '上传失败', icon: 'error' })
				}
			} catch (e) {
				console.error('parse error:', e)
				uni.showToast({ title: '解析失败', icon: 'error' })
			}
		},
		fail: (err) => {
			uni.hideLoading()
			console.error('upload fail:', err)
			uni.showToast({ title: '上传失败', icon: 'error' })
		},
		complete: () => {
			uni.hideLoading()
			console.log('upload complete')
		}
	})
}

function addDemoImage() {
	addImageLayer('/static/logo.png')
}

function handleAddBrushLayer(layerData) {
	const layer = {
		id: createId('brush'),
		type: 'brush',
		color: layerData.color,
		size: layerData.size,
		width: layerData.width,
		height: layerData.height,
		x: layerData.x,
		y: layerData.y,
		imageData: layerData.imageData,
		fullCanvasW: layerData.fullCanvasW || layerData.width,
		fullCanvasH: layerData.fullCanvasH || layerData.height,
		contentOffsetX: layerData.contentOffsetX || 0,
		contentOffsetY: layerData.contentOffsetY || 0,
		origW: layerData.origW || layerData.width,
		origH: layerData.origH || layerData.height,
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
	// 更新文字后清除编辑状态
	editingLayerId.value = ''
	currentTool.value = ''
}

function selectLayer(id) {
	selectedLayerId.value = id
	const layer = layers.value.find((item) => item.id === id)
	if (!layer) return
	if (layer.type === 'text') {
		textDraft.value = layer.text
		textColor.value = layer.color
		textSize.value = layer.size
		editingLayerId.value = id
	} else if (currentTool.value === 'brush') {
	} else {
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

function deleteLayer(layerId) {
	layers.value = layers.value.filter((item) => item.id !== layerId)
	if (selectedLayerId.value === layerId) {
		selectedLayerId.value = ''
	}
	if (editingLayerId.value === layerId) {
		editingLayerId.value = ''
	}
}

function updateIconColor(color) {
	if (selectedLayerId.value) {
		const layer = layers.value.find((item) => item.id === selectedLayerId.value)
		if (layer && layer.type === 'icon') {
			layer.color = color
		}
	}
}

function chooseImage() {
	console.log('chooseImage called')
	// #ifdef MP-WEIXIN
	const tryChooseImage = () => {
		// 尝试使用 uni.chooseImage
		uni.chooseImage({
			count: 1,
			sizeType: ['original'],
			sourceType: ['album'],
			success: (res) => {
				console.log('uni.chooseImage success:', res)
				const filePath = res.tempFilePaths && res.tempFilePaths[0]
				console.log('filePath:', filePath)
				if (filePath) {
					uploadImage(filePath)
				}
			},
			fail: (err) => {
				console.error('uni.chooseImage fail:', err)
				// 降级方案：使用 wx.chooseMessageFile
				try {
					wx.chooseMessageFile({
						count: 1,
						type: 'image',
						success: (res) => {
							console.log('wx.chooseMessageFile success:', res)
							const filePath = res.tempFiles && res.tempFiles[0] && res.tempFiles[0].path
							console.log('filePath:', filePath)
							if (filePath) {
								uploadImage(filePath)
							}
						},
						fail: (err2) => {
							console.error('wx.chooseMessageFile fail:', err2)
							uni.showToast({ title: '无法选择图片', icon: 'error' })
						}
					})
				} catch (e) {
					console.error('fallback error:', e)
					uni.showToast({ title: '图片选择失败', icon: 'error' })
				}
			}
		})
	}

	// 添加延迟调用
	setTimeout(tryChooseImage, 50)
	// #endif

	// #ifdef H5
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			console.log('chooseImage success:', res)
			const filePath = res.tempFilePaths && res.tempFilePaths[0]
			console.log('filePath:', filePath)
			if (filePath) {
				uploadImage(filePath)
			}
		},
		fail: (err) => {
			console.error('chooseImage fail:', err)
			uni.showToast({ title: '图片选择失败', icon: 'error' })
		}
	})
	// #endif
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
	selectedLayerId.value = ''
	currentTool.value = ''
}

function exitEdit() {
	editingLayerId.value = ''
	selectedLayerId.value = ''
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

function toggle3DMode() {
	is3DMode.value = !is3DMode.value
	console.log('3D mode:', is3DMode.value)
	if (is3DMode.value) {
		currentTool.value = ''
		selectedLayerId.value = ''
	}
}

function reset3DView() {
	rotate3D.value = { x: 0, y: 0 }
}

function handle3DTouchStart(e) {
	is3DRotating.value = true
	const touch = e.touches[0]
	last3DPos.value = { x: touch.clientX, y: touch.clientY }
}

function handle3DTouchMove(e) {
	if (!is3DRotating.value) return
	const touch = e.touches[0]
	const deltaX = touch.clientX - last3DPos.value.x
	const deltaY = touch.clientY - last3DPos.value.y
	rotate3D.value = {
		x: rotate3D.value.x + deltaY * 0.2,
		y: rotate3D.value.y + deltaX * 0.2
	}
	last3DPos.value = { x: touch.clientX, y: touch.clientY }
}

function handle3DTouchEnd() {
	is3DRotating.value = false
}

function handle3DMouseDown(e) {
	is3DRotating.value = true
	last3DPos.value = { x: e.clientX, y: e.clientY }
}

function handle3DMouseMove(e) {
	if (!is3DRotating.value) return
	const deltaX = e.clientX - last3DPos.value.x
	const deltaY = e.clientY - last3DPos.value.y
	rotate3D.value = {
		x: rotate3D.value.x + deltaY * 0.2,
		y: rotate3D.value.y + deltaX * 0.2
	}
	last3DPos.value = { x: e.clientX, y: e.clientY }
}

function handle3DMouseUp() {
	is3DRotating.value = false
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
	// 只有在非编辑状态下才清除工具
	if (!editingLayerId.value) {
		currentTool.value = ''
	}
	console.log('清除工具选择，currentTool:', currentTool.value, 'editingLayerId:', editingLayerId.value)
}

function updateLayerSize(layerId, width, height) {
	const layer = layers.value.find((item) => item.id === layerId)
	if (!layer) return
	layer.width = width
	layer.height = height
	// 如果是图标图层，同时更新 size 属性以改变图标显示大小
	if (layer.type === 'icon') {
		layer.size = Math.min(width, height)
	}
}

function updateLayerPosition(layerId, x, y) {
	const layer = layers.value.find((item) => item.id === layerId)
	if (!layer) return
	layer.x = Math.max(0, x)
	layer.y = Math.max(0, y)
}

function selectDesignTool(tool) {
	selectedLayerId.value = ''
	currentTool.value = tool
}
</script>

<style>
page {
	background: linear-gradient(180deg, #f7efe3 0%, #efe6da 100%);
	overflow: hidden;
	height: 100vh;
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
	z-index: 1001;
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
	z-index: 10000;
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
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.workspace__main.workspace__main--3d{
	left:unset;
}

.stage-card {
	justify-content: center;
	display: flex;
}

.stage-card--3d {
	transform-style: preserve-3d;
	perspective: 1200px;
	transform: rotateX(-15deg) rotateY(15deg);
	transition: transform 0.1s ease-out;
	transform-origin: 40px 40px;
}

.exit-3d-btn {
	position: fixed;
	bottom: 200rpx;
	right: 30rpx;
	padding: 20rpx 40rpx;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 40rpx;
	z-index: 1000;
	cursor: pointer;
	transition: all 0.3s ease;
}

.exit-3d-btn:hover {
	background: rgba(0, 0, 0, 0.85);
}

.exit-3d-btn__text {
	color: #fff;
	font-size: 28rpx;
	font-weight: 500;
}

.reset-3d-btn {
	position: fixed;
	bottom: 300rpx;
	right: 30rpx;
	padding: 20rpx 40rpx;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 40rpx;
	z-index: 1000;
	cursor: pointer;
	transition: all 0.3s ease;
}

.reset-3d-btn:hover {
	background: rgba(0, 0, 0, 0.85);
}

.reset-3d-btn__text {
	color: #fff;
	font-size: 28rpx;
	font-weight: 500;
}

.page-shell--3d {
	background: #f5f5f5;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	margin: 0 !important;
	padding: 0 !important;
}

.workspace--3d {
	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	right: 0 !important;
	bottom: 0 !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	margin-top: 0 !important;
	padding: 20rpx;
	box-sizing: border-box;
}

.workspace__main--3d {
	width: 80%;
	max-width: 600px;
	flex: none !important;
	margin: 0 auto !important;
	display: flex;
	justify-content: center;
	align-items: center;
}

.toolbar-card-icondown {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 70rpx;
	height: 33rpx;
	border-radius: 8px;
	opacity: 1;
	background: #FFFFFF;
	box-sizing: border-box;
	border: 0.5px solid rgba(0, 0, 0, 0.1);
	position: absolute;
	top: -10px;
	left: 50%;
	transform: translateX(-50%);
	color: #cccccc;
	font-size: 24rpx;
}

.toolbar-card-icondown.icon-up {
	transform: rotate(180deg);
}
.tool-bar-button-text{
	font-size: 46rpx;
	line-height: 1.7;
	color: #d86e33;
	position: fixed;
	top:220rpx;
	left:150rpx;
}

</style>
