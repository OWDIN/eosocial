import React from 'react'
import {
  Layout,
} from 'antd'

const Footer = Layout.Footer

class FooterWrapper extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        &copy; EOSocial
      </Footer>
    );
  }
}

export default FooterWrapper
