const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  
})

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


module.exports = router