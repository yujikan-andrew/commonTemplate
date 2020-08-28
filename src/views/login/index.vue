<template>
  <div class="login-warp">
    <div class="warp-margin warp-padding">
      <p class="p-title">用户登录</p>

      <p class="p-line-warp">
        <span class="p-label">用户名：</span>
        <input class="p-content" type="text" name="account" v-model="username" />
      </p>
      <p class="p-line-warp">
        <span class="p-label">密  码：</span>
        <input class="p-content" type="password" name="account" v-model="password" />
      </p>
      <p class="p-line-warp">
        <el-button class="p-label" @click="onclickLogin">登录</el-button>
        <el-button class="p-label" @click="onclickLogOut">登出</el-button>
      </p>
        
    </div>

    <v-loading v-if="loading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      msg: '请求中……',
      password: '',
      username: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'screenWidth',
      'screenHeight'
    ])
  },
  mounted() {

  },
  methods: {
    async onclickLogin() {
      this.loading = true
      this.$store.dispatch('login', {username: this.username, password: this.password})
    },
    async onclickLogOut() {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="less" scoped>
.login-warp {
  .warp-margin {
    input {
      display: block;
      .height(32px);
      outline: 1px solid @gray;
      .borderRadius();
    }
  }
}
</style>
