import React from 'react'
import { Div } from 'glamorous'
import QuickSubmit from './QuickSubmit'
import FeedItem from './FeedItem'
import {
  getGlobalFeed,
  getVoteInfo,
} from '../libs/EosJsApi'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile

    this.state = {
      loading: true,
      feedItems: [],
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    getGlobalFeed().then((response) => {
      response.rows.map((data) => {
        data.key = data.id
        getVoteInfo(data.id).then((voteResponse) => {
          data.voting = voteResponse.rows
        })

        return data
      })

      this.setState({
        loading: false,
        feedItems: response,
      }, () => console.log(this.state))
    })
  }

  render() {
    const items = this.state.feedItems.rows || ''
    let feed = null

    if (items !== '') {
      feed = items.reverse().map((item) => {
        console.log('vote: ', item.voting)
        console.log(item)
        return (
          <FeedItem
            key={item.key}
            author={item.author}
            content={item.content}
            voting={item.voting}
            createdAt={item.created_at}
            updatedAt={item.updated_at}
            loading={this.state.loading}
            auth={this.props.auth}
          />
        )
      })
    }

    return (
      <Div
        width='546px'
        marginLeft='20px'
        marginRight='20px'
      >
        <QuickSubmit auth={this.props.auth} profile={this.props.profile} fetch={this.fetch} />
        <Div>
          { feed }
        </Div>
      </Div>
    )
  }
}

Feed.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
