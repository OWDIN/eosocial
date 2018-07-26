import React from 'react'
import {
  Layout,
} from 'antd'
import Header from './layouts/Header'
import Content from './layouts/Content'
import Footer from './layouts/Footer'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile
  }

  render() {
    return (
      <Layout
        style={{ margin: '0 auto' }}
      >
        <Header auth={this.props.auth} profile={this.props.profile} />
        <Content />
        <Footer />
      </Layout>
    )
  }
}

App.defaultProps = {
  auth: true,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
