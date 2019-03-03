const isLoggedIn = (req, res, next) => {
  if (req.user) next()
  else {
    const err = new Error('Must loggin to do things')
    res.status(401)
    next(err)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next()
  } else {
    const err = new Error('Must be an admin')
    res.status(401)
    next(err)
  }
}

module.exports = {isAdmin, isLoggedIn}
