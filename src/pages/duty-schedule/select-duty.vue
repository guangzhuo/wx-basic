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

      }
    },
    mounted () {
      console.log(this.$route.query)
    },
    methods: {
      checkCall (obj) {
        console.log(obj)
      },
      isOK () {
        let {goto} = this.$route.query
        if (goto === 'add-duty') {
          this.$router.push({
            path: 'add-duty',
            query: {selectDuty: JSON.stringify(Array.from(this.allCheck))}
          })
        } else {
          this.$router.push({
            path: 'duty-info',
            query: {selectDuty: JSON.stringify(Array.from(this.allCheck))}
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
