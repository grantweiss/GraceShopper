import React from 'react'

import {Navbar, NewNav} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <NewNav />
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
