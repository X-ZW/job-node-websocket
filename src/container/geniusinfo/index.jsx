import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../component/avatar-selector';
import dealFn from '../../redux/connect';
import { update } from '../../redux/action'
class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        const { redirectTo } = this.props.state.user
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo}></Redirect> : null}
                <NavBar mode="dark">求职者完善信息页面</NavBar>
                <AvatarSelector
                    getFiles={e => {
                        this.setState({ headPic: e })
                    }}
                ></AvatarSelector>
                <InputItem
                    onChange={e => this.onChange('title', e)}
                >求职岗位</InputItem>
                <InputItem
                    onChange={e => this.onChange('money', e)}
                >职位薪资</InputItem>
                <TextareaItem
                    onChange={e => this.onChange('desc', e)}
                    row={3}
                    autoHeight
                    title='个人简介'
                ></TextareaItem>
                <Button
                    type='primary'
                    onClick={e => {
                        const form = new FormData();
                        for(let i in this.state) {
                            form.append(i, this.state[i])
                        }
                        this.props.dispatch(update(form))
                    }}
                >保存</Button>
            </div>
        )
    }
}

GeniusInfo = dealFn(GeniusInfo)
export default GeniusInfo