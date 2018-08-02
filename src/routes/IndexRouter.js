import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './Home'
import Info from './Info'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import Settings from './Settings'

export default class IndexRouter extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile
  }

  render() {
    return (
      <Switch>
        <Route path='/feed' render={() => <Home {...this.props} />} />
        <Route path='/info' render={() => <Info {...this.props} />} />
        <Route exact path='/login' render={() => <Login {...this.props} />} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/profile' render={() => <Profile {...this.props} />} />
        <Route exact path='/settings' render={() => <Settings {...this.props} />} />

        {/* redirection */}
        <Route
          exact
          path='/'
          render={
            () => {
              this.props.handleLogin()
              return <Redirect to='/feed' />
            }
          }
        />
        <Route
          auth={this.props.auth}
          path='/logout'
          render={
            () => {
              sessionStorage.clear()
              this.props.handleLogin()
              return <Redirect to='/' />
            }
          }
        />

      </Switch>
    )
  }
}

IndexRouter.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
