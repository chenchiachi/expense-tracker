const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  User.findOne({ name }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        password,
        confirmPassword
      })
    } else {
        User.create({
          name,
          password
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      }
  })
})
router.get('/logout', (req,res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router