import { BASE_URL } from '@/config/env'
const isAbsoluteUrl = (url = '') => /^https?:\/\//.test(url)
const buildUrl = (url = '') => {
	if (!url) {
		return BASE_URL
	}

	if (isAbsoluteUrl(url)) {
		return url
	}

	const prefix = url.startsWith('/') ? url : `/${url}`
	return `${BASE_URL}${prefix}`
}

export {buildUrl}