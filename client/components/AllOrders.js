import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchAllOrders,
  showPendingOnView,
  showCancelledOnView,
  showCompletedOnView,
  showProcessingOnView
} from '../store/allOrders'
import {Link} from 'react-router-dom'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchOrdersFromServer()
  }

  render() {
    const {
      allOrders,
      onShowPendingOrders,
      onShowCancelledOrders,
      onShowCompletedOrders,
      fetchOrdersFromServer,
      onShowProcessingOrders,
      user
    } = this.props
    if (user.userType === 'admin') {
      return (
        <div>
          <Container>
            <Button onClick={onShowPendingOrders}> Pending </Button>
            {'  '}
            <Button onClick={onShowProcessingOrders}> Processing</Button>
            {'  '}
            <Button onClick={onShowCompletedOrders}> Completed </Button>
            {'  '}
            <Button onClick={onShowCancelledOrders}> Cancelled </Button>
            {'  '}
            <Button onClick={fetchOrdersFromServer}> All Orders </Button>
            <Row>
              {allOrders && allOrders.length !== 0 ? (
                allOrders.map(order => (
                  <Col key={order.id} xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/orders/${order.id}`}>
                      <Card>
                        <Card.Body>
                          <Card.Text>Order ID #: {order.id}</Card.Text>
                          <Card.Text>Status: {order.status}</Card.Text>
                          <Card.Text>Shipping Address:</Card.Text>
                          <ul className="shippingInfo">
                            <li>
                              {' '}
                              <strong>City:</strong> {order.city}
                            </li>
                            <li>
                              {' '}
                              <strong>Street: </strong> {order.streetAddress}
                            </li>
                            <li>
                              {' '}
                              <strong>State: </strong> {order.state}
                            </li>
                            <li>
                              <strong>Country: </strong> {order.country}
                            </li>
                            <li>
                              <strong>Zip: </strong> {order.zipCode}
                            </li>
                            <li>
                              <strong>Phone: </strong>
                              {order.phoneNumber}
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              ) : (
                <div>
                  {' '}
                  <h3>'No Orders!'</h3>
                </div>
              )}
            </Row>
          </Container>
        </div>
      )
    } else {
      return (
        <div>
          <Container>
            <Row>
              {allOrders && allOrders.length !== 0 ? (
                allOrders.map(order => (
                  <Col key={order.id} xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/orders/${order.id}`}>
                      <Card>
                        <Card.Body>
                          <Card.Text>Order ID #: {order.id}</Card.Text>
                          <Card.Text>Status: {order.status}</Card.Text>
                          <Card.Text>Shipping Address:</Card.Text>
                          <ul className="shippingInfo">
                            <li>
                              {' '}
                              <strong>City:</strong> {order.city}
                            </li>
                            <li>
                              {' '}
                              <strong>Street: </strong> {order.streetAddress}
                            </li>
                            <li>
                              {' '}
                              <strong>State: </strong> {order.state}
                            </li>
                            <li>
                              <strong>Country: </strong> {order.country}
                            </li>
                            <li>
                              <strong>Zip: </strong> {order.zipCode}
                            </li>
                            <li>
                              <strong>Phone: </strong>
                              {order.phoneNumber}
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              ) : (
                <div>
                  {' '}
                  <h3>'No Orders!'</h3>
                </div>
              )}
            </Row>
          </Container>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.allOrders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersFromServer: () => dispatch(fetchAllOrders()),
    onShowPendingOrders: () => dispatch(showPendingOnView()),
    onShowCompletedOrders: () => dispatch(showCompletedOnView()),
    onShowCancelledOrders: () => dispatch(showCancelledOnView()),
    onShowProcessingOrders: () => dispatch(showProcessingOnView())
  }
}

export const ConnectedAllOrders = connect(mapStateToProps, mapDispatchToProps)(
  AllOrders
)
