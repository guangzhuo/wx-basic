<template>
  <div class="lifeguard-information">
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

    <fixedBtn leftBtn
              name="确认添加"
              @leftclick="leftclick"
              @click="okAdd"></fixedBtn>


    <van-toast id="van-toast" />
    <div :id="colorType==='delete'?'red':'theme'">
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
    name: 'lifeguard-information',
    components: {
      mpCell,
      fixedBtn,
      radioBtn,
      mpSmallTitle
    },
    data () {
      return {
        name: 'name', // 姓名
        mobile: '15267034368', // 手机号
        multiArray: [
          {name: '救生员负责人', id: '1'},
          {name: '救生员主管', id: '2'},
          {name: '救生员', id: '3'}
        ],
        WX_name: '1515151515', // 微信号码
        siteArr: [123], // 直属上级
        sexThat: '1', // 男，女
        colorType: 'save' // 确认弹窗字体颜色
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
      /* 删除 */
      leftclick () {
        this.colorType = 'delete'
        Dialog.confirm({
          confirmButtonText: '确认删除',
          message: '删除后，该人员的下属成员将挂靠到其直属上级，确认删除？'
        }).then(() => {
          // 确认删除后 请求
          this.$router.replace({
            path: 'index'
          })
        }).catch(() => {
          /* 取消 */
        })
      },
      /* 确认添加按钮 */
      okAdd () {
        this.colorType = 'save'
        Dialog.confirm({
          confirmButtonText: '立即前往',
          message: '该人员为救生员负责人，请先到我的门店取消该人员管理的门店'
        }).then(() => {
          // 确认删除后 请求
          this.$router.push({
            path: '/pages/my-store/stores-info'
          })
        }).catch(() => {
          /* 取消 */
        })
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
