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
