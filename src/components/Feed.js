import React from 'react'
import { Div } from 'glamorous'
import FeedItem from './FeedItem'
import {
  getGlobalFeed,
} from '../libs/EosJsApi'

export default class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      feedItems: [1, 2, 3],
    }
  }

  componentDidMount() {
    getGlobalFeed().then((response) => {
      this.setState({
        loading: false,
        feedItems: response,
      })
    })
  }

  render() {
    // const items = [1, 2, 3]
    const items = this.state.feedItems.rows || []
    // const items = Array.from(this.state.feedItems.rows)
    // console.log('[ render() ]: ', typeof items, items)
    console.log('[ render() ]: ', items)
    const feed = items.map((item) => {
      return (
        <FeedItem
          author={item.author}
          content={item.content}
          createdAt={item.created_at}
          updatedAt={item.updated_at}
          loading={this.state.loading}
        />
      )
    })

    return (
      <Div
        width='546px'
        marginLeft='20px'
        marginRight='20px'
      >
        {feed}
        {/* <FeedItem content='test' loading={this.state.loading} /> */}
      </Div>
    )
  }
}
