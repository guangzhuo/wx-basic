<template>
    <div class="venues-list">
      <van-radio-group :value="radio" @change="onChange">
        <van-cell-group>
          <van-cell title="单选框 1"
                    clickable
                    data-id="1"
                    data-title="单选框 1"
                    @click="onClick">
            <van-radio name="1"/>
          </van-cell>
          <van-cell title="单选框 2"
                    clickable
                    data-id="2"
                    data-title="单选框 2"
                    @click="onClick">
            <van-radio name="2"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
</template>

<script>
  import apis from '@/http/apis'
  export default {
    name: 'venues-list',
    data () {
      return {
        radio: ''
      }
    },
    created () {
    },
    methods: {
      /* 初始 */
      flyData () {
        // this.$fly.get()
      },
      onChange (id) {
        console.log(id)
      },
      onClick (that) {
        let {id} = that.currentTarget.dataset
        let {back} = this.$route.query
        this.radio = id
        console.log(that.currentTarget.dataset)
        this.$router.replace({
          path: back,
          query: that.currentTarget.dataset
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
