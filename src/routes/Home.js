import React from 'react'
import {
  Layout,
} from 'antd'
import {
  Div,
  H1,
} from 'glamorous'
import Feed from '../components/Feed'

const AntContent = Layout.Content

export default class Home extends React.Component {
  render() {
    return (
      <AntContent
        style={{
          marginTop: '2rem',
          padding: '2rem 1rem',
        }}
      >
        <H1 fontWeight='bold'>Feed</H1>
        <Div
          display='flex'
        >
          <Div
            width='273px'
            height='400px'
            backgroundColor='#e0e0e0'
          />
          <Feed />
          <Div
            width='273px'
            height='400px'
            backgroundColor='#e0e0e0'
          />
        </Div>
      </AntContent>
    )
  }
}
