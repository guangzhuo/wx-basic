<template>
    <div class="new-site">
      <van-cell required>
        <view slot="title">
          <div class="title">场次类型</div>
          <picker
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
      <mpCell required
              leftTitle="开始时间"
              placeholder="请选择"
              timeType="time"
              v-model="startDate"
              iconName="arrow-down"
              @confirmPicker="startpickerData"
              type="time"></mpCell>
      <mpCell required
              leftTitle="结束时间"
              placeholder="请选择"
              v-model="endDate"
              timeType="time"
              iconName="arrow-down"
              @confirmPicker="endpickerData"
              type="time"></mpCell>
      <van-cell required>
          <view slot="title">
            <div class="title">选择日期</div>
            <div class="checkWrap">
              <van-checkbox-group :value="resultCheck" @change="onChange">
                <van-checkbox
                  v-for="(item, index) in Checklist"
                  :key="index"
                  @click="boxClick(item)"
                  :name="item.id">
                  {{ item.name }}
                </van-checkbox>
              </van-checkbox-group>
            </div>
          </view>
      </van-cell>

      <mpCell required
              disabled
              leftTitle="选择适用场馆"
              placeholder="请选择"
              v-model="selectSite"
              iconName="arrow"
              @click="goApply"
              @confirmPicker="endpickerData"
              type="input"></mpCell>

      <fixedBtn name="保存" @click="save"></fixedBtn>
      <van-notify id="custom-selector" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import Notify from '@/../static/vant/notify/notify'
  import Dialog from '@/../static/vant/dialog/dialog'
  import apis from '@/http/apis'
  export default {
    name: 'new-site',
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
          {id: '0', name: '全选'},
          {id: '1', name: '周一'},
          {id: '2', name: '周二'},
          {id: '3', name: '周三'},
          {id: '4', name: '周四'},
          {id: '5', name: '周五'},
          {id: '6', name: '周六'},
          {id: '7', name: '周日'}
        ],
        resultCheck: [],
        selectSite: '',
        selectids: []
      }
    },
    mounted () {
      this.resultCheck = this.Checklist.map(data => data.id)
      let {selectDuty} = this.$route.query
      if (selectDuty) {
        let arrDuty = JSON.parse(selectDuty)
        this.selectids = arrDuty.map(data => data.id)
        this.selectSite = ''
        arrDuty.filter((data, index) => {
          this.selectSite += data.name + '、'
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
          let indexID = this.resultCheck.findIndex(data => data === ev.id)
          console.log(indexID)
          console.log(this.resultCheck)
          if (indexID !== -1) {
            this.resultCheck.splice(indexID, 1)
          } else {
            this.resultCheck.push(ev.id)
          }
        } else if (ev.id === '0' && this.resultCheck.length !== 8) {
          this.resultCheck = this.Checklist.map(data => data.id)
        } else {
          this.resultCheck = []
        }
      },
      goApply () {
        console.log('gogo')
        /* wx.redirectTo({
          url: 'apply-site'
        }) */
        this.$router.push({
          path: 'apply-site',
          query: {back: 'new-site'}
        })
      },
      onChange () {},
      save () {
        if (!this.startDate || !this.endDate || this.resultCheck.length === 0 || !this.selectSite) {
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
  .rightEye{
    position: absolute;
    z-index: 2;
    right:10px;
    bottom:16px;
    text-align: right;
  }
</style>
<style lang="scss">
  .checkWrap{
    ._van-checkbox-group{
      width:80%;
      display: flex;
      flex-wrap: wrap;
    }
    ._van-checkbox{
      margin: 5px 0 5px 10px;
    }
  }
</style>
