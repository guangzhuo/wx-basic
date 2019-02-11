/**
 * Created by GZ.
 */
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
fly.config.baseURL = process.env.url // 请求的地址配置
fly.config.timeout = 5000 // 超时时间
/* wx.setStorage({
  key: 'tonken',
  success (res) {
    fly.config.headers = {
      'Authorization': res.data
    }
  }
}) */
fly.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()// 导航条加载动画
  if (wx.getStorageSync('token')) { // 检查本地缓存是否有token存在没有则重新获取
    request.headers = {// 设置请求头
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync('token'),
      'X-Tag': 'flyio'
    }
    return request
  }
  /* else {
    wx.redirectTo({
      url: '/pages/login/index'
    })
  } */
  /* else {
    fly.lock()// 锁住请求
    return app.Load().then(res => { // 重新获取token
      request.timeout = 5000,
      request.headers = {// 设置请求头
        'content-type': 'application/json',
        'cld.stats.page_entry': wx.getStorageSync('scene'),
        'version': app.globalData.version,
        'token': wx.getStorageSync('token')
      }
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      fly.unlock()// 解锁请求

    })
  } */
  return request// 继续之前的请求
})

fly.interceptors.response.use(
  (response) => {
    console.log(response)
    wx.hideNavigationBarLoading()// 导航条加载动画
    const res = response.data
    let code = response.data.result.code

    var p = getCurrentPages()
    var route = p.pop().__route__
    console.log(route)
    if (code !== 200 && route !== 'pages/login/index') {
      wx.navigateTo({
        url: '/pages/login/index'
      })
    }
    return response.data// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading()
    let code = err.data.data.result.code
    if (code !== 200) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return '网络连接异常'
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    }
    // Do something with response error
  }
)

export default fly
