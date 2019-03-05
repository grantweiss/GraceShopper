import React, {Component} from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form, Image} from 'react-bootstrap'
import {fetchBeers, removeBeerFromServer, fetchPage} from '../store/allbeers'
import {fetchCurrentUser} from '../store/currentUser'
import {fetchCategories} from '../store/categories'
import {addCartItem} from '../store/cart'

class AllBeers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSearch: '',
      searched: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.reset = this.reset.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  handleChange(event) {
    this.setState({currentSearch: event.target.value})
  }
  addToCart(beer) {
    this.props.addBeerToCart(beer)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchBeersFromServer(`tag=${this.state.currentSearch}`)
    this.setState({...this.state, searched: true})
  }

  reset() {
    const page = parseInt(this.props.match.params.pageNum, 10)
    this.props.fetchPageFromServer(page)
    this.props.setUser()
    this.props.fetchCategoriesFromServer()
    this.setState({...this.state, searched: false})
  }

  componentDidMount() {
    const page = parseInt(this.props.match.params.pageNum, 10)
    this.props.fetchPageFromServer(page)
    this.props.setUser()
    this.props.fetchCategoriesFromServer()
    this.setState({...this.state, searched: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.pageNum !== this.props.match.params.pageNum) {
      this.props.fetchPageFromServer(this.props.match.params.pageNum)
      this.setState({...this.state, searched: false})
    }
  }

  render() {
    const page = parseInt(this.props.match.params.pageNum, 10)
    const {currentUser, deleteBeer, user} = this.props
    return (
      <div className="content">
        <Row>
          <Col xs={12} sm={8}>
            <div className="inline">
              <h4 className="marg-right">Search by category:</h4>
            </div>
            <div className="inline myNav">
              <form onSubmit={this.handleSubmit}>
                <select onChange={this.handleChange}>
                  {this.props.categories ? (
                    this.props.categories.map(category => (
                      <option key={category.id} value={category.tag}>
                        {' '}
                        {category.tag}
                      </option>
                    ))
                  ) : (
                    <option value="none">No categories loaded</option>
                  )}
                </select>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="marg-left"
                  value="submit"
                  size="sm"
                >
                  Submit
                </Button>
              </form>
            </div>
          </Col>
          <Col xs={12} sm={4}>
            <div>
              {user && user.userType === 'admin' ? (
                <Link to="/addBeer">
                  <Button variant="outline-primary" className="float-right">
                    Add Beer
                  </Button>{' '}
                </Link>
              ) : (
                ''
              )}
            </div>
          </Col>
        </Row>
        <Container>
          <Row>
            {this.props.beers && this.props.beers.inventory !== 0
              ? this.props.beers.map(
                  beer =>
                    beer.inventory !== 0 ? (
                      <Col key={beer.id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                          <Link to={`/beers/${beer.id}`} className="center">
                            <Card.Img
                              className="thumbNai"
                              variant="top"
                              src={beer.imgURL}
                            />
                          </Link>
                          <Card.Body className="center">
                            <Card.Title className="small-title">
                              {beer.title}
                            </Card.Title>
                            <Card.Text className="small-text">
                              abv: {beer.abv + '%'}
                              <br />
                              {'$' + beer.price}
                            </Card.Text>

                            <Button
                              type="button"
                              variant="outline-dark"
                              size="sm"
                              className="marg-right"
                              onClick={() => this.addToCart(beer)}
                            >
                              {' '}
                              Add to Cart
                            </Button>

                            {user && user.userType === 'admin' ? (
                              <Button
                                onClick={() => deleteBeer(beer.id)}
                                variant="outline-danger"
                                size="sm"
                              >
                                {' '}
                                Delete
                              </Button>
                            ) : (
                              ''
                            )}
                          </Card.Body>
                        </Card>
                        <br />
                      </Col>
                    ) : (
                      ' '
                    )
                )
              : 'No Beers!'}
          </Row>
        </Container>
        {this.state.searched ? (
          <Link to="/beers/page/1">
            <Button className="float-center" onClick={this.reset}>
              Back to first page
            </Button>
          </Link>
        ) : (
          <div>
            <Link to={`/beers/page/${page - 1 <= 0 ? 1 : page - 1}`}>
              <Button className="float-left">Previous Page</Button>{' '}
            </Link>

            <Link to={`/beers/page/${page + 1}`}>
              <Button className="float-right">Next Page</Button>{' '}
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    beers: state.beers,
    currentUser: state.currentUser,
    user: state.user,
    categories: state.categories,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteBeer: id => dispatch(removeBeerFromServer(id)),
    setUser: () => dispatch(fetchCurrentUser()),
    fetchBeersFromServer: (search = '') => dispatch(fetchBeers(search)),
    fetchCategoriesFromServer: () => dispatch(fetchCategories()),
    fetchPageFromServer: (page = 1) => dispatch(fetchPage(page)),
    addBeerToCart: beer => dispatch(addCartItem(beer))
  }
}

export const ConnectedAllBeers = connect(mapStateToProps, mapDispatchToProps)(
  AllBeers
)
