<template>
  <!-- 后台用户信息页面 -->
  <div class="user">
    <h1>用户信息</h1>
    <div class="userimg">
      <img :src="userInfo.userimg" alt="" />
      <div>
        <input
          ref="changeImg"
          accept="image/*"
          type="file"
          class="change-img"
          @change="changeImg"
        />
        <span @click="uploadHeadImg" class="click-change">点击更换头像</span>
      </div>
    </div>
    <div class="list username">
      <label for="user">
        <span>用户名: </span>
        <input
          v-model="userInfo.name"
          type="text"
          id="user"
          placeholder="请输入新用户名"
        />
      </label>
    </div>
    <div class="list pwd">
      <label for="pwd">
        <span>密码: </span>
        <input
          v-model="userInfo.password"
          type="password"
          id="pwd"
          placeholder="请输入新密码"
        />
      </label>
    </div>
    <div class="list desc">
      <label for="desc">
        <span>个人描述: </span>
        <input
          v-model="userInfo.desc"
          type="text"
          id="desc"
          placeholder="请输入新描述"
        />
      </label>
    </div>
    <div class="save">
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getUserInfo } from '@/api/get'
import { upImg } from '@/api/post'
import { update } from '@/api/put'
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
      getUserInfo('admin')
        .then((res) => {
          if (res.status === 1) {
            this.userInfo = res.data.userInfo
            this.isMOd = true
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    uploadHeadImg() {
      this.$refs.changeImg.click()
    },
    // 更改头像
    changeImg(e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      const formdata = new FormData()
      formdata.append('image', file)
      upImg(formdata)
        .then((res) => {
          if (res.status === 1) {
            this.userInfo.userimg = res.url
          } else {
            throw Error('图片上传出错')
          }
        })
        .catch(() => {
          throw Error('图片上传出错')
        })
    },
    // 保存用户信息
    save() {
      const info = this.userInfo
      if (!info.password || !info.name || !info.userimg || !info.desc) {
        this.$toast.show({
          text: '请填写所有选项！',
          type: 'error',
        })
        return
      }
      update({
        id: info.id,
        username: info.name,
        password: info.password,
        desc: info.desc,
        url: info.userimg,
      }).then((res) => {
        if (res.status === 1) {
          this.$toast.show({
            text: '信息修改成功',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          throw Error('更改出错')
        }
      }).catch(() => {
        throw Error('更改出错')
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
        text-align: right;
        font-size: 14px;
        margin-right: 5px;
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
    height: 20px;
  }
  .change-img {
    display: none;
  }
  .click-change {
    position: relative;
    top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    padding: 5px 10px;
    background-color: #eee;
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
