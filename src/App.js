import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import dealFn from './redux/connect';
import Login from './container/login';
import Register from './container/register';
import AuthRoute from './component/authroute';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import DashBoard from './component/dashboard'
import Chat from './component/chat'
import { getMegList, recvMsg } from './redux/action'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(getMegList())
    this.props.dispatch(recvMsg())
  }
  render() {
    return (
      <Fragment>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/geniusinfo' component={GeniusInfo} />
          <Route path='/chat/:user' component={Chat} />
          <Route component={DashBoard} />
          <Redirect from="/" extra to="/login"></Redirect>

          {/* <Route path="*" component={Login}></Route> */}
        </Switch>
      </Fragment>
    )
  }
}

App = dealFn(App)
export default App;
