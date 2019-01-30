<template>
  <div class="login">
    <div class="bgWhite">
      <div class="logo"></div>
      <van-cell>
        <view slot="title">
          <div class="felxSpce">
            <view class="van-cell-text">
              <image class="mobileIcon"
                     mode="aspectFit"
                     v-if="CDN_IMG"
                     :src="CDN_IMG+'/mp-admin/login/mobile.png'"></image>
            </view>
            <input v-model="phoneVal"
                   type="number"
                   class="ipt"
                   focus
                   placeholder="输入手机号码"  />
          </div>
        </view>
      </van-cell>
      <van-cell v-if="!isCode">
        <view slot="title">
          <div class="felxSpce">
            <view class="van-cell-text">
              <image class="mobileIcon"
                     mode="aspectFit"
                     v-if="CDN_IMG"
                     :src="CDN_IMG + '/mp-admin/login/pass.png'"></image>
            </view>
            <input class="ipt"
                   v-model="passwordVal"
                   v-if="!isPassword"
                   type="password"
                   placeholder="输入登录密码"  />
            <input v-else
                   class="ipt"
                   v-model="passwordVal"
                   type="text"
                   placeholder="输入登录密码"  />
          </div>
          <div class="rightEye" @click="clickPassword">
            <div v-if="!isPassword">
              <image class="eye"
                     mode="aspectFit"
                     v-if="CDN_IMG"
                     :src="CDN_IMG + '/mp-admin/login/close-eys.png'"></image>
            </div>
            <div v-else>
              <image class="eye"
                     mode="aspectFit"
                     v-if="CDN_IMG"
                     :src="CDN_IMG + '/mp-admin/login/eye.png'"></image>
            </div>
          </div>
        </view>
      </van-cell>
      <van-cell v-if="isCode">
        <view slot="title">
          <div class="felxSpce">
            <view class="van-cell-text">
              <image class="mobileIcon"
                     mode="aspectFit"
                     :src="CDN_IMG + '/mp-admin/login/code.png'"></image>
            </view>
            <input class="ipt"
                   type="number"
                   v-model="messCode"
                   :focus="codeFocus"
                   placeholder="输入短信验证码" />
            <div class=" rightEye rightMessCode" @click="clickMessCode">
              {{messCodeInfo}}
            </div>
          </div>
        </view>
      </van-cell>
    </div>
    <div class="yecode">
      <span @click="clickCode"> {{ isInfo }}</span>
    </div>
    <div class="loginWrap">
      <van-button  @click="logo" size="normal" block :class="activeBtn===true?'active':''" custom-class="loginBtn" >登录</van-button>
    </div>
    <!--<mpCell :required="true" v-model="val" @input="inputVal"></mpCell>-->
    <!--<cardWater ></cardWater>-->
    <!--<mpselect title="可定义" time="自定的" type="no" @changeType="typeFun"></mpselect>-->

    <!--<div v-else>请升级微信版本</div>-->
    <van-toast id="van-toast" />
    <div id="theme">
      <van-dialog id="van-dialog" />
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { SET_USERINFO } from '../../store/mutation-types'
  import apis from '@/http/apis'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'

  import mpselect from '@/components/mpDownSelect'
  import cardWater from '@/components/cardWater'
  import mpCell from '@/components/mpCell'

  export default {
    name: 'list',
    components: {
      mpselect,
      cardWater,
      mpCell
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG, // 图片cdn
        textval: '',
        val: '',
        phoneVal: '', // 手机号
        passwordVal: '', // 密码
        messCode: '', // 短信验证码
        mnus: 120, // 倒计时
        messCodeInfo: '短信验证码',
        isInfo: '验证码登录',
        codeSet: null, // 倒计时实例
        isCode: false, // 是否短信
        codeFocus: false,
        isPassword: false,
        activeBtn: true, // 按钮颜色
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        list: ['scope.userInfo', 'scope.userLocation', 'scope.address', 'scope.invoiceTitle', 'scope.werun', 'scope.record', 'scope.writePhotosAlbum', 'scope.camera']
      }
    },
    computed: {

    },
    onLoad () {
      let that = this
    },
    mounted () {
      // console.log(process.env)
      console.log(this.CDN_IMG)
    },
    methods: {
      ...mapMutations({
        'set_userinfo': SET_USERINFO
      }),
      /* 显示密码 */
      clickPassword () {
        this.isPassword = !this.isPassword
      },

      /* 登录按钮 */
      logo () {
        let jsonData = {
          mobile: this.phone,
          password: this.passwordVal
        }
        // if (!this.activeBtn) return false
        /* Dialog.alert({
          message: '验证码错误',
          confirmButtonText: '知道了'
        }).then(() => {
          // on close
        }) */
        /* this.$router.replace({
          path: '../home/index'
        }) */
        wx.reLaunch({
          url: '../home/index'
        })
        // wx.setStorageSync('tonken', res.token)
        /* this.$fly.post(apis.login, {}).then(data => {

    }) */
      },

      /* 短信验证码倒计时 */
      clickMessCode () {
        this.codeFocus = true
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
          // this.clickMessCode()
        }, 1000)
      },

      /* 是否短信 */
      clickCode () {
        this.isCode = !this.isCode
        if (this.isCode) {
          this.isInfo = '密码登录'
        } else {
          this.isInfo = '验证码登录'
        }
      },
      inputClass () {
        this.activeBtn = this.activeBG()
      },
      activeBG () {
        if (!this.isCode) {
          if (this.phoneVal && this.passwordVal) {
            return true
          } else {
            return false
          }
        } else {
          if (this.phoneVal && this.messCode) {
            return true
          } else {
            return false
          }
        }
      },

      // 授权方法
      checkauth (str) {
        wx.getSetting({
          success: (response) => {
            if (!response.authSetting[str]) {
              wx.authorize({
                scope: str,
                success: () => {
                  console.log('授权成功')
                }
              })
            }
          }
        })
      },
      getuserBtn (data) {
        console.log(data)
        console.log(data.target.userInfo)
        if (data.target.userInfo) {
          let userinfo = data.target.userInfo
          this.set_userinfo(userinfo)
          wx.switchTab({
            url: '/pages/index'
          })
        }
        /* this.$router.push({
          path: '/pages/index'
        }) */
      }
    }
  }
</script>

<style lang="scss" scoped>

.login{
    position: absolute;
    width:100%;
    height:100%;
    /*background: #999;*/
    .bgWhite{
      background: #fff;
      /*padding:30px 0 0;*/
    }
    .ipt{
      font-size: 13px;
    }
  }
.logo{
  width:60px;
  height:60px;
  border: .5px solid #999;
  background: gray;
  margin: 30px auto;
  border-radius: 50%;
}
  .rightEye{
    position: absolute;
    z-index: 2;
    right:40rpx;
    bottom:30rpx;
    text-align: right;
    .eye{
      width:30px;
      height:25px;
    }
  }
  .yecode{
    color:#666;
    font-size: 12px;
    padding: 20px 10px 30px;
    text-align: right;
  }

  .rightMessCode{
    font-size: 12px;
  }

  .felxSpce{
    display: flex;
    justify-content: space-between;
    /*padding:10px 0;*/
    .van-cell-text{
      width:80px;
      vertical-align: middle;
      text-align: center;
    }
    .mobileIcon{
      width:25px;
      height:35px;
      vertical-align: middle;
    }
    .ipt{
      width: 90%;
      vertical-align: middle;
      font-size: 15px;
      padding:12rpx 0;
    }
  }
</style>
<style lang="scss">
  page{
    background: #fff;
  }
  .loginWrap{
    text-align: center;
    .loginBtn{
      background: #BDC0BA;
      font-size: 18px;
      width:345px;
      height:45px;
      display: inline-block;
      margin: 0 auto;
      color:#fff;
      border: none;
      border-radius: 6px;
    }
    .active{
      .loginBtn{
        background: #EF7C1B;
      }
    }
  }

</style>
