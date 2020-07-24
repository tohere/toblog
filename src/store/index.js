import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menus: [
      { icon: 'home', name: '首页', link: '/' },
      { icon: 'biaoqian', name: '标签', link: '/tags' },
      { icon: 'fenlei', name: '分类', link: '/categories' },
      { icon: 'guidang', name: '归档', link: '/archives' },
      { icon: 'yonghu', name: '关于', link: '/about' },
      { icon: 'search', name: '搜索', link: '/search' }
    ]
  }
})

export default store
