
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3800;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/inspectionScheduler';


mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(port, () => {
      console.log('Servidor escuchando peticiones');
    });
  })
  .catch((err) => {
    console.log(err);
  });
