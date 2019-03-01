import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {addCartItem, emptyCart, storeCartOnServer} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.emptyCart = this.emptyCart.bind(this)
    this.setCart = this.setCart.bind(this)
  }
  componentDidMount() {}
  emptyCart() {
    this.props.emptyCartFromPersist()
  }
  setCart() {
    this.props.setCartOnServer(this.props.user.id, this.props.cart)
  }
  render() {
    return (
      <div className="form">
        <Button onClick={this.emptyCart}>Delete Cart</Button>
        <Button onClick={this.setCart}>Set Cart in Server</Button>
        <p>Your Cart Contents:</p>
        <h1 />
        <div>
          {this.props.cart.map(lineItem => {
            return (
              <Card>
                <Card.Img
                  className="thumbNail"
                  variant="top"
                  src={lineItem.beer.imgURL}
                />
                <Card.Body>
                  <Card.Title>{lineItem.beer.title}</Card.Title>
                  <Card.Text>
                    quantity: {lineItem.quantity}
                    <br />
                    id: {lineItem.beer.id}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </div>
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
const mapDispatchToProps = dispatch => {
  return {
    emptyCartFromPersist: () => dispatch(emptyCart()),
    setCartOnServer: (userId, cart) => dispatch(storeCartOnServer(userId, cart))
  }
}

export const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
