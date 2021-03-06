const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const app = express();

// load routes
const http = require('http');
const calendarRouter = require('./routes/calendarRouter');
const agendaRouter = require('./routes/agendaRouter');
const inspectorRouter = require('./routes/inspectorRouter');
const inspectionRouter = require('./routes/inspectionRouter');
const locationRouter = require('./routes/locationRouter');
const loginRouter = require('./routes/loginRouter');
const authMiddleware = require('./middlewares/auth');

require('dotenv').config();
const apiKeyMiddleware = require('./middlewares/apiKey');


// middleware
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Api-Key');
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

// bind routes
app.use('/login', loginRouter);

app.use((req, res, next) => {
  // intercepts OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/calendar', calendarRouter); // auth middlewares within it's router
app.use('/schedule', apiKeyMiddleware, agendaRouter);

app.use('/inspectors', authMiddleware, inspectorRouter);
app.use('/inspections', authMiddleware, inspectionRouter);
app.use('/location', locationRouter);

const dev = app.get('env') !== 'production';
if (!dev) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  // recursos estaticos
  app.use(express.static(path.resolve(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/build/index.html`));
  });
} else {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});

module.exports = app;
