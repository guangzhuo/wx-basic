<template>
    <div class="lifeguard">
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
    name: 'lifeguard-list',
    data () {
      return {
        radio: ''
      }
    },
    mounted () {
      let {id} = this.$route.query
      if (id) {
        console.log(id)
        this.flyData()
      }
    },
    destroyed () {
      this.radio = ''
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
        let {id, title, back} = that.currentTarget.dataset
        console.log(that)
        this.radio = id
        if (back === 'add-stores') {
          this.$router.push({
            path: 'add-stores',
            query: that.currentTarget.dataset
          })
        } else {
          this.$router.push({
            path: 'stores-info',
            query: that.currentTarget.dataset
          })
        }

        /* setTimeout(() => {

        }, 3000) */
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
