<template>
  <div class="report-water">
    <mpSmallTitle title="杭州游泳馆·默认泳池" :rightNone="false"></mpSmallTitle>
    <mpCell
            leftTitle="水温 (℃)"
            :iconNone="false"
            inline
            placeholder="输入水温"
            v-model="waterTemp"
            type="input">
    </mpCell>
    <mpCell
            leftTitle="pH值"
            :iconNone="false"
            inline
            placeholder="输入pH值"
            v-model="PH"
            type="input">
    </mpCell>
    <mpCell
            leftTitle="日平均换水率 (%)"
            :iconNone="false"
            inline
            placeholder="输入日平均换水率"
            v-model="orderBL"
            type="input">
    </mpCell>
    <div class="mainBlock">
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
        </div>
        <div class="inlineBlcok" v-if="imagesArr.length<6">
          <div class="uploadWrap" @click="clickUpload">
            <van-icon name="plus" />
          </div>
        </div>
      </div>
    </div>
    <mpSmallTitle title="选填" :rightNone="false"></mpSmallTitle>
    <mpCell
        leftTitle="余氯 (mg/L)"
        :iconNone="false"
        inline
        placeholder="输入余氯"
        v-model="YL_Val"
        type="input">
    </mpCell>
    <mpCell
        leftTitle="总氯 (mg/L)"
        :iconNone="false"
        inline
        placeholder="输入总氯"
        v-model="all_zl"
        type="input">
    </mpCell>
    <mpCell
        leftTitle="水表读数 (m³)"
        :iconNone="false"
        inline
        placeholder="输入水量"
        v-model="water_DS"
        type="input">
    </mpCell>

    <fixedBtn name="立即上报" @click="nowUpimg"></fixedBtn>
    <van-notify id="custom-selector" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify'
  import Toast from '@/../static/vant/toast/toast'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'report-water',
    components: {
      mpSmallTitle,
      mpCell,
      fixedBtn
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
        CDN_IMG: this.CDN_IMG,
        temperature: 0,
        waterTemp: '', // 水温
        PH: '',
        orderBL: '', // 日平均换水率
        YL_Val: '', // 余氯
        all_zl: '', // 总氯
        water_DS: '', // 水表读数
        imagesArr: [],
        thatImg: 0 // 当前上传图片索引
      }
    },
    mounted () {
      console.log(this.$route.query)
    },
    methods: {
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
      /* 立即上报按钮 */
      nowUpimg () {
        if (!this.waterTemp || !this.PH || !this.orderBL) {
          Notify({
            text: '请完善必填信息',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          })
        } else {
          this.upImages()
        }
      },
      /* 循环上传 */
      upImages () {
        let that = this
        let data = {
          waterTemp: '', // 水温
          PH: '',
          orderBL: '', // 日平均换水率
          YL_Val: '', // 余氯
          all_zl: '', // 总氯
          water_DS: '' // 水表读数
        }
        /* wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', // 假的
          filePath: that.imagesArr[this.thatImg],
          name: 'file',
          formData: data,
           header: {
            "Content-Type": "multipart/form-data"
          },
          success (res) {
            // var data = res.data
            // do something
          },
          complete (complete) {
            console.log(complete)
            this.thatImg++
            if (i === that.imagesArr.length) {
              this.$fly.post(apis.api, { 'post': 'postdata' }).then((res) => {
                console.log(res)
                if (res.data.state === 1) {
                  Toast('保存成功')
                  this.$router.push({
                    path: 'water-quality'
                  })
                } else {
                  Toast('保存失败')
                }
              })
            } else if (this.thatImg < that.imagesArr.length) {
              that.upImages()
            }
          }
        }) */
      }
    }
  }
</script>

<style lang="scss" scoped>
  .report-water{
    margin-bottom: 94px;
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
    border-top: 16rpx solid #F4F6F6;
  }
  .flexHin{
    display: flex;
    height:100%;
    flex-direction: column-reverse;
  }
  .imgInfo{
    font-size: 14px;
    /*padding: 20px 0px 10px 20px;*/
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
        top:-16rpx;
        right:-16rpx;
        .closeIcon{
          width:36rpx;
          height:36rpx;
        }
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
