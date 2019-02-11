<template>
    <div class="My-duty">
      <div class="titleWrap">
        <div class="namePool">杭州游泳馆</div>
        <div class="time" @click="showPopup">{{ time }}<van-icon name="arrow-down" /></div>
      </div>
      <div class="calendarMain">
        <Calendar
          clean
          :now="false"
          :completion="false"
          @select="select"
          @next="next"
          @prev="prev"
          ref="calendar"
          :events="events"
        />
      </div>

      <mpSmallTitle
        title="当日值班考勤详情"
        :rightNone="false"></mpSmallTitle>
      <div class="todayDatail">
        <ul>
          <li class="duty-list">
            <div class="duty-time">值班时间：9:00～12:00</div>
            <div class="openCard-time">打卡时间：8:50:02</div>
            <image class="posImg"
                   mode="aspectFit"
                   v-if="CDN_IMG"
                   :src="CDN_IMG+'/mp-admin/my-duty/duty01.png'"></image>
          </li>
        </ul>
      </div>


      <!--时间控件-->
      <van-popup
        :show="popupShow"
        position="bottom"
        @close="popupClose">
        <van-datetime-picker
          type="year-month"
          :value="valueVanTime"
          @cancel="cancel"
          @confirm="confirmPicker"/>
      </van-popup>
    </div>
</template>

<script>
  /* eslint-disable no-redeclare */

  import mpDownSelect from '@/components/mpDownSelect'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import Calendar from 'mpvue-calendar'
  import 'mpvue-calendar/src/style.css'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpDownSelect,
      Calendar,
      mpSmallTitle
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        time: '',
        events: {'2019-1-7': [{tm: '123'}], '2019-1-29': '一条很长的明日备注'},
        popupShow: false, // 时间控件
        valueVanTime: '' // 默认时间
      }
    },
    mounted () {
      var date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      var m = m < 10 ? '0' + m : m
      this.time = y + '-' + m
      this.valueVanTime = new Date(this.time).getTime()
    },
    methods: {
      /* 时间弹出层 */
      popupClose () {
        this.popupShow = false
      },
      showPopup () {
        this.popupShow = true
      },
      confirmPicker (data) {
        let dataTime = data.mp.detail
        this.time = this.setDate(new Date(dataTime))
        this.$refs.calendar.renderer(new Date(dataTime).getFullYear(), new Date(dataTime).getMonth() + 1)
        this.popupShow = false
      },
      /* 格式日期 */
      setDate (date, Dtime = '') {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        // var d = Dtime ? Dtime.getDate() : date.getDate()
        var m = m < 10 ? '0' + m : m
        // var d = d < 10 ? '0' + d : d
        return `${y}-${m}`
      },
      cancel () {
        this.popupShow = false
      },
      /* 当前选中日期回调 v1:选中日期，v2: 日期信息 */
      select (v1, v2) {
        console.log(v1[1] !== new Date().getMonth() + 1)
        if (v1[1] !== new Date().getMonth() + 1) return false
        console.log(v1)
        console.log(v2)
      },
      /* 下个月回调 */
      next (year, month, weekIndex) {
        var month = month < 10 ? '0' + month : month
        this.time = `${year}-${month}`
        this.valueVanTime = new Date(this.time).getTime()
      },
      /* 上个月回调 */
      prev (year, month, weekIndex) {
        var month = month < 10 ? '0' + month : month
        this.time = `${year}-${month}`
        this.valueVanTime = new Date(this.time).getTime()
      }
    }
  }
</script>

<style lang="scss" scoped>
.titleWrap{
  padding: 22rpx 30rpx;
  font-size: 30rpx;
  color: #333;
  display: flex;
  justify-content: space-between;
  border-bottom: 1rpx solid #EEEEEE;
  background: #fff;
  .namePool{
  }
  .time{

  }
}
  .todayDatail{
    padding-left: 30rpx;
    background: #fff;
    .duty-list{
      padding: 32rpx 0;
      font-size: 26rpx;
      color:#666;
      position: relative;
      border-bottom: 1rpx solid #F4F6F6;
      overflow: hidden;
      .duty-time{
        padding-bottom: 16rpx;
      }
      .posImg{
        position: absolute;
        right:0;
        bottom:0rpx;
        width:120rpx;
        height:120rpx;
      }
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .calendarMain{
    padding-top: 12rpx;
    padding-bottom: 48rpx;
    background: #fff;
    .calendar-tools{
      display: none;
    }
    .mpvue-calendar ._td.selected ._span{
      /*width:40rpx;
      height:40rpx;*/
      background: #EF7C1B !important;
    }
    .calendarMain .mpvue-calendar ._td.selected ._span{
      background-color: #EF7C1B;
    }
    .mc-dot{
      background: #EF7C1B;
    }
  }

</style>
