const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// Dotenv Environment vars
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

// Connect DB
require('./config/db')();

// Passport config
require('./config/passport')(passport);

const app = express();

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global var
app.locals.ejsHelper = require('./helpers/ejs');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method Override
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Mount routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));
app.use('/comments', require('./routes/comments'));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(
    `App is running in ${process.env.NODE_ENV} mode on port ${port}`.bold.blue
  )
);
