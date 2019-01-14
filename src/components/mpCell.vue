<template>
    <div class="Cellmp">
      <van-cell :border="border" :required="required" @click="click_cell">
        <view slot="title">
          <view class="van-cell-text">{{leftTitle}}</view>
          <div class="inputWrap">
            <image v-if="isSrcIcon" :src="srcIcon" class="iconWin"></image>
            <input v-if="type==='input'&& typeInput ==='text'"
                   :disabled="disabled"
                   v-model="value"
                   @input="inputFun"
                   type="text"
                   class="ipt"
                   :placeholder="placeholder" />
            <input v-if="type==='input'&& typeInput ==='number'"
                   :disabled="disabled"
                   v-model="value"
                   @input="inputFun"
                   type="number"
                   class="ipt"
                   :placeholder="placeholder" />
            <div v-if="type==='time'">
              <view class="picker" @click="showPopup">
                <!--{{currentDate}}-->
                <input v-model="value"
                       disabled
                       class="ipt"
                       :placeholder="placeholder" />
              </view>
              <van-popup
                :show="popupShow"
                position="bottom"
                @close="popupClose">
                <van-datetime-picker
                  :type="timeType"
                  @cancel="cancel"
                  @confirm="confirmPicker"/>
              </van-popup>
            </div>
          </div>
        </view>
        <view slot="right-icon">
          <div class="rightEye" v-if="iconNone">
            <van-icon size="20px" :name="iconName" />
          </div>
          <slot name="rightInfo"></slot>
        </view>
      </van-cell>
    </div>
</template>

<script>
  export default {
    name: 'mpCell',
    props: {
      required: {
        type: Boolean,
        default: false
      },
      srcIcon: {
        type: String,
        default: ''
      },
      isSrcIcon: {
        type: Boolean,
        default: false
      },
      typeInput: {
        type: String,
        default: 'text'
      },
      border: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'input'
      },
      timeType: {
        type: String,
        default: 'datetime'
      },
      leftTitle: {
        type: String,
        default: 'title'
      },
      currentDate: {
        type: String,
        default: '请选择时间'
      },
      value: {
        type: String,
        default: ''
      },
      thatInfo: {
        type: String,
        default: 'thatInfo'
      },
      placeholder: {
        type: String,
        default: '输入手机号码'
      },
      iconNone: {
        type: Boolean,
        default: true
      },
      iconName: {
        type: String,
        default: 'arrow'
      }
    },
    data () {
      return {
        val: '',
        popupShow: false,
        pickerDate: new Date().getTime()
      }
    },
    methods: {
      inputFun () {
        this.$emit('input', this.value)
      },
      click_cell () {
        this.$emit('click')
      },
      onChangeTime (time) {
        this.currentDate = time.mp.detail.value
        this.$emit('callTime', this.currentDate)
      },
      /* 时间弹出层 */
      popupClose () {
        console.log('1111')
        this.popupShow = false
      },
      showPopup () {
        this.popupShow = true
      },
      confirmPicker (data) {
        let dataTime = data.mp.detail
        this.currentDate = this.format(dataTime)
        if (this.timeType === 'time') {
          this.$emit('confirmPicker', dataTime)
        } else {
          this.$emit('confirmPicker', this.format(dataTime))
        }
        this.popupShow = false
      },
      cancel () {
        this.popupShow = false
      },
      format (times) {
      // shijianchuo是整数，否则要parseInt转换
        var time = new Date(times)
        var y = time.getFullYear()
        var m = time.getMonth() + 1
        var d = time.getDate()
        var h = time.getHours()
        var mm = time.getMinutes()
        var s = time.getSeconds()
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm)
      },
      add0 (m) { return m < 10 ? '0' + m : m }
    }
  }
</script>

<style lang="scss" scoped>
  .van-cell-text{
    font-size:32rpx;
    font-weight:500;
    color:#333;
  }
  .iconWin{
    width:24rpx;
    height:24rpx;
    display: inline-block;
    background: darkgray;
    vertical-align: middle;
    margin-right: 17rpx;
  }
  .ipt, .picker{
    display: inline-block;
    width:90%;
    vertical-align: middle;
    font-size: 13px;
  }
  .rightEye{
    /*position: absolute;
    z-index: 2;
    right:10px;
    bottom:16px;
    text-align: right;*/
    display: flex;
    height:100%;
    align-items: center;
  }
  .valIpt{
    font-size: 12px;
    color:#999;
  }
</style>
<style lang="scss">
  .Cellmp{
    .van-cell{
      padding: 32rpx 30rpx;
    }
  }
</style>
