<template>
    <div class="Add-stores">
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
              <image src="" class="crileIcon"></image>添加泳池
            </div>
          </navigator>
        </div>
      </div>
      <fxiedBtn
        name="确认添加"
        :isActive="isActive"
        @click="btnClick"></fxiedBtn>

      <van-notify id="custom-selector" />
      <van-dialog id="van-dialog" />
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import horCell from '@/components/horizontal-cell'
  import fxiedBtn from '@/components/fixed-btn'
  import Notify from '@/../static/vant/notify/notify'
  import Dialog from '@/../static/vant/dialog/dialog'
  import apis from '@/http/apis'
  export default {
    name: 'add-stores',
    components: {
      mpCell,
      fxiedBtn,
      horCell
    },
    data () {
      return {
        storeName: '',
        jsVal: '',
        isActive: false
      }
    },
    mounted () {
      let {name, title, goAdd} = this.$route.query
      if (goAdd) {
        this.storeName = ''
        this.jsVal = ''
      } else {
        this.jsVal = title
        this.valueCall()
      }
    },

    methods: {
      /* 救生员列表 */
      lifeClick () {
        this.$router.push({
          path: 'lifeguard-list',
          query: {id: 2}
        })
      },
      /* 泳池信息 */
      gotoresInfo (data) {
        this.$router.push({
          path: 'pool-info',
          query: {id: data}
        })
      },
      btnClick () {
        if (!this.storeName || !this.jsVal) {
          Notify({
            text: '请完善必填信息',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          })
        } else {
          Dialog.confirm({
            title: '添加成功',
            message: '是否完善门店经营信息？'
          }).then(() => {
            this.$router.push({
              path: 'my-store/index'
            })
          }).catch(() => {
            this.$router.push({
              path: 'index'
            })
          })
        }
      },
      valueCall () {
        this.isActive = this.activeBtn()
        console.log(this.activeBtn())
      },
      activeBtn () {
        console.log(this.storeName)
        console.log(this.jsVal)
        if (this.storeName && this.jsVal) {
          return true
        } else {
          return false
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
