import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  ConnectedAllUsers,
  ConnectedAllBeers,
  ConnectedSingleBeer,
  ConnectedAddBeer,
  EditBeerForm,
  ConnectedNewReview,
  ConnectedSingleUser
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    console.log('isadmin?:', isAdmin)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          exact
          path="/beers/page/:pageNum"
          component={ConnectedAllBeers}
        />
        <Route exact path="/users" component={ConnectedAllUsers} />
        <Route exact path="/beers/:beerId" component={ConnectedSingleBeer} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route
              exact
              path="/beers/:beerId/review"
              component={ConnectedNewReview}
            />
            <Route exact path="/users/:id" component={ConnectedSingleUser} />
            {isAdmin && (
              <Switch>
                <Route exact path="/users" component={ConnectedAllUsers} />
                <Route path="/beers/:beerId/edit" component={EditBeerForm} />
                <Route path="/addBeer" component={ConnectedAddBeer} />
                {/* Routes placed here are only available after logging in */}
              </Switch>
            )},
          </Switch>
        )},
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />ç
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.userType === 'admin'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
