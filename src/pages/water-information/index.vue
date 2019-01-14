<template>
    <div class="water-information">
      <div class="fiexdTop">
        <mpDownSelect title="全部门店"
                      @clickRadio="radioCall"
                      :noTime="false"></mpDownSelect>
      </div>
      <div class="alarm-container">
        <van-cell class="cellList" @click="cellList('1')" custom-class="cellList" v-for="(item, index) in 3" :key="index">
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
            <cardWater></cardWater>
            <div class="upTiem">上报时间：2018-12-18 09:21:21</div>
          </div>
          <div class="dialog-foolter">
            <van-button  @click="closeDialog"
                         size="normal"
                         block
                         custom-class="closeBtn">关闭</van-button>
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
  .fiexdTop{
    position: fixed;
    top:0;
    width:100%;
    z-index: 2;
  }
  .alarm-container{
    margin-top:36px;
    margin-bottom: 72px;
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
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;

    }
    .left-alarm{
      width:220px;
      font-size: 13px;
    }
    .month ,.address, .alarm-time{
      color:#969696
    }

  }
  .bottomWrap{
    position: fixed;
    bottom:0px;
    width:100%;
    background: #fff;
    padding:20px 0 30px 0;
    text-align: left;
    border-top:.5px solid #999;

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
      width:80%;
      min-height: 320px;
      border-radius: 10px;
      background: #ffff;
      display: flex;
      flex-direction: column;
    }
    .dialog-title{
      width:100%;
      height:60px;
      line-height: 60px;
      text-align: center;
      /*border-bottom: .5px solid rgba(0,0,0,.1);*/
      font-size: 14px;
      font-weight: bold;
    }
    .dialog-main{
      flex:1;
      min-height:190px;
      font-size: 12px;
    }
    .upTiem{
      text-align: center;
      color:rgba(0,0,0,.3);
      padding: 10px 0 20px;
    }

    .dialog-foolter{
      flex:1;
    }
  }
</style>
<style lang="scss">
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
      width: 120px;
      background: black;
      color:#fff;
      margin: 0 auto;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }
</style>
