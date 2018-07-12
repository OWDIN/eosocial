import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {
  Avatar,
  Dropdown,
  Menu,
} from 'antd'
import {
  Span,
} from 'glamorous'

const ProfileDropdownMenu = (
  <Menu>
    <Menu.Item key='0'>
      Profile
    </Menu.Item>
    <Menu.Item key='1'>
      Settings
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='3'>
      Logout
    </Menu.Item>
  </Menu>
)

const ProfileNotLoggedIn = (
  <div
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
    }}
  >
    <NavLink
      to='/signup'
    >
      Sign Up
    </NavLink>
    <Span color='#ccc'> | </Span>
    <NavLink
      to='/login'
    >
      Log In
    </NavLink>
  </div>
)

export default class ProfileMenu extends React.Component {
  constructor() {
    super()
    this.auth = false
  }

  render() {
    let ProfileMenuContent

    if (this.auth) {
      ProfileMenuContent = (
        <Dropdown overlay={ProfileDropdownMenu} placement='bottomRight' trigger={['click']}>
          <div>
            <Avatar size='large' icon='user' />
          </div>
        </Dropdown>
      )
    } else {
      ProfileMenuContent = ProfileNotLoggedIn
    }
    return (
      <div
        className='gnb profile menu'
        style={{
          textAlign: 'right',
        }}
      >
        { ProfileMenuContent }
      </div>
    )
  }
}
