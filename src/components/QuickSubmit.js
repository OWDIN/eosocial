import React from 'react'
// import { Helmet } from 'react-helmet'
// import { Highlight } from 'react-highlight.js'
import {
  Alert,
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  notification,
} from 'antd'
import {
  writePost,
} from '../libs/EosJsApi'

const { TextArea } = Input

export default class QuickSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile

    this.state = {
      content: new Date(),
    }
  }

  handleNotification = (type='error', message='Notification', description='') => {
    notification[type]({
      message,
      description,
      duration: 10,
    })
  }

  handleModal = (type, title, content) => {
    Modal[type]({
      title,
      content,
      // content: (
      //   <Highlight language='json'>
      //     {content}
      //   </Highlight>
      // ),
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = async () => {
    const result = await writePost(this.props.profile.username, this.props.profile.privateKey, this.state.content)
    console.log(result)

    this.handleModal(
      'success',
      'Executed eossocialapp:action:write()',
      JSON.stringify(result),
    )

    this.setState({
      content: '',
    })
    this.props.fetch()
  }

  render() {
    const avatarURL = `https://avatars.dicebear.com/v2/identicon/${this.props.profile.username}.svg`
    let editor = ''

    if (this.auth) {
      editor = (
        <Card
          title={(
            <span>
              <Avatar shape='square' size='large' style={{ marginRight: '12px' }} src={avatarURL} />
              <b>{this.props.profile.username}</b>
            </span>
          )}
          style={{
            marginBottom: '20px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #e8e8e8',
            boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.2)',
          }}
        >
          <TextArea
            name='content'
            rows={4}
            style={{
              border: 'none',
              resize: 'none',
              // appearance: 'none',
              // outline: 'none',
              // boxShadow: '0 0 !important',
            }}
            onChange={this.handleInputChange}
            autosize='true'
          />
          <Button
            type='primary'
            style={{
              float: 'right',
              marginTop: '20px',
            }}
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
          {/*
          <Helmet>
            <link rel='stylesheet' href='https://highlightjs.org/static/demo/styles/dracula.css' />
          </Helmet>
          */}
        </Card>
      )
    } else {
      editor = (
        <Alert
          message='Login Required'
          description='You have to log in to submit the post.'
          type='info'
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )
    }

    return (editor)
  }
}

QuickSubmit.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
