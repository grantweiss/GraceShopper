import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import {fetchSingleUser, changeRankOnServer} from '../store/currentUser'

class SingleUser extends React.Component {
  constructor() {
    super()
    this.state = {
      userType: 'unAuth'
    }
  }
  handleChange = event => {
    this.setState({
      userType: event.target.value
    })
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    this.props.fetchUser(id)
  }
  render() {
    const {user, changeRank, cUser} = this.props
    console.log(user)
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
                  {cUser && cUser.userType === 'admin' ? (
                    <div>
                      <h4>Edit User</h4>
                      <Form>
                        <Form.Row className="inline">
                          <Form.Group as={Col} controlId="formGridRank">
                            <Form.Label className="inline marg-right">
                              Rank:{' '}
                            </Form.Label>
                            <Form.Control
                              size="sm"
                              className="md-field inline"
                              onChange={this.handleChange}
                              as="select"
                            >
                              <option>Choose...</option>
                              <option>unAuth</option>
                              <option>auth</option>
                              <option>admin</option>
                            </Form.Control>
                          </Form.Group>
                        </Form.Row>
                      </Form>
                      <Button
                        className="inline float-right"
                        size="sm"
                        variant="outline-success"
                        onClick={() => changeRank(user.id, this.state)}
                      >
                        Update
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <h3>Reviews by: {user.firstName}</h3>
              {user.reviews && user.reviews.length ? (
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
    user: state.currentUser,
    cUser: state.user
  }
}

const dispatchProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchSingleUser(id)),
    changeRank: (id, userType) => dispatch(changeRankOnServer(id, userType))
  }
}

export const ConnectedSingleUser = connect(mapState, dispatchProps)(SingleUser)
