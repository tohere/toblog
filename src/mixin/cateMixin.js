// cate混合
import { getCates } from '@/api/get'
export default {
  data () {
    return {
      cates: []
    }
  },
  methods: {
    getAllCates(all='all', admin='') {
      getCates(all, admin).then((res) => {
        if (res.status === 1) {
          this.cates = res.cates
        } else {
          throw Error(res.err)
        }
      })
    }
  }
}
