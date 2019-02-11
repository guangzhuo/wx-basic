<template>
    <div class="new-timetick">
      <mpCell inline
              leftTitle="票务名称"
              :iconName="false"
              placeholder="请输入票务名称"></mpCell>
      <mpCell inline
              leftTitle="基础价格 ¥"
              :iconName="false"
              placeholder="请输入价格"></mpCell>
      <div class="yc-info">
        <div class="yc-title">收费标准</div>
        <div class="add-yc-wrap">
          <mpCell v-for="(item, index) in 2"
                  :key="index"
                  type="input"
                  disabled
                  border
                  leftTitle="工作日 14:00-21:00"
                  @click="goCharging('qqq')"
                  placeholder="¥15/时">
            <van-icon size="20px" name="arrow" />
          </mpCell>
          <navigator hover-class="none" url="charging-time">
            <div class="addYc">
              <image class="crileIcon"
                     mode="aspectFit"
                     v-if="CDN_IMG"
                     :src="CDN_IMG+'/mp-admin/common/add.png'"></image>添加收费时间段
            </div>
          </navigator>
        </div>
      </div>
      <div class="cg">
        <mpCell inline
                @click="goSite"
                :slot_main="false"
                placeholder="请选择适用场馆"
                leftTitle="适用场馆">
          <div slot="slotMain">
            <div v-if="siteArr.length===0"
                 class="placeholderinfo">请选择适用场馆</div>
            <div v-if="siteArr.length!==0"
                 class="sitelistWrap">
              <view v-for="(item, index) in siteArr"
                    class="sitelist"
                    :key="index">{{ item }}</view>
            </div>
          </div>
        </mpCell>
      </div>
      <fixedBtn name="下一步" @click="goNext"></fixedBtn>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  export default {
    name: 'new-timetick',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        selectids: [], // 选择的场馆id
        siteArr: [] // 场所名称
      }
    },
    mounted () {
      let {selectDuty} = this.$route.query
      if (selectDuty) {
        let arrDuty = JSON.parse(selectDuty)
        this.selectids = arrDuty.map(data => data.id)
        this.siteArr = []
        arrDuty.filter((data, index) => {
          this.siteArr.push(data.name)
        })
      }
    },
    methods: {
      goSite () {
        wx.navigateTo({
          url: '../site-setup/apply-site?back=/pages/ticketing/new-timetick'
        })
      },
      goCharging () {
        wx.navigateTo({
          url: 'charging-time'
        })
      },
      goNext () {
        wx.navigateTo({
          url: 'perfecting-business?refer=newTimeTick'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .new-timetick{
    padding-bottom: 148rpx;
  }
  .yc-info{
    margin-top: 16rpx;
    .yc-title{
      font-size: 30rpx;
      color:#333;
      padding: 32rpx 0 32rpx 30rpx;
      background: #fff;
      border-bottom: 1rpx solid #EEEEEE;
    }
  }
  .add-yc-wrap{
    background: #fff;
    padding-top:10px;
    padding-bottom: 30rpx;
    .crileIcon{
      width:30rpx;
      height:30rpx;
      border-radius: 50%;
      margin-right: 6rpx;
    }
  }
  .cg{
    margin-top: 16rpx;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .add-yc-wrap{
    .addYc{
      width:80%;
      text-align: center;
      font-size: 30rpx;
      color:#333;
      padding-top: 34rpx;
      margin: 0 auto;
      color:#EF7C1B;
    }
  }
  .placeholderinfo{
    color:#666;
    padding-top: 4rpx;
  }
  .sitelistWrap{
    color:#666666;
    .sitelist{
      width:270rpx;
      padding-top: 4rpx;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
