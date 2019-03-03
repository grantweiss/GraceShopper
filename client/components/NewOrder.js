import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {createOrder} from '../store/singleOrder'

class NewOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNumber: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    this.props.createOrder(this.state)
  }

  render() {
    const {
      streetAddress,
      city,
      state,
      country,
      zipCode,
      phoneNumber
    } = this.props
    return (
      <div className="form">
        <Col xs={{span: 12, offset: 6}}>
          <Form className="marg-top" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formBasicStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="streetAddress"
                value={streetAddress}
                onChange={this.handleChange}
                placeholder="Enter Stree Address"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicCity">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={city}
                onChange={this.handleChange}
                placeholder="Enter City"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicState">
              <Form.Label>Inventory</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={state}
                onChange={this.handleChange}
                placeholder="Enter State"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={country}
                onChange={this.handleChange}
                placeholder="Enter Country"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={zipCode}
                onChange={this.handleChange}
                placeholder="Enter ZIP Code"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicphoneNumber">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createOder: beer => dispatch(createOrder(beer, ownProps.history))
  }
}

export const ConnectedNewOrder = connect(null, mapDispatchToProps)(NewOrder)
