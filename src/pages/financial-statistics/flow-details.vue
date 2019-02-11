<template>
    <div class="flow-details">
      <mpDownSelect title="全部门店"
                    type="sx"
                    :btnArr2="btnArr2"
                    sx_title="全部类型"
                    @clickRadio="clickRadio"
                    @screenVal="screenVal"></mpDownSelect>
      <van-cell>
        <view slot="title">
          <image class="notifyIcon"
                 mode="aspectFit"
                 v-if="CDN_IMG"
                 :src="CDN_IMG+'/mp-admin/financial-statistics/big01.png'">
          </image>
          <div class="Cell-conttainer">
            <div class="van-cell-text">
              晚场-平日-普通票
            </div>
            <div class="textft">
              2018-12-15 18:12:00
            </div>
          </div>
        </view>
        <div slot="right-icon" class="rightBlock">
          <div class="lineCenter">
            <div class="monery">+25</div>
          </div>
        </div>
      </van-cell>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  export default {
    name: 'flow-details',
    components: {
      mpDownSelect
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        btnArr2: [
          {
            title: '收入方式',
            btnList: [
              {
                btnName: '不限',
                id: '10'
              },
              {
                btnName: '微信',
                id: '11'
              },
              {
                btnName: '支付宝',
                id: '12'
              },
              {
                btnName: '现金',
                id: '13'
              },
              {
                btnName: '银行卡',
                id: '14'
              },
              {
                btnName: '其他',
                id: '15'
              }
            ]
          }
        ]
      }
    },
    created () {
    },
    methods: {
      /* 全部门店-返回函数 */
      clickRadio (data) {
        console.log(data)
      },
      /* 筛选回调 */
      screenVal (data) {
        console.log(JSON.parse(data))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notifyIcon{
    display: inline-block;
    width: 71rpx;
    height:71rpx;
    border-radius: 50%;
    vertical-align: middle;
  }
  .Cell-conttainer{
    display: inline-block;
    vertical-align: middle;
    margin-left:12rpx;
    .corBor{
      border: .5px solid #EF7C1B;
      color:#EF7C1B;
      padding: 0px 3px;
    }
    .van-cell-text{
      font-size: 30rpx;
      color:#333;
    }
    .textft{
      color:#999;
      font-size: 26rpx;
    }
  }
  .rightBlock{
    display: inline-block;
    .lineCenter{
      display: flex;
      align-items: center;
      height: 100%;
      .monery{
        color:#EF7C1B;
        font-weight:500;
      }
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
