import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { loadData } from '../../redux/action'
import dealFn from '../../redux/connect';
class AuthRoute extends Component {
    componentDidMount() {
        // 获取用户信息 
        // 是否登录
        // 现在的url地址，如果是login 是不需要跳转的
        // 用户的type 身份是boss 还是牛人
        // 用户是否完善信息
        axios.get('/user/info')
            .then(res => {
                if(res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.dispatch(loadData(res.data.data))
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}
AuthRoute = dealFn(withRouter(AuthRoute))
export default AuthRoute