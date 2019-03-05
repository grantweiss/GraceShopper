import React, {Component} from 'react'
import {
  CardElement,
  injectStripe,
  CardNumberElement
} from 'react-stripe-elements'
import {connect} from 'react-redux'
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
    let {token} = await this.props.stripe.createToken({name: 'Alex Test Gura'})
    console.log('token', token)
    let response = await axios.post('/api/charge', {id: token.id})

    console.log('Purchase Complete!', response)
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
    order: state.order
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createOrder: fullOrder =>
      dispatch(createOrder(fullOrder, ownProps.history)),
    updateOrder: order => dispatch(updateOrderOnStore(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectStripe(StripeCheckout)
)
