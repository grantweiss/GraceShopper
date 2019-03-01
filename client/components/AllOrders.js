import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/allOrders'
import {Link} from 'react-router-dom'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'

class AllOrders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrdersFromServer()
  }

  render() {
    const {allOrders} = this.props
    console.log(this.props.allOrders)
    return (
      <div>
        <Container>
          <Row>
            {allOrders && allOrders.length !== 0 ? (
              allOrders.map(order => (
                <Col key={order.id} xs={12} sm={6} md={4} lg={3}>
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

const mapStateToProps = state => {
  return {
    allOrders: state.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersFromServer: () => dispatch(fetchAllOrders())
  }
}

export const ConnectedAllOrders = connect(mapStateToProps, mapDispatchToProps)(
  AllOrders
)
