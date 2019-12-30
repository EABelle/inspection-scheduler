const auth = require('./auth');

const validateApiKey = (req, res, next) => {
  console.log(req.headers['x-api-key'], process.env.API_KEY);
  if (req.headers['x-api-key'] === process.env.API_KEY) {
    next();
  } else {
    auth(req, res, next);
  }
};

module.exports = validateApiKey;
