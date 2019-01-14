<template>
  <div class="add-todo">
    <mpCell required
            leftTitle="待办事项"
            v-model="nameTodo"
            :iconNone="false"
            placeholder="输入待办事项"
            type="input"></mpCell>
    <mpCell required
            leftTitle="开始时间"
            v-model="startDate"
            placeholder="请选择"
            iconName="arrow-down"
            @confirmPicker="startpickerData"
            type="time"></mpCell>
    <mpCell required
            leftTitle="结束时间"
            placeholder="请选择"
            v-model="endDate"
            iconName="arrow-down"
            @confirmPicker="endpickerData"
            type="time"></mpCell>
    <fixedBtn name='保存' @click="save"></fixedBtn>
    <div class="markWrap">
      <remarkText @areaVal="areaVal" max="100"></remarkText>
    </div>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import mpCell from '@/components/mpCell'
  import remarkText from '@/components/remarks-textarea'
  import fixedBtn from '@/components/fixed-btn'
  import Dialog from '@/../static/vant/dialog/dialog'
  import Toast from '@/../static/vant/toast/toast'
  import apis from '@/http/apis'
  export default {
    name: 'add-todo',
    components: {
      mpCell,
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
        this.$router.push({
          path: 'index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .markWrap{
    /*margin-top:20px;*/
    border-top: 20px solid rgba(0,0,0,.1)
  }
</style>
