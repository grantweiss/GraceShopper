import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col} from 'react-bootstrap'
import {fetchUsers} from '../store/allUsers'
import {fetchCurrentUser} from '../store/currentUser'
import {Link} from 'react-router-dom'
import {deleteUserFromServer} from '../store/allUsers'

class AllUsers extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsersFromServer()
    this.props.fetchCurrent()
  }

  render() {
    const {users, current, removeUser} = this.props
    return (
      <div>
        <Container>
          <Row>
            {users
              ? users.map(user => (
                  <Col key={user.id} xs={12} sm={6} md={4}>
                    <Card>
                      <Row>
                        <Col xs={3}>
                          <Link to={`users/${user.id}`}>
                            <Card.Img
                              className="cardImg"
                              variant="top"
                              src={user.imgURL}
                            />
                          </Link>
                        </Col>
                        <Col xs={9}>
                          <Card.Body>
                            <Row>
                              <Col xs={8}>
                                <Card.Title className="small-title inline">
                                  {user.firstName} {user.lastName}
                                </Card.Title>
                                <Card.Text className="small-text">
                                  {user.userType}
                                </Card.Text>
                              </Col>
                              <Col xs={4}>
                                {current.userType === 'admin' ? (
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="float-right sm-button"
                                    onClick={() => removeUser(user.id)}
                                  >
                                    X
                                  </Button>
                                ) : (
                                  ''
                                )}
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                    <br />
                  </Col>
                ))
              : 'No users!'}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    current: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersFromServer: () => dispatch(fetchUsers()),
    fetchCurrent: () => dispatch(fetchCurrentUser()),
    removeUser: id => dispatch(deleteUserFromServer(id))
  }
}

export const ConnectedAllUsers = connect(mapStateToProps, mapDispatchToProps)(
  AllUsers
)
