export function getAgesRangeFromArray(arr: number[]): string {
	if (!Array.isArray(arr) || arr.length === 0) return ''

	const sorted = [...new Set(arr)].sort((a, b) => a - b)

	const start = sorted[0]
	const end = sorted[sorted.length - 1]

	return start === end ? `${start}` : `${start} - ${end}`
}
