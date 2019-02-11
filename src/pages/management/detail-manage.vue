<template>
    <div class="detail-manage">
      <mpCell leftTitle="门店名称"
              inline
              :iconNone="false"
              v-model="Pname"
              placeholder="门店名称"
      ></mpCell>

      <!--省市区-->
      <van-cell>
        <div slot="title">
          <view class="area">
            <div class="van-left-text">省市区</div>
            <div class="area-ipt" @click="showPopup">{{ city }}</div>
          </view>
          <van-popup
            :show="popupShow"
            position="bottom"
            @close="popupClose">
            <van-area  value="652702"
                        @cancel="cancel"
                       @confirm="confirmArea"
                       :area-list="areaList" />
          </van-popup>
        </div>
        <div slot="right-icon">
          <div class="rightEye">
            <van-icon size="20px" name="arrow-down" />
          </div>
        </div>
      </van-cell>

      <mpCell leftTitle="详细地址"
              inline
              :iconNone="false"
              v-model="address"
              placeholder="详细地址"
      ></mpCell>
      <mpCell leftTitle="联系方式"
              inline
              :iconNone="false"
              v-model="mobile"
              placeholder="联系方式"
      ></mpCell>
      <div class="man-blok">
        <div class="yc-info">
          <div class="yc-title">营业时间</div>
          <div class="add-yc-wrap">
            <mpCell v-for="(item, index) in HoursData"
                    :key="index"
                    type="input"
                    disabled
                    border
                    leftTitle="工作日"
                    @click="goCharging('qqq')"
                    placeholder="8:00-21:00">
              <van-icon size="20px" name="arrow" />
            </mpCell>
            <navigator hover-class="none" url="business-hours">
              <div class="addYc">
                <image class="crileIcon"
                       mode="aspectFit"
                       v-if="CDN_IMG"
                       :src="CDN_IMG+'/mp-admin/common/add.png'"></image>添加营业时间
              </div>
            </navigator>
          </div>
        </div>
      </div>
      <div class="man-blok">
        <van-cell :border="false">
          <view slot="title">
            <div class="imgInfo">上传照片 (最多6张，单张不超过5MB)</div>
          </view>
        </van-cell>
        <div class="listImg">
          <div class="images"
               v-for="(item, index) in imagesArr"
               :key="index"
               v-if="imagesArr.length>0">
            <image class="thatImg" :src="item.path"></image>
            <div class="closeImg"  @click="closeImg(item)">
              <image class="closeIcon"
                     mode="aspectFit"
                     v-if="CDN_IMG"
                     :src="CDN_IMG+'/mp-admin/water-information/close.png'"></image>
            </div>
            <!--封面 第一张-->
            <div class="cover" v-if="index===0">封面</div>
          </div>
          <div class="inlineBlcok" v-if="imagesArr.length<6">
            <div class="uploadWrap" @click="clickUpload">
              <van-icon name="plus" />
            </div>
          </div>
        </div>
      </div>
      <fxiedBtn name="保存" @click="save"></fxiedBtn>
      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fxiedBtn from '@/components/fixed-btn'
  import Toast from '@/../static/vant/toast/toast'
  import Dialog from '@/../static/vant/dialog/dialog'
  import areaList from './area'
  import apis from '@/http/apis'
  export default {
    name: 'detail-manage',
    components: {
      mpCell,
      fxiedBtn
    },
    data () {
      return {
        CDN_IMG: this.CDN_IMG,
        Pname: '未完善',
        old_Pname: '未完善',
        address: '翡翠城',
        old_address: '翡翠城',
        mobile: '13456930128',
        old_mobile: '13456930128',
        city: '3333',
        old_city: '3333',
        HoursData: ['1'], // 营业时间
        old_HoursData: ['1'], // 营业时间
        imagesArr: [], // 图片数组
        old_imagesArr: [], // 图片数组
        areaData: [], // 选择后的省市区
        areaList: areaList, // 省市区数据源
        popupShow: false, // 地区show,
        isSave: '1'
      }
    },
    mounted () {
      console.log(this.areaList)
    },
    onUnload () {
      console.log(this.isSetData())
      if (this.isSetData() === '2') {
        /* Dialog.confirm({
          title: '保存提示',
          message: '你未保存修改的信息，是否保存？',
          cancelButtonText: '不保存',
          confirmButtonText: '保存'
        }).then(() => {
        }).catch(() => {
        }) */
        /* wx.navigateTo({
          url: 'detail-manage'
        }) */
      }
      return false
    },
    methods: {
      showPopup () {
        this.popupShow = true
      },
      /* 关闭地区显示 */
      popupClose () {
        this.popupShow = false
      },
      cancel () {
        this.popupShow = false
      },
      /* 选择后的省市区 */
      confirmArea (ev) {
        console.log(ev)
        let values = ev.mp.detail.values // [{code,name},{},{}]
        var names = ''
        this.city = ''
        for (let i of values) {
          names += i.name
        }
        this.popupShow = false
        this.city = names
        this.areaData = values
      },
      /* 拍照上传 */
      clickUpload () {
        let that = this
        if (this.imagesArr.length > 5) {
          Notify({
            text: '最多6张图片',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          })
          return false
        }
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'],
          success (res) {
            let {size} = res.tempFiles[0]
            const maxSize = 5 * 1024 * 1024
            if (maxSize > size) {
              that.imagesArr.push(res.tempFiles[0])
            } else {
              Notify({
                text: '图片过大，请重新上传',
                duration: 3000,
                selector: '#custom-selector',
                backgroundColor: '#1989fa'
              })
            }
            console.log(that.imagesArr)
          }
        })
      },
      /* 删除图片 */
      closeImg (item) {
        console.log(item)
        let index = this.imagesArr.findIndex(data => data.path === item.path)
        this.imagesArr.splice(index, 1)
      },
      /* 保存 */
      save () {
      },
      /* 是否有修改过 */
      isSetData () {
        if (this.Pname !== this.old_Pname || this.address !== this.old_address || this.mobile !== this.old_mobile || this.city !== this.old_city || this.HoursData.length !== this.old_HoursData.length || this.imagesArr.length !== this.old_imagesArr.length) return '2'
      },
      /* 去营业时间详情 */
      goCharging () {
        wx.navigateTo({
          url: '/pages/management/business-hours'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-manage{
    padding-bottom: 148rpx;
  }
  .area{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .van-left-text{
    font-size:30rpx;
    font-weight:500;
    color:#333;
    margin-right: 20rpx;
    display: inline-block;
  }
  .area-ipt{
    display: inline-block;
    vertical-align: middle;
    width: 520rpx;
  }
  .rightEye{
    color:#C8C8C8;
    display: flex;
    height:100%;
    align-items: center;
  }
.man-blok{
  border-top: 16rpx solid #F4F6F6;
}
.yc-info{
  .yc-title{
    font-size: 28rpx;
    color:#999;
    padding: 32rpx 0 32rpx 30rpx;
    background: #F4F6F6;
    /*border-bottom: 1rpx solid #EEEEEE;*/
  }
}
.add-yc-wrap{
  background: #fff;
  padding-top:10px;
  padding-bottom: 30rpx;
  .crileIcon{
    width:30rpx;
    height:30rpx;
    border-radius: 50%;
    margin-right: 6rpx;
  }
  .addYc{
    width:80%;
    text-align: center;
    font-size: 30rpx;
    color:#EF7C1B;
    padding-top: 34rpx;
    margin: 0 auto;
    color:#EF7C1B;
  }
}

/*拍照*/
.imgInfo{
  font-size: 14px;
}
.listImg{
  padding: 6px 10px;
  .images{
    width:216rpx;
    height:216rpx;
    margin: 0 5px;
    display: inline-block;
    background: darkgray;
    position: relative;
    .thatImg{
      position: absolute;
      width:100%;
      height:100%;
    }
    .closeImg{
      position: absolute;
      top:-19rpx;
      right:-16rpx;
      .closeIcon{
        width:36rpx;
        height:36rpx;
      }
    }
    .cover{
      position: absolute;
      left:0;
      top:0;
      width:60rpx;
      height:30rpx;
      line-height: 30rpx;
      background:linear-gradient(to right, #F8B33A, #EF7C1B);
      border-radius:0px 0px 4rpx 0px;
      text-align: center;
      font-size: 20rpx;
      color: #FFF;
    }
  }
}
.inlineBlcok{
  display: inline-block;
  vertical-align:top;
}
.uploadWrap{
  width:216rpx;
  height:216rpx;
  border-radius: 6px;
  border: .5px solid rgba(0,0,0,.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">

</style>
