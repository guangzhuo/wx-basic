<template>
    <div class="history-todo">
      <van-tabs :active="active" @change="onChange">
        <van-tab :title="tabOne">
          <van-cell>
            <view slot="title">
              <view class="van-cell-text">
                <div class="sysType">系统</div>巡店检查
              </view>
              <view class="smalltext">每日上报水质信息</view>
            </view>
          </van-cell>
        </van-tab>
        <van-tab :title="tabTwo">
          <!--<mpCell leftTitle="巡店检查"
                  placeholder="去杭州游泳馆巡查"
                  :iconNone="false"
                  type="input"></mpCell>-->
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  export default {
    name: 'history-todo',
    components: {
      mpCell
    },
    data () {
      return {
        tabOne: '已完成 (0)',
        tabTwo: '已过期 (0)'
      }
    },
    created () {
    },
    methods: {
      goEdit_todo () {
        this.$router.push({
          path: 'edit-todo',
          query: {}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .van-cell-text{
    font-size: 30rpx;
    color:#333;
    vertical-align: middle;
  }
  .sysType{
    width:60rpx;
    height:30rpx;
    line-height: 30rpx;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color:#fff;
    font-size: 20rpx;
    margin-right: 8rpx;
    background: linear-gradient(to right, #F8B33A, #EF7C1B);
  }
</style>
