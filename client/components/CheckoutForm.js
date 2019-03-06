import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {createOrder, updateOrderOnStore} from '../store/singleOrder'
import StripeCheckout from './StripeCheckout.js'
import {Elements, StripeProvider, CardForm} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.checkOut = this.checkOut.bind(this)
  }
  componentDidMount() {}

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }
  checkOut(event) {
    event.preventDefault()
    const total = this.props.cart
      .reduce(
        (accum, orderItem) => accum + orderItem.beer.price * orderItem.quantity,
        0
      )
      .toFixed(2)
    console.log('total:', total)
    this.props.updateOrder({...this.state, total})
    this.props.history.push('/cart/checkout/review')
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs={6}>
              <h4>Shipping Information</h4>
            </Col>
          </Row>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group as={Row} controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Row} controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
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
                <Form.Group as={Row} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={this.state.state}
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
                <Form.Group as={Row} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="float-right"
                  type="submit"
                  onClick={this.checkOut}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createOrder: fullOrder =>
      dispatch(createOrder(fullOrder, ownProps.history)),
    updateOrder: order => dispatch(updateOrderOnStore(order))
  }
}

export const ConnectedCheckoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm)
