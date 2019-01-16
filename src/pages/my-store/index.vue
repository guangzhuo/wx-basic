<template>
    <div class="my-store">
      <div class="cellblk"
           v-for="(item, index) in 2"
           :key="index">
        <van-swipe-cell
          :right-width="97" >
          <van-cell-group>
            <van-cell class="storeCell" @click="cellclick">
              <view slot="title">
                <div class="main">
                  <image class="storeImg"></image>
                  <div class="storeright">
                    <div class="storeTitle">杭州游泳馆
                    </div>
                    <dvi class="storeName">
                      <image class="smllIcon"></image>田庚云</dvi>
                  </div>
                </div>
              </view>
            </van-cell>
          </van-cell-group>
          <view slot="right">
            <view class="delete" @click="closeDelete('12')">
              删除
            </view>
          </view>
        </van-swipe-cell>
      </div>
      <div class="bottomWrap">
        <navigator url="add-stores?goAdd=newStore">
          <fxiedBtn name="添加门店"></fxiedBtn>
        </navigator>
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fxiedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpCell,
      fxiedBtn
    },
    data () {
      return {
        placeholder: '啊Q'
      }
    },
    created () {
    },
    methods: {
      cellclick () {
        this.$router.push({
          path: 'stores-info',
          query: {pooID: 1}
        })
      },
      closeDelete (event) {
        console.log(event)
      },
      dataTime (time) {
        console.log(time)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cellblk{
    margin-bottom: 16rpx;
  }
  .main{
    .storeImg{
      width:213rpx;
      height:160rpx;
      border-radius: 12rpx;
      vertical-align: middle;
      display: inline-block;
      background: #F4F6F6;
      margin-right: 20rpx;
    }
    .storeright{
      vertical-align: top;
      display: inline-block;
      width:65%;
      .storeTitle{
        color:#333;
        font-size: 30rpx;
        margin-bottom: 8rpx;
      }
      .storeName{
        color:#999;
        font-size: 28rpx;
        .smllIcon{
          width:19rpx;
          height:24rpx;
          margin-right: 9rpx;
        }
      }
    }
  }
.delete {
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  font-size: 36rpx;
  width: 194rpx;
  height: 223rpx;
  background: #F95E5F;
}
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .storeCell{
    .van-cell{
      padding: 32rpx 30rpx;
    }
  }

</style>
