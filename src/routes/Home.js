import React from 'react'
import {
  Layout,
} from 'antd'
import {
  Div,
} from 'glamorous'
import Feed from '../components/Feed'

const AntContent = Layout.Content

export default class Home extends React.Component {
  render() {
    return (
      <AntContent
        style={{
          marginTop: '2rem',
        }}
      >
        <Div
          display='flex'
        >
          <Div
            width='273px'
            height='400px'
            // backgroundColor='#e0e0e0'
            // border='1px solid #ccc'
            // borderRadius='4px'
          />
          <Feed auth={this.props.auth} profile={this.props.profile} />
          <Div
            width='273px'
            height='400px'
            // backgroundColor='#e0e0e0'
            // border='1px solid #ccc'
            // borderRadius='4px'
          />
        </Div>
      </AntContent>
    )
  }
}

Home.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
