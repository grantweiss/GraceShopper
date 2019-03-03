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
      <tr className="no-style">
        <td>{lineItem.beer.id}</td>
        <td>
          <Image src={lineItem.beer.imgURL} className="cartImg float-left" />
          <Link to={`/beers/${lineItem.beer.id}`}>{lineItem.beer.title}</Link>
        </td>
        <td>
          <Form className="inline">
            <Form.Group className="no-style-group" controlId="quantity">
              <Form.Label className="inline marg-right">Update: </Form.Label>
              <Form.Control
                size="sm"
                className="small-field inline"
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                min="1"
              />
            </Form.Group>
          </Form>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => this.handleClick(lineItem.beer)}
            className="float-right inline marg-top-xs"
          >
            Remove
          </Button>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveCartItem: beer => dispatch(removeCartItem(beer))
  }
}

export const ConnectedLineItem = connect(null, mapDispatchToProps)(LineItem)
