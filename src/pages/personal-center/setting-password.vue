<template>
    <div class="setting-password">
      <mpCell inline
              leftTitle="手机号码"
              :iconNone="false"
              disabled
              v-model="phone"
              placeholder="请输入新登录手机号码">
      </mpCell>
      <mpCell inline
              leftTitle="验证码"
              :iconNone="false"
              v-model="code"
              placeholder="请输入短信验证码">
        <div slot="rightInfo">
          <div class="dx_code" @click="messCodeCall">{{ messCodeInfo }}</div>
        </div>
      </mpCell>

      <div class="sett-block">
        <mpCell inline
                leftTitle="登录密码"
                :iconNone="false"
                v-model="pass"
                placeholder="请设置6-16位数字、字母密码">
        </mpCell>
      </div>


      <fixedBtn name="立即设置" @click="nowSetting"></fixedBtn>

      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  export default {
    name: 'setting-password',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        phone: '18712345678',
        code: '',
        mnus: 120, // 倒计时
        messCodeInfo: '获取验证码',
        pass: '' // 登录密码
      }
    },
    created () {
    },
    methods: {
      /* 倒计时 */
      messCodeCall () {
        if (this.mnus !== 120) return false
        this.messCodeInfo = `${this.mnus}秒`
        clearInterval(this.codeSet)
        this.codeSet = setInterval(() => {
          --this.mnus
          this.messCodeInfo = `${this.mnus}秒`
          if (this.mnus === 0) {
            this.messCodeInfo = '短信验证码'
            this.mnus = 120
            clearInterval(this.codeSet)
            return false
          }
          // this.messCodeCall()
        }, 1000)
      },
      /* 校验 */
      horxcell () {
        if (!this.code) {
          Toast('验证码错误')
          return false
        }
        if (this.pass.length < 6 || this.pass.length > 16) {
          Toast('密码错误')
          return false
        }
        return true
      },
      nowSetting () {
        if (!this.horxcell()) return false
        Toast('设置成功')
        this.$router.replace({
          path: 'index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dx_code{
    color:#EF7C1B;
    font-size: 26rpx;
  }
  .sett-block{
    margin-top: 16rpx;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
