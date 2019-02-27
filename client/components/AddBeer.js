import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {createBeer} from '../store/allbeers'

class AddBeer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      inventory: 0,
      abv: 0,
      ibu: 0,
      type: ''
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
    this.props.onCreateBeer(this.state)
    this.props.history.push('/beers')
  }

  render() {
    const {title, description, price, inventory, abv, ibu, type} = this.props
    return (
      <div className="form">
        <Col xs={{span: 12, offset: 6}}>
          <Form className="marg-top" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Enter Description"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={price}
                onChange={this.handleChange}
                placeholder="Enter Price"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicInventory">
              <Form.Label>Inventory</Form.Label>
              <Form.Control
                type="text"
                name="inventory"
                value={inventory}
                onChange={this.handleChange}
                placeholder="Enter Quantity"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicAbv">
              <Form.Label>Alcohol by Volume</Form.Label>
              <Form.Control
                type="text"
                name="abv"
                value={abv}
                onChange={this.handleChange}
                placeholder="Enter Alcohol by Volume"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicIbu">
              <Form.Label>International Bitterness Units</Form.Label>
              <Form.Control
                type="text"
                name="ibu"
                value={ibu}
                onChange={this.handleChange}
                placeholder="Enter IBU"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={type}
                onChange={this.handleChange}
                placeholder="Enter Type"
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

const mapDispatchToProps = dispatch => {
  return {
    onCreateBeer: beer => dispatch(createBeer(beer))
  }
}

export const ConnectedAddBeer = connect(null, mapDispatchToProps)(AddBeer)
