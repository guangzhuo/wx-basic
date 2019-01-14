<template>
    <div class="my-store">
      <mpCell disabled
              leftTitle="门店名称"
              type="input"
              isSrcIcon
              :iconNone="false"
              :placeholder="placeholder"
              @click="cellclick"
              @callTime="dataTime">
      </mpCell>
      <div class="bottomWrap">
        <navigator url="add-stores?goAdd=newStore">
          <fxiedBtn name="添加门店"></fxiedBtn>
        </navigator>
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fxiedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpCell,
      fxiedBtn
    },
    data () {
      return {
        placeholder: '啊Q'
      }
    },
    created () {
    },
    methods: {
      cellclick () {
        this.$router.push({
          path: 'stores-info',
          query: {id: 1}
        })
      },
      dataTime (time) {
        console.log(time)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
