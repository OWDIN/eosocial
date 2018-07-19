import React from 'react'
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  message,
  Spin,
} from 'antd'
import {
  // Keystore,
  Keygen,
} from 'eosjs-keygen'

const FormItem = Form.Item

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
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 5,
        },
      },
    }

    return (
      <div>
        <Spin
          indicator={<Icon type='loading' size='large' style={{ textAlign: 'center', fontSize: '2rem' }} spin />}
          spinning={this.state.loading}
        >
          <Card
            title='Key Generator'
          >
            <Form onSubmit={() => console.log('[submit]')}>
              <FormItem
                {...formItemLayout}
                label='Master Key'
              >
                <Input size='large' placeholder='Master Key' value={this.state.masterPrivateKey} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='Private Key'
              >
                <Input size='large' placeholder='Private Key' value={this.state.privateKey} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='Public Key'
              >
                <Input size='large' placeholder='Public Key' value={this.state.publicKey} />
              </FormItem>
              <FormItem
                {...tailFormItemLayout}
              >
                <Button onClick={this.handleClick} style={{ marginTop: 16 }}>Generate</Button>
              </FormItem>
            </Form>
          </Card>
        </Spin>
      </div>
    )
  }
}
