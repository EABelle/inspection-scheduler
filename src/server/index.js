
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3800;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/inspectionScheduler';


mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to DB at ${url}`);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
