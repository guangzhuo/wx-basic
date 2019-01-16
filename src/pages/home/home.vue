<template>
  <div class="APP_INDEX">
    <mpDownSelect title="泳池"
                  @clickRadio="selectPool"
                  :noTime="false"></mpDownSelect>
    <ul class="entran-ul">
      <li class="entran-list"
          v-for="(item, index) in entrData"
          :class="(index+1)%4 ==0?'marginNone': ''"
          :key="index">
        <navigator
          :url="item.url"
          hover-class="none">
          <div class="imgIcon">
            <div class="crilered"></div>
          </div>
          <div class="imgTitle">{{ item.name }}</div>
        </navigator>
      </li>
    </ul>
    <div class="notify-info">
      <van-cell :border="false">
        <view slot="title">
          <div class="notifyIcon">
          </div>
          <div class="Cell-conttainer">
            <view class="textft van-cell-text">
              <span class="corBor">预警</span> 杭州游泳馆有1条预警信息 <span class="bardinfo">12秒</span>
            </view>
            <div class="textft">
              <span class="corBor">预警</span> 阿Q刚上岗打卡<span class="bardinfo">12秒</span>
            </div>
          </div>
          <van-icon
            slot="right-icon"
            name="arrow"
            class="van-cell__right-icon"/>
        </view>
      </van-cell>
    </div>
    <mpSmallTitle
      :swiperInfo="true"
      title="门店泳池"
      :swipeIndex='swipeIndex'
      :border="false"
      :swiperAll="swiperAll"
      @click-right="click_right"></mpSmallTitle>

    <mpSwiper @onchange="touchChange"
              swipeHome
              :swiperData="swiperData"></mpSwiper>


  </div>
</template>

<script>
  import card from '@/components/card'
  import mpSwiper from '@/components/mpSwiper'
  import mpDownSelect from '@/components/mpDownSelect'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import { mapState, mapMutations } from 'vuex'
  import { SET_OPEN_ID } from '../../store/mutation-types'

  export default {
    data () {
      return {
        entrData: [
          {url: 'my-store/index', name: '我的门店'},
          {url: 'alarm-record/index', name: '警报记录'},
          {url: 'water-information/index', name: '水质信息'},
          {url: 'to-do-list/index', name: '待办事项'},
          {url: 'attendance/index', name: '值班考勤'},
          {url: 'duty-schedule/index', name: '值班计划'},
          {url: 'site-setup/index', name: '场次设置'}
        ], // 管理入口列表
        swiperData: [1, 2],
        swipeIndex: 0, // 当前轮播索引
        swiperAll: 0 // 总轮播数
      }
    },
    computed: {
      ...mapState([
        'openId'
      ])
    },
    created () {

    },
    onLoad () {
      if (this.swiperData.length > 0) {
        this.swiperAll = this.swiperData.length
        this.swipeIndex = 1
      }
    },
    methods: {
      ...mapMutations({
        setOpenId: 'SET_OPEN_ID'
      }),
      selectPool (q) {
        console.log(q)
      },
      click_right () {
        this.$router.push({
          path: 'my-store/index'
        })
      },
      touchChange (thatIndex) {
        // console.log(thatIndex)
        this.swipeIndex = thatIndex + 1
      }
    },

    components: {
      card,
      mpSwiper,
      mpSmallTitle,
      mpDownSelect
    }
  }
</script>

<style lang="scss" scoped>


  .entran-ul{
    display: flex;
    padding: 20px 20px 0 20px;
    /*justify-content: space-between;*/
    flex-wrap: wrap;

    .entran-list{
      width:65px;
      height:65px;
      text-align: center;
      margin-right:25px;
      margin-bottom:25px;

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
        background: darkgray;
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
    background: gray;
    vertical-align: middle;
  }
  .Cell-conttainer{
    display: inline-block;
    vertical-align: middle;
    margin-left:10px;
    .corBor{
      border: .5px solid #EF7C1B;
      color:#EF7C1B;
      padding: 0px 3px;
    }
  }
  .textft{
    font-size: 12px;
  }
  .bardinfo{
    padding-left: 6px;
    color:#999;
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
