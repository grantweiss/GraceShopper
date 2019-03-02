import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
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
    const {cart} = this.props
    console.log(cart)
    return cart && cart.length ? (
      <div>
        <Col md={{span: 6, offset: 3}}>
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
                <tr key={lineItem.beer.id}>
                  <td>{lineItem.beer.id}</td>
                  <td>
                    <Image
                      src={lineItem.beer.imgURL}
                      className="cartImg float-left"
                    />
                    <Link to={`/beers/${lineItem.beer.id}`}>
                      {lineItem.beer.title}
                    </Link>
                  </td>
                  <td>
                    {lineItem.quantity}
                    <Button variant="danger" size="small">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="danger"
            className="float-right"
            onClick={this.emptyCart}
          >
            Empty Cart
          </Button>
          <Button className="float-right" onClick={this.setCart}>
            Set Cart in Server
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
    setCartOnServer: (userId, cart) => dispatch(storeCartOnServer(userId, cart))
  }
}

export const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
