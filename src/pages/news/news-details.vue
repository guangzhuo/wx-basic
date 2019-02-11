<template>
    <div class="news-details">
      <div class="newTitle">系统消息</div>
      <div class="newTime">2019-01-12 12:23:21</div>
      <div class="Main">系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知系统通知</div>
    </div>
</template>

<script>
  export default {
    name: 'news-details',
    data () {
      return {}
    },
    mounted () {
      let {id} = this.$route.query
      if (id) this.flyData()
    },
    methods: {
      /* 请求详情 */
      flyData () {}
    }
  }
</script>

<style lang="scss" scoped>
  .news-details{
    padding: 32rpx 30rpx;
    border-top: 1rpx solid #EEE;
  }
.newTitle{
  color:#333;
  font-size: 36rpx;
}
  .newTime{
    color:#999;
    font-size: 28rpx;
    padding: 8rpx 0 32rpx;
  }
  .Main{
    color:#333;
    font-size: 28rpx;
  }
</style>
