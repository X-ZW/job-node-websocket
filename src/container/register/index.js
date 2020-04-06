import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo';
import dealFn from '../../redux/connect';
import { register } from '../../redux/action'
import { List, InputItem, WhiteSpace, Button, Radio, Toast } from 'antd-mobile'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius', // 或者boss
            user: '',
            pwd: '',
            repeatpwd: ''
        }
    }
    hideToast = true;
    handelChange(key, val) {
        this.hideToast = false
        this.setState({
            [key]: val
        })
    }
    handelRegister() {
        let data = this.state;
        this.hideToast = true;
        this.props.dispatch(register(data));
    }
    render() {
        console.log(this)
        const RadioItem = Radio.RadioItem
        const { msg, redirectTo } = this.props.state.user
        return (
            <div>
                {msg && this.hideToast ? Toast.info(msg, 1.5, null, false) : null}
                {redirectTo ? <Redirect to={redirectTo} /> : null}
                <Logo></Logo>
                <List>
                    <InputItem
                        onChange={e => this.handelChange('user', e)}
                    >用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem
                        type='password'
                        onChange={e => this.handelChange('pwd', e)}
                    >密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem
                        type='password'
                        onChange={e => this.handelChange('repeatpwd', e)}
                    >确认密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem
                        checked={this.state.type === 'genius'}
                        onChange={e => this.handelChange('type', 'genius')}
                    >
                        求职者
                    </RadioItem>
                    <RadioItem
                        checked={this.state.type === 'boss'}
                        onChange={e => this.handelChange('type', 'boss')}
                    >
                        Boss
                    </RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={e => this.handelRegister()}>注册</Button>
                </List>
            </div>

        )
    }
}
Register = dealFn(Register)
export default Register 