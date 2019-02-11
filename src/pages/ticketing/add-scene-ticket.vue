<template>
    <div class="add-scene-ticket">
      <mpCell inline
              placeholder="请输入门店名称"
              v-model="tickName"
              :iconNone="false"
              leftTitle="票务名称"></mpCell>
      <mpCell inline
              placeholder="请输入价格"
              :iconNone="false"
              v-model="tickMonery"
              leftTitle="价格"></mpCell>
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
      <div class="WrapBlock" v-show="siteArr.length!==0">
        <div class="sel_title">
          <span class="left_title">选择场次</span>
          <span class="right_all_select" @click="allBox">{{ allBoxInfo }}</span>
        </div>
        <van-checkbox-group :value="box_result" @change="onChange">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in checkboxData"
              :key="index"
              class="checkCell"
              clickable
              value=" "
              :data-name="item.name"
              @click="toggle">
              <div slot="title">
                <div class="box_title">{{ item.title }}</div>
                <div class="box_small">{{ item.time }}}</div>
              </div>
              <div slot="right-icon">
                <div class="CloumnCenter">
                  <van-checkbox catch:tap="noop"
                                :class="'isONE'+item.name"
                                :name="item.name" />
                </div>
              </div>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <fixedBtn name="下一步" @click="nextBtn"></fixedBtn>
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
      <van-toast id="van-toast" />
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  import apis from '@/http/apis'
  export default {
    name: 'add-scene-ticket',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        tickName: '', // 票务名称
        tickMonery: '', // 价格
        selectids: [], // 选择的场馆id
        siteArr: [], // 场所名称
        box_result: [], // 多选时选中的数组
        checkboxData: [
          {title: '早场', time: '周一至周日 8:00-10:00', name: '1'},
          {title: '白天场', time: '周五至周日 13:00-15:00', name: '2'},
          {title: '晚场', time: '工作日 19:00-21:00', name: '3'}
        ], // 多选的个数
        allBoxInfo: '全选'
      }
    },
    mounted () {
      let {title, id} = this.$route.query
      console.log(this.$route.query)
      if (title) {
        // let arrDuty = JSON.parse(selectDuty)
        this.selectids = id
        this.siteArr = []
        this.siteArr.push(title)
        /* arrDuty.filter((data, index) => {
          this.siteArr.push(data.name)
        }) */
      }
    },
    methods: {
      goSite () {
        wx.navigateTo({
          url: '/pages/ticketing/venues-list?back=/pages/ticketing/add-scene-ticket'
        })
      },
      /* 全选按钮 */
      allBox () {
        let boxLength = this.box_result.length
        let checkboxLength = this.checkboxData.length
        if (boxLength === checkboxLength) {
          this.box_result = []
          this.allBoxInfo = '全选'
        } else {
          this.box_result = this.checkboxData.map(data => data.name)
          this.allBoxInfo = '取消全选'
        }
      },
      /* 多选选择 */
      toggle (event) {
        // console.log(this)
        const { name } = event.currentTarget.dataset
        const checkbox = this.$mp.page.selectComponent(`.isONE${name}`)
        checkbox.toggle()
      },
      /* 多选状态改变触发 */
      onChange (event) {
        this.box_result = event.mp.detail
        let boxLength = this.box_result.length
        let checkboxLength = this.checkboxData.length
        if (boxLength === checkboxLength) {
          this.allBoxInfo = '取消全选'
        } else {
          this.allBoxInfo = '全选'
        }
      },
      noop () {},
      nextBtn () {
        wx.navigateTo({
          url: 'perfecting-business?refer=sceneTick'
        })
        if (!this.tickName || !this.tickMonery || this.siteArr.length === 0) {
          Toast('输入有误')
          return false
        }
        /* 去门店经营信息 */
        /* Dialog.confirm({
          title: '操作提示',
          message: '所选场馆尚未完善经营信息，请先完善',
          confirmButtonText: '完善经营信息'
        }).then(() => {
          Toast('删除成功')
        }).catch(() => {}) */
        /* 去首页 */
        /* Dialog.confirm({
          title: '错误提示',
          message: '所选场馆已有上架的计时票，请先下架该场馆的计时票',
          confirmButtonText: '去下架'
        }).then(() => {
          wx.navigateTo({
            url: 'index'
          })
        }).catch(() => {}) */
        /* 已上架在售 */
        /* Dialog.alert({
          title: '操作提示',
          message: '所选场馆场次中已有上架在售的票务',
          confirmButtonText: '知道了'
        }).then(() => {
          // on close
        }) */
      }
    }
  }
</script>
<style lang="scss" scoped>
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
  .WrapBlock{
    margin-top: 16rpx;
    .sel_title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      height:110rpx;
      padding: 0 30rpx;
      border-bottom: 1rpx solid #EEEEEE;
    }
    .left_title{
      font-size: 30rpx;
      color:#333;
    }
    .right_all_select{
      font-size: 28rpx;
      color:#EF7C1B;
    }

  }
</style>
<style lang="scss">
page{
  background: #F4F6F6;
}
  .checkCell{
    .van-cell{
      padding: 32rpx 30rpx;
    }
    .box_title{
      color:#333333;
      font-size: 30rpx;
    }
    .box_small{
      color:#999999;
      font-size: 28rpx;
    }
    .CloumnCenter{
      display: flex;
      height:100%;
      align-items: center;
    }
  }
</style>
