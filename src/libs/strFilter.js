/**
 * 将str中的特殊符号进行过滤
 */
export function strFilter(str) {
  const pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"
  )
  let specialStr = ''
  for (let i = 0; i < str.length; i++) {
    specialStr += str.substr(i, 1).replace(pattern, '')
  }
  return specialStr
}
