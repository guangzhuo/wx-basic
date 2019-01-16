<template>
  <div class="add-todo">
    <mpCell
            leftTitle="待办事项"
            v-model="nameTodo"
            inline
            :iconNone="false"
            placeholder="输入待办事项"
            type="input"></mpCell>
    <mpCell
            leftTitle="开始时间"
            v-model="startDate"
            inline
            placeholder="请选择"
            iconName="arrow-down"
            @confirmPicker="startpickerData"
            type="time"></mpCell>
    <mpCell
            leftTitle="结束时间"
            placeholder="请选择"
            v-model="endDate"
            inline
            iconName="arrow-down"
            @confirmPicker="endpickerData"
            type="time"></mpCell>
    <mpSmallTitle title="选填" :rightNone="false"></mpSmallTitle>

    <div class="markWrap">
      <remarkText @areaVal="areaVal" max="100"></remarkText>
    </div>


    <fixedBtn name='保存' @click="save"></fixedBtn>


    <div id="theme">
      <van-dialog id="van-dialog" />
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import mpSmallTitle from '@/components/mpSmallTitle'
  import remarkText from '@/components/remarks-textarea'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  import apis from '@/http/apis'
  export default {
    name: 'add-todo',
    components: {
      mpCell,
      mpSmallTitle,
      remarkText,
      fixedBtn
    },
    data () {
      return {
        nameTodo: '',
        startDate: '',
        endDate: ''
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
      areaVal (val) {
        console.log(val)
      },
      deleteBtn () {
        Dialog.confirm({
          // title: '确认删除？'
          message: '确认删除？'
        }).then(() => {
          Toast('删除成功')
        }).catch(() => {

        })
      },
      save () {
        Toast('保存成功')
        /* this.$router.push({
          path: 'index'
        }) */
        wx.redirectTo({
          url: 'index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .markWrap{
    background: #fff;
  }
</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
