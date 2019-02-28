import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {fetchSingleBeer} from '../store/singleBeer'
import {fetchCurrentUser} from '../store/currentUser'
import {Link} from 'react-router-dom'

class SingleBeer extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.beerId, 10)
    this.props.fetchOneBeer(id)
    this.props.setUser()
  }
  render() {
    const {beer, match, user} = this.props
    return beer && beer.id ? (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <Card.Img src={beer.imgURL} />
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <strong>{beer.title}</strong>
                  </Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {beer.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type: </strong>
                    {beer.type}
                  </Card.Text>
                  <Card.Text>
                    <strong>ABV: </strong>
                    {beer.abv}
                  </Card.Text>
                  <Card.Text>
                    <strong>IBU: </strong>
                    {beer.ibu}
                  </Card.Text>
                  <Card.Text>
                    <strong>Categories:</strong>
                    {beer.categories
                      ? beer.categories.map(category => category.tag + ' ')
                      : 'No categories have been added'}
                  </Card.Text>

                  {user && user.userType === 'admin' ? (
                    <Button variant="success" href={`/beers/${beer.id}/edit`}>
                      {' '}
                      Edit
                    </Button>
                  ) : (
                    ''
                  )}
                  {user ? (
                    <Button variant="primary" href={`/beers/${beer.id}/review`}>
                      {' '}
                      Review
                    </Button>
                  ) : (
                    ''
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
            {beer.reviews ? (
              beer.reviews.map(review => (
                <Col key={review.id} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        {review.user.firstName + ' ' + review.user.lastName}{' '}
                        says:
                        <br />
                        Review: {review.content}
                        <br />
                        Rating: {review.rating}
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
    setUser: () => dispatch(fetchCurrentUser())
  }
}

export const ConnectedSingleBeer = connect(mapState, dispatchProps)(SingleBeer)
