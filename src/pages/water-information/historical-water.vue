<template>
    <div class="historical-water">
      <mpSmallTitle title="杭州游泳馆·默认泳池" :rightNone="false"></mpSmallTitle>

      <div class="historyinfo">
        <ul class="info-ul">
          <li class="info-list">
            <span class="leftLabel">上报人</span>
            <span class="rightInfo">Jim</span>
          </li>
          <li class="info-list">
            <span class="leftLabel">上报时间</span>
            <span class="rightInfo">2018-12-15 12:21:21</span>
          </li>
        </ul>
      </div>

      <div class="mainBlock">
        <mpCell disabled
                leftTitle="水温 (℃)"
                :iconNone="false"
                placeholder="27.3"
                type="input">
          <div slot="rightInfo">
            <div class="flexHin">
              <div class="ft-info" v-html="ftInfo"></div>
            </div>
          </div>
        </mpCell>
        <mpCell disabled
                leftTitle="pH值"
                :iconNone="false"
                placeholder="27.3"
                type="input">
          <div slot="rightInfo">
            <div class="flexHin">
              <div class="ft-info" v-html="ftInfo"></div>
            </div>
          </div>
        </mpCell>
        <mpCell disabled
                leftTitle="日平均换水率 (%)"
                :iconNone="false"
                placeholder="27.3"
                type="input">
          <div slot="rightInfo">
            <div class="flexHin">
              <div class="ft-info" v-html="ftInfo"></div>
            </div>
          </div>
        </mpCell>
      </div>

      <div class="mainBlock">
        <mpCell disabled
                leftTitle="余氯 (mg/L)"
                :iconNone="false"
                placeholder="27.3"
                type="input">
        </mpCell>
        <mpCell disabled
                leftTitle="总氯 (mg/L)"
                :iconNone="false"
                placeholder="27.3"
                type="input">
        </mpCell>
        <mpCell disabled
                leftTitle="水表读数 (m³)"
                :iconNone="false"
                placeholder="27.3"
                type="input">
        </mpCell>
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
      ftInfo () {
        if (this.temperature > 50) {
          return '<span style="color:red">11</span>'
        } else if (this.temperature <= 10) {
          return '<span style="color:green">11</span>'
        } else {
          return '<span style="color:rgb(119, 187, 234)">11</span>'
        }
      }
    },
    data () {
      return {
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
    border-top: 3px solid rgba(0,0,0,.1)
  }
  .flexHin{
    display: flex;
    height:100%;
    flex-direction: column-reverse;
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
