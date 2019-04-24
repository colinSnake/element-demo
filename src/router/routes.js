const Home = () => import('@/pages/home/Home')
const Login = () => import('@/pages/Login')
const NotFound = () => import('@/pages/NotFound')
const Table = () => import('@/pages/home/nav1/Table')
const Form = () => import('@/pages/home/nav1/Form')
const User = () => import('@/pages/home/nav1/User')
const Page4 = () => import('@/pages/home/nav2/Page4')
const Page5 = () => import('@/pages/home/nav2/Page5')
const Page6 = () => import('@/pages/home/nav3/Page6')
const Echarts = () => import('@/pages/home/nav4/Echarts')

const routes = [
    {
        path: '/',
        redirect: '/admin',
        hidden: true
    },
    {
        path: '/admin',
        redirect: '/admin/table',
        hidden: true
    },
    {
        name: '导航一',
        path: '/admin',
        component: Home,
        iconCls: 'el-icon-location',//图标样式class
        children: [
            { path: '/admin/table', component: Table, name: 'Table' },
            { path: '/admin/form', component: Form, name: 'Form' },
            { path: '/admin/user', component: User, name: 'User' },
        ]
    },
    {
        name: '导航二',
        path: '/admin',
        component: Home,
        iconCls: 'el-icon-menu',
        children: [
            { path: '/admin/page4', component: Page4, name: '页面4' },
            { path: '/admin/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        name: '导航三',
        path: '/admin',
        component: Home,
        iconCls: 'el-icon-document',
        children: [
            { path: '/admin/page6', component: Page6, name: '页面6' }
        ]
    },
    {
        name: '导航四',
        path: '/admin',
        component: Home,
        iconCls: 'el-icon-setting',
        children: [
            { path: '/admin/echarts', component: Echarts, name: 'echarts' }
        ]
    },
    {
        name: '',
        path: '/admin/login',
        component: Login,
        hidden: true
    },
    {
        name: '',
        path: '/admin/notfound',
        component: NotFound,
        hidden: true
    }
]

export default routes