<template>
  <!-- 后台login页面 -->
  <div class="login-box flex-center">
    <div class="login">
      <h1>登录</h1>
      <div class="inps">
        <p>
          <label for="user">
            <span>用户名：</span>
            <input
              type="text"
              id="user"
              placeholder="请输入用户名"
              v-model="username"
              @keyup.enter="loginClick"
            />
          </label>
        </p>
        <p>
          <label for="pwd">
            <span>密码：</span>
            <input
              type="password"
              id="pwd"
              placeholder="请输入密码"
              v-model="password"
              @keyup.enter="loginClick"
            />
          </label>
        </p>
      </div>
      <Button class="login-btn" type="primary" @click="loginClick">登录</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button'

import { login } from '@/api/post'

export default {
  name: 'Login',
  components: {
    Button,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    loginClick () {
      if (!this.username) {
        this.$toast.show({
          text: '用户名不能为空！',
          type: 'error'
        })
        return
      } else if (!this.password) {
        this.$toast.show({
          text: '密码不能为空！',
          type: 'error'
        })
        return
      }
      
      login(this.username, this.password).then(res => {
        if (res.status === 1) {
          this.$toast.show({
            text: '登录成功！',
            type: 'success'
          })
          this.$cookie.set('token', res.token)
          localStorage.setItem('isLogin', 'true')
          setTimeout(() => {
            this.$router.push('/admin')
          }, 1000);
        } else if (res.status === -1) {
          this.$toast.show({
            text: '用户名或密码错误！',
            type: 'error'
          })
          localStorage.removeItem('isLogin')
        } else {
          localStorage.removeItem('isLogin')
          this.$toast.show({
            text: '登录失败！',
            type: 'error'
          })
        }
      }).catch(() => {
        localStorage.removeItem('isLogin')
        this.$toast.show({
            text: '登录失败！',
            type: 'error'
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .login {
    width: 350px;
    height: 300px;
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .inps {
      width: 100%;
      label {
        display: flex;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        span {
          width: 60px;
          flex-shrink: 0;
          float: left;
          text-align: right;
        }
      }
      input {
        width: 100%;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-indent: 10px;
      }
    }
    h1 {
      text-align: center;
    }
    .login-btn {
      width: 200px;
      margin: 10px 0;
    }
  }
}
</style>
