'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3800;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/automotores';


mongoose.connect(url, {useNewUrlParser: true})
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(port, () => {
            console.log('Servidor escuchando peticiones');
        })
    })
    .catch((err) => {
        console.log(err);
    })
