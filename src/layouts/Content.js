import React from 'react'
import {
  Layout,
} from 'antd'

const AntContent = Layout.Content

class Content extends React.Component {
  render() {
    return (
      <AntContent
        className='container'
        style={{
          marginTop: '2rem',
          padding: '2rem 1rem',
          background: 'white',
          borderRadius: '4px',
          border: '1px solid #e8e8e8',
          // boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.2)',
        }}
      >
        aa
      </AntContent>
    )
  }
}

export default Content
