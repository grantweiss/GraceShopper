import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Button, Container, Row, Col, Image, Table} from 'react-bootstrap'
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
    console.log(singleOrder)
    if (user.userType === 'admin') {
      return (
        <div>
          <Link to="/orders">
            <Button>All Orders</Button>
          </Link>
          <Container>
            <Row>
              <Col xs={12} sm={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      ID: {singleOrder.id}
                      <br />
                      Status: {singleOrder.status}
                      <br />
                      Phone Number: {singleOrder.phoneNumber}
                      <br />
                      Street Address: {singleOrder.streetAddress}
                      <br />
                      City: {singleOrder.city}
                      <br />
                      Zip: {singleOrder.zipCode}
                      <br />
                      Phone Number: {singleOrder.phoneNumber}
                      <br />
                      State: {singleOrder.state}
                      <br />
                    </Card.Text>
                  </Card.Body>
                  <Button
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
                  <br />
                  <Button
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
                  <br />
                  <Button
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
                </Card>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product ID:</th>
                    <th>Item:</th>
                    <th>Qty:</th>
                    <th>Price:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Container>
        </div>
      )
    } else {
      return (
        <div>
          <Container>
            <Row>
              <Col xs={12} sm={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      ID: {singleOrder.id}
                      <br />
                      Status: {singleOrder.status}
                      <br />
                      Phone Number: {singleOrder.phoneNumber}
                      <br />
                      Street Address: {singleOrder.streetAddress}
                      <br />
                      City: {singleOrder.city}
                      <br />
                      Zip: {singleOrder.zipCode}
                      <br />
                      Phone Number: {singleOrder.phoneNumber}
                      <br />
                      State: {singleOrder.state}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
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
