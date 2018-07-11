import React from 'react'
import {
  Icon,
  Layout,
  Menu,
} from 'antd'

const Header = Layout.Header

const HeaderWrapper = () => {
  return (
    <Header
      className='gnb'
    >
      <div className='container'>
        <div className='logo'>
          <Icon type='link' style={{ marginRight: '6px' }} />
          EOSOCIAL <sub>beta</sub>
        </div>
        <Menu
          className='gnb'
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key='1'>Feed</Menu.Item>
          {/* <Menu.Item key='2'>Trending</Menu.Item> */}
        </Menu>
      </div>
    </Header>
  )
}

export default HeaderWrapper
