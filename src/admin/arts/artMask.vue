<template>
  <!-- art遮罩部分 -->
  <div class="art-mask" v-show="show">
    <div class="inner">
      <div class="lists cates">
        <div class="title">
          <span>文章分类</span>
          <!-- <span title="添加新分类" class="iconfont icon-add" @click="addCate"></span> -->
        </div>
        <div class="list cate">
          <span
            @click="select(cate, 'cate')"
            v-for="cate in cates"
            :key="cate.id"
            :class="{ active: cate.active }"
            >{{ cate.title }}</span
          >
        </div>
        <div class="add">
          <input type="text" placeholder="新分类" v-model="cate" />
          <Button type="success" size="small" @click="add('cate')">添加</Button>
        </div>
      </div>
      <div class="lists tags">
        <div class="title">
          <span>文章关键词</span>
          <!-- <span title="添加新关键词" class="iconfont icon-add" @click="add()"></span> -->
        </div>
        <div class="list tag">
          <span
            v-for="tag in tags"
            :key="tag.id"
            :class="{ active: tag.active }"
            @click="select(tag, 'tag')"
            >{{ tag.title }}</span
          >
        </div>
      </div>
      <div class="add">
        <input type="text" placeholder="新关键词" v-model="tag" />
        <Button type="success" size="small" @click="add('tag')">添加</Button>
      </div>
      <div class="btns">
        <Button @click="$emit('cancel')" size="medium">取消</Button>
        <Button @click="$emit('confirm')" size="medium" type="primary"
          >确定</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button'
export default {
  name: 'ArtMask',
  components: {
    Button,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    // 所有分类
    cates: {
      type: Array,
      default() {
        return []
      },
    },
    // 所有关键词
    tags: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      // 要添加的新分类
      cate: '',
      // 要添加的新关键词
      tag: '',
    }
  },
  methods: {
    /**
     * 分类和关键词点击事件
     */
    select(cate, type) {
      this.$emit('select', cate, type)
    },
    add(type) {
      if (type === 'cate') {
        if (!this.cate) {
          this.$toast.show({
            text: '分类名称不能为空！',
            type: 'error'
          })
        } else {
          this.$emit('add', type, this.cate)
          this.cate = ''
        }
      } else {
        if (!this.tag) {
          this.$toast.show({
            text: '关键词不能为空！',
            type: 'error'
          })
        } else {
          this.$emit('add', type, this.tag)
          this.tag = ''
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.art-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  .inner {
    position: absolute;
    min-width: 300px;
    min-height: 200px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .lists {
    font-size: 14px;
    .title {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      font-weight: bold;
    }
    .list {
      span {
        display: inline-block;
        padding: 5px 10px;
        margin: 4px 8px 4px 0;
        white-space: nowrap;
        background-color: #333;
        opacity: 0.5;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        transition-duration: 0s;
        &:hover {
          opacity: 1;
        }
        &.active {
          background-color: #67c23a;
          color: #fff;
          opacity: 1;
        }
      }
    }
  }
  .add {
    display: flex;
    padding: 10px 0;
    input {
      width: 100%;
      border: 1px solid #ccc;
      padding-left: 10px;
      margin-right: 10px;
      border-radius: 5px;
      outline: none;
      font-size: 12px;
    }
    button {
      flex-shrink: 0;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 20px 0 10px 0;
    button {
      margin-left: 10px;
    }
  }
}
</style>
