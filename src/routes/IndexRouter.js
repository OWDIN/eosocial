import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
// import EOS from '../libs/api'
import Home from './Home'
import Signup from './Signup'

export default class IndexRouter extends React.Component {
  // console.log(EOS)
  render() {
    return (
      <Switch>
        <Route exact path='/feed' component={Home} />
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
}
