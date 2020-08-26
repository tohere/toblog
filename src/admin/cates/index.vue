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

import cateMixin from '@/mixin/cateMixin'

import { delCateById } from '@/api/delete'
export default {
  name: 'AdminCates',
  mixins: [cateMixin],
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
    this.getAllCates('all', 'admin')
  },
  methods: {
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
              this.getAllCates('all', 'admin')
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
