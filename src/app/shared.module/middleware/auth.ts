import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const config = require('config');

export const auth = function (req: Request, res: Response, next: NextFunction){
//module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        //req.header('user', decoded);
        req.user = decoded;
        next();
    }
    catch (ex)
    {
        return res.status(400).send('Access denied. Invalid Token');
    }    
}
