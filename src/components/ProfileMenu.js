import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {
  Avatar,
  Dropdown,
  Icon,
  Menu,
} from 'antd'
import {
  Span,
} from 'glamorous'

const ProfileDropdownMenu = (
  <Menu>
    <Menu.Item key='profile'>
      <NavLink to='/profile'><Icon type='user' style={{ marginRight: '10px' }} />Profile</NavLink>
    </Menu.Item>
    <Menu.Item key='settings'>
      <NavLink to='/settings'><Icon type='setting' style={{ marginRight: '10px' }} />Setting</NavLink>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='logout'>
      <NavLink to='/logout'><Icon type='logout' style={{ marginRight: '10px' }} />Logout</NavLink>
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
  constructor(props) {
    super(props)

    this.auth = this.props.auth
    this.profile = this.props.profile
  }

  render() {
    let ProfileMenuContent
    const avatarURL = `https://avatars.dicebear.com/v2/identicon/${this.props.profile.username}.svg`

    if (this.auth) {
      ProfileMenuContent = (
        <Dropdown overlay={ProfileDropdownMenu} placement='bottomRight' trigger={['click']}>
          <div>
            <Avatar shape='square' size='large' icon='user' src={avatarURL} />
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

ProfileMenu.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
