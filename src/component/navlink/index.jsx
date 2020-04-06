import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import PropType from 'prop-types';
import { withRouter } from 'react-router-dom';
import './index.less';
import dealFn from '../../redux/connect'
class NavLinkBar extends Component {
    render() {
        const navList = (this.props.data || []).filter(item => !item.hide)
        const { pathname } = this.props.location;
        const {unread} = this.props.state.chat
        return (
            <div style={{marginTop: 50}}>
                <TabBar
                    tabBarPosition='bottom'
                >
                    {navList.map(item => (
                        <TabBar.Item
                            badge={item.path === '/msg' ? unread : 0}
                            key={item.path}
                            title={item.text}
                            selected={pathname === item.path}
                            onPress={() => {
                                this.props.history.push(item.path)
                            }}
                        ></TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

NavLinkBar.PropType = {
    data: PropType.array.isRequired
}
NavLinkBar = dealFn(withRouter(NavLinkBar))

export default NavLinkBar