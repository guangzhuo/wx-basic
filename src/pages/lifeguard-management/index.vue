<template>
    <div class="lifeguard-management">
      <mpDownSelect title="全部门店"
                    type="radioCk"
                    @clickRadio="clickRadio"
                    @clickRadioCK="clickRadioCK"></mpDownSelect>
      <mpCell
        leftTitle="田庚云"
        disabled
        @click="goCell"
        :iconNone="false"
        placeholder="救生员负责人">
        <div slot="rightInfo">
          <van-icon @click="openMobile" name="phone" color="#EF7C1B" size="30rpx" />
        </div>
      </mpCell>


      <fixedBtn name="添加救生员" @click="goLife"></fixedBtn>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  export default {
    name: 'index',
    components: {
      mpDownSelect,
      mpCell,
      fixedBtn
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      /* 全部门店 */
      clickRadio (data) {
        console.log(data)
      },
      /* 筛选回填 */
      clickRadioCK (data) {
        console.log(data)
      },
      /* 打开电话 */
      openMobile () {
        wx.makePhoneCall({
          phoneNumber: '10086' // 仅为示例，并非真实的电话号码
        })
      },
      /* 救生员信息 */
      goCell () {
        this.$router.push({
          path: 'lifeguard-information'
        })
      },
      goLife () {
        this.$router.push({
          path: 'adding-lifeguards'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.lifeguard-management{
  padding-bottom: 138rpx;
}
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
