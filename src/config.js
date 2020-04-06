import axiso from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axiso.interceptors.request.use(function (config) {
    Window.a = false;
    Toast.loading('加载中', 0)
    setTimeout(() => {
        if(Window.a) {
            return
        }
        Toast.info('请求超时')
        // Toast.hide()
    }, 3000);
    return config
})

axiso.interceptors.response.use(function (config) {
    Window.a = true
    Toast.hide()
    // if(config.status !== 200) {
    //     Toast.info(config.status)
    // }
    // const {code, msg} = config.data
    // if(!code) {Toast.success(msg || '操作成功', 1.5)}
    return config
})