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
              <div class="le_title">阿Q · 杭州游泳馆</div>
              <div class="small_title">排班时间：2018-12-15 11:00</div>
              <div class="small_title">打卡时间：2018-12-15 10:12:12</div>
            </div>
          </view>
          <view slot="right-icon">
            <div class="right_Phone" @click="click_phone">
              <div class="time_info colorGreen" v-if="true">正常</div>
              <div class="time_info colorRed" v-else-if="true">迟到</div>
              <div class="time_info colorRed" v-else-if="true">缺勤</div>
              <van-icon name="phone" size="30px" />
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
    .le_title{
      font-size: 14px;
    }
    .small_title{
      font-size: 12px;
      color:rgba(0,0,0,.6)
    }
  }
  .right_Phone{
    .time_info{
      padding-bottom: 9px;
    }
    .colorGreen{
      color:green;
    }
    .colorRed{
      color:red;
    }
  }

</style>
