import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {fetchSingleUser} from '../store/currentUser'

class SingleUser extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    this.props.fetchUser(id)
  }
  render() {
    const {user} = this.props
    return user ? (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <Card>
                <Card.Img className="cardImg" src={user.imgURL} />
                <Card.Body>
                  <Card.Text>
                    Name: {user.firstName} {user.lastName}
                    <br />
                    Phone: {user.phoneNumber}
                    <br />
                    Email: {user.email}
                    <br />
                    Rank: {user.userType}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <h3>Reviews by: {user.firstName}</h3>
              {user && user.id ? (
                user.reviews.map(review => (
                  <Card key={review.id} className="review">
                    <Card.Body>
                      <Card.Text>{review.content}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h1>No reviews</h1>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <h1>No user found</h1>
    )
  }
}

const mapState = state => {
  return {
    user: state.currentUser
  }
}

const dispatchProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchSingleUser(id))
  }
}

export const ConnectedSingleUser = connect(mapState, dispatchProps)(SingleUser)
