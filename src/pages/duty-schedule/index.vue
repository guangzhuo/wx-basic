<template>
    <div class="duty-schedule">
      <mpDownSelect type="time"
                    @clickRadio="clickRadio"
                    @changeTime="changeTime"
                    fields="month"
                    :time="time"
                    :title="titleName"></mpDownSelect>
      <!--<scroll-view scroll-x>

      </scroll-view>-->
      <van-tabs swipeable custom-class="myTab">
        <van-tab :title="te1">
        </van-tab>
        <van-tab :title="te1" >
        </van-tab>
        <van-tab :title="te1" >
        </van-tab>
        <van-tab :title="te1" >
        </van-tab>
        <van-tab :title="te1" >
        </van-tab>
      </van-tabs>
      <ul class="duty-ul">
        <li class="duty-li">
          <div class="times-info">00:00</div>
          <div class="times-line"></div>
        </li>
        <li class="duty-li">
          <div class="times-info">00:00</div>
          <div class="times-line"></div>
          <div class="lineMain" @click="goDutyInfo('12')">
            阿Q、K2
          </div>
        </li>
      </ul>
      <fixedBtn leftBtn
                name="添加值班"
                @leftclick="copyClick"
                @click="addDuty"
                leftname="复制本月值班"></fixedBtn>


      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpDownSelect,
      fixedBtn
    },
    data () {
      return {
        titleName: '杭州游泳馆',
        time: '2019-01',
        te1: '周三 26'
      }
    },
    created () {
    },
    methods: {
      clickRadio () {},
      changeTime (tiem) {
        console.log(tiem)
      },
      copyClick () {
        Dialog.confirm({
          confirmButtonText: '立即复制',
          title: '复制本月值班到下个月',
          message: '复制后，下个月对应日期的值班与本月值班一致，确认复制？'
        }).then(() => {
          // on confirm
          // this.$fly.post(apis.api, {}).then(data => {})
        }).catch(() => {
          // on cancel
        })
      },
      goDutyInfo (id) {
        this.$router.push({
          path: 'duty-info',
          query: {id: id}
        })
      },
      addDuty () {
        this.$router.push({
          path: 'add-duty'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .duty-schedule{
    margin-bottom: 92px;
  }
.duty-li{
  width:100%;
  box-sizing: border-box;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  .times-info{
    width:12%;
    margin-left: 10px;
    font-size: 12px;
    color: rgba(0,0,0,.6);
  }
  .times-line, .lineMain{
    width:85%;
    position: absolute;
    right: -1px;
    top:8px;
    height: .5px;
    background: rgba(0,0,0,.2);
  }
  .lineMain{
    box-sizing: border-box;
    height:100%;
    background:rgba(239,124,27,.1);
    font-size: 24rpx;
    border-left: 1rpx solid #EF7C1B;
    color:#333;
    padding: 6px;
  }
}
</style>
<style lang="scss">
  .duty-schedule{
    .myTab{
      padding-top:80px;
      .van-tabs__wrap{
        height: initial;
        /*border-bottom:  3px solid black;*/
      }
      .van-tab--active{
        background: #EF7C1B;
        color:#fff;
      }
      .van-tabs__line{
        opacity: 0;
      }
      .van-tab{
        width:70px;
        height:70px;
        padding:0 23px;
        border: 0.5rpx solid rgba(0,0,0,.1);
        line-height:24px;
        display:flex;
        align-items:center;
      }
      .van-ellipsis{
        white-space: normal;
      }
    }
  }

</style>
