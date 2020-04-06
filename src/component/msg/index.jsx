import React, { Component } from 'react';
import { List, Badge } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import dealFn from '../../redux/connect';
class Msg extends Component {
    getLast(arr = []) {
        return arr[arr.length - 1]
    }
    getDate(date) {
        const nowDate = new Date().getTime();
        const startDate = new Date(new Date().toLocaleDateString()).getTime();
        const endDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
        if (date >= startDate && date <= endDate) {
            return `${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`
        }
        return new Date(date).toLocaleDateString()
    }
    render() {
        const Item = List.Item
        const Brief = List.Item.Brief
        const msgGroup = {}
        const { chatmsg, users } = this.props.state.chat;
        chatmsg.forEach(item => {
            msgGroup[item.chatid] = msgGroup[item.chatid] || [];
            msgGroup[item.chatid].push(item)
        })
        const chatList = Object.values(msgGroup).sort((a,b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last
        });
        const userId = this.props.state.user._id
        return (
            <div>
                <List>
                    {
                        chatList.map(item => {
                            const lastInfo = this.getLast(item);
                            const date = this.getDate(lastInfo.create_time)
                            const targetId = lastInfo.from === userId ? lastInfo.to : lastInfo.from
                            const unreadNum = item.filter(v => !v.read && v.to === userId).length
                            return (
                                <Item
                                    key={lastInfo._id}
                                    extra={
                                        <div>
                                        <Badge text={unreadNum}/> 
                                        <p>{date}</p>
                                        </div>  
                                    }
                                    align="top"
                                    thumb={'http://' + users[targetId].headPic}
                                    multipleLine
                                    onClick={e => console.log(this.props.history.push(`/chat/${targetId}`))}
                                >
                                    {users[targetId].name}
                                    <Brief>{lastInfo.content}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}


Msg = dealFn(withRouter(Msg))
export default Msg