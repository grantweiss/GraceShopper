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
import {ConnectedItemModal} from './index'

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
    return (
      <div>
        {user.userType === 'admin' ? (
          <div className="center">
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={onShowPendingOrders}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={onShowProcessingOrders}
            >
              Processing
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={onShowCompletedOrders}
            >
              Completed
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={onShowCancelledOrders}
            >
              Cancelled
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={fetchOrdersFromServer}
            >
              All Orders
            </Button>
            <hr className="small-hr" />
          </div>
        ) : (
          <div className="center">
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={onShowPendingOrders}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={onShowCancelledOrders}
            >
              Cancelled
            </Button>
            <hr className="small-hr" />
          </div>
        )}
        <Container className="marg-top-md">
          <Row>
            {allOrders && allOrders.length ? (
              allOrders.map(order => (
                <Col key={order.id} xs={12}>
                  <Card>
                    <Card.Header>
                      <Row>
                        <Col xs={6} className="small-text">
                          Order placed
                          <br />
                          {order.orderDate}
                        </Col>
                        <Col className="small-text">
                          <span className="float-right">Order# {order.id}</span>
                          <br />
                          <Link
                            className="float-right small-text"
                            to={`/orders/${order.id}`}
                          >
                            Order Details
                          </Link>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{order.status}</Card.Title>
                      {order.orderItems
                        ? order.orderItems[0]
                          ? order.orderItems[0].beer
                            ? order.orderItems.map(orderItem => (
                                <Row key={orderItem.beer.id}>
                                  <Col xs={1}>
                                    <Card.Img
                                      className="cardImg"
                                      src={orderItem.beer.imgURL}
                                    />
                                  </Col>
                                  <Col xs={11}>
                                    <Card.Title className="small-title">
                                      <Link to={`/beers/${orderItem.beer.id}`}>
                                        {orderItem.beer.title}{' '}
                                        <span className="small-text">
                                          ({orderItem.quantity})
                                        </span>
                                      </Link>
                                    </Card.Title>
                                    <Card.Text className="small-text">
                                      {orderItem.beer.description.substring(
                                        0,
                                        50
                                      )}
                                      <br />
                                      ${orderItem.beer.price}
                                      <br />
                                      <ConnectedItemModal
                                        orderItem={orderItem}
                                      />
                                    </Card.Text>
                                  </Col>
                                </Row>
                              ))
                            : ''
                          : ''
                        : ''}
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              ))
            ) : (
              <Col xs={{span: 6, offset: 3}}>
                <Card>
                  <Card.Body>
                    <Card.Title className="center">No orders!</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    )
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
