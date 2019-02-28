import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'

export class NewReview extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      rating: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange
}
