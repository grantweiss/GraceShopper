import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="form">
        <p>Your Cart Contents:</p>
        {this.props.cart.map(lineItem => {
          return (
            <p key={lineItem.beerId}>
              {lineItem.beerId} {lineItem.quantity}
            </p>
          )
        })}
      </div>
    )
  }
}

const mapoStateToProps = state => {
  return {cart: state.cart}
}

export const ConnectedCart = connect(mapoStateToProps)(Cart)
