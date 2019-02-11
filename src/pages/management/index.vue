<template>
    <div class="management">
      <van-cell
        title="杭州游泳馆"
        @click="goManDeil"
        :clickable="false"
        is-link>
        <div class="col-red">未完善</div>
      </van-cell>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  export default {
    name: 'index',
    components: {
      mpCell
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      goManDeil () {
        wx.navigateTo({
          url: 'detail-manage'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.management{

}
  .col-red{
    color:#F95E5F
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
