<template>
    <div class="personal-center">
      <div class="my-wrap">
        <div class="pad-mal">
          <image class="myPhone"></image>
          <div class="centerRight">
            <div class="my-name">
              <span class="left-ft">白起</span>
              <span class="right-ft" @click="edit_info">
                编辑资料<van-icon name="arrow" />
              </span>
            </div>
            <div class="my-leg">总馆主</div>
          </div>
        </div>
      </div>
      <div class="my-block">
        <van-cell
          title="更换登录手机账号"
          class="phone"
          value="18712345678"
          :clickable="false"
          url="replacement-mobile"
          is-link
        />
        <van-cell
          title="设置登录密码"
          value="建议使用安全强度高的密码"
          :clickable="false"
          url="setting-password"
          is-link
        />
      </div>


      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  export default {
    name: 'index',
    components: {
      mpCell
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      edit_info () {
        this.$router.push({
          path: 'personal-data'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.my-wrap{
  width:100%;
  height:204rpx;
  background:linear-gradient(to bottom, #F8B33A, #EF7C1B);
  .pad-mal{
    padding: 42rpx 30rpx;
  }
  .myPhone{
    width: 120rpx;
    height:120rpx;
    box-sizing: border-box;
    border: 2rpx solid white;
    border-radius: 50%;
    display: inline-block;
    background: #fff;
    vertical-align: middle;
  }
  .centerRight{
    display: inline-block;
    vertical-align: middle;
    width:550rpx;
    margin-left: 20rpx;
    .my-name{
      color:#ffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width:100%;
      .left-ft{
        font-size:36rpx;
        font-weight:400;
      }
      .right-ft{
        font-size:24rpx;
        font-weight:400;
      }
    }
    .my-leg{
      padding-top: 8rpx;
      font-size:28rpx;
      color:#fff;
    }
  }
}
  .my-block{
    margin-top: 16rpx;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .my-block{
    .van-cell__title{
      flex:0.9;
      font-size: 30rpx;
    }
    .van-cell__value{
      font-size: 26rpx;
    }
    .phone{
      .van-cell__value{
        font-size: 30rpx;
        color:#666;
      }
    }
  }
</style>
