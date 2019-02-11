<template>
    <div class="financial-statistics">
      <mpDownSelect title="全部门店" :noTime="false" @clickRadio="clickRadio"></mpDownSelect>
      <van-cell>
        <div slot="title">
          <div class="timeWrap">
            <div class="startTime" @click="showPopup('start')">
              {{ startTime }}<van-icon size="24rpx" name="arrow-down" /></div>
            <div class="centerTime">至</div>
            <div class="enTime" @click="showPopup('end')">
              {{ endTime }}<van-icon size="24rpx" name="arrow-down" /></div>
          </div>
        </div>
        <div slot="right-icon">
          <div class="searchBtn" @click="search">查询</div>
        </div>
      </van-cell>
      <div class="look-block">
          <div class="moneryTitle">
            <div class="allmon">
              总售票金额（元）
              <div class="toggleIcon" @click="toggle">
                <div v-if="iscard">
                  <image class="imgIcon"
                         mode="aspectFit"
                         v-if="CDN_IMG"
                         :src="CDN_IMG+'/mp-admin/financial-statistics/finan01.png'">
                  </image>
                </div>
                <div v-else>
                  <image class="imgIcon"
                         mode="aspectFit"
                         v-if="CDN_IMG"
                         :src="CDN_IMG+'/mp-admin/financial-statistics/finan02.png'">
                  </image>
                </div>

              </div>
            </div>
            <navigator url="flow-details"
                       hover-class="none">
              <div class="look-detail">查看明细</div>
            </navigator>
          </div>
          <div class="monery">
            12,100.00
          </div>
          <div class="between" v-if="iscard">
            <div class="income">
              <div class="htt-inc">网络售票收入</div>
              <div class="htt-monry">11,000.00</div>
            </div>
            <div class="clumline"></div>
            <div class="income">
              <div class="htt-inc">现场售票收入</div>
              <div class="htt-monry">11,000.00</div>
            </div>
          </div>
        <!--切换-->
          <div class="iconList" v-if="!iscard">
            <ul>
              <li class="income-list">
                <image class="iconImg"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/financial-statistics/mini01.png'"></image>
                <div class="incom-nmae">微信收入</div>
                <div class="icon-monery">11,000.00</div>
              </li>
              <li class="income-list">
                <image class="iconImg"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/financial-statistics/mini02.png'"></image>
                <div class="incom-nmae">支付宝收入</div>
                <div class="icon-monery">11,000.00</div>
              </li>
              <li class="income-list">
                <image class="iconImg"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/financial-statistics/mini03.png'"></image>
                <div class="incom-nmae">现金收入</div>
                <div class="icon-monery">11,000.00</div>
              </li>
              <li class="income-list">
                <image class="iconImg"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/financial-statistics/mini04.png'"></image>
                <div class="incom-nmae">银行卡</div>
                <div class="icon-monery">11,000.00</div>
              </li>
              <li class="income-list">
                <image class="iconImg"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/financial-statistics/mini05.png'"></image>
                <div class="incom-nmae">其他</div>
                <div class="icon-monery">11,000.00</div>
              </li>
            </ul>
          </div>
      </div>

      <!--时间控件-->
      <van-popup
        :show="popupShow"
        position="bottom"
        @close="popupClose">
        <van-datetime-picker
          type="date"
          @cancel="cancel"
          @confirm="confirmPicker"/>
      </van-popup>
    </div>
</template>

<script>
  /* eslint-disable no-redeclare */

  import mpDownSelect from '@/components/mpDownSelect'
  export default {
    name: 'index',
    components: {
      mpDownSelect
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        popupShow: false,
        this_popupShow: '',
        startTime: '',
        endTime: '',
        iscard: true // 切换不同显示
      }
    },
    onLoad () {
      var date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth()
      var firstDay = new Date(y, m, 1)
      var lastDay = new Date(y, m + 1, 0)
      this.startTime = this.setDate(date, firstDay)
      this.endTime = this.setDate(date, lastDay)
    },
    mounted () {
    },
    methods: {
      /* 全部门店-返回函数 */
      clickRadio (data) {
        console.log(data)
      },
      /* 查询 */
      search () {
        // startTime: '',
        //   endTime: '',
        console.log('search')
      },
      /* 时间弹出层 */
      popupClose () {
        console.log('1111')
        this.popupShow = false
      },
      showPopup (type) {
        this.this_popupShow = type
        this.popupShow = true
      },
      confirmPicker (data) {
        let dataTime = data.mp.detail
        if (this.this_popupShow === 'start') {
          this.startTime = this.setDate(new Date(dataTime))
        } else {
          this.endTime = this.setDate(new Date(dataTime))
        }
        this.popupShow = false
      },
      cancel () {
        this.popupShow = false
      },

      /* 切换显示 */
      toggle () {
        this.iscard = !this.iscard
        console.log(this.iscard)
      },

      /* 格式日期 */
      setDate (date, Dtime = '') {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = Dtime ? Dtime.getDate() : date.getDate()
        var m = m < 10 ? '0' + m : m
        var d = d < 10 ? '0' + d : d
        return y + '-' + m + '-' + d
      }
    }
  }
</script>

<style lang="scss" scoped>
  .timeWrap{
    font-size: 30rpx;
    display: flex;
    justify-content: space-between;
    width: 450rpx;
    .centerTime{
      color:#666
    }
    .startTime, .enTime{
      color:#333
    }

  }
  .searchBtn{
    width:88rpx;
    height:46rpx;
    line-height: 46rpx;
    font-size: 24rpx;
    color: #EF7C1B;
    text-align: center;
    border-radius:8px;
    border:2rpx solid rgba(245,176,118,1);
  }
  .look-block{
    margin-top: 16rpx;
    background: #fff;
    .moneryTitle{
      display: flex;
      justify-content: space-between;
      padding: 32rpx 30rpx  8rpx;
      font-size: 28rpx;
      .allmon{
        color:#999
      }
      .toggleIcon{
        width: 38rpx;
        height: 38rpx;
        display: inline-block;
        vertical-align: middle;
        .imgIcon{
          width: 38rpx;
          height: 38rpx;
        }
      }
      .look-detail{
        color:#EF7C1B
      }
    }
    .monery{
      color:#333;
      font-size: 48rpx;
      padding: 0 30rpx 32rpx;
    }
    .between{
      display: flex;
      justify-content: space-between;
      border-top: .5rpx solid #EEE;
      .clumline{
        height: 163rpx;
        width:1rpx;
        background: #EEE;
      }
      .income{
        flex: 1;
        height: 163rpx;
        padding:32rpx 30rpx;
        .htt-inc{
          color:#999;
          font-size: 28rpx;
          padding-bottom: 8rpx;
        }
        .htt-monry{
          color:#333;
          font-size: 32rpx;
        }
      }
    }
    .iconList{
      border-top: 1rpx solid #EEE;
      padding: 32rpx 30rpx;
      .income-list{
        padding-bottom: 16rpx;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        .iconImg{
          width: 32rpx;
          height:32rpx;
          vertical-align: middle;
        }
        .incom-nmae{
          width: 184rpx;
          padding:0 20rpx 0 22rpx;
          color:#999;
          vertical-align: middle;
        }
        .icon-monery{
          color:#333;
          vertical-align: middle;
        }
      }
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
