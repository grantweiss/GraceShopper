import React from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/singleBeer'
import {Card, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'

export class NewReview extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      rating: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async event => {
    const beerId = this.props.match.params.beerId
    event.preventDefault()
    this.props.addReview(beerId, this.state)
    this.props.history.push(`/beers/${beerId}`)
  }
  render() {
    return (
      <div className="form">
        <Col xs={{span: 12, offset: 6}}>
          <Form className="marg-top" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formBasicContent">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="textarea"
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
                as="textarea"
                rows="3"
                placeholder="Enter review"
              />
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicContent">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
                placeholder="Enter rating"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addReview: (beerId, review) => dispatch(createReview(beerId, review))
  }
}

export const ConnectedNewReview = connect(null, mapDispatch)(NewReview)
