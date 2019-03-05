import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Button, Container, Row, Col, Image, Table} from 'react-bootstrap'
import {ConnectedItemModal} from './index'
import {
  fetchSingleOrder,
  markOrderAsCompleted,
  markOrderAsProcessing,
  markOrderAsCancelled
} from '../store/singleOrder'

class SingleOrder extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.orderId, 10)
    this.props.fetchSingleOrder(id)
  }

  render() {
    const {
      singleOrder,
      onMarkOneOrderAsProcessing,
      onMarkOneOrderAsCompleted,
      onMarkOneOrderAsCancelled,
      user
    } = this.props
    console.log('SINGLE ORDER', singleOrder)

    return (
      <div className="content">
        {user.userType === 'admin' ? (
          <div className="center">
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={() =>
                onMarkOneOrderAsProcessing({
                  id: singleOrder.id,
                  phoneNumber: singleOrder.phoneNumber,
                  streetAddress: singleOrder.streetAddress,
                  city: singleOrder.city,
                  zipCode: singleOrder.zipCode,
                  state: singleOrder.state,
                  status: 'processing'
                })
              }
            >
              Mark as Processing
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={() =>
                onMarkOneOrderAsCompleted({
                  id: singleOrder.id,
                  phoneNumber: singleOrder.phoneNumber,
                  streetAddress: singleOrder.streetAddress,
                  city: singleOrder.city,
                  zipCode: singleOrder.zipCode,
                  state: singleOrder.state,
                  status: 'completed'
                })
              }
            >
              Mark as Completed
            </Button>
            <Button
              size="sm"
              variant="link"
              className="marg-right small-txt2 button-style"
              onClick={() =>
                onMarkOneOrderAsCancelled({
                  id: singleOrder.id,
                  phoneNumber: singleOrder.phoneNumber,
                  streetAddress: singleOrder.streetAddress,
                  city: singleOrder.city,
                  zipCode: singleOrder.zipCode,
                  state: singleOrder.state,
                  status: 'Cancelled'
                })
              }
            >
              Mark as Cancelled
            </Button>
            <hr className="small-hr2" />
          </div>
        ) : (
          ''
        )}
        <Container className="marg-top-md">
          <Col xs={{span: 10, offset: 1}}>
            <Row>
              <Col>
                <h4>Order Details</h4>
                <h6 className="small-text">
                  Ordered on {singleOrder.orderDate} | Order# {singleOrder.id}
                </h6>
              </Col>
            </Row>
            <Card>
              <Row>
                <Col xs={12} md={4}>
                  <Card.Body>
                    <Card.Title className="small-title">
                      Shipping Adress
                    </Card.Title>
                    <Card.Text className="small-text">
                      {singleOrder.firstName} {singleOrder.lastName}
                      <br />
                      {singleOrder.streetAddress}
                      <br />
                      {singleOrder.city}, {singleOrder.state}
                      <br />
                      {singleOrder.zipCode}
                      <br />
                      {singleOrder.phoneNumber}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col xs={12} md={4}>
                  <Card.Body>
                    <Card.Title className="small-title">Payment</Card.Title>
                    <Card.Text className="small-text">
                      Credit Card ***1234
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col xs={12} md={4}>
                  <Card.Body>
                    <Card.Title className="small-title">
                      Order Summary
                    </Card.Title>
                    <Card.Text className="small-text">
                      Item(s) Subtotal:{' '}
                      <span className="float-right">
                        {singleOrder.totalCost}
                      </span>
                      <br />
                      Shipping: <span className="float-right">need this</span>
                      <br />
                      Tax: <span className="float-right">need this</span>
                      <br />
                      <strong>Grand Total:</strong>{' '}
                      <span className="float-right">
                        {singleOrder.totalCost}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <br />
            <Card>
              <Card.Header>{singleOrder.orderItems.length} items</Card.Header>
              {singleOrder.orderItems[0].beer
                ? singleOrder.orderItems.map(orderItem => (
                    <Row key={orderItem.beer.id} className="marg-top-md">
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
                          {orderItem.beer.description.substring(0, 50)}
                          <br />
                          ${orderItem.beer.price}
                          <br />
                          <ConnectedItemModal orderItem={orderItem} />
                        </Card.Text>
                      </Col>
                    </Row>
                  ))
                : 'No Items'}
            </Card>
          </Col>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: id => dispatch(fetchSingleOrder(id)),
    onMarkOneOrderAsProcessing: order => dispatch(markOrderAsProcessing(order)),
    onMarkOneOrderAsCompleted: order => dispatch(markOrderAsCompleted(order)),
    onMarkOneOrderAsCancelled: order => dispatch(markOrderAsCancelled(order))
  }
}

export const ConnectedSingleOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrder)
