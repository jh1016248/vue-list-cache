import Vue from 'vue'
import Router from 'vue-router'
import Activity from './activity'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "*",
            redirect: "/"
        },
        {
            path: '/',
            meta: {
                keep: true,
            },
            component: r => require.ensure([], () => r(require('../modules/index')), 'index')
        },
    ].concat(Activity)
})
