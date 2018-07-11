import React from 'react'
import {
  Icon,
  Layout,
  Menu,
  Row,
  Col,
} from 'antd'
import ProfileMenu from '../components/ProfileMenu'

const Header = Layout.Header

const HeaderWrapper = () => {
  return (
    <Header
      className='gnb'
    >
      <div className='container'>
        <Row gutter={16}>
          <Col span={4}>
            <div className='logo'>
              <Icon type='link' style={{ marginRight: '6px' }} />
              EOSocial <sub>beta</sub>
            </div>
          </Col>
          <Col span={17}>
            <Menu
              className='gnb'
              theme='light'
              mode='horizontal'
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key='1'><Icon type='home' /> Feed</Menu.Item>
              <Menu.Item key='2' disabled><Icon type='line-chart' /> Trending</Menu.Item>
              <Menu.Item key='3'><Icon type='info-circle-o' /> Info</Menu.Item>
            </Menu>
          </Col>
          <Col span={3}>
            <ProfileMenu />
          </Col>
        </Row>
      </div>
    </Header>
  )
}

export default HeaderWrapper
