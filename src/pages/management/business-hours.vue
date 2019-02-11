<template>
    <div class="business-hours">
      <van-cell class="paddingCum">
        <view slot="title">
          <div class="title">营业日期</div>
          <radioBtn :btnData="multiArray" value="3" @selectBtn="selectBtn"></radioBtn>
        </view>
      </van-cell>
      <mpCell
        leftTitle="开始营业时间"
        v-model="startDate"
        inline
        timeType="time"
        placeholder="请选择"
        iconName="arrow-down"
        @confirmPicker="startpickerData"
        type="time"></mpCell>
      <mpCell
        leftTitle="结束营业时间"
        placeholder="请选择"
        v-model="endDate"
        inline
        timeType="time"
        iconName="arrow-down"
        @confirmPicker="endpickerData"
        type="time"></mpCell>


      <fxiedBtn leftBtn name="保存"
                @leftclick="deleteCall"
                @click="save"></fxiedBtn>
      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fxiedBtn from '@/components/fixed-btn'
  import radioBtn from '@/components/radio-btn'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  import areaList from './area'
  import apis from '@/http/apis'
  export default {
    name: 'business-hours',
    components: {
      mpCell,
      radioBtn,
      fxiedBtn
    },
    data () {
      return {
        multiArray: [
          {name: '每天', id: '1'},
          {name: '工作日', id: '2'},
          {name: '节假日', id: '3'}
        ], // 营业日期数据源
        btnData: '',
        startDate: '',
        endDate: ''
      }
    },
    created () {
    },
    methods: {
      selectBtn (item) {
        this.btnData = item
      },
      startpickerData (time) {
        // console.log(new Date(time).getTime())
        this.startDate = time
      },
      endpickerData (time) {
        console.log(time)
        this.endDate = time
      },
      deleteCall () {
        Dialog.confirm({
          message: '确认删除？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        })
      },
      save () {
        // this.btnData //当前按钮信息
        // this.startDate
        // this.endDate
      }
    }
  }
</script>

<style lang="scss" scoped>
.business-hours{
  padding-bottom: 148rpx;
}
.title{
  color:#333;
  font-size: 30rpx;
  display: inline-block;
  padding-right: 20rpx;
  padding-bottom: 20rpx;
}
.pickerWrap{
  display: inline-block;
  width:65%;
}
.rightEye{
  color: #C8C8C8
}
</style>
<style lang="scss">
  page{
    background:#F4F6F6;
  }
</style>
