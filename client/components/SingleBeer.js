import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {fetchSingleBeer} from '../store/singleBeer'

export class SingleBeer extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.beerId, 10)
    this.props.fetchOneBeer(id)
  }
  render() {
    const {beer, match} = this.props
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
                  <Card.Title>{beer.title}</Card.Title>
                  <Card.Text>{beer.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            {beer.reviews.map(review => (
              <Col key={review.id}>
                <Card>
                  <Card.Text>
                    Review: {review.content}
                    <br />
                    Rating: {review.rating}
                  </Card.Text>
                </Card>
              </Col>
            ))}
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
    beer: state.singleBeer
  }
}

const dispatchProps = dispatch => {
  return {
    fetchOneBeer: id => dispatch(fetchSingleBeer(id))
  }
}

export default connect(mapState, dispatchProps)(SingleBeer)
