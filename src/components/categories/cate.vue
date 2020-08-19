<template>
  <!-- 分类组件 -->
  <ul class="cate" v-if="cates.length > 0">
    <li v-for="cate in cates" :key="cate.id">
      <!-- <router-link :to="{ path: '/categories/' + cate.title }"></router-link> -->
      <a href="javascript:;" @click="clickC(cate)">{{ cate.title }}</a>
      <span>{{ cate.num }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Cate',
  props: {
    cates: {
      type: Array,
      default() {
        return []
      },
    },
  },
  mounted() {},
  data() {
    return {
    }
  },
  methods: {
    clickC (cate) {
      this.$emit('clickC', cate)
      this.$router.push({
        path: '/categories/' + cate.id + '/' + cate.title 
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  padding-left: 10px;
  list-style-type: none;
  list-style-position: outside;
  li {
    line-height: 32px;  
    margin: 0 10px;
    a {
      text-decoration: none;
      border-bottom: 1px solid #000;
      font-size: 16px;
      color: #333;
      opacity: .8;
      transition-duration: 0s;
      &:hover {
        opacity: 1;
      }
    }
    span {
      color: #999;
      margin-left: 4px;
      &::before {
        content: '(';
      }
      &::after {
        content: ')';
      }
    }
    ul {
      list-style-type: circle;
      ul {
        list-style-type: square;
      }
    }
  }
}
</style>
