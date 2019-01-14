<template>
    <div class="cardWater">
      <ul class="water-ul">
        <li class="water-list firstBg">
          <div class="winCon waterContariner">监测内容</div>
          <div class="winCon waterBZ">合格标准</div>
          <div class="winCon waterResult">监测结果</div>
        </li>
        <li class="water-list" :class="index%2!=0? 'twoBG':''" v-for="(item, index) in waterData" :key="index">
          <div class="winCon waterContariner">{{item.info}}</div>
          <div class="winCon waterBZ">{{item.bz}}</div>
          <div class="winCon waterResult">{{item.result}}</div>
          <div class="winCon waterIcon"></div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'cardWater',
    props: {
      waterData: {
        default: [
          {
            info: '水温',
            bz: '22',
            result: '33'
          },
          {
            info: 'PH值',
            bz: '22',
            result: '33'
          },
          {
            info: '日平均换水率',
            bz: '22',
            result: '33'
          }
        ]
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
.cardWater{
  width:90%;
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
  .water-list{
    background: rgba(0,0,0,.1);
    line-height: 30px;
    font-size: 13px;
    padding: 0 6px;
  }
  .twoBG{
    background: rgba(0,0,0,.2);
  }
  .winCon{
    display: inline-block;
  }
  .waterContariner{
    width: 35%
  }
  .waterBZ{
    width: 25%;
  }
  .waterResult{
    width:25%;
  }
  .waterIcon{
    width: 30px;
    height:30px;
    vertical-align: middle;
    background: darkgray;
  }
  .firstBg{
    background: #daedfc;
  }
}
</style>
