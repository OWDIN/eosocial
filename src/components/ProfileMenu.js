import React from 'react'
import {
  Avatar,
  Dropdown,
  Icon,
  Menu,
} from 'antd'

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='http://www.alipay.com/'>1st menu item</a>
    </Menu.Item>
    <Menu.Item key='1'>
      <a href='http://www.taobao.com/'>2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='3'>3rd menu item</Menu.Item>
  </Menu>
)

export default class ProfileMenu extends React.Component {
  render() {
    return (
      <div
        className='gnb profile menu'
        style={{
          textAlign: 'right',
        }}
      >
        <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
          <div>
            <Avatar size='large' icon='user' />
            <Icon type='caret-down' style={{ color: '#ccc', marginLeft: '10px' }} />
          </div>
        </Dropdown>
      </div>
    )
  }
}
