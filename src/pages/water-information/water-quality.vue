<template>
    <div class="water-quality">
      <mpSmallTitle title="杭州游泳馆·默认泳池" :rightNone="false"></mpSmallTitle>
      <van-cell class="cellList"
                @click="goHistorical('1')"
                custom-class="cellList"
                v-for="(item, index) in 3" :key="index">
        <view slot="title" class="left-alarm">
          <view class="van-cell-text">杭州游泳馆·默认泳池</view>
          <view class="alarm-time">
            <image class="icon_time"
                   mode="aspectFit"
                   v-if="CDN_IMG"
                   :src="CDN_IMG+'/mp-admin/water-information/quality.png'"></image>
            最近上报时间：2018-12-15 12:12:28</view>
        </view>
        <view slot="right-icon">
          <div class="right-btn">
            <van-icon
              name="arrow"/>
          </div>
        </view>
      </van-cell>
      <fixedBtn name="上报水质信息" @click="goReportWater"></fixedBtn>
    </div>
</template>

<script>
  import mpSmallTitle from '@/components/mpSmallTitle'
  import fixedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'water-quality',
    components: {
      mpSmallTitle,
      fixedBtn
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG
      }
    },
    mounted () {
      console.log(this.$route.query)
      // this.defaultData()
    },
    methods: {
      /* 初始查询 */
      defaultData () {

      },
      /* 跳转-历史水质 */
      goHistorical (that) {
        this.$router.push({
          path: 'historical-water',
          query: {qualityID: that}
        })
      },
      /* 跳转-上报水质信息 */
      goReportWater () {
        this.$router.push({
          path: 'report-water'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .water-quality{
    margin-bottom: 138rpx;
  }
  .left-alarm{
    width:220px;
    font-size: 13px;
    .van-cell-text{
      font-size: 30rpx;
      color:#333;
    }
  }
  .month ,.address, .alarm-time{
    color:#969696
  }
  .alarm-time{
    width:602rpx;
    color:#999;
    font-size: 28rpx;
    margin-top: 8rpx;
  }
  .icon_time{
    width: 23px;
    height:23px;
    display: inline-block;
    vertical-align: middle;
  }
  .right-btn{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
