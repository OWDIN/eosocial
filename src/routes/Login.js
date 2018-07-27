import React from 'react'
import {
  Layout,
  Row,
  Col,
} from 'antd'
import { H1 } from 'glamorous';
import LoginForm from '../components/LoginForm'
import '../libs/EosJsApi'
import Logo from '../assets/img/gnb-logo.png'

const AntContent = Layout.Content

export default class Login extends React.Component {
  render() {
    return (
      <AntContent
        style={{
          marginTop: '2rem',
        }}
      >
        <H1 textAlign='center'>
          <img
            src={Logo}
            alt='Logo'
            className='gnb-logo'
            style={{
              height: '62px',
              margin: '40px 0',
            }}
          />
        </H1>
        <Row gutter={40} type='flex' justify='center' align='center'>
          <Col span={12}>
            <LoginForm />
          </Col>
        </Row>
      </AntContent>
    )
  }
}
