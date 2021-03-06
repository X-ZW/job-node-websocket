import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile';
import dealFn from '../../redux/connect';
import NavLinkBar from '../navlink';
import Boss from '../boss';
import Genius from '../genius'
import Msg from '../msg'
import User from '../user'
import {getMegList,  recvMsg} from '../../redux/action'

import './index.less'
class DashBoard extends Component {
    render() {
        const user = this.props.state.user;
        const { pathname } = this.props.location
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                <NavBar
                    className='fixed-header'
                    mode='dark'
                >
                    {navList.find(item => item.path === pathname)&&navList.find(item => item.path === pathname).title}
                </NavBar>
                <div style={{
                    marginTop: 45
                }}>
                    <Switch>
                        {navList.map(item => (
                            <Route key={item.path} path={item.path} component={item.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>

            </div>
        )
    }
}
DashBoard = dealFn(DashBoard)
export default DashBoard