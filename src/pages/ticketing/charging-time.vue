<template>
    <div class="charging-time">
      <mpCell inline
              leftTitle="开始时间"
              placeholder="请选择开始时间"
              v-model="startDate"
              iconName="arrow-down"
              @confirmPicker="startpickerData"
              type="time"></mpCell>
      <mpCell inline
              leftTitle="结束时间"
              placeholder="请选择结束时间"
              v-model="endDate"
              iconName="arrow-down"
              @confirmPicker="endpickerData"
              type="time"></mpCell>
      <van-cell class="paddingCum">
        <view slot="title">
          <div class="title checkTitle">选择日期</div>
          <div class="checkWrap">
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
        </view>
      </van-cell>
      <mpCell inline
              leftTitle="价格 ¥"
              :iconName="false"
              placeholder="请输入该时段价格"></mpCell>
      <fixedBtn name='保存' @click="save"></fixedBtn>
    </div>
</template>
<script>
  import mpCell from '@/components/mpCell'
  import fixedBtn from '@/components/fixed-btn'
  export default {
    name: 'charging-time',
    components: {
      mpCell,
      fixedBtn
    },
    data () {
      return {
        startDate: '',
        endDate: '',
        Checklist: [
          {id: '0', name: '全选', isActive: false},
          {id: '1', name: '周一', isActive: false},
          {id: '2', name: '周二', isActive: false},
          {id: '3', name: '周三', isActive: false},
          {id: '4', name: '周四', isActive: false},
          {id: '5', name: '周五', isActive: false},
          {id: '6', name: '周六', isActive: false},
          {id: '7', name: '周日', isActive: false}
        ],
        resultCheck: []
      }
    },
    created () {
    },
    methods: {
      startpickerData (time) {
        console.log(time)
        this.startDate = time
      },
      endpickerData (time) {
        console.log(time)
        this.endDate = time
      },
      boxClick (ev) {
        if (ev.id !== '0') {
          // 当前数组的索引
          let indexID = this.resultCheck.findIndex(data => data === ev.id)
          let allID = this.resultCheck.findIndex(data => data === '0')
          // 找到显示焦点的索引
          let activeID = this.Checklist.findIndex(data => data.id === ev.id)
          if (indexID !== -1) {
            // debugger
            this.resultCheck.splice(indexID, 1)
            this.Checklist[activeID].isActive = false
            if (allID > -1) {
              this.resultCheck.splice(allID, 1)
              this.Checklist[0].isActive = false
            }
            console.log(indexID)
            console.log(allID)
          } else {
            this.resultCheck.push(ev.id)
            this.Checklist[activeID].isActive = true
          }
        } else if (ev.id === '0' && this.resultCheck.length !== 8) {
          this.resultCheck = this.Checklist.map(data => data.id)
          for (let i of this.Checklist) {
            i.isActive = true
          }
        } else {
          this.resultCheck = []
          for (let i of this.Checklist) {
            i.isActive = false
          }
        }
      },
      save () {
        let back = this.$mp.query.back
        wx.navigateTo({
          url: back || '/pages/ticketing/new-timetick'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.charging-time{
  padding-bottom: 148rpx;
}
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
  .checkWrap{
    .checkoboxBtn{
      width:160rpx;
      height:70rpx;
      line-height: 70rpx;
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
    /*.checkoboxBtn > &.van-checkbox__icon--checked >  {
      background: red;
    }*/
  }

  .paddingCum{
    .van-cell{
      padding: 32rpx 30rpx;
    }
    .title{
      color:#333;
      font-size: 30rpx;
      display: inline-block;
      padding-right: 20rpx;
    }
    .pickerWrap{
      display: inline-block;
      width:65%;
    }
    .rightEye{
      color: #C8C8C8
    }
  }

  .checkTitle{
    padding-bottom: 28rpx;
  }
  .placeholderinfo{
    color:#666;
    padding-top: 4rpx;
  }
  .sitelistWrap{
    color:#666666;
    .sitelist{
      width:270rpx;
      padding-top: 4rpx;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
