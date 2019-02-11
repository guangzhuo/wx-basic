<template>
    <div class="superior">
      <van-radio-group :value="radio">
        <van-cell-group>
          <van-cell v-for="(item, index) in guarArr"
                    :key="index"
                    :title="item.name"
                    clickable
                    :data-id="item.id"
                    :data-title="item.name"
                    @click="onClick">
            <van-radio :name="item.id"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
</template>

<script>
  export default {
    name: 'superior',
    data () {
      return {
        radio: '',
        guarArr: [
          {name: '单选 1', id: '1'},
          {name: '单选 2', id: '2'},
          {name: '单选 3', id: '3'}
        ]
      }
    },
    created () {
    },
    methods: {
      onClick (that) {
        let {id} = that.currentTarget.dataset
        let {back} = this.$route.query
        this.radio = id
        console.log(this.radio)
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
