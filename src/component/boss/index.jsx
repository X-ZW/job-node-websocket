import React, { Component } from 'react';
import dealFn from '../../redux/connect';
import { getUserList } from '../../redux/action';
import UserCard from '../usercard'
class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.dispatch(getUserList('genius'))
    }
    render() {
        return (
            <div> 
                <UserCard userlist={this.props.state.chatuser.userlist}></UserCard>
            </div>
        )
    }
}
Boss = dealFn(Boss)
export default Boss