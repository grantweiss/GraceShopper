import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Row,
  Col,
  Table,
  Image,
  Form,
  Container,
  Card
} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import StripeCheckout from './StripeCheckout'
import {Elements, StripeProvider, CardForm} from 'react-stripe-elements'
import {ConnectedOrderItem, ConnectedCheckoutForm} from './index.js'

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
          {this.props.order ? (
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>Shipping To:</strong>
                  <br />
                  {this.props.order.firstName}
                  {this.props.order.lastName}
                  {this.props.order.streetAddress}
                  <br />
                  {this.props.order.city},
                  {this.props.order.state}
                  <br />
                  {this.props.order.zipCode}
                  <br />
                  {this.props.order.phoneNumber}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            'No order!'
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product ID #</th>
                <th>Beer</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Item Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map(lineItem => (
                <ConnectedOrderItem
                  key={lineItem.beer.id}
                  lineItem={lineItem}
                />
              ))}
              <br />
              <tr>
                <td>
                  {' '}
                  <strong>Subtotal</strong>
                </td>
                <td />
                <td />
                <td />
                <td>
                  {' '}
                  <strong>
                    {this.props.cart
                      .reduce(
                        (accum, orderItem) =>
                          accum + orderItem.beer.price * orderItem.quantity,
                        0
                      )
                      .toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </Table>

          <Elements>
            <StripeCheckout />
          </Elements>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.singleOrder,
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export const ConnectedReviewOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewOrder)
