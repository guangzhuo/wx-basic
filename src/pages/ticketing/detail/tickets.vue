<template>
    <div class="Tickets">
      <div class="bgt">
        <div class="bigTitle">
          <span class="lt">基本信息</span>
          <span class="rt" @click="edit">编辑</span>
        </div>
        <!--普通票-->
        <ul v-if="refer==='scenTick'">
          <li class="detail_list">
            <div class="address">票务名称</div>
            <div class="ress_info">晚场-平日-普通</div>
          </li>
          <li class="detail_list">
            <div class="address moneyJg">价 格</div>
            <div class="ress_info">¥25</div>
          </li>
          <li class="detail_list">
            <div class="address">适用场馆</div>
            <div class="ress_info">杭州游泳馆</div>
          </li>
          <li class="detail_list">
            <div class="address">适用场次</div>
            <div class="ress_info">晚场 工作日 19:00-21:00</div>
          </li>
        </ul>
        <!--计时票-->
        <ul v-if="refer==='newTimeTick'">
          <li class="detail_list">
            <div class="address">票务名称</div>
            <div class="ress_info">通场计时票</div>
          </li>
          <li class="detail_list">
            <div class="address">基础价格</div>
            <div class="ress_info">¥25</div>
          </li>
          <li class="detail_list">
            <div class="address">适用场馆</div>
            <div class="ress_info">杭州游泳馆</div>
          </li>
          <li class="detail_list">
            <div class="address">收费标准</div>
            <div class="ress_info">
              <div>工作日 14:00-21:00 ¥15/时</div>
              <div>周末 14:00-21:00 ¥25/时</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bgt">
        <div class="bigTitle">
          <span class="lt">详细信息</span>
          <span class="rt" @click="goDetail">编辑</span>
        </div>
        <ul>
          <li class="detail_list">
            <div class="address">详细内容</div>
            <div class="ress_info">全年恒温大泳池，服务优质环境优美</div>
          </li>
          <li class="detail_list">
            <div class="address">购买须知</div>
            <div class="ress_info">必须穿戴泳衣泳帽，儿童需要在家长监护下进入深水区，注意安全</div>
          </li>
          <li class="detail_list">
            <div class="address">其他标签</div>
            <div class="ress_info">
              <div class="miniBtn">免预约</div>
              <div class="miniBtn">免预约</div>
            </div>
          </li>
        </ul>
      </div>
      <fixedBtn leftBtn name="上架该售票"
                @leftclick="deleteBtn"
                @click="upTick"></fixedBtn>
      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import fixedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  export default {
    name: 'tickets',
    components: {
      fixedBtn
    },
    data () {
      return {
        refer: '' // 判断是普通票还是计时票
      }
    },
    mounted () {
      this.refer = this.$mp.query.refer
      let that = this
      if (that.$mp.query.refer) {
        wx.setStorage({
          key: 'refer',
          data: that.$mp.query.refer
        })
        that.refer = this.$mp.query.refer
      } else {
        wx.getStorage({
          key: 'refer',
          success (res) {
            console.log(res.data)
            that.refer = res.data
          },
          fail (res) {
            if (that.$mp.query.refer) {
              wx.setStorage({
                key: 'refer',
                data: that.$mp.query.refer
              })
            }
          }
        })
      }
    },
    methods: {
      edit () {
        // newTimeTick:计时; scenTick:普通
        if (this.refer === 'scenTick') {
          wx.navigateTo({
            url: 'basic-info'
          })
        } else if (this.refer === 'newTimeTick') {
          wx.navigateTo({
            url: 'basic-time-info'
          })
        }
      },
      goDetail () {
        let type = this.refer === 'scenTick' ? 'sceneTick' : 'newTimeTick'
        wx.navigateTo({
          url: `/pages/ticketing/detail/detailed-info?refer=${type}`
        })
      },
      deleteBtn () {
        Toast('删除成功')
      },
      upTick () {
      }
    }
  }
</script>

<style lang="scss" scoped>
.Tickets{
  padding-bottom: 148rpx;
}
  .bgt{
    width:100%;
    background: #fff;
    padding: 40rpx 30rpx 0 30rpx;
    margin-bottom: 16rpx;
  }
  .bigTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rpx 0rpx 40rpx 0;
    .lt{
      color:#333;
      font-size: 36rpx;
    }
    .rt{
      color:#EF7C1B;
      font-size: 28rpx;
    }
  }
  .detail_list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 28rpx;
    padding-bottom: 40rpx;
    .address{
      flex:.2;
      color:#666;
    }
    .moneyJg{
      letter-spacing: 24rpx;
    }
    .ress_info{
      flex:.8;
      color:#333;
      flex-wrap: wrap;
    }
    .miniBtn{
      width:80rpx;
      text-align: center;
      height:30rpx;
      line-height: 30rpx;
      display: inline-block;
      margin-right: 12rpx;
      font-size: 20rpx;
      color:#fff;
      background:linear-gradient(to right, #F8B33A, #EF7C1B);
      border-radius:4px;
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
