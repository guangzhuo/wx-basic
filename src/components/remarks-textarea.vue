<template>
    <div class="textarea">
      <view class="van-cell-text">{{ text }}</view>
      <textarea class="hinIpt"
                v-model.lazy="remarks"
                :maxlength="max"
                type="textarea"
                @input="inputVal"
                :placeholder="placeholder"></textarea>
      <div class="maxLength">{{ maxLength}}/{{ max }}字</div>
    </div>
</template>

<script>
  export default {
    name: 'remarks-textarea',
    props: {
      text: {
        default: '备注'
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
        maxLength: 0
      }
    },
    created () {
    },
    methods: {
      inputVal (val) {
        var value = val.mp.detail.value
        this.maxLength = value.length
        this.$emit('areaVal', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textarea{
    width:90%;
    margin: 10px auto 0;
    .van-cell-text{
      font-size: 13px;
      padding-bottom: 10px;
    }
    .hinIpt{
      width:100%;
      box-sizing: border-box;
      padding: 6px;
      font-size: 12px;
      border-radius: 3px;
      border: 0.3px solid rgba(0,0,0,.1);
      height:140px;
      line-height: 0;
    }
    .maxLength{
      display: inline-block;
      width:100%;
      font-size: 13px;
      text-align: right;
    }
  }
</style>
