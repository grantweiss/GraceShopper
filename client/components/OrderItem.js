import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {removeCartItem} from '../store/cart'

class OrderItem extends Component {
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
      <tr className="no-style">
        <td>{lineItem.beer.id}</td>
        <td>
          <Image src={lineItem.beer.imgURL} className="cartImg float-left" />
          <Link to={`/beers/${lineItem.beer.id}`}>{lineItem.beer.title}</Link>
        </td>
        <td>{lineItem.quantity}</td>
        <td>{lineItem.beer.price.toFixed(2)}</td>
        <td>{(lineItem.beer.price * lineItem.quantity).toFixed(2)}</td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveCartItem: beer => dispatch(removeCartItem(beer))
  }
}

export const ConnectedOrderItem = connect(null, mapDispatchToProps)(OrderItem)
