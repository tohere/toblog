<template>
  <div class="admin-cates">
    <h1>分类</h1>
    <List :lists="cates" @delete="delCate"></List>
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

import { getCates } from '@/api/get'
import { delCateById } from '@/api/delete'
export default {
  name: 'AdminCates',
  components: {
    List,
    Dialog,
  },
  data() {
    return {
      cates: [],
      isShow: false,
      delId: 0
    }
  },
  created() {
    this.getAllCates()
  },
  methods: {
    // 获取所有分类
    getAllCates() {
      getCates()
        .then((res) => {
          if (res.status === 1) {
            this.cates = res.cates
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    // 删除分类
    delCate(id) {
      this.isShow = true
      this.delId = id
    },
    close(msg) {
      this.isShow = false
      if (msg === 'cancel') {
        return
      }
      if (msg === 'confirm') {
        delCateById(this.delId)
          .then((res) => {
            if (res.status === 1) {
              this.getAllCates()
            } else {
              throw Error(res.err)
            }
          })
          .catch((err) => {
            throw Error(err)
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 30px;
  line-height: 60px;
}
</style>
