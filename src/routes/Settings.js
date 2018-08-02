import React from 'react'
import {
  Layout,
} from 'antd'
import { H1 } from 'glamorous';

const AntContent = Layout.Content

export default class Settings extends React.Component {
  render() {
    return (
      <AntContent
        style={{
          marginTop: '2rem',
        }}
      >
        <H1>Settings</H1>
        <p>Work in Progress... Not yet implemented.. Psst! <span role='img' aria-label='zap'>⚡️</span></p>
      </AntContent>
    )
  }
}
