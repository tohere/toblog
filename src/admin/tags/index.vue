<template>
  <!-- 标签页面 -->
  <div class="admin-tags">
    <h1>标签</h1>
    <List :lists='tags' @delete='delTag'></List>
    <Dialog
      :show="isShow"
      title="确定删除该分类吗？"
      remind="警告"
      @close="close"
    ></Dialog>
  </div>
</template>

<script>
import List from '../common/list'
import Dialog from '@/components/common/dialog'

import { getTags } from '@/api/get'
import { delTagById } from '@/api/delete'
export default {
  name: 'AdminTags',
  components: {
    List,
    Dialog
  },
  data () {
    return {
      tags: [],
      delId: 0,
      isShow: false
    }
  },
  created () {
    this.getAllTags()
  },
  methods: {
    getAllTags () {
      getTags().then(res => {
        if (res.status === 1) {
          this.tags = res.data
        } else {
          throw Error(res.err)
        }
      }).catch(err => {
        throw Error(err)
      })
    },
    delTag (id) {
      this.isShow = true
      this.delId = id
    },
    close(msg) {
      this.isShow = false
      if (msg === 'cancel') {
        return
      }
      if (msg === 'confirm') {
        delTagById(this.delId)
          .then((res) => {
            if (res.status === 1) {
              this.getAllTags()
            } else {
              throw Error(res.err)
            }
          })
          .catch((err) => {
            throw Error(err)
          })
      }
    },
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 30px;
  line-height: 60px;
}
</style>
