import React from 'react'
import {
  Layout,
  Row,
  Col,
} from 'antd'
import { H1 } from 'glamorous';
import KeyGenerator from '../components/KeyGenerator'
import CreateAccount from '../components/CreateAccount'
import '../libs/EosJsApi'

const AntContent = Layout.Content

export default class Signup extends React.Component {
  render() {
    return (
      <AntContent
        style={{
          marginTop: '2rem',
          // boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.2)',
        }}
      >
        <H1>Signup</H1>
        <Row gutter={40} type='flex'>
          <Col span={12}>
            <KeyGenerator />
          </Col>
          <Col span={12}>
            <CreateAccount />
          </Col>
        </Row>
      </AntContent>
    )
  }
}
