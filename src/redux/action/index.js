import axios from 'axios';
import { ERROR_MSG, LOAD_DATA, AUTH_SUCCESS, USER_LIST, LOGOUT, MSG_LIST, MSG_READ, MSG_RECV } from '../consts';
import io from 'socket.io-client';
const socketio = io('ws://localhost:3002')

let authSuccess = data => {
    return { data, type: AUTH_SUCCESS }
}
let errorMsg = data => {
    return { data, type: ERROR_MSG }
}
// export let login = ({ user, pwd }) => {
//     if (!user || !pwd) return errorMsg('用户名密码必须输入')
//     return dispatch => {
//         axios.post('/user/login', { user, pwd })
//             .then(res => {
//                 if (res.status === 200 && res.data.code === 0) {
//                     dispatch(authSuccess(res.data.data))
//                 } else {
//                     dispatch(errorMsg(res.data.msg))
//                 }
//             })
//     }
// };

export let register = ({ user, pwd, repeatpwd, type }) => {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必填')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export let loadData = (userInfo) => {
    return { type: LOAD_DATA, data: userInfo }
}

export let update = (data) => {
    return dispatch => {
        axios.post('/user/update', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

let userList = data => {
    return { type: USER_LIST, data }
}

export let getUserList = type => {
    return dispatch => {
        axios.get('/user/list?type=' + type)
            .then(res => {
                if (res.data.code === 0) {
                    dispatch(userList(res.data.data))
                }
            })
    }
}

export let logoutSubmit = { type: LOGOUT }

let msgList = (msgs, users, myId) => {
    return { type: MSG_LIST, data: { msgs, users, myId } }
}

let msgRecv = (msg, myId) => {
    return { type: MSG_RECV, data: msg, myId }
}
export let getMegList = () => {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const myId = getState().user._id
                    dispatch(msgList(res.data.data, res.data.users, myId))
                }
            })
    }
}
export let sendMsg = ({ from, to, msg }) => {
    return dispatch => {
        socketio.emit('sendmsg', { from, to, msg })
    }
}

export let recvMsg = () => {
    return (dispatch, getState) => {
        socketio.on('recvmsg', function (data) {
            const myId = getState().user._id
            dispatch(msgRecv(data, myId))
        })
    }
}

let msgRead = ({ from, userid, num }) => {
    return { type: MSG_READ, data: { from, userid, num } }
}
export let readMsg = (from) => {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', { from })
            .then(res => {
                const userid = getState().user._id;
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({ from, userid, num: res.data.num }))
                }
            })
    }
}