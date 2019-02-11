<template>
    <div class="radio-btn">
      <div class="btn-list"
           :class="item.id === thatID ? 'active': ''"
           v-for="(item, index) in btnData"
           @click="selectBtn(item)"
           :key="index">{{ item.name }}</div>
    </div>
</template>

<script>
  export default {
    name: 'radio-btn',
    props: {
      btnData: {
        type: Array,
        default: []
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        thatID: this.value
      }
    },
    created () {
    },
    methods: {
      selectBtn (item) {
        this.thatID = item.id
        this.$emit('selectBtn', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .radio-btn{
    display: flex;
    flex-wrap: wrap;
  }
.btn-list{
  width:220rpx;
  height:70rpx;
  display: inline-block;
  margin-right: 15rpx;
  line-height: 70rpx;
  text-align: center;
  color:#333;
  font-size: 28rpx;
  background:rgba(242,242,242,1);
  border-radius:8px;
}
.btn-list:nth-last-child(1) {
  margin-right: 0;
}
  .active{
    background:rgba(239,124,27,0.1);
    color:#EF7C1B;
  }

</style>
