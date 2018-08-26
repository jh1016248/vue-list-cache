import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import Utils from './common/utils/'
import 'mint-ui/lib/style.css';
import './common/styles/index.less';

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(Utils)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
