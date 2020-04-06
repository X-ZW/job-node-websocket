import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../component/avatar-selector';
import dealFn from '../../redux/connect';
import { update } from '../../redux/action'
class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            headPic: {}
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        console.log(this.state)
        const { redirectTo } = this.props.state.user
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo}></Redirect> : null}
                <NavBar mode="dark">Boss完善信息页面</NavBar>
                <AvatarSelector
                    getFiles={e => {
                        this.setState({ headPic: e })
                    }}
                ></AvatarSelector>
                <InputItem
                    onChange={e => this.onChange('title', e)}
                >招聘职位</InputItem>
                <InputItem
                    onChange={e => this.onChange('company', e)}
                >公司名称</InputItem>
                <InputItem
                    onChange={e => this.onChange('money', e)}
                >职位薪资</InputItem>
                <TextareaItem
                    onChange={e => this.onChange('desc', e)}
                    row={3}
                    autoHeight
                    title='职位要求'
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

BossInfo = dealFn(BossInfo)
export default BossInfo