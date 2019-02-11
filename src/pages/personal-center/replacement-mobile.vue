<template>
    <div class="Replacement-mobile">
      <mpCell inline
              leftTitle="登录密码"
              :iconNone="false"
              v-model="pass"
              placeholder="请输入当前登录密码"
      ></mpCell>
      <div class="replace-block">
        <mpCell inline
                leftTitle="手机号码"
                :iconNone="false"
                v-model="phone"
                placeholder="请输入新登录手机号码"
        ></mpCell>
        <mpCell inline
                leftTitle="验证码"
                :iconNone="false"
                v-model="code"
                placeholder="请输入短信验证码"
        >
          <div slot="rightInfo">
            <div class="dx_code" @click="messCodeCall">{{ messCodeInfo }}</div>
          </div>
        </mpCell>
      </div>


      <fixedBtn name="立即更换" @click="noReplace"></fixedBtn>
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
    name: 'replacement-mobile',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        pass: '', // 登录密码
        phone: '', // 手机号码
        code: '', // 验证码
        mnus: 120, // 倒计时
        messCodeInfo: '获取验证码',
        codeSet: null
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
      /* 立即更换 */
      noReplace () {
        /* pass: '', // 登录密码
        phone: '', // 手机号码
        code: '', // 验证码 */
      }
    }
  }
</script>

<style lang="scss" scoped>
.replace-block{
  margin-top: 16rpx;
}
  .dx_code{
    color:#EF7C1B;
    font-size: 26rpx;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
