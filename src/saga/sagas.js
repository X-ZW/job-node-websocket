import { all, call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
function* login({ form }) {
    debugger
    let res = yield axios.post('/user/login', { ...form })
    console.log(res)
    if (res.status === 200 && res.data.code === 0) {
        yield put({ type: 'AUTH_SUCCESS', data: res.data.data })
    } else {
        yield put({ type: 'ERROR_MSG', data: res.data.msg })
    }
}

export function* helloSaga() {
    console.log('Hello Saga!')
}

export function* loginAsync() {
    yield takeEvery('LOGIN', login)
}
export default function* rootSaga() {
    yield all([
        call(helloSaga),
        call(loginAsync),
    ])
}