import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducer from '../reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../../saga/sagas"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  allReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk, sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)
export default store