const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', function (req, res, next) {
  const { name, password } = req.body
  if (!name || !password) {
    req.flash('warning_msg', '請輸入使用者姓名和密碼。')
    return res.redirect('/users/login')
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      req.flash('warning_msg', info.message)
      return res.redirect('/users/login')
     }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  const errors = []
  if (!name || !password || !confirmPassword) {
    errors.push({message: '所有欄位皆是必填。'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符。'})
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      password,
      confirmPassword
    })
  }
  User.findOne({ name }).then(user => {
    if (user) {
      errors.push({ message: '此使用者已註冊。' })
      res.render('register', {
        name,
        password,
        confirmPassword
      })
    } 
    return bcrypt
      .genSalt(10) 
      .then(salt => bcrypt.hash(password, salt)) 
      .then(hash => User.create({
        name,
        password: hash 
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req,res) => {
  req.logout()
  req.flash('success_msg', '已登出。')
  res.redirect('/users/login')
})


module.exports = router