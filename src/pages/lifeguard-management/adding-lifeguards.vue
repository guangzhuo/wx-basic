<template>
    <div class="adding-lifeguards">
      <mpCell inline
              leftTitle="姓名"
              v-model="name"
              placeholder="请输入姓名"
              :iconNone="false"
              ></mpCell>
      <mpCell inline
              leftTitle="手机号码"
              v-model="mobile"
              placeholder="请输入手机号码"
              :iconNone="false"
      ></mpCell>
      <van-cell class="paddingCum">
        <view slot="title">
          <div class="guarTitle">身份类型</div>
          <radioBtn :btnData="multiArray"
                     @selectBtn="selectBtn"></radioBtn>
        </view>
      </van-cell>
      <mpCell inline
              @click="goSite"
              :slot_main="false"
              leftTitle="直属上级">
        <div slot="slotMain">
          <div v-if="siteArr.length===0"
               class="placeholderinfo">请选择直属上级</div>
          <div v-if="siteArr.length!==0"
               class="sitelistWrap">
            <view v-for="(item, index) in siteArr"
                  class="sitelist"
                  :key="index">{{ item }}</view>
          </div>
        </div>
      </mpCell>
      <mpSmallTitle title="选填" :rightNone="false"></mpSmallTitle>
      <mpCell inline
              leftTitle="微信号码"
              v-model="WX_name"
              placeholder="请输入微信号"
              :iconNone="false">
        <div slot="rightInfo">
          <div class="rightText">同手机号码</div>
        </div>
      </mpCell>
      <mpCell inline
              :slot_main="false"
              :iconNone="false"
              leftTitle="性别">
        <div slot="slotMain">
          <div class="Gender" >
            <div class="nderList"
                 :class="sexThat==='1'?'active': ''"
                 @click.stop="sexCall('1')">男</div>
            <div class="nderList"
                 :class="sexThat==='2'?'active': ''"
                 @click.stop="sexCall('2')">女</div>
          </div>
        </div>
      </mpCell>

      <fixedBtn name="确认添加" @click="okAdd"></fixedBtn>


      <van-toast id="van-toast" />
      <div id="red">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import radioBtn from '@/components/radio-btn'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  export default {
    name: 'adding-lifeguards',
    components: {
      mpCell,
      fixedBtn,
      radioBtn,
      mpSmallTitle
    },
    data () {
      return {
        name: '', // 姓名
        mobile: '', // 手机号
        multiArray: [
          {name: '救生员负责人', id: '1'},
          {name: '救生员主管', id: '2'},
          {name: '救生员', id: '3'}
        ],
        identity: '', // 身份类型
        WX_name: '', // 微信号码
        siteArr: [], // 直属上级
        sexThat: '' // 男，女
      }
    },
    mounted () {
      let {title, id} = this.$route.query
      console.log(this.$route.query)
      if (title) {
        // let arrDuty = JSON.parse(selectDuty)
        this.selectids = id
        this.siteArr = []
        this.siteArr.push(title)
        /* arrDuty.filter((data, index) => {
          this.siteArr.push(data.name)
        }) */
      }
    },
    methods: {
      /* 身份类型回调 */
      selectBtn (data) {
        console.log(data)
        this.identity = data.id
      },
      goSite () {
        this.$router.push({
          path: 'superior',
          query: {back: '/pages/lifeguard-management/adding-lifeguards'}
        })
      },
      /* 男 女 */
      sexCall (that) {
        console.log(that)
        this.sexThat = that
      },
      /* 确认添加按钮 */
      okAdd () {
        /* name: '', // 姓名
        mobile: '', // 手机号
        WX_name: '', // 微信号码
        siteArr: [], // 直属上级
        identity
        sexThat: '' // 男，女 */
        Toast('保存成功')
        setTimeout(() => {
          this.$router.replace({
            path: 'index'
          })
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
.guarTitle{
  padding-bottom: 20rpx;
}
.placeholderinfo{
  color:#666;
  padding-top: 4rpx;
}
.sitelistWrap{
  color:#666666;
  .sitelist{
    width:270rpx;
    padding-top: 4rpx;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
  .rightText{
    font-size: 26rpx;
    color:#999;
  }
  .Gender{
    .nderList{
      width:88rpx;
      height:40rpx;
      text-align: center;
      line-height: 40rpx;
      font-size: 22rpx;
      color:#333;
      background:rgba(242,242,242,1);
      border-radius:35px;
      display: inline-block;
      margin-right: 20rpx;
    }
    .active{
      background:rgba(253,241,232,1);
      color:#EF7C1B;
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
