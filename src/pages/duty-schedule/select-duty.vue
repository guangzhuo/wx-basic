<template>
    <div class="select-duty">
      <checkboxList @checkCall="checkCall"></checkboxList>
      <fixedBtn name="确认" @click="isOK"></fixedBtn>
    </div>
</template>

<script>
  import checkboxList from '@/components/checkbox-list'
  import fixedBtn from '@/components/fixed-btn'
  export default {
    name: 'select-duty',
    components: {
      checkboxList,
      fixedBtn
    },
    data () {
      return {
        checkArr: []
      }
    },
    mounted () {
      console.log(this.$route.query)
    },
    methods: {
      checkCall (obj) {
        console.log(obj)
        this.checkArr = obj
      },
      isOK () {
        let {goto} = this.$route.query
        if (goto === 'add-duty') {
          this.$router.push({
            path: 'add-duty',
            query: {selectDuty: JSON.stringify(Array.from(this.checkArr))}
          })
        } else {
          this.$router.push({
            path: 'duty-info',
            query: {selectDuty: JSON.stringify(Array.from(this.checkArr))}
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  page{
    background: #F4F6F6;
  }
</style>
