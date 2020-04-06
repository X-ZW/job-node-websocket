import { combineReducers } from 'redux';
import { LOGIN, ERROR_MSG, LOAD_DATA, AUTH_SUCCESS, USER_LIST, LOGOUT, MSG_LIST, MSG_READ, MSG_RECV } from '../consts';
import { getRedirectPath } from '../../util'
const initState = {
    redirectTo: '',
    user: '',
    msg: '',
    type: ''
}
function reducer(state = 0, action) {
    switch (action.type) {
        case LOGIN:
            state = action.data++
            break;
        default:
            break;
    }
    return state
}

function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                ...action.data,
                msg: '',
                redirectTo: getRedirectPath(action.data)
            }
        case LOAD_DATA:
            return {
                ...state,
                ...action.data
            }
        case ERROR_MSG:
            return {
                ...state,
                msg: action.data
            }
        case 'CLEAN_MSG':
            return {
                ...state,
                ...action.data,
                msg: ''
            }
        case LOGOUT:
            return { ...initState, redirectTo: '/login' }
        default:
            break;
    }
    return state
}

// 请求招聘页面的数据
function chatuser(state = { userlist: [] }, action) {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userlist: action.data }
        default:
            return state
    }
}

// 处理聊天
function chat(state = { chatmsg: [], unread: 0, users: {} }, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, users: action.data.users, chatmsg: action.data.msgs, unread: action.data.msgs.filter(item => !item.read && item.to === action.data.myId).length }
        case MSG_RECV:
            const n = action.data.to === action.myId ? 1 : 0
            return { ...state, chatmsg: [...state.chatmsg, action.data], unread: state.unread + n }
        case MSG_READ:
            debugger
            const { from, num } = action.data
            return {
                ...state,
                unread: state.unread - num,
                chatmsg: state.chatmsg.map(item => ({ ...item, read: from === item.from ? true : item.read }))
            }
        default:
            return state
    }
}
const allReducer = combineReducers({
    reducer,
    user,
    chatuser,
    chat
})

export default allReducer