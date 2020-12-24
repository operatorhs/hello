
export function filterDate(timer, format) {
  if (timer) {
    const dt = new Date(timer)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1).toString().padStart(2, 0)
    const d = dt.getDate()
    const h = (dt.getHours()).toString().padStart(2, '0')
    const mm = (dt.getMinutes()).toString().padStart(2, '0')
    const s = (dt.getSeconds()).toString().padStart(2, '0')
    if (format === 'yymmdd') {
      return `${y}/${m}/${d}`
    }
    if (format === 'ymd') {
      return `${y}年${m}月${d}日  ${h}时${mm}分${s}秒`
    }
    return `${y}年${m}月${d}日`
  } else {
    return ''
  }
}

export function filterDuration(tiemr) {
  if (!tiemr) {
    return 0
  }
  return Math.floor(tiemr / 60) + '分钟' + Math.floor(tiemr % 60) + '秒'
}
