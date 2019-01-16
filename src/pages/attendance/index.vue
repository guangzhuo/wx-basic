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
                <images class="leftIcon"></images>阿Q
              </div>
              <div class="two_title">
                <images class="leftIcon"></images>杭州游泳馆
              </div>
              <div class="small_title">排班时间：2018-12-15 11:00</div>
              <div class="small_title">打卡时间：2018-12-15 10:12:12</div>
            </div>
          </view>
          <view slot="right-icon">
            <div class="right_Phone" @click="click_phone">
              <van-icon name="phone" color="#EF7C1B" size="30rpx" />
              <image class="time_info colorGreen" v-if="true">正常</image>
              <image class="time_info colorRed" v-else-if="true">迟到</image>
              <image class="time_info colorRed" v-else-if="true">缺勤</image>
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
      width:23rpx;
      height: 23rpx;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: darkgray;
      margin-right: 9rpx;
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
      width:176rpx;
      height:176rpx;
      background: darkgray;
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
