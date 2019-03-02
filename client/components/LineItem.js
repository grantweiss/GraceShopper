import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {removeCartItem} from '../store/cart'

class LineItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.lineItem.quantity
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(beer) {
    this.props.onRemoveCartItem(beer)
  }

  handleChange(event) {
    this.props.lineItem.quantity = event.target.value
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    const {lineItem} = this.props
    return (
      <tr>
        <td>{lineItem.beer.id}</td>
        <td>
          <Image src={lineItem.beer.imgURL} className="cartImg float-left" />
          <Link to={`/beers/${lineItem.beer.id}`}>{lineItem.beer.title}</Link>
        </td>
        <td>
          <Form>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                min="1"
              />
            </Form.Group>
          </Form>
          <Button
            variant="danger"
            size="small"
            onClick={() => this.handleClick(lineItem.beer)}
            className="float-right"
          >
            Delete
          </Button>
        </td>
      </tr>
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
    onRemoveCartItem: beer => dispatch(removeCartItem(beer))
  }
}

export const ConnectedLineItem = connect(mapStateToProps, mapDispatchToProps)(
  LineItem
)
