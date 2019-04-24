import axios from "axios"
import Vue from 'vue'
// 创建一个 axios 实例
const ajax = axios.create({
    baseURL: 'http://rap2api.taobao.org/app/mock/166074'
})

// 添加一个请求拦截器
ajax.interceptors.request.use(config => {
    // Toast.loading({
    //     mask: true,
    //     duration: 1000,
    //     message: '加载中...'
    // });
    return config
})

// 添加一个响应拦截器
ajax.interceptors.response.use(res => {
    if (res.data.code === 200) {
        return res.data.data
    } else {
        // Toast.loading({
        //     mask: true,
        //     duration: 2000,
        //     message: '请求超时...'
        // });
    }

})

// 首页数据
export const getHomeData = () => {
    return ajax.post('/api/v1/tabledata')
}

// 登录
export const getLogin = (params) => {
    return ajax.get('/api/v1/login', { params })
}