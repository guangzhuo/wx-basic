<template>
    <div class="movable" catchtouchmove="true">
      <div class="Dragarea item_container">
        <div class="item"
            :class="index==current?'moving':'normal'"
            :style="{'left':index==current?move_x:item.left+'rpx',
                      'top':index==current?move_y:item.top+'rpx'}"
            v-for="(item, index) in all_list"
            :key="index"
            @longtap="movestart(item, $event)"
            @touchmove="move"
            @touchend="moveend"
            @change="movableChange"
            direction="all">
          <div class="imgIcon">
            <div class="crilered" @click="click_delete"></div>
          </div>
          <div class="imgTitle">我的门店{{ item.id }}</div>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable camelcase */

  var x, y, x1, y1, x2, y2
  export default {
    name: 'movable',
    props: {
      imgData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        all_list: this.imgData, // 已经增加的列表
        current: -1,
        s_v: 35, // 垂直间隙
        s_h: 44, // 水平间隙
        u_w: 130, // 模块宽度
        u_h: 130, // 模块高度
        all_width: '', // 总的宽度
        move_x: '',
        move_y: '',
        isLongTap: false
      }
    },
    mounted () {
      var self = this
      wx.getSystemInfo({
        success: function (res) {
          var width = self.all_width = res.windowWidth * 2
          var _w = 0
          var row = 0
          var column = 0
          var arr = [].concat(self.all_list)
          arr.forEach(function (n, i) {
            n.left = (self.u_w + self.s_h) * row + self.s_h
            n.top = (self.u_h + self.s_v) * column + self.s_v
            n._left = n.left
            n._top = n.top
            _w += self.u_w + self.s_h
            if (_w + self.u_w + self.s_h > width) {
              _w = 0
              row = 0
              column++
            } else {
              row++
            }
          })
          console.log(arr)
          self.all_list = arr
        }
      })
    },
    methods: {
      movestart: function (item, e) {
        this.isLongTap = true
        x = e.mp.touches[0].clientX
        y = e.mp.touches[0].clientY
        x1 = e.mp.currentTarget.offsetLeft
        y1 = e.mp.currentTarget.offsetTop
        // this.current = e.mp.target.dataset.index
        this.current = this.all_list.findIndex(findTim => findTim.id === item.id)
        this.move_x = x1 * 2 + 'rpx'
        this.move_y = y1 * 2 + 'rpx'
      },
      move: function (e) {
        if (!this.isLongTap) return false
        var self = this
        x2 = e.touches[0].clientX - x + x1
        y2 = e.touches[0].clientY - y + y1
        var underIndex = this.getCurrnetUnderIndex()
        if (underIndex != null && underIndex !== this.current) {
          var arr = [].concat(this.all_list)
          this.changeArrayData(arr, underIndex, this.current)
          this.all_list = arr
          this.current = underIndex
        }
        this.move_x = x2 * 2 + 'rpx'
        this.move_y = y2 * 2 + 'rpx'
      },
      moveend: function (e) {
        this.current = -1
        this.isLongTap = false
        this.$emit('drag', this.all_list)
      },
      changeArrayData: function (arr, i1, i2) {
        console.log(arr)
        console.log(i1)
        console.log(i2)
        var temp = arr[i1]
        arr[i1] = arr[i2]
        arr[i2] = temp

        var _left = arr[i1]._left
        var _top = arr[i1]._top
        arr[i1]._left = arr[i2]._left
        arr[i1]._top = arr[i2]._top
        arr[i2]._left = _left
        arr[i2]._top = _top

        var left = arr[i1].left
        var top = arr[i1].top
        arr[i1].left = arr[i2].left
        arr[i1].top = arr[i2].top
        arr[i2].left = left
        arr[i2].top = top
      },
      getCurrnetUnderIndex: function () { // endx, endy 获取当前移动下方index
        var endx = x2 * 2 + this.u_w / 2
        var endy = y2 * 2 + this.u_h / 2
        var v_judge = false
        var h_judge = false
        var column_num = (this.all_width - this.s_h) / (this.s_h + this.u_w) >> 0
        var _column = (endy - this.s_v) / (this.u_h + this.s_v) >> 0
        var min_top = this.s_v + (_column) * (this.u_h + this.s_v)
        var max_top = min_top + this.u_h
        if (endy > min_top && endy < max_top) {
          v_judge = true
        }
        var _row = (endx - this.s_h) / (this.u_w + this.s_h) >> 0
        var min_left = this.s_h + (_row) * (this.u_w + this.s_h)
        var max_left = min_left + this.u_w
        // console.log('x', _row, endx, min_left, max_left);
        if (endx > min_left && endx < max_left) {
          h_judge = true
        }
        if (v_judge && h_judge) {
          var index = _column * column_num + _row
          if (index > this.all_list.length - 1) { // 超过了
            return null
          } else {
            return index
          }
        } else {
          return null
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  .tip{
    color:#aaa;
    font-size:12px;
  }

  .item{
    position:absolute;
    z-index: 10;
    /*border:1px solid black;*/
    font-size:13px;
    width:130rpx;
    height:130rpx;
    text-align:center;
    /*transition: all .2s;*/
  }
  .item_container{
    height:525rpx;
    /* border:1px solid black; */
    position:relative;
  }
 .imgIcon{
  width:36px;
  height:36px;
  display: inline-block;
  position: relative;
  margin: 7px 0 5px 0;
  background: darkgray;
  vertical-align: middle;
  display: inline-block;
   .crilered{
     position: absolute;
     width:12px;
     height:12px;
     right:-6px;
     top:-6px;
     background: red;
     border-radius: 50%;
   }
}
  .imgTitle{
    font-size: 12px;
    color:#666;
  }
</style>
