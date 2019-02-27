import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import {fetchSingleBeer, editBeerOnServer} from '../store/singleBeer'
import {fetchCurrentUser} from '../store/currentUser'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

class EditBeer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      imgURL: '',
      abv: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.beerId, 10)
    this.props.fetchOneBeer(id)
    this.props.setUser()
    this.setState({...this.props.beer})
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit(event) {
    const id = parseInt(this.props.match.params.beerId, 10)
    event.preventDefault()
    this.props.editBeer(this.state, id)
    this.props.history.push(`/beers/${id}`)
  }
  componentDidUpdate(prevProps) {
    if (this.props.beer.id !== prevProps.beer.id) {
      this.setState({...this.props.beer})
    }
  }
  render() {
    const {beer, match, user} = this.props
    return beer && beer.id ? (
      <div>
        <Container>
          <h1>
            Editing Beer #{beer.id}:{beer.title}
          </h1>
          <br />
          <br />
          <Row>
            <Col xs={12} sm={3}>
              <p>Current Image:</p>
              <Card.Img src={beer.imgURL} />
            </Col>
            {/* <Col xs={12} sm={9}> */}
            {/* <Card>
                <Card.Body> */}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <br />

              <Form.Group as={Row} controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="imgURL">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.imgURL}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="abv">
                <Form.Label>ABV: {this.state.abv}</Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  value={this.state.abv}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            {/* </Card.Body> */}
            {/* </Card> */}
            {/* </Col> */}
          </Row>
        </Container>
        <br />
      </div>
    ) : (
      <div>
        <h1>No beer found</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    beer: state.singleBeer,
    user: state.user
  }
}

const dispatchProps = dispatch => {
  return {
    fetchOneBeer: id => dispatch(fetchSingleBeer(id)),
    setUser: () => dispatch(fetchCurrentUser()),
    editBeer: (beer, id) => dispatch(editBeerOnServer(beer, id))
  }
}

export const EditBeerForm = withRouter(
  connect(mapState, dispatchProps)(EditBeer)
)
