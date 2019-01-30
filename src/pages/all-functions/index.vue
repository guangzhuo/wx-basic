<template>
    <div class="All-functions">
      <scroll-view scroll-y
                   scroll-with-animation
                   :style="{height:scroollHeight+'px'}"
                   :scroll-into-view="toView"
                   @scroll="scroll">
        <mpSmallTitle
          title="常用功能"
          @click-right="edit"
          :rightTitle="title_right">
          <view slot="smallTitle">
            <span v-if="!isEdit" class="miniTitle">(长按可拖动排序)</span>
            <ul v-if="isEdit" class="miniIconWrap">
              <li class="list-li" v-for="(item, index) in 6" :key="index">
                <!--<image class="listIcon" src=""></image>-->
                <div class="listIcon"></div>
              </li>
              <li class="list-li">
                <div class="ellipse">...</div>
              </li>
            </ul>
          </view>
        </mpSmallTitle>
        <div class="icon-list">
          <div v-if="!isEdit">
            <movable :imgData="imgData" @drag="drgaItem"></movable>
          </div>
        </div>
        <div class="tabVan" catchtouchmove="true">
          <van-tabs swipeable
                    @click="tabsClick">
            <van-tab title="日常工作" ></van-tab>
            <van-tab title="人员管理"></van-tab>
            <van-tab title="票务管理"></van-tab>
            <van-tab title="信息维护"></van-tab>
            <van-tab title="财务管理"></van-tab>
            <van-tab title="其他模块"></van-tab>
          </van-tabs>
        </div>
        <ul class="entran-ul">
          <li class="entran-list"
              v-for="(item, index) in 30"
              :class="(index+1)%4 ==0?'marginNone': ''"
              :key="index">
            <div class="imgIcon">
              <div class="add-icon" v-if="!isEdit">
                <image class="crilered"
                       mode="aspectFit"
                       @click="click_add"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/all_functions/add.png'"></image>
              </div>
            </div>
            <div class="imgTitle">我的门店{{ item.id }}</div>
          </li>
          <li id="good">
            dsdas
          </li>
        </ul>
      </scroll-view>
    </div>
</template>

<script>
  import mpSmallTitle from '@/components/mpSmallTitle'
  import movable from '@/components/movable'
  export default {
    name: 'index',
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        title_right: '编辑',
        isEdit: true,
        startMove: {
          clickIndex: '',
          clickObj: null,
          sPageX: '',
          sPageY: ''
        },
        moveObj: {
          mPageX: '',
          mPageY: ''
        },
        scroollHeight: 0,
        toView: '',
        imgData: [
          { id: 1, text: '推荐' }, { id: 2, text: 'logo设计' }, { id: 3, text: 'ui设计' }, { id: 4, text: 'css设计' }, { id: 5, text: 'js设计' }, { id: 6, text: '装修设计' }, { id: 7, text: '圣诞树1' }, { id: 8, text: '圣诞树2' }, { id: 9, text: '圣诞树3' }, { id: 10, text: '圣诞树4' }, { id: 11, text: '圣诞树5' }]
      }
    },
    computed: {
      scrollHin () {
        return {
          height: this.scroollHeight
        }
      }
    },
    mounted () {
      let that = this
      wx.getSystemInfo({
        success (res) {
          that.scroollHeight = res.windowHeight
        }
      })
    },
    methods: {
      // preventTouchMove () {},
      drgaItem (arr) {
        console.log(arr)
      },
      movableChange (ev) {
        // console.log(ev)
      },
      tabsClick (ev) {
        this.toView = ''
        this.toView = 'good'
        console.log(this.toView)
      },
      scroll (e) {
        // console.log(e)
        this.toView = ''
      },
      edit () {
        // 编辑
        this.isEdit = !this.isEdit
        this.title_right = this.isEdit ? '编辑' : '完成'
      },
      click_add (item) {
        /* this.imgData.splice(this.imgData.findIndex(that => that.id === item.id), 1) */
        this.imgData.push(item)
      }
    },
    components: {
      mpSmallTitle,
      movable
    }
  }
</script>

<style lang="scss" scoped>
  /*.thatTitle{
    font-size: 30rpx;
  }*/
  .icon-list{
    border-bottom: 16rpx solid #F4F6F6;
  }
  .miniIconWrap{
    display: inline-block;
    vertical-align: middle;
    .list-li{
      display: inline-block;
      margin: 0px 0 0px 36rpx;
      /*vertical-align:middle;*/
      .listIcon{
        width: 24rpx;
        height:26rpx;
        background: red;
      }
    }
    .ellipse{
      position:absolute;
      top:14rpx;
    }
  }

  .miniTitle{
    font-size: 24rpx;
    color:#999;
  }
  .tabVan{
    /*position: fixed;*/
    /*top:0;*/
    padding-bottom: 12rpx;
    border: 1rpx solid #EEE;
  }
  .entran-ul{
    display: flex;
    padding: 20px;
    /*justify-content: space-between;*/
    flex-wrap: wrap;
    .entran-list{
      width:65px;
      height:65px;
      text-align: center;
      margin-right:25px;
      margin-bottom:25px;
      .crilered{
        position: absolute;
        width:12px;
        height:12px;
        right:-6px;
        top:-6px;
        background: red;
        border-radius: 50%;
      }
      .imgTitle{
        font-size: 12px;
        color:#666;
      }
    }
    .marginNone{
      margin:0
    }
    .imgIcon{
      width:36px;
      height:36px;
      display: inline-block;
      position: relative;
      margin: 7px 0 5px 0;
      background: darkgray;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .Dragarea{
    width:100%;
    height:200px;
    padding: 20px;
    .entran-list{
      /*height: 44px;*/
      position: static;
    }
  }
  .smallTitle{
  font-size: 14px;
  font-weight: 600;
  margin-left: 20px;
}
</style>
<style lang="scss">
  .All-functions{
    .grayBg{
      .van-cell{
        background: #fff;
      }
    }
  }
</style>
