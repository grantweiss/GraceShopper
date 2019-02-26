import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {fetchSingleBeer} from '../store/singleBeer'

export class SingleBeer extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.id, 10)
    this.props.fetchOneBeer(id)
  }
  render() {
    const {beer, match} = this.props
    return beer && beer.id ? (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <Image src={beer.imgUrl} />
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Card.Body>
                  <Card.Title>{beer.name}</Card.Title>
                  <Card.Text>{beer.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <h1>No beer found</h1>
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
