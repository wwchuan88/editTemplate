const safeReadProcessEnv = (key) => {
	try {
		if (typeof process !== 'undefined' && process.env && process.env[key]) {
			return process.env[key]
		}
	} catch (error) {
		return ''
	}

	return ''
}

const normalizeBaseUrl = (url) => {
	if (!url) {
		return ''
	}

	return String(url).replace(/\/+$/, '')
}

// export const BASE_URL = normalizeBaseUrl(
// 	safeReadProcessEnv('BASE_URL') || safeReadProcessEnv('VUE_APP_BASE_URL')	
// )

let baseUrl = 'http://localhost:3000'
let hasBaseUrl = Boolean(baseUrl)
let buildUrl = (url = '') => {
	if (!url) {
		return baseUrl
	}

	if (url.startsWith('/')) {
		return `${baseUrl}${url}`
	}

	if (url.startsWith('http')) {
		return url
	}

	return `${baseUrl}${url}`
}

export {baseUrl,hasBaseUrl,buildUrl}
