const jwt = require('jsonwebtoken');
const mainConfig = require('../config/main.config');

module.exports = (req, res, next) => {
    try {
        let token = req.headers['authorization'] || req.headers['x-access-token'];
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
            jwt.verify(token, mainConfig.privateKey, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        success: "false",
                        message: "Invalid Token"
                    })
                } else {
                    next()
                }

            })
        }
        else {
            return res.status(400).json({
                success: "false",
                message: "Token Missing"
            })
        }
    } catch{
        return res.status(403).json({
            success: "false",
            message: "UnAuthorized"
        })
    }

}