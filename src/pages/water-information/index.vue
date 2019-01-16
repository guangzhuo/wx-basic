<template>
    <div class="water-information">
      <div class="fiexdTop">
        <mpDownSelect title="全部门店"
                      @clickRadio="radioCall"
                      :noTime="false"></mpDownSelect>
      </div>
      <div v-if="cardData.length!==0" class="alarm-container">
        <van-cell class="cellList" @click="cellList('1')" custom-class="cellList" v-for="(item, index) in cardData" :key="index">
          <view slot="title" class="left-alarm">
            <view class="van-cell-text">杭州游泳馆·默认泳池</view>
            <view class="alarm-time">最近上报时间：2018-12-15 12:12:28</view>
          </view>
          <view slot="right-icon">
            <div class="right-btn">
              <van-button  @click.stop="showDialog"
                           size="mini"
                           round
                           custom-class="alarmBtn">最新水质</van-button>
            </div>
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
      <div class="bottomWrap">
        <van-radio-group :value="thatRadio" @change="onChange">
          <van-radio class="rowS" name="55555">今日未上报</van-radio>
        </van-radio-group>
      </div>
      <!--弹窗-->
      <div class="dialogBg" v-if="infoDialog">
        <div class="dialogCon">
          <div class="dialog-title">杭州游泳馆·默认泳池</div>
          <div class="dialog-main">
            <!--<cardWater></cardWater>-->
            <ul class="mini_card">
              <li class="list_mini"
                  :key="index"
                  v-for="(item, index) in 3">
              <div class="ti">
                <image class="ti_icon"></image>
                水温
              </div>
              <div class="ti_info">偏高</div>
              <div class="number">27.8<span class="du">℃</span></div>
              <div class="bz_info">标准：22-26℃</div>
            </li>
            </ul>
            <div class="upTiem">上报时间：2018-12-18 09:21:21</div>
          </div>
          <div class="dialog-foolter">
            <van-icon @click="closeDialog" name="cross" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import cardWater from '@/components/cardWater'
  import apis from '@/http/apis'

  export default {
    name: 'index',
    components: {
      mpDownSelect,
      cardWater
    },
    data () {
      return {
        cardData: [1, 2, 3, 4, 5, 6],
        infoDialog: false,
        thatRadio: ''
      }
    },
    created () {
    },
    methods: {
      radioCall (data) {
        console.log(data)
      },
      /* 接警选择 */
      onChange (that) {
        let {detail} = that.mp
        this.thatRadio = detail
        console.log(detail)
        // this.$fly.get
      },
      /* dialog-显示 */
      showDialog () {
        this.infoDialog = true
        // this.$fly.get()
      },
      /* dialog-关闭 */
      closeDialog () {
        this.infoDialog = false
      },
      /* 跳转 */
      cellList (that) {
        this.$router.push({
          path: 'water-quality',
          query: {cellID: that}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .water-information{
    margin: 123rpx 0rpx;
  }
  .fiexdTop{
    position: fixed;
    top:0;
    width:100%;
    z-index: 2;
  }
  .alarm-container{
    margin:0 30rpx;
    .noInfo{
      position: absolute;
      right:-35px;
      top:-35px;
      width:70px;
      height:70px;
      line-height: 126px;
      background: #969696;
      text-align: center;
      font-size: 10px;
      color:red;
      transform: rotate3d(0,0,1,45deg);
    }
    .right-btn{
      /*display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;*/

    }
    .left-alarm{
      width:220px;
      font-size: 30rpx;
      .van-cell-text{
        color:#333;
      }
      .alarm-time{
        width:490rpx;
        font-size: 28rpx;
        color:#999
      }

    }
    .month ,.address, .alarm-time{
      color:#969696
    }

  }
  .bottomWrap{
    position: fixed;
    bottom:0px;
    height:90rpx;
    width:100%;
    background: #fff;
    text-align: left;
    display: flex;
    justify-content: left;
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
  /*弹窗*/
  .dialogBg{
    position: fixed;
    z-index: 99;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.3);
    .dialogCon{
      position: absolute;
      bottom:0;
      width:100%;
      height: 532rpx;
      border-radius: 10px;
      background: #ffff;
    }
    .dialog-title{
      width:100%;
      height:60px;
      line-height: 60px;
      text-align: center;
      border-bottom: .5px solid #EEE;
      font-size: 36rpx;
      color:#333;
      font-weight: 400;
    }
    .dialog-main{
      flex:1;
      min-height:190px;
      font-size: 12px;
      .mini_card{
        padding: 40rpx 30rpx;
      }
      .list_mini{
        width:216rpx;
        height:240rpx;
        margin-right: 14rpx;
        background: #FEBC57;
        display: inline-block;
        color:#fff;
        padding:21rpx;
        border-radius: 12rpx;
        .ti_icon{
          width:12rpx;
          height:24rpx;
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 28rpx;
        }
        .ti{
          vertical-align: middle;
          font-size: 24rpx;
        }
        .ti_info{
          width:60rpx;
          height:30rpx;
          line-height: 30rpx;
          text-align: center;
          background: #fff;
          color: #FFAC2B;
          font-size: 20rpx;
          margin-bottom: 4rpx;

        }
        .number{
          font-size: 60rpx;
          margin-bottom: 1rpx;
        }
        .du{
          font-size:30rpx;
        }
        .bz_info{
          font-size:24rpx;
        }
      }
      .list_mini:nth-last-child(1){
        magrin-right:0 !important;
      }
    }
    .upTiem{
      text-align: center;
      color:#666;
      font-size: 28rpx;
      padding: 10px 0 20px;
    }

    .dialog-foolter{
      position: absolute;
      right:32rpx;
      top:32rpx;
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .right-btn{
    .alarmBtn{
      background: #fff;
      color:#EF7C1B;
      border:0;
    }
  }
  .cellList{
    position: relative;
    overflow: hidden;
    border-radius: 20rpx;
    margin-bottom: 32rpx;
  }
  .rowS{
    text-align: left;
    margin-left: 20px;
    display: inline-block;
  }
  .dialog-foolter{
    .closeBtn{
      width: 120px;
      background: black;
      color:#fff;
      margin: 0 auto;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }
</style>
