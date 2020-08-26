
// 不足两位补0
function addZero (num) {
  return num < 10 ? '0' + num : num
}

// 格式化时间字符串
const dateFormat = (timeStr) => {
  const date = new Date(timeStr)
  const Y = date.getFullYear()
  const M = addZero( date.getMonth() + 1 )
  const D = addZero( date.getDate() )

  const h = addZero( date.getHours() )
  const m = addZero( date.getMinutes() )
  const s = addZero( date.getSeconds() )

  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}


module.exports = dateFormat
