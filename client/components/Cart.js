import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image} from 'react-bootstrap'
import {addCartItem, emptyCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.emptyCart = this.emptyCart.bind(this)
  }
  componentDidMount() {}
  emptyCart() {
    this.props.emptyCartFromPersist()
  }
  render() {
    const {cart} = this.props
    return cart && cart.length ? (
      <div>
        <Col md={{span: 6, offset: 3}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
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
                  <td>{lineItem.quantity}</td>
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
        </Col>
      </div>
    ) : (
      <h1 className="center">Your cart is empty</h1>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}
const mapDispatchToProps = dispatch => {
  return {
    emptyCartFromPersist: () => dispatch(emptyCart())
  }
}

export const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
