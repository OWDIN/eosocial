import React from 'react'
import {
  Avatar,
  Dropdown,
  Menu,
} from 'antd'
import {
  A,
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
  <div>

    <A
      href='#signup'
      fontSize='1rem'
      fontWeight='bold'
    >
      Sign Up
    </A>
    <Span color='#ccc'> | </Span>
    <A
      href='#login'
      fontSize='1rem'
      fontWeight='bold'
    >
      Log In
    </A>
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
