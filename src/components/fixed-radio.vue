<template>
  <div class="bottomWrap">
    <van-radio-group :value="AlarmRadio" @change="onChange">
      <van-radio class="rowS"
                 :name="item.name" v-for="(item, index) in radioData"
                 :data-name="item.name"
                 @click="thatradios"
                 :key="index">{{item.text }}</van-radio>
    </van-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'fixed-radio',
    props: {
      radioData: {
        type: Array,
        default: [
          {
            name: 'qqq',
            text: '只看已接警'
          },
          {
            name: '3333',
            text: '只看未接警'
          }
        ]
      }
    },
    data () {
      return {
        AlarmRadio: '',
        oneRadio: false
      }
    },
    created () {
    },
    methods: {
      thatradios (data) {
        let {name} = data.mp.target.dataset
        this.oneRadio = !this.oneRadio
        this.AlarmRadio = this.oneRadio ? name : ''
        this.$emit('RadioClick', this.AlarmRadio)
      }
      /* onChange (that) {
        let {detail} = that.mp
      } */
    }
  }
</script>

<style lang="scss" scoped>
  .bottomWrap{
    position: fixed;
    bottom:0px;
    width:100%;
    height: 90rpx;
    line-height: 90rpx;
    background: #fff;
    justify-content: left;
    box-shadow:0px 0px 10px 0px rgba(27,27,78,0.06);
    .rowS{
      text-align: left;
      margin-left: 20px;
      display: inline-block;
    }
  }
</style>
