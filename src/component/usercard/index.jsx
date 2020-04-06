import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import './index.less'
export default class UserCard extends Component {
    handleClick(item) {
        this.props.history.push(`/chat/${item._id}`)
    }

    render() {
        return (
            <div>
                {(this.props.userlist).map(item => (
                    item.title ?
                        (<Card
                            key={item._id}
                            onClick={e => this.handleClick(item)}
                        >
                            <Card.Header
                                thumb={'http://' + item.headPic}
                                title={item.user}
                                extra={item.title}
                            ></Card.Header>
                            <Card.Body>
                                {item.type === 'boss' ? (<div>公司: {item.company}</div>) : null}
                                {item.desc.split('\n').map((item2, index) => (
                                    <p key={index}>{item2}</p>
                                ))}
                                {item.type === 'boss' ? (<div>{item.money}</div>) : null}
                            </Card.Body>
                        </Card>) : null
                ))}
            </div>
        )
    }
}
UserCard = withRouter(UserCard)


UserCard.propTypes = {
    userlist: PropTypes.array.isRequired
}