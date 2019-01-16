<template>
    <div class="toDoList">
      <mpDownSelect type="time"
                    @clickRadio="clickRadio"
                    @changeTime="changeTime"></mpDownSelect>
      <van-cell @click.stop="goEditToDo">
        <view slot="title">
          <view class="van-cell-text">
            <div class="sysType">系统</div>巡店检查
          </view>
          <view class="smalltext">每日上报水质信息</view>
        </view>
        <view slot="right-icon">
          <div class="rightRadio" @click.stop="">
            <van-radio-group :value="thatVal" @change.stop="changeRadio">
              <van-radio name="133" ></van-radio>
            </van-radio-group>
          </div>
        </view>
      </van-cell>
      <div class="historyBtn" @click="historyBtn">
        <span class="vertical">历史待办</span>
        <van-icon class="arrowIcon" name="arrow" />
      </div>
      <fixedBtn @click="addBtn"
                name="添加待办"></fixedBtn>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import fixedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpDownSelect,
      fixedBtn
    },
    data () {
      return {
        clickFlag: false,
        thatVal: ''
      }
    },
    onUnload () {
      console.log(getCurrentPages())
      this.$router.push({
        path: '../home/index'
      })
      /* wx.reLaunch({
        url: '../home/index'
      }) */
      /* wx.redirectTo({
        url: 'index'
      }) */
      // this.gotoHomePage()
    },
    mounted () {

    },
    methods: {
      gotoHomePage () { // 自定义页面跳转方法
      /* wx.redirectTo({
        url: 'index'
      }) */
        this.$router.push({
          path: 'index'
        })
        wx.reLaunch({
          url: 'index'
        })
        if (this.clickFlag) {
        } else {
          this.clickFlag = true
        }
      },
      clickRadio (radio) {
        console.log(radio)
      },
      changeTime (time) {
        console.log(time)
      },
      changeRadio (name) {
        console.log(name)
        let detail = name.mp.detail
        this.thatVal = detail
        return false
      },
      goEditToDo () {
        this.$router.push({
          path: 'edit-todo',
          query: {}
        })
      },
      historyBtn () {
        this.$router.push({
          path: 'history-todo',
          query: {}
        })
      },
      addBtn () {
        this.$router.push({
          path: 'add-todo'
        })
        /* wx.redirectTo({
          url: 'add-todo'
        }) */
      }
    }
  }
</script>

<style lang="scss" scoped>
.toDoList{
  margin-bottom: 138rpx;
}
.van-cell-text{
  font-size: 30rpx;
  color:#333;
  vertical-align: middle;
}
.sysType{
  width:60rpx;
  height:30rpx;
  line-height: 30rpx;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color:#fff;
  font-size: 20rpx;
  margin-right: 8rpx;
  background: linear-gradient(to right, #F8B33A, #EF7C1B);
}
  .smalltext{
    font-size: 13px;
    padding-top:3px;
    color:#969696;
  }
  .rightRadio{
    display: flex;
    height:100%;
    flex-direction: column;
    justify-content: center;
  }

  .historyBtn{
    font-size: 28rpx;
    color:#999;
    text-align: center;
    .vertical{
      vertical-align: middle;
    }
    .arrowIcon{
      vertical-align: middle;
      margin-top:2rpx;
    }
  }
</style>
