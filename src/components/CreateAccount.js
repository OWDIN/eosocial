import React from 'react'
import {
  Button,
  Card,
  Input,
  message,
} from 'antd'
import {
  // Keystore,
  Keygen,
} from 'eosjs-keygen'

export default class CreateAccount extends React.Component {
  state = {
    loading: false,
    privateKey: '',
    publicKey: '',
    masterPrivateKey: '',
  }

  handleClick = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
    message.success('Generated Keys', 5)

  }

  render() {
    return (
      <div>
        <Card
          title='Create Account'
          loading={this.state.loading}
        >

          <Button onClick={this.handleClick} style={{ marginTop: 16 }}>Create Account</Button>
        </Card>
      </div>
    )
  }
}
