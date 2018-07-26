import React from 'react'
import {
  Alert,
  Avatar,
  Card,
  Icon,
  Input,
} from 'antd'

const { TextArea } = Input

export default class QuickSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile
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
          actions={[
            (<span><Icon type='like-o' /> 0</span>),
            (<span><Icon type='dislike-o' /> 0</span>),
          ]}
        >
          <TextArea
            rows={4}
            style={{
              border: 'none',
              resize: 'none',
              appearance: 'none',
              outline: 'none',
              boxShadow: '0 0 !important',
            }}
            autosize='true'
          />
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
