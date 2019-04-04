/* eslint-disable */
import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
  Form,
  OverlayTrigger,
  Popover
} from 'react-bootstrap'
import {fetchSingleBrewery} from '../store/singleBrewery'
import {fetchCurrentUser} from '../store/currentUser'
import {Link} from 'react-router-dom'

class SingleBrewery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.breweryId, 10)
    this.props.fetchOneBrewery(id)
    this.props.setUser()
  }
  render() {
    const {brewery, match, user, removeTag} = this.props
    return brewery && brewery.id ? (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={8} md={6}>
              <Card>
                <Card.Body>
                  <Card.Title className="small-title">
                    <strong>{brewery.name}</strong>
                  </Card.Title>
                  <Card.Text className="small-text">
                    <strong>Address:</strong> {brewery.streeetAddress}
                    <br />
                    <strong>City:</strong> {brewery.city}
                    <br />
                    <strong>State:</strong> {brewery.state}
                    <br />
                    <strong>Country:</strong> {brewery.country}
                    <br />
                    {/* <strong>Zip Code:</strong> {brewery.zipCode}
                    <br />
                    <strong>Phone Number:</strong> {brewery.phoneNumber}
                    <br /> */}
                    <strong>URL:</strong>{' '}
                    <a href={brewery.url}>{brewery.url}</a>
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <br />
        <div>
          <h4 className="center">Beers from {brewery.name}</h4>
        </div>
        <Container>
          <Row>
            {brewery.beers && brewery.beers.length ? (
              brewery.beers.map(beer => (
                <Col key={beer.id} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <Link to={`/beers/${beer.id}`}>{beer.title} </Link>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <Card border="light">
                  <Card.Text className="center">No reviews yet</Card.Text>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    ) : (
      <div>
        <h1>No brewery found</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    beer: state.singleBeer,
    user: state.user,
    brewery: state.singleBrewery
  }
}

const dispatchProps = dispatch => {
  return {
    fetchOneBrewery: id => dispatch(fetchSingleBrewery(id)),
    setUser: () => dispatch(fetchCurrentUser())
  }
}

export const ConnectedSingleBrewery = connect(mapState, dispatchProps)(
  SingleBrewery
)
