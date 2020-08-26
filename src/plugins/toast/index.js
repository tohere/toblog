// 引入模板
import toastComp from './toast'

const Toast = {}

Toast.install = (Vue) => {
  // 判断是否已经存在toast弹层，存在的话不再往下执行
  if (document.getElementsByClassName('toast').length) return
  // 创建构造器
  const toastTpl = Vue.extend(toastComp)
  // 创建实例
  const instance = new toastTpl()
  // 挂载到dom元素上并插入body中
  const el = instance.$mount().$el
  document.body.appendChild(el)

  // 在vue原型上添加方法
  Vue.prototype.$toast = {
    // 控制toast显示
    show(options) {
      // 判断传入的如果是字符串，则直接设置提示文本
      if (typeof options === 'string') {
        instance.text = options
      } else if (options instanceof Object) {
        // 如果传入的是对象，则将与实例对象合并
        Object.assign(instance, options)
      } else {
        // 不符合以上格式保错
        throw Error('参数格式错误')
      }
      instance.show = true
      setTimeout(() => {
        instance.show = false
      }, instance.duration)
    },
    // 控制toast隐藏
    hide() {
      instance.show = false
    },
  }
}

export default Toast
