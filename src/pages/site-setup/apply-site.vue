<template>
    <div class="apply-site">
      <checkboxList :checkData="checkData"
                    :result="result"
                    @checkCall="checkCall"></checkboxList>
      <fixedBtn leftBtn
                :leftname="leftname"
                name="保存"
                @leftclick="leftclick"
                @click="isOK"></fixedBtn>
    </div>
</template>

<script>
  import checkboxList from '@/components/checkbox-list'
  import fixedBtn from '@/components/fixed-btn'
  export default {
    name: 'apply-site',
    components: {
      fixedBtn,
      checkboxList
    },
    data () {
      return {
        allSelecth: '',
        result: [],
        checkData: [{id: '11', name: '啊Q'}, {id: '22', name: '啊ww'}], // 请求过来
        leftname: '全选',
        isCheckBox: false
      }
    },
    created () {
    },
    methods: {
      checkCall (obj) {
        console.log(obj)
        this.allSelecth = obj
      },
      leftclick () {
        if (!this.isCheckBox) {
          this.result = this.checkData.map(data => data.id)
          this.leftname = '取消全选'
          this.isCheckBox = true
        } else {
          this.result = []
          this.leftname = '全选'
          this.isCheckBox = false
        }
      },
      isOK () {
        let {back} = this.$route.query
        if (back === 'new-site') {
          this.$router.push({
            path: 'new-site',
            query: {selectDuty: JSON.stringify(Array.from(this.allSelecth))}
          })
        } else {
          this.$router.push({
            path: 'site-info',
            query: {selectDuty: JSON.stringify(Array.from(this.allSelecth))}
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
