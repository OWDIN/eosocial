import React from 'react'
import {
  Avatar,
  Card,
  Icon,
  Tooltip,
} from 'antd'
import moment from 'moment'

// const { Meta } = Card

export default class FeedItem extends React.Component {
  render() {
    const avatarURL = `https://avatars.dicebear.com/v2/identicon/${this.props.author}.svg`

    return (
      <Card
        loading={this.props.loading}
        title={(
          // <Meta
          //   avatar={<Avatar shape='square' size='large' style={{ marginRight: '12px' }} src={avatarURL} />}
          //   title={this.props.author}
          //   description={moment.unix(this.props.createdAt).fromNow()}
          // />
          <span>
            <Avatar shape='square' size='large' style={{ marginRight: '12px' }} src={avatarURL} />
            <b>{this.props.author}</b>
            <span
              style={{
                color: '#ccc',
                fontStyle: 'italic',
                fontWeight: 'normal',
              }}
            >
              &nbsp;- {moment.unix(this.props.createdAt).fromNow()}
            </span>
          </span>
        )}
        // extra={<span>Detail</span>}
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
          (
            <Tooltip title='Work in Progress...'>
              <Icon type='message' disabled />
            </Tooltip>
          ),
          (
            <Tooltip title='Work in Progress...'>
              <Icon type='ellipsis' disabled />
            </Tooltip>
          ),
        ]}
      >
        {/* <h2>{this.props.title}</h2> */}
        <p>{this.props.content}</p>
      </Card>
    )
  }
}

FeedItem.defaultProps = {
  loading: false,
  author: '',
  // title: '',
  content: '',
  createdAt: 0,
  updatedAt: 0,
}
