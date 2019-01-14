<template>
    <div class="toDoList">
      <mpDownSelect type="time"
                    @clickRadio="clickRadio"
                    @changeTime="changeTime"></mpDownSelect>
      <van-cell @click.stop="goEditToDo">
        <view slot="title">
          <view class="van-cell-text">巡店检查<van-tag round>系统</van-tag></view>
          <view class="smalltext">每日上报水质信息</view>
        </view>
        <view slot="right-icon">
          <div class="rightRadio" @click.stop="">
            <van-radio-group :value="thatVal" @change.stop="changeRadio">
              <van-radio name="133" ></van-radio>
            </van-radio-group>
          </div>
        </view>
      </van-cell>
      <fixedBtn leftBtn
                leftname="历史待办"
                @leftclick="historyBtn"
                @click="addBtn"
                name="添加待办"></fixedBtn>
    </div>
</template>

<script>
  import mpDownSelect from '@/components/mpDownSelect'
  import fixedBtn from '@/components/fixed-btn'
  import apis from '@/http/apis'
  export default {
    name: 'index',
    components: {
      mpDownSelect,
      fixedBtn
    },
    data () {
      return {
        thatVal: ''
      }
    },
    created () {
    },
    methods: {
      clickRadio (radio) {
        console.log(radio)
      },
      changeTime (time) {
        console.log(time)
      },
      changeRadio (name) {
        console.log(name)
        let detail = name.mp.detail
        this.thatVal = detail
        return false
      },
      goEditToDo () {
        this.$router.push({
          path: 'edit-todo',
          query: {}
        })
      },
      historyBtn () {
        this.$router.push({
          path: 'history-todo',
          query: {}
        })
      },
      addBtn () {
        this.$router.push({
          path: 'add-todo'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.toDoList{
  margin-bottom: 94px;
}
  .smalltext{
    font-size: 13px;
    padding-top:3px;
    color:#969696;
  }
  .rightRadio{
    display: flex;
    height:100%;
    flex-direction: column;
    justify-content: center;
  }
</style>
