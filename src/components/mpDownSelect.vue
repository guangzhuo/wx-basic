<template>
    <div class="SelectWrap">
      <div class="title" @click="radioSelect">{{title}} <van-icon :name="radioShow ===false?'arrow-down':'arrow-up'"></van-icon></div>
      <div class="time" v-if="noTime">
        <!--时间选择-->
        <view class="section" v-if="type === 'time'">
          <picker
            mode="date"
            :fields="fields"
            :value="currentDate"
            @change="onChangeTime">
            <view class="picker">
              {{currentDate}}<van-icon name="arrow-down"></van-icon>
            </view>
          </picker>
        </view>
        <!--筛选-->
        <div v-else>
          <view class="picker" @click="screenFun">
            筛选<van-icon :name="isShowScreen ===false?'arrow-down':'arrow-up'"></van-icon>
          </view>
        </div>
      </div>
      <!--left-->
      <div class="selecDialog" v-show="radioShow">
        <van-radio-group :value="radio" @change="onChange">
          <van-cell-group>
            <van-cell title="单选框 1"
                      clickable
                      data-name="1"
                      data-title="单选框 1"
                      @click="onClick">
              <van-radio name="1" />
            </van-cell>
            <van-cell title="单选框 2"
                      clickable
                      data-name="2"
                      data-title="单选框 2"
                      @click="onClick">
              <van-radio name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <!--right-->
      <div v-if="type!='time'">
        <!--二级筛选 isShowScreen-->
        <div class="showScreen" v-show="isShowScreen">
          <div class="listSre">
            <div class="titInfo">销售类型</div>
            <div class="selectBtn">
              <van-button
                v-for="(item, index) in btnArr1"
                :key="index"
                custom-class="btnCusetom"
                :class="index===thatIndexBtn1?'active':''"
                size="mini"
                round
                @click="clickBtn1(index, item.id)"
                :disabled="index === 0"
                type="default">{{item.btnName}}</van-button>
            </div>
          </div>
          <div class="listSre">
            <div class="titInfo">销售状态</div>
            <div class="selectBtn">
              <van-button
                v-for="(item, index) in btnArr2"
                :key="index"
                custom-class="btnCusetom"
                :class="index===thatIndexBtn2?'active':''"
                size="mini"
                round
                @click="clickBtn2(index, item.id)"
                :disabled="index === 0"
                type="default">{{item.btnName}}</van-button>
            </div>
          </div>


          <div class="BtnWrap">
            <div class="resetBtn">重置</div>
            <div class="lineclum"></div>
            <div class="okBtn">确定</div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'mpDownSelect',
    props: {
      title: {
        type: String,
        default: '全部'
      },
      time: {
        type: String,
        default: '不限时间'
      },
      fields: {
        default: 'day'
      },
      type: {
        type: String,
        default: 'time'
      },
      noTime: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        radio: '',
        radioShow: false,
        isShowScreen: false,
        thatIndexBtn1: '',
        thatIndexBtn2: '',
        btnArr1: [
          {
            btnName: '不限',
            id: '0'
          },
          {
            btnName: '计时票',
            id: '1'
          },
          {
            btnName: '场次票',
            id: '2'
          }
        ],
        btnArr2: [
          {
            btnName: '不限',
            id: '10'
          },
          {
            btnName: '已上架',
            id: '11'
          },
          {
            btnName: '已下架',
            id: '12'
          }
        ],
        currentDate: this.time
      }
    },
    methods: {
      radioSelect () {
        this.radioShow = !this.radioShow
      },
      onChange (name) {
        console.log(name)
      },
      clickBtn1 (index, id) {
        if (index === 0) {
          return false
        }
        this.thatIndexBtn1 = index
        this.$emit('changeType', id)
      },
      clickBtn2 (index, id) {
        if (index === 0) {
          return false
        }
        this.thatIndexBtn2 = index
        this.$emit('changeType', id)
      },
      /* 选择单选后数据 */
      onClick (that) {
        let dataset = that.currentTarget.dataset
        this.radio = dataset.name
        this.radioShow = false
        this.$emit('clickRadio', dataset)
      },
      /* 选择时间后数据 */
      onChangeTime (obj) {
        let date = obj.target.value
        this.currentDate = date
        this.$emit('changeTime', date)
      },
      /* 筛选 */
      screenFun () {
        console.log(this.isShowScreen)
        this.isShowScreen = !this.isShowScreen
      }
    }
  }
</script>

<style lang="scss" scoped>
.SelectWrap{
  border-bottom: .5px solid rgba(0,0,0,.1);
  height: 36px;
  background: #fff;
  line-height: 36px;
  position: relative;
  .title{
    padding: 0 6px;
    font-size: 12px;
    color:gray
  }
  .selecDialog{
    position: absolute;
    z-index: 10;
    width:100%;
    background: #fff;
  }
  .time{
    position: absolute;
    right:10px;
    top:0px;
    z-index: 2;
    font-size: 12px;
    color:gray;
    display: inline-block;
    vertical-align: middle;
    text-align: right;
  }
  /*二级搜索*/
  .showScreen{
    position: absolute;
    left:0;
    right:0;
    background: aliceblue;
    z-index: 3;
    border-bottom: 1px solid #999;
    font-size: 12px;
    .listSre{
      padding:0 10px;
    }
    .titInfo{
      /*padding-bottom: 10px;*/
    }
    .BtnWrap{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .resetBtn, .okBtn{
      width:50%;
      text-align: center;
      height:36px;
      line-height: 36px;
      background: white;
    }
    .lineclum{
      position: absolute;
      left:0;
      right: 0;
      margin:auto;
      width:1px;
      height:26px;
      background:gray;
    }
  }


}
</style>
<style lang="scss">
  .selectBtn{

    .btnCusetom{
      margin-right:10px;
    }
  }
  .active{
    .btnCusetom{
      background: red;
      color:#fff;
    }
  }
</style>
