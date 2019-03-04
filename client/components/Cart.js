import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {createOrder} from '../store/singleOrder'
import {
  addCartItem,
  removeCartItem,
  emptyCart,
  storeCartOnServer
} from '../store/cart'
import {ConnectedLineItem, ConnectedCheckoutForm} from './index.js'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.emptyCart = this.emptyCart.bind(this)
    this.setCart = this.setCart.bind(this)
    this.checkOut = this.checkOut.bind(this)
  }
  componentDidMount() {}
  emptyCart() {
    this.props.emptyCartFromPersist()
  }
  setCart() {
    this.props.setCartOnServer(this.props.user.id, this.props.cart)
  }
  checkOut() {
    this.props.createOrder(this.props.cart)
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    const {cart} = this.props
    return cart && cart.length ? (
      <div>
        <Col lg={{span: 6, offset: 3}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product ID #</th>
                <th>Beer</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map(lineItem => (
                <ConnectedLineItem key={lineItem.beer.id} lineItem={lineItem} />
              ))}
            </tbody>
          </Table>
          <Button
            size="sm"
            variant="outline-danger"
            className="float-right"
            onClick={this.emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            size="sm"
            variant="outline-success"
            className="float-right marg-right"
            type="submit"
            onClick={this.setCart}
          >
            Set Cart in Server
          </Button>
          {/* <Button className="float-right" onClick={this.checkOut}>
            Check Out
          </Button> */}

          <Button
            size="sm"
            variant="outline-success"
            className="float-right marg-right"
            onClick={this.checkOut}
            type="submit"
          >
            Checkout
          </Button>
        </Col>
      </div>
    ) : (
      <h1 className="center">Your cart is empty</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    emptyCartFromPersist: () => dispatch(emptyCart()),
    setCartOnServer: (userId, cart) =>
      dispatch(storeCartOnServer(userId, cart)),
    createOrder: cart => dispatch(createOrder(cart)),
    onRemoveCartItem: beer => dispatch(removeCartItem(beer))
  }
}

export const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
