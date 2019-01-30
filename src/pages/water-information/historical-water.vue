<template>
    <div class="historical-water">
      <mpSmallTitle title="杭州游泳馆·默认泳池" :rightNone="false"></mpSmallTitle>
      <mpCell
              leftTitle="上报人"
              inline
              :iconNone="false"
              v-model="upName"
              placeholder="27.3"
              type="input">
      </mpCell>
      <mpCell
              leftTitle="上报时间"
              :iconNone="false"
              inline
              v-model="upTime"
              placeholder="27.3"
              type="input">
      </mpCell>
      <div class="mainBlock">
        <mpCell :slot_main="false"
                leftTitle="水温 (℃)"
                :iconNone="false"
                inline>
          <div slot="slotMain">
            <div class="flexHin">
              <div class="argum">27.3</div>
              <div class="miniBtn max">偏高</div>
              <!--<div class="miniBtn cent">适宜</div>-->
              <!--<div class="miniBtn min">偏低</div>-->
            </div>
          </div>
          <!--<div slot="rightInfo">

          </div>-->
        </mpCell>
        <mpCell :slot_main="false"
                leftTitle="pH值"
                inline
                :iconNone="false">
          <div slot="slotMain">
            <div class="flexHin">
              <div class="argum">27.3</div>
              <!--<div class="miniBtn max">偏高</div>-->
              <div class="miniBtn cent">适宜</div>
              <!--<div class="miniBtn min">偏低</div>-->
            </div>
          </div>
        </mpCell>
        <mpCell :slot_main="false"
                leftTitle="日平均换水率 (%)"
                inline
                :iconNone="false">
          <div slot="slotMain">
            <div class="flexHin">
              <div class="argum">27.3</div>
              <!--<div class="miniBtn max">偏高</div>-->
              <!--<div class="miniBtn cent">适宜</div>-->
              <div class="miniBtn min">偏低</div>
            </div>
          </div>
        </mpCell>
        <mpCell
                leftTitle="余氯 (mg/L)"
                inline
                :iconNone="false"
                placeholder="27.3"
                type="input">
        </mpCell>
        <mpCell inline
                leftTitle="总氯 (mg/L)"
                :iconNone="false"
                placeholder="27.3"
                type="input">
        </mpCell>
        <mpCell inline
                leftTitle="水表读数 (m³)"
                :iconNone="false"
                placeholder="27.3"
                type="input"></mpCell>
      </div>


      <div class="mainBlock">
        <div class="imgInfo">照片信息</div>
        <div class="listImg">
          <img src="" alt="" class="images">
          <img src="" alt="" class="images">
        </div>
      </div>
    </div>
</template>

<script>
  import mpSmallTitle from '@/components/mpSmallTitle'
  import mpCell from '@/components/mpCell'
  import apis from '@/http/apis'
  export default {
    name: 'historical-water',
    components: {
      mpSmallTitle,
      mpCell
    },
    computed: {
    },
    data () {
      return {
        upName: '天田天田',
        upTime: '2018-12-12 12:23:23',
        temperature: 0
      }
    },
    mounted () {
      console.log(this.$route.query)
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .historical-water{
    /*margin-bottom: 72px;*/
  }
  .info-ul{
    padding: 10px;
    .info-list{
      margin-bottom: 10px;
      font-size: 12px;
      .leftLabel{
        color:#969696;
        display: inline-block;
        width:60px;
      }
      .rightInfo{
        color:rgba(0,0,0,.6)
      }
    }
  }
  .mainBlock{
    border-top: 12rpx solid #F4F6F6;
  }
  .flexHin{
    display: flex;
    height:100%;
    align-items: center;
    margin-top: 6rpx;
    .argum{
      font-size: 30rpx;
      color:#666;
      padding-right: 8rpx;
    }
    .miniBtn{
      width: 60rpx;
      height:30rpx;
      text-align: center;
      line-height: 30rpx;
      color:#fff;
      font-size: 20rpx;
    }
    .max{
      background:linear-gradient(to right, #FF8A65, #FFBFBF);
    }
    .cent{
      background:linear-gradient(to right, #32CCB9, #CFF6F9);
    }
    .min{
      background:linear-gradient(to right, #56BAE8, #C2E6F8);
    }

  }
  .imgInfo{
    font-size: 14px;
    padding: 20px 0px 10px 20px;
  }
  .listImg{
    padding: 6px 10px;
    .images{
      width: 100px;
      height:100px;
      margin: 0 6px;
      display: inline-block;
      background: darkgray;
    }
  }

</style>
