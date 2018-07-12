import React from 'react'
import {
  Layout,
} from 'antd'
import Header from './layouts/Header'
import Content from './layouts/Content'
import Footer from './layouts/Footer'

class App extends React.Component {
  render() {
    return (
      <Layout
        style={{ margin: '0 auto' }}
      >
        <Header />
        <Content />
        <Footer />
      </Layout>
    )
  }
}

export default App
