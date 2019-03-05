import React from 'react'
import {Modal, Button, Row, Col, Image} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addCartItem} from '../store/cart'

class ItemModal extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      show: false
    }
  }

  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({show: true})
  }
  addToCart(beer) {
    this.props.addBeerToCart(beer)
  }

  render() {
    const {orderItem, addBeerToCart} = this.props
    return (
      <>
        <Button
          variant="outline-success"
          onClick={this.handleShow}
          size="sm"
          className="order-button"
        >
          Buy it again
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{orderItem.beer.title}</Modal.Title>
          </Modal.Header>
          <Row>
            <Col xs={4}>
              <Image className="modal-Img" src={orderItem.beer.imgURL} />
            </Col>
            <Col xs={8}>
              <Modal.Body>
                {orderItem.beer.description}
                <br />
                ${orderItem.beer.price}
              </Modal.Body>
            </Col>
          </Row>

          <Modal.Footer>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => addBeerToCart(orderItem.beer)}
            >
              Add to cart
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={this.handleClose}
            >
              X
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    beers: state.beers,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBeerToCart: beer => dispatch(addCartItem(beer))
  }
}

export const ConnectedItemModal = connect(mapStateToProps, mapDispatchToProps)(
  ItemModal
)
