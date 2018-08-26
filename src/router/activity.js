export default [
    {
        path: '/activity/:id',
        meta: {},
        component: r => require.ensure([], () => r(require('../modules/activity/detail')), 'activityDetail')
    }
]