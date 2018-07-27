import React from 'react'
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Spin,
  message,
} from 'antd'
import {
  validPrivate,
  login,
} from '../libs/EosJsApi'

const FormItem = Form.Item

export default class LoginForm extends React.Component {
  state = {
    loading: false,
    username: null,
    privateKey: null,
  }

  handleClick = () => {
    this.setState({ loading: true })
    if (login(this.state.username, this.state.privateKey)) {
      message.success('Successfully logged in.', 5)
      this.setState({ loading: true })
    } else {
      message.error('Failed to logged in.', 5)
      this.setState({ loading: false })
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    }, () => this.validateForm(name))

    console.table(this.state)
  }

  validateForm = (name) => {
    const field = name + 'Check'

    switch (name) {
    case 'username':
      if (this.state.username !== undefined && this.state.username.length === 12) {
        this.setState({
          [field]: {
            validateStatus: 'success',
          },
        })
      } else {
        this.setState({
          [field]: {
            validateStatus: 'warning',
            help: 'Username can be 12 characters or numbers.',
          },
        })
      }

      break
    case 'privateKey':
      if (validPrivate(this.state.privateKey) === true && this.state.privateKey.length === 51) {
        this.setState({
          [field]: {
            validateStatus: 'success',
          },
        })
      } else {
        this.setState({
          [field]: {
            validateStatus: 'warning',
            help: 'You should input valid private key.',
          },
        })
      }
      break

    default:
      this.setState({
        [field]: {
          validateStatus: 'error',
          help: 'Form doesn not exist!',
        },
      })
      break
    }
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
            title='Login'
          >
            <Form onSubmit={this.handleClick}>
              <FormItem
                {...formItemLayout}
                {...this.state.usernameCheck}
                required='true'
                hasFeedback
                label='Username'
              >
                <Input
                  name='username'
                  placeholder='EOS Account Name'
                  size='large'
                  width='10rem'
                  onChange={this.handleInputChange}
                  value={this.state.username}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                {...this.state.privateKeyCheck}
                required='true'
                hasFeedback
                label='Password'
              >
                <Input
                  name='privateKey'
                  placeholder='Private Key'
                  size='large'
                  onChange={this.handleInputChange}
                  value={this.state.privateKey}
                />
              </FormItem>
              <FormItem
                {...tailFormItemLayout}
              >
                <Button
                  type='primary'
                  onClick={this.handleClick}
                  style={{ margin: '0 auto' }}
                >
                  Login
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Spin>
      </div>
    )
  }
}
