<template>
  <div class="Pool">
    <mpCell required
            leftTitle="泳池名称"
            type="input"
            v-model.lazy="poolName"
            placeholder="输入泳池名称"
            :iconNone="false"></mpCell>
    <mpCell required
            leftTitle="设备ID"
            type="input"
            v-model.lazy="poolID"
            placeholder="输入设备组ID"
            :iconNone="false"></mpCell>
    <div class="mark">
      <van-cell>
        <view slot="title">
          <view class="van-cell-text">备注</view>
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
    <van-dialog id="van-dialog" />
    <fxiedBtn leftBtn @leftclick="deleteBtn" name="保存" @click="savePool"></fxiedBtn>
  </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import Notify from '@/../static/vant/notify/notify'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  import fxiedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'stores-pool',
    components: {
      mpCell,
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
    mounted () {
      let {id} = this.$route.query
      console.log(id)
      if (id) this.flyData()
    },
    methods: {
      flyData () {
        // 初始化泳池信息
      },
      deleteBtn () {
        // 删除
        Dialog.confirm({
          message: '确认删除该门店？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        })
      },
      inputVal () {
        this.maxLength = this.remarks.length
      },
      savePool () {
        Dialog.alert({
          title: '保存失败',
          message: '请输入与登录账号绑定的设备组ID',
          confirmButtonText: '知道了'
        }).then(() => {
          // on close
        })
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
  }
  .hinIpt{
    width:100%;
    box-sizing: border-box;
    padding: 6px;
    border: 0.3px solid #999;
    height:140px;
    line-height: 0;
  }
  .maxLength{
    display: inline-block;
    width:100%;
    text-align: right;
  }
</style>
