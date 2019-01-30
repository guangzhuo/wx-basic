<template>
    <div class="attendance">
      <mpDownSelect type="time"
                    radioShow
                    title="全部门店"
                    @clickRadio="clickRadio"
                    @changeTime="changeTime"></mpDownSelect>
      <div class="atten">
        <van-cell>
          <view slot="title">
            <div class="leftMain">
              <div class="le_title">
                <image class="leftIcon"
                        mode="aspectFit"
                        v-if="CDN_IMG"
                        :src="CDN_IMG+'/mp-admin/attendance/atten01.png'"></image>阿Q
              </div>

              <div class="two_title">
                <image class="leftIcon"
                        mode="aspectFit"
                        v-if="CDN_IMG"
                        :src="CDN_IMG+'/mp-admin/attendance/atten02.png'"></image>杭州游泳馆
              </div>
              <div class="small_title">排班时间：2018-12-15 11:00</div>
              <div class="small_title">打卡时间：2018-12-15 10:12:12</div>
            </div>
          </view>
          <view slot="right-icon">
            <div class="right_Phone" @click="click_phone">
              <van-icon name="phone" color="#EF7C1B" size="30px" />
              <div v-if="true">
                <image class="time_info"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/attendance/atten03.png'">正常</image>
              </div>
              <div v-else-if="true">
                <image class="time_info"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/attendance/atten04.png'">迟到</image>
              </div>
              <div v-else-if="true">
                <image class="time_info"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/attendance/atten03.png'">缺勤</image>
              </div>
            </div>
          </view>
        </van-cell>
      </div>
      <fixedRadio :radioData="radioData" @RadioClick="attDraio"></fixedRadio>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import fixedRadio from '@/components/fixed-radio'
  export default {
    name: 'index',
    components: {
      mpDownSelect,
      fixedRadio
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        radioData: [{name: 21, text: '只看迟到/缺勤'}]
      }
    },
    computed: {
      /* cardTime () {
        return function (data) {
          console.log(data)
          return data
        }
      } */
    },
    methods: {
      clickRadio (radio) {
        console.log(radio)
      },
      changeTime (time) {
        console.log(time)
      },
      click_phone () {
        wx.makePhoneCall({
          phoneNumber: '10086' // 仅为示例，并非真实的电话号码
        })
      },
      attDraio (that) {
        console.log(that)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .leftMain{
    .le_title,.two_title{
      font-size: 28rpx;
      color:#333;
      line-height: normal;
      padding-bottom: 16rpx;
    }
    .leftIcon{
      width:23px;
      height: 23px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 9rpx;
      vertical-align: bottom;
    }

    .small_title{
      font-size: 26rpx;
      color:#999;
      /*height: 40rpx;*/
      line-height: normal;
      padding-bottom: 16rpx;
    }
  }
  .right_Phone{
    height: 100%;
    position: relative;
    .time_info{
      position: absolute;
      bottom: -35rpx;
      right:-46rpx;
      width:146rpx;
      height:146rpx;
    }
    .colorGreen{
      color:green;
    }
    .colorRed{
      color:red;
    }
  }

</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .atten{
    margin: 32rpx 0 122rpx;
    .van-cell{
      width: 690rpx;
      height: 276rpx;
      margin: 0 auto;
      border-radius: 20rpx;
      overflow: hidden;
    }
  }
</style>
