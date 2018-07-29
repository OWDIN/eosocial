import React from 'react'
import {
  Div,
} from 'glamorous'
import IndexRouter from '../routes/IndexRouter'

export default class Content extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile
  }

  render() {
    return (
      <Div
        className='container'
      >
        <IndexRouter auth={this.props.auth} profile={this.props.profile} handleLogin={this.props.handleLogin} />
      </Div>
    )
  }
}

Content.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
