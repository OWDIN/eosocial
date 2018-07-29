import React from 'react'
import {
  Layout,
} from 'antd'
import Header from './layouts/Header'
import Content from './layouts/Content'
import Footer from './layouts/Footer'

export default class App extends React.Component {
  constructor() {
    super()

    const storedAccountName = sessionStorage.getItem('account_name')
    const storedPublicKey = sessionStorage.getItem('public_key')
    const storedPrivateKey = sessionStorage.getItem('private_key')

    if (storedAccountName && storedPrivateKey) {
      this.state = {
        auth: true,
        profile: {
          username: storedAccountName,
          publicKey: storedPublicKey,
          privateKey: storedPrivateKey,
        },
      }
    } else {
      this.state = {
        auth: false,
        profile: {
          username: null,
          publicKey: null,
          privateKey: null,
        },
      }
    }
  }

  render() {
    return (
      <Layout
        style={{ margin: '0 auto' }}
      >
        <Header auth={this.state.auth} profile={this.state.profile} />
        <Content auth={this.state.auth} profile={this.state.profile} />
        <Footer />
      </Layout>
    )
  }
}
