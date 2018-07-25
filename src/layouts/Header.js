import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {
  Icon,
  Layout,
  Menu,
  Row,
  Col,
} from 'antd'
import Logo from '../assets/img/gnb-logo.png'
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
              <NavLink to='/'>
                <img src={Logo} alt='Logo' className='gnb-logo' style={{ height: '34px', marginRight: '4px' }} />
                <sub>beta</sub>
              </NavLink>
            </div>
          </Col>
          <Col span={17}>
            <Menu
              className='gnb'
              theme='light'
              mode='horizontal'
            >
              <Menu.Item key='1'>
                <NavLink to='/'><Icon type='home' /> Feed</NavLink>
              </Menu.Item>
              <Menu.Item key='2' disabled>
                <NavLink to='/trending'><Icon type='line-chart' /> Trending</NavLink>
              </Menu.Item>
              <Menu.Item key='3'>
                <NavLink to='/info'><Icon type='info-circle-o' /> Info</NavLink>
              </Menu.Item>
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
