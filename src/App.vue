<script>
export default {
  created () {
    let that = this
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style lang="scss">
  @import "@/../static/vant/common/index.wxss";
  view{
    box-sizing: border-box !important;
  }
  page {
    margin:0;
    box-sizing: border-box;
    #theme{
      .van-dialog__button{
        .dialog-index--van-dialog__confirm{
          color:#EF7C1B !important;
        }
      }
      .dialog-index--van-dialog__confirm{
        color:#EF7C1B !important;
      }
    }
    #red{
      #van-dialog{
        .dialog-index--van-dialog__confirm{
          color:#EE1E1F !important;
        }
      }
    }

    /*tab*/
    .van-tabs__line{
      background: #EF7C1B;
    }
    .van-tab--active{
      color:#EF7C1B;
    }
    .van-radio__icon--checked{
      color:#EF7C1B !important;
    }
    .van-checkbox__icon--checked{
      background:#EF7C1B !important;
      border: 1rpx solid #EF7C1B;
    }
    .van-icon{
      vertical-align: middle;
    }
    .van-cell{
      padding: 32rpx 30rpx;
    }
  }


</style>
