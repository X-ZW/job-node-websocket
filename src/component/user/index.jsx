import React, { Component } from 'react';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import dealFn from '../../redux/connect';
import browserCookies from 'browser-cookies';
import { logoutSubmit } from '../../redux/action'
class User extends Component {

    logout() {
        // console.log(111)
        Modal.alert('注销', 'Are you sure?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            {
                text: 'Ok', onPress: () => {
                    browserCookies.erase('userid');
                    this.props.dispatch(logoutSubmit)
                }
            },
        ])

    }
    render() {
        const { user, type, company, title, desc, money, redirectTo } = this.props.state.user
        const str = decodeURIComponent(document.cookie).slice(document.cookie.indexOf('userid='), -1).slice(10)
        const Item = List.Item;
        const Brief = Item.Brief;

        return user ? (
            <div>
                <Result
                    img={<img alt='图片加载出错' src={`http://localhost:3002/headPic/${str}.png`} />}
                    title={user}
                    message={type === 'boss' ? company : null}
                ></Result>
                <List
                    renderHeader={() => '简介'}
                >
                    <Item
                        multipleLine
                    >
                        {title}
                        {desc.split('\n').map((item, index) => (
                            <Brief key={index}>{item}</Brief>
                        ))}
                        {money ? (<Brief>薪资:{money}</Brief>) : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={e => this.logout()}>退出登录</Item>

                </List>
            </div>
        ) :  <Redirect to={redirectTo}></Redirect>
    }
}

User = dealFn(User)
export default User