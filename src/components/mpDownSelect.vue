<template>
    <div class="SelectWrap">
      <div class="title" @click="radioSelect">
        <div class="ellips">{{title}}</div>
        <van-icon class="vertical" :name="radioShow ===false?'arrow-down':'arrow-up'"></van-icon>
        <!--left-->
        <div class="selecDialog" v-show="radioShow">
            <div>
              <van-radio-group :value="radio">
                <van-cell-group>
                  <van-cell clickable
                            data-name="1"
                            v-for="(item, index) in 2"
                            :key="index"
                            data-title="单选框 1"
                            @click.stop="onClick">
                    <view slot="title">
                      <view
                        class="radioTitle" :class="thatRadio=='1'?'colorActive':''">
                        单选框 1
                      </view>
                    </view>
                    <van-radio name="1" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </div>
        </div>
      </div>
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
        <div class="SX_select" v-else>
          <view class="picker" @click="screenFun">
            筛选
            <van-icon
              :name="isShowScreen ===false?'arrow-down':'arrow-up'">
            </van-icon>
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
                      @click.stop="clickBtn1(index, item.id)"
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
                      @click.stop="clickBtn2(index, item.id)"
                      :disabled="index === 0"
                      type="default">{{item.btnName}}</van-button>
                  </div>
                </div>
                <div class="BtnWrap">
                  <div class="resetBtn" @click.stop="resetBtn">重置</div>
                  <div class="lineclum"></div>
                  <div class="okBtn" @click.stop="selectOk">确定</div>
                </div>
              </div>
            </div>
          </view>
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
        thatRadio: '0',
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
        this.isShowScreen = false
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
        console.log(that)
        let dataset = that.currentTarget.dataset
        this.radio = dataset.name
        this.thatRadio = dataset.name
        console.log(this.radio)
        this.radioShow = false
        this.$emit('clickRadio', dataset)
      },
      /* 选择时间后数据 */
      onChangeTime (obj) {
        let date = obj.target.value
        this.currentDate = date
        this.$emit('changeTime', date)
      },
      /* 重置 */
      resetBtn () {
        this.thatIndexBtn1 = ''
        this.thatIndexBtn2 = ''
      },
      /* 筛选确定 */
      selectOk () {
        let obj = {
          btn1: this.thatIndexBtn1,
          btn2: this.thatIndexBtn2
        }
        this.$emit('screenVal', JSON.stringify(obj))
      },
      /* 筛选 */
      screenFun () {
        this.isShowScreen = !this.isShowScreen
        this.radioShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
.SelectWrap{
  border-bottom: .5px solid rgba(0,0,0,.1);
  height: 90rpx;
  background: #fff;
  line-height: 90rpx;
  position: relative;
  display: flex;
  justify-content: space-between;
  .title{
    padding: 0 6px;
    font-size: 30rpx;
    color:#333;
    flex:1;
    text-align: left;
    margin-left: 30rpx;
    .ellips{
      max-width:260rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }
    .vertical{
      vertical-align: middle;
    }
  }
  .selecDialog{
    position: absolute;
    left:0;
    top: 90rpx;
    z-index: 10;
    width:100%;
    background: #fff;
    .radioTitle{
      text-align: left;
      padding-left: 30rpx;
    }
  }
  .time{
    /*position: absolute;*/
    /*right:10px;*/
    /*top:0px;*/
    width:50%;
    text-align: right;
    margin-right: 30rpx;
    z-index: 2;
    font-size: 30rpx;
    color:#333;
    display: inline-block;
    vertical-align: middle;
  }
  .SX_select{
    /*width:50%;*/
    text-align: center;
  }
  /*二级搜索*/
  .showScreen{
    position: absolute;
    left:0;
    right:0;
    background: aliceblue;
    text-align: left;
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
  .colorActive{
      color:#EF7C1B;
  }
</style>
