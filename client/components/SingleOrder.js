import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {
  fetchSingleOrder,
  markOneOrderAsCompleted,
  markOneOrderAsProcessing
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
      user
    } = this.props
    if (user.userType === 'admin') {
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
                </Card>
              </Col>
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
                      Zip: {singleOrder.city}
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
    onMarkOneOrderAsProcessing: order =>
      dispatch(markOneOrderAsProcessing(order)),
    onMarkOneOrderAsCompleted: order => dispatch(markOneOrderAsCompleted(order))
  }
}

export const ConnectedSingleOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrder)
