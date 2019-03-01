import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {fetchSingleOrder} from '../store/singleOrder'

class SingleOrder extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.orderId, 10)
    this.props.fetchSingleOrder(id)
  }
  render() {
    const {singleOrder} = this.props
    console.log('SINGLE ORDER', singleOrder)
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

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: id => dispatch(fetchSingleOrder(id))
  }
}

export const ConnectedSingleOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrder)
