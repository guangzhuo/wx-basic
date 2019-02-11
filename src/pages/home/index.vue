<template>
  <div class="APP_INDEX">
    <ul class="entran-ul">
      <li class="entran-list"
          v-for="(item, index) in entrData"
          :class="(index+1)%4 ==0?'marginNone': ''"
          :key="index">
        <navigator
          :url="item.pageUrl"
          hover-class="none">
          <image class="imgIcon"
                 mode="aspectFit"
                 v-if="CDN_IMG"
                 :src="item.iconUrl">
            <!--<div class="crilered"></div>-->
          </image>
          <div class="imgTitle">{{ item.name }}</div>
        </navigator>
      </li>
      <li class="entran-list marginNone">
        <navigator
          hover-class="none"
          url="../all-functions/index">
        <image class="imgIcon"
               mode="aspectFit"
               v-if="CDN_IMG"
               :src="CDN_IMG+'/mp-admin/home/more.png'">
          <!--<div class="crilered"></div>-->
        </image>
        <div class="imgTitle">更多功能</div>
        </navigator>
      </li>
    </ul>
    <div class="notify-info">
      <van-cell :border="false" @click="goNews">
        <view slot="title">
          <image class="notifyIcon"
                 mode="aspectFit"
                 v-if="CDN_IMG"
                 :src="CDN_IMG+'/mp-admin/home/new.png'">
          </image>
          <div class="Cell-conttainer">
            <div class="textft van-cell-text">
              <span class="corBor">预警</span>
              <span class="maxEllp">杭州游泳馆有1条预警信息</span>
              <span class="bardinfo">12秒</span>
            </div>
            <div class="textft">
              <span class="corBor">预警</span>
              <span class="maxEllp">阿Q刚上岗打卡</span>
              <span class="bardinfo">12秒</span>
            </div>
          </div>
        </view>
        <div slot="right-icon" class="rightBlock">
          <div class="lineCenter">
            <van-icon
              name="arrow"
            />
          </div>
        </div>
      </van-cell>
    </div>
    <mpSmallTitle
      :swiperInfo="true"
      :swipeIndex='swipeIndex'
      :border="false"
      :swiperAll="swiperAll"
      @click-right="click_right"></mpSmallTitle>
    <mpSwiper @onchange="touchChange"
              :swiperData="swiperData"></mpSwiper>
  </div>
</template>

<script>
import card from '@/components/card'
import mpSwiper from '@/components/mpSwiper'
import mpSmallTitle from '@/components/mpSmallTitle'
import { mapState, mapMutations } from 'vuex'
import { SET_OPEN_ID } from '../../store/mutation-types'
import apis from '@/http/apis'
export default {
  data () {
    return {
      CDN_IMG: this.CDN_IMG,
      entrData: [
        {url: '/pages/my-store/index', name: '我的门店'},
        {url: '/pages/alarm-record/index', name: '警报记录'},
        {url: '/pages/water-information/index', name: '水质信息'},
        {url: '/pages/to-do-list/index', name: '待办事项'},
        {url: '/pages/attendance/index', name: '值班考勤'},
        {url: '/pages/duty-schedule/index', name: '值班计划'},
        {url: '/pages/site-setup/index', name: '场次设置'},
        {url: '/pages/ticketing/index', name: '票务管理'},
        {url: '/pages/management/index', name: '经营信息'},
        {url: '/pages/financial-statistics/index', name: '财务统计'},
        {url: '/pages/lifeguard-management/index', name: '救生员管理'},
        {url: '/pages/personal-center/index', name: '个人中心'},
        {url: '/pages/my-duty/index', name: '我的值班'}
      ], // 管理入口列表
      swiperData: [1],
      swipeIndex: 0, // 当前轮播索引
      swiperAll: 0 // 总轮播数
    }
  },
  computed: {
    /* ...mapState([
      'openId'
    ]) */
  },
  mounted () {
    let that = this
    wx.getStorage({
      key: 'menuData',
      success (res) {
        console.log(res.data)
      },
      fail (res) {
        that.menuData()
      }
    })
  },
  onLoad () {
    if (this.swiperData.length > 0) {
      this.swiperAll = this.swiperData.length
      this.swipeIndex = 1
    }
    console.log(this.$store)
  },
  methods: {
    /* ...mapMutations({
      setOpenId: 'SET_OPEN_ID'
    }), */
    /* 请求菜单接口 */
    menuData () {
      this.$fly.post(apis.menu, { 'uid': '1' }).then(data => {
        console.log(data)
        if (data.result.code === 200) {
          this.entrData = data.result.data
        }
      })
    },
    click_right () {
      this.$router.push({
        path: '../my-store/index'
      })
    },
    touchChange (thatIndex) {
      // console.log(thatIndex)
      this.swipeIndex = thatIndex + 1
    },
    /* 去消息页 */
    goNews () {
      this.$router.push({
        path: '/pages/news/index'
      })
    }
  },

  components: {
    card,
    mpSwiper,
    mpSmallTitle
  }
}
</script>

<style lang="scss" scoped>


.entran-ul{
  display: flex;
  padding:40rpx;
  /*justify-content: space-between;*/
  flex-wrap: wrap;

  .entran-list{
    width:65px;
    height:65px;
    text-align: center;
    margin-right:50rpx;
    margin-bottom:50rpx;

    .crilered{
      position: absolute;
      width:6px;
      height:6px;
      right:-3px;
      top:-3px;
      background: red;
      border-radius: 50%;
    }
    .imgTitle{
      font-size: 12px;
      color:#666;
    }
    .imgIcon{
      width:36px;
      height:36px;
      display: inline-block;
      position: relative;
      margin: 7px 0 5px 0;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .marginNone{
    margin:0
  }
}
.notify-info{
  border-top: 8px solid #F4F6F6;
  border-bottom: 8px solid #F4F6F6;
}
.notifyIcon{
  display: inline-block;
  width: 34px;
  height:40px;
  vertical-align: middle;
}
.Cell-conttainer{
  display: inline-block;
  vertical-align: middle;
  margin-left:10px;
  .corBor{
    border: .5px solid #EF7C1B;
    color:#EF7C1B;
    margin: 0px 3px;
  }
  .maxEllp{
    display: inline-block;
    max-width:280rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
  }
}
  .textft{
    font-size: 12px;
  }
  .bardinfo{
    padding-left: 6px;
    color:#999;
  }
  .rightBlock{
    display: inline-block;
    .lineCenter{
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .van-cell__right-icon{
    position: absolute;
    right:16px;
    bottom:20px;
  }


</style>
<style lang="scss">
  .APP_INDEX{
  }
  .navigator-hover {
    color: blue;
  }
  /** 自定义其他点击态样式类 **/
  .other-navigator-hover {
    color: red;
  }
</style>
