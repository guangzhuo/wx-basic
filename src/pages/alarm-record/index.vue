<template>
    <div class="Alarm-Record">
      <div class="fiexdTop">
        <mpDownSelect :title="allPool"
                      @clickRadio="radioCall"
                      @changeTime="changeTime"
                      type="time" ></mpDownSelect>
      </div>
      <div  class="alarm-container">
        <div v-if="cardData.length!==0"
             class="cardList"
             custom-class="cellList" v-for="(item, index) in cardData"
             :key="index">
          <van-cell class="cellList">
            <view class="noInfo">
              <div class="no_call">
                <image class="iconImg"></image>未接警
              </div>
              <div class="detail_info"  @click.stop="showDialog">
                <image class="iconImg"></image>接警情况
              </div>
            </view>
            <view slot="title" class="left-alarm">
              <view class="van-cell-text">杭州游泳馆·默认泳池</view>
              <view class="month">
                <image class="iconImg"></image>
                五月
              </view>
              <view class="address">
                <image class="iconImg"></image>
                警报位置: 1号从网关
              </view>
              <view class="alarm-time">
                <image class="iconImg"></image>
                警报时间：2018-12-15 12:12:28
              </view>
            </view>
          </van-cell>
        </div>
        <div v-if="cardData.length===0" class="noCard">
          <div class="mainCenter">
            <image class="noBG"></image>
            <div class="noalarm">
              暂无报警记录
            </div>
          </div>
        </div>
      </div>
      <div class="bottomWrap">
        <van-radio-group :value="AlarmRadio" @change="onChange">
          <van-radio class="rowS" name="qqqq">只看已接警</van-radio>
          <van-radio class="rowS" name="3333">只看未接警</van-radio>
        </van-radio-group>
      </div>
      <!--弹窗-->
      <div class="dialogBg" v-if="infoDialog">
        <div class="dialogCon">
          <div class="dialog-title">接警情况</div>
          <div class="dialog-main">
            <ul class="item-ul">
              <li class="item-li">
                <span class="leftinfo">接警人</span>
                <span class="rightinfo">Jim</span>
              </li>
              <li class="item-li">
                <span class="leftinfo">接警时间</span>
                <span class="rightinfo">2018-12-15 12:21:21</span>
              </li>
              <li class="item-li">
                <span class="leftinfo">接警用时</span>
                <span class="rightinfo">00:00:34</span>
              </li>
            </ul>
          </div>
          <div class="dialog-foolter">
            <div @click="closeDialog"
                  class="closeBtn">关闭</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpDownSelect
    },
    data () {
      return {
        cardData: [1, 2, 3, 4, 5],
        allPool: '全部门店全部门店全部门店全部门店',
        AlarmRadio: '',
        infoDialog: false
      }
    },
    created () {
    },
    methods: {
      /* 门店选择 */
      radioCall (obj) {
        console.log(obj)
        this.allPool = obj.title
      },
      /* 时间选择 */
      changeTime (time) {
        console.log(time)
      },
      /* 接警选择 */
      onChange (that) {
        let {detail} = that.mp
        this.AlarmRadio = detail
        console.log(detail)
        // this.$fly.get
      },
      /* 接警情况-显示 */
      showDialog () {
        this.infoDialog = true
        // this.$fly.get()
      },
      /* 接警情况-关闭 */
      closeDialog () {
        this.infoDialog = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Alarm-Record{
    margin: 123rpx 0 123rpx;
  }
  .iconImg{
    width:20rpx;
    height:20rpx;
    background: red;
    display: inline-block;
    margin-right: 19rpx;
  }
.fiexdTop{
  position: fixed;
  top:0;
  width:100%;
  z-index: 2;
}
.alarm-container{
  margin-top:92rpx;
  margin-bottom: 90rpx;
  .cardList{
    width:690rpx;
    min-height:284rpx;
    margin: 0 auto 32rpx;
    border-radius: 20rpx;
  }
  .noInfo{
    position: absolute;
    right:30rpx;
    text-align: center;
    font-size: 26rpx;
    .no_call{
      color:#F95E5F;
    }
    .detail_info{
      color:#EF7C1B
    }
  }
  .right-btn{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;

  }
  .left-alarm{
    width:220px;
    font-size: 13px;
    .van-cell-text{
      width: 500rpx;
      font-size: 30rpx;
      color:#333;
      padding-bottom: 16rpx;
    }
  }
  .month, .address, .alarm-time{
    color:#999;
    width: 600rpx;
    font-size: 28rpx;
    padding-bottom: 16rpx;
  }
  .alarm-time{
    padding-bottom:0;
  }
  .noCard{
    display: flex;
    justify-content: center;
    align-items: center;
    .mainCenter{
      .noBG{
        display: block;
        width: 300rpx;
        height:300rpx;
        background: gray;
        margin-top:290rpx;
      }
      .noalarm{
        display: block;
        text-align: center;
        margin-top:20rpx;
        color:#999;
        font-size: 24rpx;
      }
    }
  }

}
.bottomWrap{
  position: fixed;
  bottom:0px;
  width:100%;
  display:flex;
  justify-content:left;
  background: #fff;
  height: 90rpx;
  text-align: left;
}

  /*弹窗*/
  .dialogBg{
    position: fixed;
    z-index: 99;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.3);
    .dialogCon{
      width:560rpx;
      height: 432rpx;
      border-radius: 20rpx;
      background: #ffff;
      display: flex;
      flex-direction: column;
    }
    .dialog-title{
      width:100%;
      color:#333;
      font-size: 36rpx;
      text-align: center;
      padding: 40rpx 0 24rpx;
      font-weight: bold;
    }
    .dialog-main{
      flex:1;
      /*min-height:190px;*/
      font-size: 12px;
    }
    .item-ul{
      padding:0 24rpx 40rpx 24rpx;
    }
    .item-li{
      margin-bottom: 10px;
    }
    .leftinfo, .rightinfo {
      display: inline-block;
      font-size: 28rpx;
      color:#666;
    }
    .leftinfo{
      color:rgba(0,0,0,.4);
      width:60px;
      padding-right: 10px;
    }
    .dialog-foolter{
      flex:1;
      .closeBtn{
        border-top: 1rpx solid #EEE;
        width:100%;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        background: #fff;
        font-size: 36rpx;
        color:#EF7C1B;
      }
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .right-btn{
    .alarmBtn{
      background: black;
      color:#fff;
    }
  }
  .cellList{
    position: relative;
    overflow: hidden;
  }
  .rowS{
    text-align: left;
    margin-left: 20px;
    display: inline-block;
  }
  .dialog-foolter{
    .closeBtn{
      width: 100px;
      background: black;
      color:#fff;
      margin: 0 auto;
      border-radius: 10px;
    }
  }
  .cardList{
    .van-cell{
      padding: 32rpx 30rpx;
    }
  }
</style>
