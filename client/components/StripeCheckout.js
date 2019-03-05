import React, {Component} from 'react'
import {
  CardElement,
  injectStripe,
  CardNumberElement
} from 'react-stripe-elements'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {createOrder, updateOrderOnStore} from '../store/singleOrder'

class StripeCheckout extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    console.log('submitting')
    const {order, user, cart} = this.props
    let {token} = await this.props.stripe.createToken({
      name: order.firstName + ' ' + order.lastName,
      address_line1: order.streetAddress
    })
    console.log('token', token)
    let response = await axios.post('/api/charge', {
      id: token.id,
      amount: order.total * 1000,
      email: order.email
    })

    console.log('Purchase Complete!', response)
    if (response.status === 200) {
      alert('Purchase Complete!')
      this.props.createOrder({cart: this.props.cart, order: this.props.order})
    } else {
      // alert('Purchase Complete!')

      // this.props.updateOrder({...this.props.order, totalCost: this.props.order.total, orderItems: [...this.props.cart]} )
      // this.props.history.push('/reviewOrder')

      alert('Purchase Failed!')
    }
  }

  render() {
    return (
      <div className="checkout test" id="card-element">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Pay {}</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart,
    order: state.singleOrder
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createOrder: fullOrder =>
      dispatch(createOrder(fullOrder, ownProps.history)),
    updateOrder: order => dispatch(updateOrderOnStore(order))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectStripe(StripeCheckout))
)
