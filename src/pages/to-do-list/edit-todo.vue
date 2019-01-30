<template>
    <div class="edit-todo">
      <mpCell inline
              leftTitle="待办事项"
              v-model="nameTodo"
              :iconNone="false"
              placeholder="输入待办事项"
              type="input"></mpCell>
      <mpCell inline
              leftTitle="开始时间"
              placeholder="请选择"
              v-model="startDate"
              iconName="arrow-down"
              @confirmPicker="startpickerData"
              type="time"></mpCell>
      <mpCell inline
              leftTitle="结束时间"
              placeholder="请选择"
              v-model="endDate"
              iconName="arrow-down"
              @confirmPicker="endpickerData"
              type="time"></mpCell>
      <mpSmallTitle title="选填" :rightNone="false"></mpSmallTitle>

      <div class="markWrap">
        <remarkText @areaVal="areaVal"
                    :isShow="isRemark"
                    max="100"></remarkText>
      </div>

      <fixedBtn leftBtn
                name="保存"
                @leftclick="deleteBtn"
                @click="addBtn"></fixedBtn>
      <div id="red">
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
    name: 'edit-todo',
    components: {
      mpCell,
      mpSmallTitle,
      remarkText,
      fixedBtn
    },
    data () {
      return {
        isRemark: true,
        nameTodo: '巡店检查',
        startDate: '2019-01-08 11:21',
        endDate: '2019-01-09 11:21'
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
        this.isRemark = false
        Dialog.confirm({
          // title: '确认删除？'
          message: '确认删除？'
        }).then(() => {
          Toast('删除成功')
          this.isRemark = true
        }).catch(() => {
          this.isRemark = true
        })
      },
      addBtn () {
        Toast('保存成功')
        this.$router.replace({
          path: 'index'
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
