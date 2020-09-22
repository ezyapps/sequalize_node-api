import {Request, Response, NextFunction } from "express";

const winston = require('winston');
export function reqError(err:Error, req: Request, res: Response, next: NextFunction){
    winston.error(err.message, err);
    res.status(500).send('Something went wrong. Please try again later.');
}
