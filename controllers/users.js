const express = require('express')
const users = express.Router()
const passport = require('passport')



users.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('message', 'Your are already logged in.')
        res.redirect('/profile')
    } else {
        res.render('login', {
            title: 'Login',
            user: req.user,
            message: res.locals.message
        })
    }
})

users.post('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('message', 'You are already logged in.')
        res.redirect('/profile')
    } else {
        let user = (req.body.username).toLowerCase()
        let pass = req.body.password
        if (user.length === 0 || pass.length === 0) {
            req.flash('message', 'You must provide a username and password.')
            res.redirect('/login')
        } else {
            next()
        }
    }
}, passport.authenticate('login', {
    successRedirect : '/home',
    failureRedirect : '/login',
    failureFlash : true
}))

users.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home')
    } else {
        res.render('register', {
            title: 'Register',
            user: req.user,
            message: res.locals.message
        })
    }
})
users.post('/register', (req, res, next) => {
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

users.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User [' + req.user.username + '] has logged out.')
        req.logout()
        res.redirect('/home');
    } else {
        res.redirect('/home')
    }
})

module.exports = users
