const express = require('express')
const sessions = express.Router()
const passport = require('passport')

sessions.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home')
    } else {
        res.render('users/register.html.ejs', {
            title: 'Register',
            user: req.user,
            message: res.locals.message
        })
    }
})

sessions.post('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('message', 'You are already logged in.')
        res.redirect('/home')
    } else {
        let user = (req.body.username).toLowerCase()
        let pass = req.body.password
        let passConf = req.body.passConf
        if (user.length === 0 || pass.length === 0 || passConf.length === 0) {
            req.flash('message', 'You must provide a username, password, and password confirmation.')
            res.redirect('/login')
        } else if (pass != passConf) {
            req.flash('message', 'Your password and password confirmation must match.')
            res.redirect('/login')
        } else {
            next()
        }
    }
}, passport.authenticate('register', {
    successRedirect : '/home',
    failureRedirect : '/register',
    failureFlash : true
}))


module.exports = sessions
