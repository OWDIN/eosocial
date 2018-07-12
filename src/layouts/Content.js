import React from 'react'
import {
  Div,
} from 'glamorous'
import IndexRouter from '../routes/IndexRouter'

export default class Content extends React.Component {
  render() {
    return (
      <Div
        className='container'
      >
        <IndexRouter />
      </Div>
    )
  }
}
