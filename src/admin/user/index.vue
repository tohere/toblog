<template>
  <!-- 后台用户信息页面 -->
  <div class="user">
    <h1>用户信息</h1>
    <div class="userimg">
      <img :src="userInfo.userimg" alt="" />
      <div>
        点击更换头像
        <input type="file" />
      </div>
    </div>
    <div class="list username">
      <label for="user">
        <span>用户名: </span>
        <input type="text" id="user" placeholder="请输入新用户名" />
      </label>
    </div>
    <div class="list pwd">
      <label for="pwd">
        <span>密码: </span>
        <input type="password" id="pwd" placeholder="请输入新密码" />
      </label>
    </div>
    <div class="save">
      <button>保存</button>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/get'
export default {
  name: 'AdminUser',
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    this.getInfos()
  },
  methods: {
    getInfos() {
      getUserInfo()
        .then((res) => {
          if (res.status === 1) {
            this.userInfo = res.data.userInfo
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
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 30px;
  line-height: 60px;
}
.user {
  padding: 10px;
  .list {
    width: 100%;
    height: 60px;
    label {
      display: flex;
      align-items: center;
      span {
        width: 70px;
        flex-shrink: 0;
      }
    }
    &.pwd {
      letter-spacing: 7px;
    }
    input {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
      text-indent: 10px;
      font-size: 12px;
    }
  }
}
.userimg {
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  div {
    width: 100px;
    height: 20px;
  }
}
.save {
  width: 100%;
  text-align: center;
  line-height: 100px;
  button {
    width: 160px;
    height: 40px;
    background-color: #62ad3c;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
  }
}
</style>
