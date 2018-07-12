import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
// import EOS from '../libs/api'
import Home from './Home'
import Signup from './Signup'

export default class IndexRouter extends React.Component {
  // console.log(EOS)
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
      </Switch>
    )
  }
}
