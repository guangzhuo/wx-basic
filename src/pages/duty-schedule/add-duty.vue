<template>
    <div class="Add-duty">
      <mpSmallTitle :rightNone="false" title="杭州游泳馆"></mpSmallTitle>

      <mpCell
              leftTitle="开始时间"
              inline
              placeholder="请选择"
              v-model="startDate"
              iconName="arrow-down"
              @input="activeCall"
              @confirmPicker="startpickerData"
              type="time"></mpCell>
      <mpCell
              inline
              leftTitle="结束时间"
              placeholder="请选择"
              v-model="endDate"
              iconName="arrow-down"
              @input="activeCall"
              @confirmPicker="endpickerData"
              type="time"></mpCell>
      <mpCell
        inline
        leftTitle="选择救生值班人员"
        placeholder="请选择"
        disabled
        v-model="thatSelect"
        iconName="arrow"
        @click="goSelection"
        @input="activeCall"
        @confirmPicker="pickerData"
        type="input"></mpCell>

      <fixedBtn @click="save" name="保存"></fixedBtn>
      <van-notify id="custom-selector" />
      <div id="theme">
        <van-dialog id="van-dialog" />
      </div>

    </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import fixedBtn from '@/components/fixed-btn'
  import Notify from '@/../static/vant/notify/notify'
  import Dialog from '@/../static/vant/dialog/dialog'
  import apis from '@/http/apis'
  export default {
    name: 'add-duty',
    components: {
      mpCell,
      fixedBtn,
      mpSmallTitle
    },
    data () {
      return {
        startDate: '',
        endDate: '',
        thatSelect: '',
        isActive: false,
        selectids: []
      }
    },
    mounted () {
      let {selectDuty} = this.$route.query
      if (selectDuty) {
        let arrDuty = JSON.parse(selectDuty)
        this.selectids = arrDuty.map(data => data.id)
        this.thatSelect = ''
        console.log(this.selectids)
        arrDuty.filter((data, index) => {
          this.thatSelect += data.name + '、'
        })
      }
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
      goSelection () {
        this.$router.push({
          path: 'select-duty',
          query: {goto: 'add-duty'}
        })
      },
      save () {
        if (!this.startDate || !this.endDate || !this.thatSelect) {
          Notify({
            text: '请完善必填信息',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          })
        } else {
          Dialog.alert({
            title: '值班冲突提示',
            message: '该时间段内已有值班安排'
          }).then(() => {
            // on confirm
            // this.$fly.post(apis.api, {}).then(data => {})
          })
        }
        this.$router.push({
          path: 'index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.selectWrap{
  /*border-top:10px solid rgba(0,0,0,.2);*/
}
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
