<template>
    <div class="mpSwiper">
      <div class="noData" v-if="swiperData.length === 0">
        <div class="noSwiper">
          <image mode="aspectFit"
                 :src="CDN_IMG+'/mp-admin/common/default-store.png'"
                 class="noswiperImg"  />
          <!--<div class="noInfo">水质未检测</div>-->
          <div class="bottomInfo">
            <div class="title">尚未添加门店</div>
            <van-button size="small" block custom-class="goAddstore" @click="goStore">添加门店</van-button>
          </div>
        </div>
      </div>
      <swiper
        v-else
        class="swiper"
        :autoplay="false"
        previous-margin="80rpx"
        next-margin="80rpx"
        @change="swiperChange">
        <div  v-for="(item, index) in swiperData" :key="index">
          <swiper-item>
            <div class="swiperCard"
                 @click="goHome(item)"
                 :class="swipeIndex == index ? 'active' : ''">
              <image :src="item.src" class="swiperImg"  />
              <div class="noInfo">水质未检测</div>
              <div v-if="!swipeHome" class="bottomInfo">
                <div class="title">杭州游泳馆</div>
                <div class="toDayWrap">
                  <div class="nicetoDay">今日在岗： <span class="bigft"> 5</span>人</div>
                  <div class="nicetoDay">今日在岗： <span class="bigft  redColor"> 5</span>人</div>
                </div>
                <div class="toDayWrap">
                  <div class="nicetoDay">今日在岗： <span class="bigft"> 5</span>人</div>
                  <div class="nicetoDay">今日在岗： <span class="bigft redColor"> 5</span>人</div>
                </div>
                <div class="gohome">
                  <div class="listGo">
                    <image class="cardImg"
                           mode="aspectFit"
                           v-if="CDN_IMG"
                           :src="CDN_IMG+'/mp-admin/home/card01.png'">
                    </image>今日考勤
                  </div>
                  <div class="listGo">
                    <image class="cardImg"
                           mode="aspectFit"
                           v-if="CDN_IMG"
                           :src="CDN_IMG+'/mp-admin/home/card02.png'">
                    </image>今日报警
                  </div>
                  <div class="listGo">
                    <image class="cardImg"
                           mode="aspectFit"
                           v-if="CDN_IMG"
                           :src="CDN_IMG+'/mp-admin/home/card03.png'">
                    </image>本月票务
                  </div>
                </div>
              </div>
              <div v-else class="bottomInfo swipeHome">
                <div class="title">杭州游泳馆</div>
                <div class="toDayWrap">
                  <div class="nicetoDay">
                    水温 <span class="bigft redColor"> 27</span></div>
                  <div class="nicetoDay">
                    PH值 <span class="bigft"> 5</span>人</div>
                </div>
                <div class="toDayWrap waterBlock">
                  <div class="nicetoDay">
                    日平均换水率：<span class="bigft redColor"> 100%</span>
                  </div>
                </div>
                <div class="toDayWrap">
                  <div class="nicetoDay">
                    现场客户：<span class="bigft"> 5</span>人</div>
                  <div class="nicetoDay">
                    今日警报：<span class="bigft"> 5</span>人</div>
                </div>
              </div>
            </div>
          </swiper-item>
        </div>
      </swiper>
    </div>
</template>

<script>
  export default {
    name: 'mpSwiper',
    props: {
      swiperData: {
        type: Array,
        default: []
      },
      swipeHome: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        swipeIndex: 0 // 当前轮播索引
      }
    },
    methods: {
      swiperChange (event) {
        let {current} = event.mp.detail
        this.swipeIndex = current
        // console.log(event.mp.detail)
        this.$emit('onchange', this.swipeIndex)
      },
      goHome (tm) {
        if (!this.swipeHome) {
          this.$router.push({
            path: '/pages/home/home',
            query: {id: 1}
          })
        }
        console.log(tm)
      },
      goStore () {
        this.$router.push({
          path: '/pages/my-store/add-stores'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mpSwiper{
    margin: 20px 0px 0;
  }
  .noSwiper{
    width:100%;
    .noswiperImg{
      width:400px;
      height: 214px;
      margin: 0 auto;
    }
    .title{
      font-size: 12px;
      color:#999;
    }
  }
  .noData{
    text-align: center;
    position: relative;
    .swiperCard{
      left:0;
      right:0;
      margin: auto;
      overflow: hidden;
      border-radius: 10px;
    }
  }
  .swiper{
    height:350px;
  }
  .maxWin{
    width:90%;
    height:200px;
  }
  .swiperCard{
    width:290px;
    height:335px;
    position:absolute;
    /*border: 1px solid #999;*/
    box-shadow: 1px  3px 10px rgba(0,0,0,.1);
    transform: scale3d(.89,.89,.89);
    transition:all .3s ease-in 0s;
    border-radius: 12px;
    overflow:hidden;
    .noInfo{
      position: absolute;
      left:16px;
      top:0px;
      width:67px;
      height:21px;
      line-height: 21px;
      background:linear-gradient(to right, #F8B33A, #EF7C1B);
      text-align: center;
      font-size: 11px;
      color:#fff;
    }
    .swiperImg{
      width:100%;
      height: 170px;
      background: beige;
    }
    .bottomInfo{
      width: 100%;
      height:127px;
      padding: 15px;
      .title{
        font-size: 15px;
        padding-bottom: 18px;
      }
      .waterBlock{
        margin-top: 6rpx;
        .nicetoDay{
          width:90%;
        }
      }
      .nicetoDay{
        font-size: 12px;
        width:45%;
        color:#999;
        display: inline-block;
      }
      .bigft{
        font-size: 20px;
      }
      .greenColor{
        color: green;
      }
      .redColor{
        color:red;
      }
      .gohome{
        font-size: 12px;
        text-align: center;
        position: absolute;
        left:0px;
        right:0px;
        margin:0 auto;
        bottom:10px;
        display: flex;
        padding:0 20px;
        justify-content: space-between;
        .cardImg{
          width:23px;
          height:21px;
          margin-right: 6rpx;
          margin-top:-2rpx;
          vertical-align: middle;
        }
      }
    }
  }
  .swipeHome{
    .bigft{
      font-size: 40rpx;
      color: #333;
    }
  }

  .active{
    transform: scale3d(.96,.96,.96);
    top:0;
  }
</style>
<style lang="scss">
  .bottomInfo{
    /*添加门店*/
    .goAddstore{
      width:90px;
      background: #EF7C1B;
      color:#fff;
      border-radius: 6px;
      margin-top:16px;
    }
  }
</style>
