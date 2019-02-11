<template>
    <div class="Ticketing">
      <mpselect type="saixuan" @clickRadio="clickRadio"></mpselect>
      <mpCell leftTitle="晚场-平日-普通票"
              disabled
              :iconNone="false"
              placeholder="25.5"
              @click="goTickInfo('scenTick')"
              type="input">
        <div slot="rightInfo">
          <div class="down-on">已下架</div>
          <div class="up-on">已上架</div>
        </div>
      </mpCell>
      <mpCell leftTitle="通场计时票"
              disabled
              :iconNone="false"
              @click="goTickInfo('newTimeTick')"
              placeholder="25.5"
              type="input">
        <div slot="rightInfo">
          <div class="down-on">已下架</div>
          <div class="up-on">已上架</div>
        </div>
      </mpCell>



      <fxiedBtn name="添加新票" @click="addNew"></fxiedBtn>
    </div>
</template>

<script>
  import mpselect from '@/components/mpDownSelect'
  import mpCell from '@/components/mpCell'
  import fxiedBtn from '@/components/fixed-btn'
  export default {
    name: 'index',
    components: {
      mpselect,
      fxiedBtn,
      mpCell
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      /* 单选门店返回 */
      clickRadio (data) {
        console.log(data)
      },
      /* 去票务信息 */
      goTickInfo (type) {
        wx.navigateTo({
          url: `detail/tickets?refer=${type}`
        })
      },
      addNew () {
        wx.navigateTo({
          url: 'add-ticket'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.down-on, .up-on{
  font-size: 26rpx;
}
.down-on{
  color:#666;
}
.up-on{
  color:#EF7C1B
}
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
