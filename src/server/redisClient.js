const redis = require('redis');
const jwt = require('jsonwebtoken');

function devUsers() {
  const db = {};
  const token = jwt.sign({ username: 'test', password: 'test' }, 'PUBLIC');
  const set = (username, token) => {
    this[username] = token;
  };
  db.set = set.bind(db);
  db.get = () => token;
  return db;
}

let client;
if (process.env.NODE_ENV === 'development') {
  client = devUsers();
} else {
  client = redis.createClient(process.env.REDIS_URL);
  client.on('connect', () => {
    console.log('Redis connected');
  });
}

module.exports = client;
