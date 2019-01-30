import Vue from 'vue'
import App from './App'
import fly from './http/fly'
import store from './store'
import MpvueRouterPatch from 'mpvue-router-patch'
const app = new Vue(App)
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
Vue.prototype.$fly = fly
Vue.prototype.$store = store
Vue.prototype.CDN_IMG = process.env.CDN_IMG
App.mpType = 'app'
app.$mount()
