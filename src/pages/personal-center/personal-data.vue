<template>
    <div class="personal-data">
      <van-cell
        title="头像"
        class="phoneCenter"
        :clickable="false"
        @click="Photograph"
        is-link>
        <image class="myPhone" :src="imgURL"></image>
      </van-cell>
      <mpCell inline
              leftTitle="姓名"
              :iconNone="false"
              v-model="name"></mpCell>
      <mpCell inline
              leftTitle="姓名"
              :iconNone="false"
              v-model="mobile"></mpCell>
      <div class="my-block">
        <mpCell inline
                leftTitle="微信号码"
                v-model="WX_name"
                placeholder="请输入微信号"
                :iconNone="false">
          <div slot="rightInfo">
            <div class="rightText">同手机号码</div>
          </div>
        </mpCell>
        <mpCell inline
                :slot_main="false"
                :iconNone="false"
                leftTitle="性别">
          <div slot="slotMain">
            <div class="Gender" >
              <div class="nderList"
                   :class="sexThat==='1'?'active': ''"
                   @click.stop="sexCall('1')">男</div>
              <div class="nderList"
                   :class="sexThat==='2'?'active': ''"
                   @click.stop="sexCall('2')">女</div>
            </div>
          </div>
        </mpCell>
        <mpCell inline
                leftTitle="姓名"
                :iconNone="false"
                v-model="identity_type"></mpCell>
      </div>


      <fixedBtn name="保存" @click="save"></fixedBtn>

      <van-toast id="van-toast" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>
    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  import Toast from '@/../static/vant/toast/toast'
  export default {
    name: 'personal-data',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        imgURL: '', // 图片临时地址
        name: '田庚云',
        mobile: '18712345678',
        WX_name: '',
        sexThat: '', // 性别
        identity_type: '总管主'
      }
    },
    created () {
    },
    methods: {
      /* 拍照 */
      Photograph () {
        let that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'],
          success (res) {
            let {size} = res.tempFiles[0]
            const maxSize = 5 * 1024 * 1024
            if (maxSize > size) {
              that.imgURL = res.tempFiles[0].path
              console.log(that.imgURL)
              // console.log(res.tempFiles[0])
            } else {
              Toast('图片过大，请重新上传')
            }
          }
        })
      },
      /* 男 女 */
      sexCall (that) {
        console.log(that)
        this.sexThat = that
      },
      /* 保存 */
      save () {
        /*
         * name: '田庚云',
        mobile: '18712345678',
        WX_name: '',
        sexThat: '', // 性别
        identity_type: '总管主' */
        Toast('保存成功')
        this.$router.replace({
          path: '/pages/personal-center/index'
        })
      },
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
  .personal-data{
    padding-bottom: 148rpx;
  }
  .myPhone{
    width: 120rpx;
    height:120rpx;
    box-sizing: border-box;
    border: 2rpx solid white;
    border-radius: 50%;
    display: inline-block;
    background:#000;
    vertical-align: middle;
  }
  .my-block{
    margin-top: 16rpx;
    .rightText{
      font-size: 26rpx;
      color:#999;
    }
    .Gender{
      .nderList{
        width:88rpx;
        height:40rpx;
        text-align: center;
        line-height: 40rpx;
        font-size: 22rpx;
        color:#333;
        background:rgba(242,242,242,1);
        border-radius:35px;
        display: inline-block;
        margin-right: 20rpx;
      }
      .active{
        background:rgba(253,241,232,1);
        color:#EF7C1B;
      }
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .phoneCenter{
    .van-cell{
      align-items: center;
    }
  }
</style>
