import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ReviewOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {}

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }
  render() {
    return (
      <div>
        <Container>
          <h1>Review Order</h1>

          <Button>Place Order</Button>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export const ConnectedReviewOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewOrder)
