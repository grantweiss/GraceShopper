import React, {Component} from 'react'
import {
  CardElement,
  injectStripe,
  CardNumberElement
} from 'react-stripe-elements'

class StripeCheckout extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    // User clicked submit
  }

  render() {
    return (
      <div className="checkout test" id="card-element">
        <p>Would you like to complete the purchase?</p>

        <CardElement style={{base: {fontSize: '18px', width: '100%'}}} />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(StripeCheckout)
