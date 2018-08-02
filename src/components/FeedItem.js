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
    let actionItems = []
    const voting = this.props.voting
    let upvote = 0
    let downvote = 0
    console.log(voting)

    for (let index = 0; index < voting.length; index++) {
      console.log(voting[index])
      if (voting[index].type === 'up') {
        upvote += 1
      } else {
        downvote += 1
      }
    }

    if (this.props.auth) {
      actionItems = [
        (<span><Icon type='like-o' /> {upvote}</span>),
        (<span><Icon type='dislike-o' /> {downvote}</span>),
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
      ]
    } else {
      actionItems = [
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
      ]
    }

    return (
      <Card
        loading={this.props.loading}
        title={(
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
        actions={actionItems}
      >
        {/* <h2>{this.props.title}</h2> */}
        <p>{this.props.content}</p>
      </Card>
    )
  }
}

FeedItem.defaultProps = {
  author: '',
  // title: '',
  content: '',
  voting: '',
  createdAt: 0,
  updatedAt: 0,
  loading: false,
  auth: '',
}
