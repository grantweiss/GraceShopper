import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class CheckoutForm extends Component {
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
          <h1 />
          <br />
          <br />
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="streetAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="streetAddress"
                  value={this.state.streetAddress}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={this.state.zipCode}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
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

export const ConnectedCheckoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm)
