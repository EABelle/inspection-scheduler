'use strict'

let LoginService = require('../services/loginService');
let UserFilter = require('../filters/userFilter');

class LoginController {
    static login (req, res, next) {
        
        const userFilter = new UserFilter();

        const {username, password} = req.body

        userFilter.fillData({username, password});
        LoginService.login(userFilter.data)
        .then(token => {
            res.setHeader('Authorization', token)
            res.status(200).send(token)
        }).catch(err => res.status(err.code || 400).send(err.message))
    }
}

module.exports = LoginController