const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const { Cookie } = require('express-session');

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', `Welcome, ${req.user.username}!`);
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome, ${req.user.username}!`);
            res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
})

router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
})

router.get('/editProfile/:id', isLoggedIn, (req, res) => {
    res.render('editProfile');
})

router.put('/editProfile/:id', isLoggedIn, async (req, res) => {
    const { email, firstName, lastName, username, age, major, profilePicture, minor } = req.body;
    console.log(req.body)
    console.log(req.params.id)
    console.log(req.user)
    const user = await User.findByIdAndUpdate(req.params.id, { email, firstName, lastName, username, age, major, profilePicture, minor });
    res.redirect('/profile');
})

module.exports = router;