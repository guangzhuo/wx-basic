<template>
  <div class="bottomWrap" :class="showActive===true?'showActive': ''">
      <van-button v-if="leftBtn===true"
                @click="leftClick"
                size="normal"
                custom-class="deleteBtn">{{ leftname }}</van-button>
      <van-button  @click="clickBtn"
                   size="normal"
                   :class="isActive===true ? 'active':''"
                   :custom-class="leftBtn === true? 'addBtn smallBtn': 'addBtn'">{{ name }}</van-button>
  </div>
</template>

<script>
  export default {
    name: 'fixed-btn',
    props: {
      leftname: {
        type: String,
        default: '删除'
      },
      leftBtn: {
        type: Boolean,
        default: false
      },
      showActive: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: true
      },
      name: {
        type: String,
        default: '按钮名称'
      }
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      leftClick () {
        this.$emit('leftclick')
      },
      clickBtn () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .bottomWrap{
    position: fixed;
    bottom:0px;
    left:0px;
    width:100%;
    z-index: 10;
    background: #fff;
    text-align: center;
    box-shadow:0px 0px 10px 0px rgba(27,27,78,0.06);
    width:100%;
    height:138rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .addBtn{
      width:690rpx;
      display: block;
      background: #BDC0BA;
      color:#fff;
      margin:0 auto;
      border-radius: 6px;
    }
    .deleteBtn{
      width:330rpx;
      border-radius: 6px;
      background: #fff;
      color:#333;
      margin-right: 10px;
      display: inline-block;

    }
    .smallBtn{
      width:330rpx;
      display: inline-block;
    }
  }
  .showActive{
    .addBtn{
      background: #BDC0BA !important;
    }
  }
  .active{
    .addBtn{
      background: #EF7C1B;
    }
  }
</style>

