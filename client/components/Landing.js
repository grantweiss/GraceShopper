import React from 'react'
import {Card, Button, Image, Jumbotron, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export const Landing = () => {
  return (
    <div className="center">
      <Jumbotron className="landing-div" fluid>
        <Image className="landing-img" src="https://robohash.org/brett" />
        <Container>
          <h1>Welcome to Brett's Beer Fridge</h1>
          <p>Shop for the thousands of beers you never knew existed!</p>
        </Container>
        <Link to="/beers/page/1">
          <Button className="float-center">Beers!</Button>
        </Link>
      </Jumbotron>
    </div>
  )
}
