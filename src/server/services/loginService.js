'use strict'

const UserDAO = require('../dao/userDAO');
const UserFilter = require('../filters/userFilter');
const jwt = require('jsonwebtoken'); 
const redis = require("redis");
const redisClient = require('../redisClient');


class LoginService {

    static login(filterData) {
        return new Promise((resolve, reject) => {

            UserDAO.find(filterData)
            .then(({username, password}) => {
                const token = jwt.sign({username, password}, 'PUBLIC')
                console.log(username, password)
                console.log(token)
                redisClient.set(username, token, redis.print);
                resolve(token)
            }).catch((err) => reject(err))
        })
    }
    
}
module.exports = LoginService