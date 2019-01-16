<template>
  <div class="Pool">
    <horCell required
             title="门店名称"
             v-model="storeName"
             @input="valueCall"
             placeholder="输入门店名称"/>
    <horCell required
             disabled
             rightIcon
             title="救生员"
             v-model="jsVal"
             @click="lifeClick"
             @input="valueCall"
             placeholder="请选择救生员负责人"/>
    <div class="yc-info">
      <div class="yc-title">泳池信息</div>
      <div class="add-yc-wrap">
        <mpCell v-for="(item, index) in 1"
                :key="index"
                type="input"
                disabled
                border
                leftTitle="默认泳池"
                @click="gotoresInfo('qqq')"
                placeholder="默认泳池设备组，请及时修正使用有效的设备组ID">
          <van-icon size="20px" name="arrow" />
        </mpCell>
        <navigator hover-class="none" url="add-pool">
          <div class="addYc">
            <!--<image src="" class="crileIcon"></image>-->添加泳池
          </div>
        </navigator>
      </div>
    </div>
    <van-notify id="custom-selector" />
    <van-toast id="van-toast" />
    <div id="theme">
      <van-dialog id="van-dialog" />
    </div>
    <fxiedBtn leftBtn @leftclick="deleteBtn" name="保存" @click="savePool"></fxiedBtn>
  </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import horCell from '@/components/horizontal-cell'
  import Notify from '@/../static/vant/notify/notify'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  import fxiedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'stores-pool',
    components: {
      mpCell,
      horCell,
      fxiedBtn
    },
    data () {
      return {
        poolName: '',
        poolID: '',
        storeName: '',
        jsVal: '',
        remarks: '',
        maxLength: 0
      }
    },
    mounted () {
      let {pooID, ...obj} = this.$route.query
      console.log(obj)
      console.log(this.$route.query)
      if (pooID) {
        this.flyData()
      }
      if (obj) {
        this.jsVal = obj.title
        console.log(this.jsVal)
      }
      /* else {
        this.storeName = ''
        this.jsVal = ''
        // this.flyData()
      } */
    },
    methods: {
      flyData () {
        // 初始化泳池信息
      },
      gotoresInfo () {
        this.$router.push({
          path: 'pool-info'
        })
      },
      /* 救生员列表 */
      lifeClick () {
        this.$router.push({
          path: 'lifeguard-list',
          query: {back: 'stores-info'}
        })
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
  /*.Add-stores{
    background: darkgray;
  }*/
  .yc-info{
    /*margin-top: 10px;*/
    .yc-title{
      font-size: 14px;
      color:#666;
      padding: 32rpx 0 24rpx 30rpx;
    }
  }
  .add-yc-wrap{
    background: #fff;
    padding-top:10px;
    padding-bottom: 30rpx;
    .crileIcon{
      width:30rpx;
      height:30rpx;
      border-radius: 50%;
      background: darkgray;
      margin-right: 6rpx;
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .add-yc-wrap{
    .addYc{
      width:80%;
      text-align: center;
      font-size: 30rpx;
      color:#333;
      padding-top: 34rpx;
      margin: 0 auto;

    }
  }
</style>
