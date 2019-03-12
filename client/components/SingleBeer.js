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
import {fetchSingleBeer} from '../store/singleBeer'
import {fetchCurrentUser} from '../store/currentUser'
import {Link} from 'react-router-dom'
import {addCartItem} from '../store/cart'
import {removeTagFromBeer} from '../store/singleBeer'

class SingleBeer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.starMaker = this.starMaker.bind(this)
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }
  addToCart() {
    this.props.addBeerToCart(this.props.beer, this.state.quantity)
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.beerId, 10)
    this.props.fetchOneBeer(id)
    this.props.setUser()
  }
  starMaker(num) {
    const starArray = []
    for (let i = 1; i <= num; i++) {
      starArray.push(i)
    }
    return starArray
  }
  render() {
    const {beer, match, user, removeTag} = this.props
    return beer && beer.id ? (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={4} md={6}>
              <Card.Img src={beer.imgURL} />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Card>
                <Card.Body>
                  <Card.Title className="small-title">
                    <strong>{beer.title}</strong>
                  </Card.Title>
                  <Card.Text className="small-text">
                    <strong>Type:</strong> {beer.type}
                    <br />
                    <strong>Description:</strong> {beer.description}
                    <br />
                  </Card.Text>
                  <Card.Text className="small-text">
                    <strong>Price: </strong>
                    ${beer.price}
                    <br />
                    <strong>ABV: </strong>
                    {beer.abv.toFixed(2)}
                    <br />
                    <strong>IBU: </strong>
                    {beer.ibu}
                    <br />
                    <strong>Brewery: </strong>
                    <Link to={`/breweries/${beer.brewery.id}`}>
                      {beer.brewery.name}
                    </Link>
                  </Card.Text>
                  {user.userType === 'admin' ? (
                    <Card.Text className="small-text">
                      <strong>Inventory: </strong>
                      {beer.inventory}
                    </Card.Text>
                  ) : (
                    ''
                  )}
                  <Card.Text>
                    <strong>Categories:</strong>
                    {user.userType === 'admin'
                      ? beer.categories && beer.categories.length
                        ? beer.categories.map(category => (
                            <OverlayTrigger
                              trigger="click"
                              key={category.id}
                              category={category}
                              overlay={
                                <Popover id={`popover-positioned-${category}`}>
                                  <Button
                                    onClick={() =>
                                      removeTag(beer.id, category.id)
                                    }
                                    className="sm-button"
                                    variant="danger"
                                    size="sm"
                                  >
                                    X
                                  </Button>
                                </Popover>
                              }
                            >
                              <Button
                                size="sm"
                                variant="link"
                                className="no-button-style button-style small-text"
                              >
                                {category.tag + ' '}
                              </Button>
                            </OverlayTrigger>
                          ))
                        : ' No categories have been added'
                      : beer.categories.map(category => (
                          <Button
                            key={category.id}
                            size="sm"
                            variant="link"
                            className="no-button-style button-style"
                          >
                            {category.tag + ' '}
                          </Button>
                        ))}
                  </Card.Text>

                  {user && user.userType === 'admin' ? (
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="marg-right"
                      href={`/beers/${beer.id}/edit`}
                    >
                      {' '}
                      Edit
                    </Button>
                  ) : (
                    ''
                  )}
                  {user ? (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      href={`/beers/${beer.id}/review`}
                    >
                      {' '}
                      Review
                    </Button>
                  ) : (
                    ''
                  )}
                  {beer.inventory !== 0 ? (
                    <Form>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={this.addToCart}
                      >
                        Add To Cart
                      </Button>
                      <Form.Group controlId="quantity">
                        <Form.Label className="small-text">Quantity</Form.Label>
                        <Form.Control
                          className="small-field"
                          size="sm"
                          type="number"
                          value={this.state.quantity}
                          onChange={this.handleChange}
                          min="1"
                        />
                      </Form.Group>
                    </Form>
                  ) : (
                    'Currently Unavailable'
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <br />
        <div>
          <h4 className="center">Reviews for {beer.title}</h4>
        </div>
        <Container>
          <Row>
            {beer.reviews && beer.reviews.length ? (
              beer.reviews.map(review => (
                <Col key={review.id} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <Link to={`/users/${review.user.id}`}>
                          {review.user.firstName + ' ' + review.user.lastName}{' '}
                        </Link>
                        <span className="md-text">says:</span>
                        <br />
                        <span className="md-text">{review.content}</span>
                        <br />
                        <span className="md-text">Rating: </span>
                        {this.starMaker(review.rating).map(num => (
                          <i key={num} className="fas fa-star gold" />
                        ))}
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
    addBeerToCart: (beer, quantity) => dispatch(addCartItem(beer, quantity)),
    removeTag: (beerId, tagId) => dispatch(removeTagFromBeer(beerId, tagId))
  }
}

export const ConnectedSingleBeer = connect(mapState, dispatchProps)(SingleBeer)
