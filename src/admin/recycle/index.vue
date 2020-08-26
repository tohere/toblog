<template>
  <!-- 回收站部分 -->
  <div class="recycle">
    <h1>回收站</h1>
    <art-list @setArtShow='recycle' :articles='articles'></art-list>
  </div>
</template>

<script>
import ArtList from '@/admin/arts/artList'
import { getRecycle } from '@/api/get'
import { setArtShow } from '@/api/put'
export default {
  name: 'Recycle',
  components: {
    ArtList,
  },
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.getRecycleArts()
  },
  methods: {
    getRecycleArts() {
      getRecycle('admin')
        .then((res) => {
          if (res.status === 1) {
            this.articles = res.data
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    recycle (param) {
      setArtShow(param.id, param.show).then(res => {
        if (res.status === 1) {
          this.getRecycleArts()
        } else {
          throw Error(res.err)
        }
      }).catch(err => {
        throw Error(err)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.recycle {
  h1 {
    text-align: center;
    line-height: 80px;
    font-size: 30px;
  }
}
</style>
