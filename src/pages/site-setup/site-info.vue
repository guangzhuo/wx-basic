<template>
  <div class="site-info">
    <van-cell class="paddingCum">
      <view slot="title">
        <div class="title">场次类型</div>
        <picker
          class="pickerWrap"
          mode="multiSelector"
          @change="bindMultiPickerChange"
          range-key="name"
          :value="multiIndex"
          :range="multiArray">
          <view class="picker">
            {{ currentName }}
          </view>
        </picker>
      </view>
      <view slot="right-icon">
        <div class="rightEye">
          <van-icon size="20px" name="arrow-down" />
        </div>
      </view>
    </van-cell>
    <mpCell inline
            leftTitle="开始时间"
            placeholder="请选择开始时间"
            timeType="time"
            v-model="startDate"
            iconName="arrow-down"
            @confirmPicker="startpickerData"
            type="time"></mpCell>
    <mpCell inline
            leftTitle="结束时间"
            placeholder="请选择结束时间"
            v-model="endDate"
            timeType="time"
            iconName="arrow-down"
            @confirmPicker="endpickerData"
            type="time"></mpCell>
    <van-cell class="paddingCum">
      <view slot="title">
        <div class="title checkTitle">选择日期</div>
        <div class="checkWrap">
          <van-checkbox-group :value="resultCheck" @change="onChange">
            <van-checkbox
              v-for="(item, index) in Checklist"
              :key="index"
              :class="index%4===0?'marginNone': ''"
              @click="boxClick(item)"
              use-icon-slot
              :name="item.id">
              <div slot="icon">
                <div class="checkoboxBtn"
                     :class="item.isActive?'active': ''">
                  {{ item.name }}
                  <div class="posion_close"
                       v-if="item.isActive">
                    <van-icon class="posionCenter"
                              size="11px"
                              name="cross" />
                  </div>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </view>
    </van-cell>

    <mpCell inline
            :slot_main="false"
            :iconNone="false"
            leftTitle="适用场馆"
            placeholder="请选择适用场馆"
            iconName="arrow"
            @click="goApply">
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
      <div slot="rightInfo">
        <van-icon name="arrow" />
      </div>
    </mpCell>

    <fixedBtn leftBtn
              name="保存"
              leftname="删除"
              @leftclick='leftClick'
              @click="save"></fixedBtn>

    <van-notify id="custom-selector" />
    <div id="theme">
      <van-dialog id="van-dialog" />
    </div>

    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import Notify from '@/../static/vant/notify/notify'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  import apis from '@/http/apis'
  export default {
    name: 'site-info',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        currentName: '早场',
        multiArray: [[{name: '早场', id: 1}, {name: '白天场', id: 2}, {name: '晚场', id: 3}]],
        multiIndex: [0],
        thatMultiData: {name: '早场', id: 1},
        startDate: '',
        endDate: '',
        Checklist: [
          {id: '0', name: '全选', isActive: false},
          {id: '1', name: '周一', isActive: false},
          {id: '2', name: '周二', isActive: false},
          {id: '3', name: '周三', isActive: false},
          {id: '4', name: '周四', isActive: false},
          {id: '5', name: '周五', isActive: false},
          {id: '6', name: '周六', isActive: false},
          {id: '7', name: '周日', isActive: false}
        ],
        resultCheck: ['2', '3'],
        selectids: [],
        siteArr: []
      }
    },
    mounted () {
      // this.resultCheck = this.Checklist.map(data => data.id)
      /* for (let i of this.Checklist) {
        i.isActive = true
      } */
      /* 假设数据请求成功后，显示状态 */
      for (let i of this.resultCheck) {
        let thatID = this.Checklist.findIndex(checkData => i === checkData.id)
        if (thatID !== -1) this.Checklist[thatID].isActive = true
      }

      let {selectDuty} = this.$route.query
      if (selectDuty) {
        let arrDuty = JSON.parse(selectDuty)
        this.selectids = arrDuty.map(data => data.id)
        this.siteArr = []
        arrDuty.filter((data, index) => {
          this.siteArr.push(data.name)
        })
      }
    },
    methods: {
      startpickerData (sTime) {
        this.startDate = sTime
      },
      endpickerData (eTime) {
        this.endDate = eTime
      },
      bindMultiPickerChange (that) {
        let indexArr = that.mp.detail.value[0]
        this.thatMultiData = this.multiArray[0][indexArr]
        this.currentName = this.multiArray[0][indexArr].name
      },
      boxClick (ev) {
        if (ev.id !== '0') {
          // 当前数组的索引
          let indexID = this.resultCheck.findIndex(data => data === ev.id)
          let allID = this.resultCheck.findIndex(data => data === '0')
          // 找到显示焦点的索引
          let activeID = this.Checklist.findIndex(data => data.id === ev.id)
          // debugger
          if (indexID !== -1) {
            // debugger
            this.resultCheck.splice(indexID, 1)
            this.Checklist[activeID].isActive = false
            if (allID > -1) {
              this.resultCheck.splice(allID, 1)
              this.Checklist[0].isActive = false
            }
            console.log(indexID)
            console.log(allID)
          } else {
            this.resultCheck.push(ev.id)
            this.Checklist[activeID].isActive = true
          }
        } else if (ev.id === '0' && this.resultCheck.length !== 8) {
          this.resultCheck = this.Checklist.map(data => data.id)
          for (let i of this.Checklist) {
            i.isActive = true
          }
        } else {
          this.resultCheck = []
          for (let i of this.Checklist) {
            i.isActive = false
          }
        }
      },
      goApply () {
        console.log('gogo')
        /* wx.redirectTo({
          url: 'apply-site'
        }) */
        this.$router.push({
          path: 'apply-site',
          query: {back: 'site-info'}
        })
      },
      leftClick (ev) {
        Toast('删除成功')
      },
      save () {
        if (!this.startDate || !this.endDate || this.resultCheck.length === 0 || this.siteArr.length === 0) {
          Notify({
            text: '请完善必填信息',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          })
        } else {
          Dialog.alert({
            title: '值班冲突提示',
            message: '该时间段内已有值班安排'
          }).then(() => {
            // on confirm
            // this.$fly.post(apis.api, {}).then(data => {})
            this.$router.push({
              path: 'index'
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .checkWrap{
    .checkoboxBtn{
      width:160rpx;
      height:70rpx;
      line-height: 70rpx;
      text-align: center;
      background:rgba(242,242,242,1);
      border-radius:8rpx;
      position: relative;
      overflow: hidden;

    }
    .active{
      background:rgba(239,124,27,0.1);
      color:#EF7C1B;
    }
    .posion_close{
      position:absolute;
      top:-11rpx;
      right:46rpx;
      line-height:normal;
      color:#fff;
      &:before{
        content: '';
        position: absolute;
        border-left:60rpx solid transparent;
        border-right:60rpx solid transparent;
        border-bottom:60rpx solid #EF7C1B;
        transform:rotateZ(45deg);
      }
      .posionCenter{
        position: absolute;
        left:18rpx;
        top: 4rpx;
      }
    }
    ._van-checkbox-group{
      /*width:80%;*/
      display: flex;
      flex-wrap: wrap;
    }
    ._van-checkbox{
      margin: 5px 0 5px 17rpx;
    }
    .marginNone{
      margin-left:0;
    }
  }

  .paddingCum{
    .van-cell{
      padding: 32rpx 30rpx;
    }
    .title{
      color:#333;
      font-size: 30rpx;
      display: inline-block;
      padding-right: 20rpx;
    }
    .pickerWrap{
      display: inline-block;
      width:65%;
    }
    .rightEye{
      color: #C8C8C8
    }
  }

  .checkTitle{
    padding-bottom: 28rpx;
  }
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

</style>
