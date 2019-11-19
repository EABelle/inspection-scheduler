'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var morgan = require('morgan');
var path = require("path");

var app = express();

//load routes
var calendarioRouter = require('./routes/calendarioRouter');
var agendaRouter = require('./routes/agendaRouter');
var inspectorRouter = require('./routes/inspectorRouter');
var inspeccionRouter = require('./routes/inspeccionRouter');
var localidadRouter = require('./routes/localidadRouter');
var loginRouter = require('./routes/loginRouter');
var authMiddleware = require('./middlewares/auth')

require('dotenv').config()
var apiKeyMiddleware = require('./middlewares/apiKey')

var http = require("http");
setInterval(function() {
    http.get('/');
}, 900000); // 15 min

//middleware
    //body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
    //cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Api-Key');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

//bind routes
app.use('/login', loginRouter);

app.use(function (req, res, next) {
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use('/calendario', calendarioRouter); //auth middlewares within it's router
app.use('/agendar', apiKeyMiddleware, agendaRouter);

app.use('/inspectors', authMiddleware, inspectorRouter);
app.use('/inspections', authMiddleware, inspeccionRouter);
app.use('/localidad', authMiddleware, localidadRouter);

var dev = app.get('env') !== 'production';
if(!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'))
    //recursos estaticos
    app.use(express.static(path.resolve(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/build/index.html'));
    })
    
} else {
    app.use(morgan('dev'))
};

app.use((req, res, next) => {
    var error = new Error('Not found.')
    error.status = 404
    next(error)
})

module.exports = app;
