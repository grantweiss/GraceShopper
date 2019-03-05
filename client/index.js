import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {PersistGate} from 'redux-persist/lib/integration/react'
import history from './history'
import store, {persistor} from './store'
import App from './app'
import {StripeProvider} from 'react-stripe-elements'

// establishes socket connection
import './socket'

ReactDOM.render(
  <StripeProvider apiKey="pk_test_moJRpzC3vKFKvPltTJ98NCEc">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </StripeProvider>,
  document.getElementById('app')
)
