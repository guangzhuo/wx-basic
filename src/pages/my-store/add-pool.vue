<template>
    <div class="Pool">
      <mpCell
              leftTitle="泳池名称"
              type="input"
              inline
              v-model.lazy="poolName"
              placeholder="输入泳池名称"
              :iconNone="false"></mpCell>
      <mpCell
              leftTitle="设备ID"
              type="input"
              inline
              v-model.lazy="poolID"
              placeholder="输入设备组ID"
              :iconNone="false"></mpCell>
      <div class="mark">
        <view class="van-cell-text">备注</view>
          <van-cell>
            <view slot="title">
              <textarea class="hinIpt"
                     v-model.lazy="remarks"
                     maxlength="50"
                     type="textarea"
                        @input="inputVal"
                     placeholder="输入备注内容"></textarea>
              <div class="maxLength">{{ maxLength}}/50字</div>
            </view>
          </van-cell>
      </div>
      <van-notify id="custom-selector" />
      <van-toast id="van-toast" />
      <fxiedBtn name="保存" @click="savePool"></fxiedBtn>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import horCell from '@/components/horizontal-cell'
  import Notify from '@/../static/vant/notify/notify'
  import Toast from '@/../static/vant/toast/toast'
  import fxiedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'add-pool',
    components: {
      mpCell,
      horCell,
      fxiedBtn
    },
    data () {
      return {
        poolName: '',
        poolID: '',
        remarks: '',
        maxLength: 0
      }
    },
    created () {
    },
    methods: {
      inputVal () {
        this.maxLength = this.remarks.length
      },
      savePool () {
        if (!this.poolName || !this.poolID) {
          Notify({
            text: '请完善必填信息',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          })
        } else {
          console.log(this.poolName)
          console.log(this.poolID)
          console.log(this.remarks)
          Toast('保存成功')
          this.$router.push({
            path: 'add-stores'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.mark{
  margin-top: 10px;
  .van-cell-text{
    font-size: 28rpx;
    padding: 32rpx 0 24rpx 30rpx;
    color:#999;
  }
}
  .hinIpt{
    width:100%;
    box-sizing: border-box;
    padding: 6px;
    /*border: 0.3px solid #999;*/
    height:140px;
    line-height: 0;
  }
  .maxLength{
    display: inline-block;
    width:100%;
    text-align: right;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
