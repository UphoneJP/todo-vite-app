const passport = require('passport');
const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync.cjs');
const User = require('../models/user.cjs');

// /api/user
router.post('/register', catchAsync(async (req, res)=> {
    const {username, password} = req.body;
    const user = new User({ username });
    const newUser = await User.register(user, password);
    req.login(newUser, err=>{
        if(err)return next(err);
        res.status(200).json({
            _id: newUser._id,
        });
    });
}));

router.post('/login', catchAsync((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.end();
        }
        req.login(user, (err) => {
            if(err)return next(err);
            res.status(200).json({
                _id: user._id,
            });
        });
    })(req, res, next);
}));

router.get('/logout', catchAsync((req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((err) => {
            if (err) return next(err);
            res.clearCookie('session');
            res.status(200).end();
        });
    });
}))

module.exports = router;
