<template>
    <div class="news">
      <mpselect title="全部类型"
                :selArr="selArr"
                :noTime="false"
                @clickRadio="clickRadio">
        <div slot="rightMy">
          <div class="all_read">全部已读</div>
        </div>
      </mpselect>
      <div class="cellblk"
           v-for="(item, index) in 2"
           @click="goDetail(item)"
           :key="index">
        <van-swipe-cell
          :right-width="97" >
          <van-cell-group>
            <van-cell class="storeCell" @click="cellclick">
              <view slot="title">
                <div class="main">
                  <image class="storeImg"
                         mode="aspectFit"
                         v-if="CDN_IMG"
                         :src="CDN_IMG+'/mp-admin/news/new01.png'"></image>
                  <div class="storeright">
                    <div class="storeTitle">
                      <span class="left_ft">报警消息</span>
                      <span class="right_ft">2019-01-12 12:12:23</span>
                    </div>
                    <div class="storeName">
                      杭州游泳馆·训练泳池有1条警报信息警报信息警报信息警报信息
                    </div>
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



      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import apis from '@/http/apis'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  import mpselect from '@/components/mpDownSelect'
  import mpCell from '@/components/mpCell'
  export default {
    name: 'index',
    components: {
      mpselect,
      mpCell
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        selArr: [
          {title: '警报消息', id: '1'},
          {title: '考勤通知', id: '2'},
          {title: '系统通知', id: '3'}
        ]
      }
    },
    created () {
    },
    methods: {
      /* 类型回调 */
      clickRadio (data) {
        console.log(data)
      },
      /* 删除消息 */
      closeDelete (data) {
        console.log(data)
      },
      /* 去详情 */
      goDetail (item) {
        this.$router.push({
          path: 'news-details',
          query: {id: item.id}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.all_read{
  color:#EF7C1B;
  font-size: 28rpx;
  padding-right: 30rpx;
}

 .cellblk{
   .storeImg{
     width:72rpx;
     height:72rpx;
     border-radius: 50%;
     display: inline-block;
     vertical-align: middle;
   }
   .storeright{
     margin-left:16rpx;
     display: inline-block;
     vertical-align: middle;
   }
   .storeTitle{
     color:#333;
     font-size: 30rpx;
     display: flex;
     justify-content: space-between;
     .right_ft{
       color:#999;
       font-size: 24rpx;
     }
   }
   .storeName{
     color:#999;
     font-size: 28rpx;
     width:602rpx;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
   }
   .delete{
     width: 194rpx;
     height:160rpx;
     line-height: 160rpx;
     text-align: center;
     color:#fff;
     background: #F95E5F;
   }
 }
</style>
