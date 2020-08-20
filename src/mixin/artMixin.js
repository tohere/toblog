import { getArticles, getArtsNum } from '@/api'
const artMixin = {
  data () {
    return {
      articles: [],
      total: 0, // 文章总数
    }
  },
  methods: {
    async getPageArticles(page = 1, pageSize = 5) {
      getArticles({
        params: {
          page,
          pageSize,
        },
      }).then((res) => {
        if (res.status === 1) {
          if (res.data.length > 0) {
            this.articles = res.data
          }
        } else {
          throw Error(res.err)
        }
      })
    },
    getNums() {
      getArtsNum().then((res) => {
        if (res.status === 0) {
          throw Error(res.err)
        }
        this.total = res.total[0].total
      })
    },
  }
}

export default artMixin
