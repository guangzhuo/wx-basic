<!--suppress ALL -->
<template>
    <div class="checkbox-list">
      <van-checkbox-group :value="result" @change="onChange">
        <van-cell-group>
          <van-cell
            :title="item.name"
            v-for="(item, index) in checkData"
            :key="index"
            :data-id="item.id"
            @click="clickCheck"
            :data-name="item.name">
            <van-checkbox :class="item"  :name="item.id" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
</template>

<script>
  export default {
    name: 'checkbox-list',
    props: {
      result: {
        type: Array,
        default: []
      },
      checkData: {
        type: Array,
        default: [{id: '11', name: '啊Q'}, {id: '22', name: '啊Q'}] // 请求过来的
      },
      textArr: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        allCheck: []
      }
    },
    watch: {
      result (newIndex, oldIndex) {
        if (newIndex.length > 0) {
          this.allCheck = this.checkData
          let arr = this.checkData.filter((data, index) => {
            return newIndex.find((ndata, tIndex) => {
              return data.id === ndata
            })
          })
          this.allCheck = arr
          this.$emit('checkCall', this.allCheck)
        } else {
          this.allCheck = []
          this.$emit('checkCall', this.allCheck)
        }
      }
    },
    mounted () {
      // this.defaultCheck()
    },
    methods: {
      clickCheck (event) {
        // console.log(event)
        let dataset = event.currentTarget.dataset
        if (this.result.indexOf(dataset.id) !== -1) {
          this.result.splice(this.result.indexOf(dataset.id), 1)
          this.allCheck.splice(this.allCheck.findIndex(data => dataset.id), 1)
        } else {
          this.result.push(dataset.id)
          this.allCheck.push(dataset)
        }
        this.$emit('checkCall', this.allCheck)
      },
      onChange (ev) {
        console.log(ev)
      },
      defaultCheck () {
        this.allCheck = this.textArr
        this.result = this.textArr.map(data => data.id)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  .checkbox-list {
    .van-checkbox__icon--checked{
      background: #EF7C1B;
      border: 1rpx solid #EF7C1B;
    }
  }
</style>
