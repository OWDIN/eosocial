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

const HeaderWrapper = (props) => {
  const location = window.location.href.split('/')

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
              defaultOpenKeys={[location[3]]}
              defaultSelectedKeys={location[4] ? [location[3] + ':' + location[4]] : [location[3]]} // highlight primary menu or secondary menu
              selectedKeys={location[4] ? [location[3] + ':' + location[4]] : [location[3]]}
            >
              <Menu.Item key='feed'>
                <NavLink to='/feed'><Icon type='home' /> Feed</NavLink>
              </Menu.Item>
              <Menu.Item key='trending' disabled>
                <NavLink to='/trending'><Icon type='line-chart' /> Trending</NavLink>
              </Menu.Item>
              <Menu.Item key='info'>
                <NavLink to='/info'><Icon type='info-circle-o' /> Info</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={3}>
            <ProfileMenu auth={props.auth} profile={props.profile} />
          </Col>
        </Row>
      </div>
    </Header>
  )
}

HeaderWrapper.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}

export default HeaderWrapper
