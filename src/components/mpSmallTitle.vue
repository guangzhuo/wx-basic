<template>
  <div class="VanCell">
    <van-cell :border="border">
      <view slot="title">
        <div class="leftTitle">
          <!--<div class="clum"></div>-->
          <div class="titleName">
            {{ title }}
            <span class="swiperInfo" v-if="swiperInfo">({{thatIndex}}/{{ swiperAll }})</span>
            <slot name="smallTitle"></slot>
          </div>
        </div>
      </view>
      <view slot="right-icon" v-if="rightNone">
        <div class="right-title" @click="clickRight">{{rightTitle}}</div>
      </view>
    </van-cell>
  </div>
</template>

<script>
  export default {
    name: 'mpCell',
    props: {
      swiperInfo: {
        type: Boolean,
        default: false
      },
      swipeIndex: {
        type: Number,
        default: 0
      },
      border: {
        type: Boolean,
        default: false
      },
      swiperAll: {
        type: Number,
        default: 1
      },
      title: {
        type: String,
        default: '我的门店'
      },
      rightNone: {
        type: Boolean,
        default: true
      },
      rightTitle: {
        type: String,
        default: '管理'
      }

    },
    data () {
      return {
        thatIndex: this.swipeIndex
      }
    },
    watch: {
      swipeIndex (newIndex, oldIndex) {
        this.thatIndex = newIndex
      }
    },
    methods: {
      clickRight () {
        this.$emit('click-right')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .leftTitle{
    font-size: 13px;
    /*line-height: normal;*/
    /*border-left: 3px solid #666;*/
    .clum{
      width:2px;
      height:13px;
      background: black;
      display: inline-block;
      vertical-align: middle;
    }
    .titleName{
      font-size: 30rpx;
      display: inline-block;
      font-weight: 500;
      vertical-align: middle;
      padding-left:10px;
    }
    .swiperInfo{
      fonts-size: 12px;
      color:#333;
    }
  }
  .right-title{
    font-size: 26rpx;
    color:#EF7C1B;
  }
</style>
