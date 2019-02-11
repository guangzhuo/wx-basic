<template>
    <div class="add-ticket">
      <div class="ticket-center">
        <image class="tickImg"
               mode="aspectFit"
               v-if="CDN_IMG"
               :src="CDN_IMG+'/mp-admin/ticketing/ticke01.png'"></image>
        <div class="tickInfo">按场次定额收费</div>
        <div class="btn" @click="goScene">按场次收费</div>
      </div>
      <div class="ticket-center">
        <image class="tickImg"
               mode="aspectFit"
               v-if="CDN_IMG"
               :src="CDN_IMG+'/mp-admin/ticketing/ticke02.png'"></image>
        <div class="tickInfo">根据游泳时长灵活计时收费</div>
        <div class="btn" @click="goNewTick">按场计时收费</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'add-ticket',
    data () {
      return {
        CDN_IMG: this.CDN_IMG
      }
    },
    created () {
    },
    methods: {
      /* 新场次 */
      goScene () {
        wx.navigateTo({
          url: 'add-scene-ticket'
        })
      },
      goNewTick () {
        wx.navigateTo({
          url: 'new-timetick'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.add-ticket{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;
    .ticket-center{
      flex:1;
      height: 50%;
      text-align: center;
      padding-top: 150rpx;
    }
    .tickImg{
      text-align: center;
      width:130rpx;
      height:130rpx;
      display: block;
      margin: 0 auto;
    }
    .tickInfo{
      font-size: 30rpx;
      color:#666;
      padding: 25rpx 0 32rpx 0;
    }
  .btn{
    width:240rpx;
    height:70rpx;
    display: inline-block;
    line-height: 70rpx;
    text-align: center;
    background:rgba(239,124,27,1);
    border-radius:8px;
    color:#FFF;
    font-size: 28rpx;
  }
}
</style>
<style lang="scss">
  page{
    background: #fff;
    height:100%;
  }
</style>
