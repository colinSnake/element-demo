const Home = () => import('@/pages/home/Home')

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'home',
        path: '/home',
        component: Home
    }
]

export default routes