<template>
    <div class="textarea">
      <view class="van-cell-text" v-if="isTitle">{{ text }}</view>
      <textarea class="hinIpt"
                :class="isShow===false?'posiHide':''"
                :maxlength="max"
                @blur="thatCall"
                :placeholder="placeholder"></textarea>
      <div class="maxLength">{{maxLength}}/{{ max }}字</div>
    </div>
</template>

<script>
  export default {
    name: 'remarks-textarea',
    props: {
      text: {
        default: '备注'
      },
      isShow: {
        type: Boolean,
        default: true
      },
      isTitle: {
        type: Boolean,
        default: false
      },
      placeholder: {
        default: '输入备注内容'
      },
      max: {
        default: 50
      }
    },
    data () {
      return {
        maxLength: 0,
        vate: ''
      }
    },
    watch: {
    },
    methods: {
      inputFocus (e) {
        console.log(this)
        setTimeout(() => {
          console.log(this)
        }, 3000)
      },
      thatCall (ev) {
        let val = ev.mp.detail.value
        console.log(ev)
        console.log(this.vate)
        this.maxLength = val.length
        this.$emit('areaVal', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textarea{
    margin: 0 30rpx;
    position: relative;
    z-index: 1;
    .van-cell-text{
      font-size: 30rpx;
      color:#333;
      padding:32rpx 0 20rpx 0;
    }
    .hinIpt{
      width:100%;
      padding-top: 20rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      border-radius: 3px;
      /*border: 0.3px solid rgba(0,0,0,.1);*/
      height:140px;
      line-height: 0;
    }
    .posi{
      position: absolute;
      top:0;
      z-index: 2;
    }
    .maxLength{
      display: inline-block;
      width:100%;
      color:#999;
      font-size: 24rpx;
      text-align: right;
      padding-bottom: 32rpx;
    }
  }
  .posiHide{
    /*position: absolute;*/
    /*top:9999rpx;*/
    display: none;
  }
</style>
