import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import dealFn from '../../redux/connect';
import { sendMsg } from '../../redux/action';
import { getChatId } from '../../util';
import { getMegList, recvMsg, readMsg } from '../../redux/action'
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmoji: false,
            text: '',
            msg: []
        }
    }
    handleSubmit() {
        const from = this.props.state.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text
        if (!msg) return
        this.props.dispatch(sendMsg({ from, to, msg }))
        this.setState({ text: '' })
    }
    componentDidMount() {
        // if (!this.props.state.chat.chatmsg.length) {
        //     debugger
        //     this.props.dispatch(getMegList())
        //     this.props.dispatch(recvMsg())
        // }
    }
    componentWillUnmount() {
        // 获取目标userid
        const to = this.props.match.params.user;
        this.props.dispatch(readMsg(to))
    }

    render() {
        const emoji = '🤩 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠'
            .split(' ')
            .filter(item => item)
            .map(item => {
                return {
                    text: item
                }
            });
        const targetUserid = this.props.match.params.user;
        const myId = this.props.state.user._id;
        const Item = List.Item;
        const users = this.props.state.chat.users;
        const chatid = getChatId(targetUserid, myId);
        const chatmsgs = this.props.state.chat.chatmsg.filter(item => item.chatid === chatid);
        if (!users[targetUserid]) return null
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    leftContent={<Icon type='left'></Icon>}
                    onLeftClick={e => this.props.history.goBack()}
                >
                    {users[targetUserid].name}
                </NavBar>
                <div className='page-content'>
                    {chatmsgs.map((item, index) => {
                        const headPicSrc = 'http://' + users[item.from].headPic
                        return item.from === targetUserid ? (
                            <List key={index}>
                                <Item
                                    thumb={headPicSrc}
                                >{item.content}</Item>
                            </List>
                        ) : (
                                <List key={index}>
                                    <Item
                                        extra={<img alt='图片加载出错' src={headPicSrc}></img>}
                                        className='chat-me'
                                    >{item.content}</Item>
                                </List>
                            )
                    })}
                </div>
                <div className="stick-footer"
                >
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={e => {
                                this.setState({ text: e })
                            }}
                            extra={

                                <div>
                                    <span
                                        role='img'
                                        style={{
                                            marginRight: 15
                                        }}
                                        onClick={e => {
                                            this.setState((state) => {
                                                return { showEmoji: !state.showEmoji }
                                            })
                                            setTimeout(() => {
                                                window.dispatchEvent(new Event('resize'))
                                            }, 0)
                                        }}
                                    >😃</span>
                                    <span onClick={e => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >信息</InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        isCarousel={true}
                        columnNum={9}
                        carouselMaxRow={4}
                        onClick={e => {
                            this.setState(state => {
                                return { text: state.text + e.text }
                            })
                        }}
                    ></Grid> : null}
                </div>
            </div>
        )
    }
}
Chat = dealFn(Chat)
export default Chat