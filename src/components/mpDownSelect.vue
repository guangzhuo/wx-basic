<template>
  <div class="SelectWrap">
      <div class="title" @click="radioSelect">
        <div class="ellips">{{title}}</div>
        <van-icon class="vertical"
                  size="7px"
                  :name="radioShow ===false?'arrow-down':'arrow-up'"></van-icon>
        <!--left-->
        <div class="selecDialog" v-show="radioShow">
          <van-radio-group :value="radio">
              <van-cell-group>
                <van-cell v-for="(item, index) in selArr"
                          :key="index"
                          clickable
                          :data-id="item.id"
                          :data-title="item.title"
                          @click.stop="onClick('allPool', $event)">
                  <view slot="title">
                    <view
                      class="radioTitle"
                      :class="radio==item.id?'colorActive':''">
                      {{ item.title }}
                    </view>
                  </view>
                  <van-radio :name="item.id" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
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
              {{currentDate}}<van-icon size="7px" name="arrow-down"></van-icon>
            </view>
          </picker>
        </view>
        <!--筛选-->
        <div class="SX_select" v-else>
          <view class="picker" @click="screenFun">
            {{ sx_title }}
            <van-icon
              size="7px"
              :name="isShowScreen ===false?'arrow-down':'arrow-up'">
            </van-icon>
          </view>
            <!--right-->
          <div v-if="type!='time'&&type!=='radioCk'">
            <!--二级筛选 isShowScreen-->
            <div class="showScreen" v-show="isShowScreen">
              <div class="listSre"
                   v-for="(list, stIndex) in btnArr1"
                   :key="stIndex">
                <div class="titInfo">{{ list.title }}</div>
                <div class="selectBtn">
                  <van-button
                    v-for="(item, index) in list.btnList"
                    :key="index"
                    custom-class="btnCusetom"
                    :class="item.id===thatIndexBtn1.id?'active':''"
                    size="mini"
                    round
                    @click.stop="clickBtn1(item)"
                    type="default">{{item.btnName}}</van-button>
                </div>
              </div>
              <div class="listSre"
                   v-for="(sitem, fsIndex) in btnArr2"
                   :key="fsIndex">
                <div class="titInfo">{{ sitem.title }}</div>
                <div class="selectBtn">
                  <van-button
                    v-for="(item, index) in sitem.btnList"
                    :key="index"
                    custom-class="btnCusetom"
                    :class="item.id===thatIndexBtn2.id?'active':''"
                    size="mini"
                    round
                    @click.stop="clickBtn2(item)"
                    type="default">{{item.btnName}}</van-button>
                </div>
              </div>
              <div class="BtnWrap">
                <div class="resetBtn" @click.stop="resetBtn">重置</div>
                <!--<div class="lineclum"></div>-->
                <div class="okBtn" @click.stop="selectOk">确定</div>
              </div>
            </div>
          </div>
          <!--单选筛选-->
          <div class="selecDialog" v-if="type==='radioCk'">
            <div v-show="isRadioCk">
              <van-radio-group :value="Ck_radio">
                <van-cell-group>
                  <van-cell v-for="(item, index) in CK_radioArr"
                            :key="index"
                            clickable
                            :data-id="item.id"
                            :data-title="item.title"
                            @click.stop="onClick('radioCk', $event)">
                      <view slot="title">
                        <view
                          class="radioTitle"
                          :class="Ck_radio==item.id?'colorActive':''">
                          {{ item.title }}
                        </view>
                      </view>
                      <van-radio :name="item.id" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!noTime">
        <slot name="rightMy"></slot>
      </div>

    <div class="bgGray" v-if="radioShow || isShowScreen || isRadioCk">
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
      selArr: {
        type: Array,
        default: []
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
      sx_title: {
        type: String,
        default: '筛选'
      },
      btnArr1: {
        type: Array,
        default: [
          {
            title: '销售类型',
            btnList: [
              {
                btnName: '不限',
                id: '0'
              },
              {
                id: '1',
                btnName: '计时票'
              },
              {
                btnName: '场次票',
                id: '2'
              }
            ]
          }
        ]
      },
      btnArr2: {
        type: Array,
        default: [
          {
            title: '销售状态',
            btnList: [
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
            ]
          }
        ]
      },
      noTime: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        radio: '',
        Ck_radio: '',
        thatRadio: '0',
        radioShow: false,
        isRadioCk: false,
        isShowScreen: false,
        thatIndexBtn1: '',
        thatIndexBtn2: '',
        currentDate: this.time,
        CK_radioArr: [
          {title: '救生员负责人', id: '1'},
          {title: '救生员主管', id: '2'},
          {title: '救生员', id: '3'}
        ]
      }
    },
    methods: {
      radioSelect () {
        this.radioShow = !this.radioShow
        // this.radioShow === true ? this.bgGray = true : this.bgGray = false
        this.isShowScreen = false
        this.isRadioCk = false
      },
      onChange (name) {
        console.log(name)
      },
      clickBtn1 (item) {
        this.thatIndexBtn1 = item
        // this.$emit('changeType', id)
      },
      clickBtn2 (item) {
        this.thatIndexBtn2 = item
        // this.$emit('changeType', id)
      },
      /* 选择单选后数据 */
      onClick (type, that) {
        let dataset = that.currentTarget.dataset
        if (type === 'allPool') {
          this.radio = dataset.id
          this.thatRadio = dataset.id
          this.radioShow = false
          this.title = dataset.title
          this.$emit('clickRadio', dataset)
        } else {
          this.Ck_radio = dataset.id
          this.thatRadioCk = dataset.id
          this.isRadioCk = false
          this.sx_title = dataset.title
          console.log(this.thatRadioCk)
          this.$emit('clickRadioCK', dataset)
        }
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
        this.isShowScreen = false
      },
      /* 筛选 */
      screenFun () {
        if (this.type === 'radioCk') {
          this.isRadioCk = !this.isRadioCk
          this.radioShow = false
        } else {
          this.isShowScreen = !this.isShowScreen
          this.radioShow = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bgGray{
    position: fixed;
    top:90rpx;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.4);
    z-index: 11;
  }

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
      padding-left: 8rpx;
    }
  }
  .selecDialog{
    position: absolute;
    left:0;
    top: 90rpx;
    z-index: 12;
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
    /*top:90rpx;*/
    width:50%;
    text-align: right;
    margin-right: 30rpx;
    font-size: 30rpx;
    color:#333;
    display: inline-block;
    vertical-align: middle;
  }
  .SX_select{
    /*width:50%;*/
    /*height: 474rpx;*/
    text-align: right;
  }
  /*二级搜索*/
  .showScreen{
    position: absolute;
    z-index: 12;
    height: auto;
    left:0;
    right:0;
    background: #fff;
    text-align: left;
    border-bottom: 1px solid #999;
    font-size: 12px;
    .listSre{
      padding:0 10px;
    }
    .titInfo{
      color:#666666;
      padding-bottom: 20rpx;
      padding-top: 32rpx;
      line-height: normal;
      font-size: 26rpx;
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
      height:90rpx;
      font-size: 36rpx;
      line-height: 90rpx;
      background: white;
    }
    .resetBtn{
      background: #fff;
      border-top: .5rpx solid #EEEEEE;
      color:#333333;
    }
    .okBtn{
      color:#fff;
      border-top: .5rpx solid #EF7C1B;
      background: #EF7C1B;
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
      width:220rpx;
      height:70rpx;
      line-height: 70rpx;
      font-size: 28rpx;
      background:rgba(242,242,242,1);
      border-radius:8px;
      margin-right: 10rpx;
    }
  }
  .active{
    .btnCusetom{
      background:rgba(253,241,232,1);
      color: #EF7C1B;
    }
  }
  .colorActive{
      color:#EF7C1B;
  }
</style>
