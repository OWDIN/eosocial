import React from 'react'
import {
  Button,
  Card,
  Icon,
  Input,
  message,
  Spin,
} from 'antd'
import {
  // Keystore,
  Keygen,
} from 'eosjs-keygen'

export default class KeyGenerator extends React.Component {
  state = {
    loading: false,
    privateKey: '',
    publicKey: '',
    masterPrivateKey: '',
  }

  handleClick = () => {
    this.setState({ loading: true })

    Keygen.generateMasterKeys().then((keys) => {
      this.setState({
        loading: false,
        masterPrivateKey: keys.masterPrivateKey,
        privateKey: keys.privateKeys.owner,
        publicKey: keys.publicKeys.owner,
      })
      message.success('Generated Keys', 5)
    })
  }

  render() {
    return (
      <div>
        <Spin
          indicator={<Icon type='loading' size='large' style={{ textAlign: 'center', fontSize: '2rem' }} spin />}
          spinning={this.state.loading}
        >
          <Card
            title='Key Generator'
          >
            <p>Master : <Input size='large' placeholder='Master Private Key' value={this.state.masterPrivateKey} /></p>
            <p>Private: <Input size='large' placeholder='Private Key' value={this.state.privateKey} /></p>
            <p>Public: <Input size='large' placeholder='Public Key' value={this.state.publicKey} /></p>
            <Button onClick={this.handleClick} style={{ marginTop: 16 }}>Generate</Button>
          </Card>
        </Spin>
      </div>
    )
  }
}
