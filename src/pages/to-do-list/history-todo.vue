<template>
    <div class="history-todo">
      <van-tabs :active="active" @change="onChange">
        <van-tab :title="tabOne">
          <mpCell leftTitle="巡店检查"
                  placeholder="去杭州游泳馆巡查"
                  :iconNone="false"
                  @click="goEdit_todo"
                  type="input"></mpCell>
        </van-tab>
        <van-tab :title="tabTwo">
          <mpCell leftTitle="巡店检查"
                  placeholder="去杭州游泳馆巡查"
                  :iconNone="false"
                  type="input"></mpCell>
        </van-tab>
        <van-tab disabled title=" "></van-tab>
        <van-tab disabled title=" "></van-tab>
        <van-tab disabled title=" "></van-tab>
      </van-tabs>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  export default {
    name: 'history-todo',
    components: {
      mpCell
    },
    data () {
      return {
        tabOne: '已完成 (0)',
        tabTwo: '已过期 (0)'
      }
    },
    created () {
    },
    methods: {
      goEdit_todo () {
        this.$router.push({
          path: 'edit-todo',
          query: {}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
