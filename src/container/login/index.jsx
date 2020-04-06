import React, { Component } from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo'
import dealFn from '../../redux/connect';
import { login } from '../../redux/action'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    hideToast = true
    handelChange(key, val) {
        this.hideToast = false
        this.setState({
            [key]: val
        })
    }
    handleLogin() {
        this.hideToast = true
        // this.props.dispatch(login(this.state))
        this.props.dispatch({type: 'LOGIN', user: this.state.user, pwd: this.state.pwd, form: this.state})

    }
    register() {
        this.props.dispatch({type: 'CLEAN_MSG', data: {}})
        Toast.hide()
        this.props.history.push('/register')
    }
    render() {
        console.log(this)
        const { msg, redirectTo } = this.props.state.user
        return (

            <div>
                {msg && this.hideToast ? Toast.info(msg, 1.5, null, false) : null}
                {redirectTo ? <Redirect to={redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={e => this.handelChange('user', e)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={e => this.handelChange('pwd', e)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary'
                        onClick={this.handleLogin}
                    >登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
Login = dealFn(Login);




export default Login



