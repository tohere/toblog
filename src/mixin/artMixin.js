import { getArticles, getArtsNum, searchByWord } from '@/api/get'
const artMixin = {
  data() {
    return {
      articles: [],
      total: 0, // 文章总数
      word: '', // 搜索文章关键字
    }
  },
  methods: {
    async getPageArticles(page = 1, pageSize = 5, admin='') {
      getArticles({
        params: {
          page,
          pageSize,
          admin
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
    getNums(admin='') {
      getArtsNum(admin).then((res) => {
        if (res.status === 0) {
          throw Error(res.err)
        }
        this.total = res.total[0].total
      })
    },
    search(admin='') {
      searchByWord(this.word, this.page, this.pageSize, admin)
        .then((res) => {
          if (res.status === 1) {
            this.articles = res.data
            this.total = res.total
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
  },
}

export default artMixin
