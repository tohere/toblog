import loadingComp from './loading'

const Loading = {}

Loading.install = (Vue) => {
  // 判断是否已经存在loading弹层，存在的话不再往下执行
  if (document.getElementsByClassName('loading').length) return
  // 创建构造器
  const loadingTpl = Vue.extend(loadingComp)
  // 创建实例
  const instance = new loadingTpl()
  const el = instance.$mount().$el
  document.body.appendChild(el)

  // 在vue原型上添加方法
  Vue.prototype.$loading = {
    // 控制loading显示
    // 默认3s后隐藏
    show(time = 3000) {
      instance.show = true
      setTimeout(() => {
        instance.show = false
      }, time)
    },
    hide() {
      console.log('hide')
      instance.show = false
    },
  }
}

export default Loading
