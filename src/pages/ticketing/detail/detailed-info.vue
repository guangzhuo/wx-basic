<template>
  <div class="perfecting-business">
    <div class="textareaBok">
      <mpTextarea isTitle
                  text="详细信息"
                  placeholder="请输入详细内容"
                  @areaVal="detailCall"
                  max="250"></mpTextarea>
    </div>
    <div class="textareaBok">
      <mpTextarea isTitle
                  text="购买须知"
                  placeholder="请输入购买须知内容"
                  @areaVal="purchaseCall"
                  max="250"></mpTextarea>
    </div>
    <div v-if="refer==='sceneTick'">
      <mpCell inline
              :iconName="false"
              placeholder="请输入距离开始时间前几分钟"
              v-model="firstTime"
              leftTitle="最早入场(分钟)"></mpCell>
      <mpCell inline
              :iconName="false"
              placeholder="请输入距离结束时间前几分钟"
              v-model="endTime"
              leftTitle="最晚入场(分钟)"></mpCell>
    </div>
    <div v-if="refer==='newTimeTick'">
      <mpCell inline
              :iconName="false"
              placeholder="超过该分钟数按1小时计算收费"
              v-model="endTime"
              leftTitle="时间限制(分钟)"></mpCell>
    </div>
    <mpCell inline
            :iconName="false"
            placeholder="请输入购买多少天内有效"
            v-model="dayTime"
            leftTitle="有效时间(天)"></mpCell>
    <mpSmallTitle title="选填" :rightNone="false"></mpSmallTitle>
    <div class="labelWrap">
      <div class="lab_title">其他标签</div>
      <van-checkbox-group :value="resultCheck" @change="onChange">
        <van-checkbox
          v-for="(item, index) in Checklist"
          :key="index"
          :class="index%4===0?'marginNone': ''"
          @click="boxClick(item)"
          use-icon-slot
          :name="item.id">
          <div slot="icon">
            <div class="checkoboxBtn"
                 :class="item.isActive?'active': ''">
              {{ item.name }}
              <div class="posion_close"
                   v-if="item.isActive">
                <van-icon class="posionCenter"
                          size="11px"
                          name="cross" />
              </div>
            </div>
          </div>
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <fixedBtn @click="save" name="保存"></fixedBtn>
    <div id="theme">
      <van-dialog id="van-dialog" />
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import mpTextarea from '@/components/remarks-textarea'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  import apis from '@/http/apis'
  export default {
    name: 'detailed-info',
    components: {
      mpCell,
      mpTextarea,
      mpSmallTitle,
      fixedBtn
    },
    data () {
      return {
        refer: '',
        va_one: '',
        va_two: '',
        firstTime: '', // 最早入场
        endTime: '', // 最晚入场
        dayTime: '', // 有效时间
        resultCheck: [], // 当前多选中的值
        Checklist: [
          {id: '0', name: '免预约', isActive: false},
          {id: '1', name: '随时退', isActive: false},
          {id: '2', name: '过期退', isActive: false}
        ]
      }
    },
    mounted (e) {
      this.refer = this.$mp.query.refer
      console.log(this)
    },
    methods: {
      /* 详细信息 */
      detailCall (val) {
        console.log(val)
        this.va_one = val
        console.log(this.va_one)
      },
      /* 购买须知 */
      purchaseCall (val) {
        console.log(val)
        this.va_two = val
      },
      boxClick (ev) {
        // 当前数组的索引
        let indexID = this.resultCheck.findIndex(data => data === ev.id)
        // 找到显示焦点的索引
        let activeID = this.Checklist.findIndex(data => data.id === ev.id)
        if (indexID !== -1) {
          this.resultCheck.splice(indexID, 1)
          this.Checklist[activeID].isActive = false
        } else {
          this.resultCheck.push(ev.id)
          this.Checklist[activeID].isActive = true
        }
      },
      save () {
        wx.navigateTo({
          url: 'tickets'
        })

        Dialog.confirm({
          title: '保存成功',
          confirmButtonText: '上架出售',
          message: '是否上架到线上出售该票'
        }).then(() => {
          Toast('删除成功')
        }).catch(() => {

        })
        // resultCheck: [], // 当前多选中的值
        if (!this.va_one || !this.va_two || !this.firstTime || !this.endTime || !this.dayTime) {
          Toast('有未填项')
        } else {
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .perfecting-business{
    padding-bottom: 178rpx;
  }
  .textareaBok{
    background: #fff;
    /*padding-bottom: 32rpx;*/
    margin-bottom: 16rpx;
  }
  .labelWrap{
    background: #fff;
    padding: 32rpx 30rpx;
    .lab_title{
      color:#333;
      font-size: 30rpx;
      padding-bottom: 20rpx;
    }
    .checkoboxBtn{
      width:160rpx;
      height:70rpx;
      line-height: 70rpx;
      font-size: 28rpx;
      text-align: center;
      background:rgba(242,242,242,1);
      border-radius:8rpx;
      position: relative;
      overflow: hidden;

    }
    .active{
      background:rgba(239,124,27,0.1);
      color:#EF7C1B;
    }
    .posion_close{
      position:absolute;
      top:-11rpx;
      right:46rpx;
      line-height:normal;
      color:#fff;
      &:before{
        content: '';
        position: absolute;
        border-left:60rpx solid transparent;
        border-right:60rpx solid transparent;
        border-bottom:60rpx solid #EF7C1B;
        transform:rotateZ(45deg);
      }
      .posionCenter{
        position: absolute;
        left:18rpx;
        top: 4rpx;
      }
    }
    ._van-checkbox-group{
      /*width:80%;*/
      display: flex;
      flex-wrap: wrap;
    }
    ._van-checkbox{
      margin: 5px 0 5px 17rpx;
    }
    .marginNone{
      margin-left:0;
    }
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
