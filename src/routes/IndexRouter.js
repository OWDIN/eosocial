import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'

export default class IndexRouter extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile
  }

  render() {
    return (
      <Switch>
        <Route exact path='/feed' render={() => <Home {...this.props} />} />
        <Route path='/signup' component={Signup} />

        {/* redirection */}
        <Route exact path='/' render={() => <Redirect to='/feed' />} />
        <Route
          auth={this.props.auth}
          path='/logout'
          render={
            () => {
              // this.props.auth.logout()
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
