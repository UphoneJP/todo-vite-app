require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose");
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const path = require('path');

const User = require('./models/user.cjs');
const AppError = require('./utils/AppError.cjs')

const app = express();
const URL = process.env.MONGO_URI || process.env.MONGO_LOCAL_URI;
const secret = process.env.SECRET || 'mysecret';
mongoose.connect(URL)
.then(()=>console.log('mongoDB接続中'))
.catch((e)=>console.log('エラー発生', e));
const store = MongoStore.create({
    mongoUrl: URL,
    crypto: { secret },
    touchAfter: 24 * 3600
});
store.on('error', e =>console.log('セッションストアエラー', e))

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(mongoSanitize());
app.use(session({
    store,
    name: 'session',
    secret,
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // sameSite: 'Lax'
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next)=>{
    res.locals.loggedIn = req.isAuthenticated();
    next();
})

const todoRoutes = require('./routes/todo.cjs');
const userRoutes = require('./routes/user.cjs');
app.use('/api/todo', todoRoutes);
app.use('/api/user', userRoutes);

app.all('*', (req, res)=>{
    throw new AppError('不正なリクエストです', 400)
});
app.use((err, req, res, next) => {
    console.log(`【Errorメッセージ】: ${err.message}`);
    console.log(`【Statusコード】: ${err.status}`);
    console.log(`【Stack trace】: ${err.stack}`);
    console.log(`【Request URL】: ${req.originalUrl}`);
    const { status = 500, message = 'エラー発生' } = err;
    res.status(status).send({ message, status , page:'error'});
});

app.listen(3000, (req, res) => {
    console.log('3000で待ち受け中')
})


