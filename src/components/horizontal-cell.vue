<template>
  <div class="horizontal-cell">
    <van-cell @click="cellCall">
      <view slot="title">
        <div class="felxSpce">
          <view class="van-cell-text">{{ title }}</view>
          <input v-if="typeInput === 'text'"
                 v-model="value"
                 :disabled="disabled"
                 type="text"
                 class="ipt"
                 @input="inputCall"
                 :placeholder="placeholder"  />
          <input v-else
                 v-model="value"
                 :disabled="disabled"
                 type="number"
                 class="ipt"
                 @input="inputCall"
                 :placeholder="placeholder"  />
        </div>
      </view>
      <view slot="right-icon" v-if="rightIcon">
        <div class="rightArrow">
          <van-icon name="arrow" />
        </div>
      </view>
    </van-cell>
  </div>
</template>

<script>
  export default {
    name: 'horizontal-cell',
    props: {
      title: {
        type: String,
        default: 'title'
      },
      rightIcon: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '输入手机号码'
      },
      value: {
        type: String,
        default: ''
      },
      typeInput: {
        type: String,
        default: 'text'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      inputCall () {
        this.$emit('input', this.value)
      },
      cellCall () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .felxSpce{
    display: flex;
    justify-content: space-between;
    padding:10px 0;
    .van-cell-text{
      width:80px;
      vertical-align: middle;
    }
    .ipt{
      width: 90%;
      text-align: left;
      vertical-align: middle;
      font-size: 15px;
    }
  }
  .rightArrow{
    display: flex;
    height: 100%;
    align-items: center;
  }
</style>
