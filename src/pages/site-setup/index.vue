<template>
    <div class="site-setup">
      <mpDownSelect :noTime="false"
                    @clickRadio="clickRadio"
                    title="全部门店" />
        <mpCell leftTitle="早场"
                disabled
                placeholder="周一至周日 8:00-10:00"
                @click="goSiteInfo"
                type="input"/>
      <fixedBtn @click="newSite"
                name="创建新场次" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>

    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import apis from '@/http/apis'
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
      goSiteInfo () {
        this.$router.push({
          path: 'site-info'
        })
      },
      newSite () {
        this.$router.push({
          path: 'new-site'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
