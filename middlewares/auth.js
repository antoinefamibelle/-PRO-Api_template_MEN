const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @module Authentification
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @description This is the middleware used to make route private by checking the jwt
 */
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token'); // Get the token

    //Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No Token ! Authorization denied' });
    }

    //Verify token 
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; //attach it into the payload
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' }); //Token isnt valid
    }
}