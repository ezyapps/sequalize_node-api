//const _ = require('lodash');
import {Request, Response} from 'express';
import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import _ from 'lodash';
import { IUserRequest } from '../interfaces/user-request.interface';
const bcrypt = require('bcrypt');
const winston = require('winston');
declare global {
    namespace Express {
        export interface Request {
            user?: IUserRequest;
         }
    }
}

export class UserController {

    public async me(req: Request, res: Response) {
        await User.findByPk<User>(req.user?.id).then((data) => {
            res.json(_.pick(data,['id','name','email']));
        })
        .catch (err => res.status(400).json(err));
    }

    public async index(req: Request, res: Response){
        await User.findAll<User>({})
            .then((users: Array<User>) => {res.json(users)})
            .catch((err: Error) => res.status(500).json(err));
    }
    public async create(req: Request, res: Response){
        const userInp: IUser = req.body;
        console.log('Yes your are in craete method');
        console.log(userInp);
        const salt= await bcrypt.genSalt(10);
        userInp.password = await bcrypt.hash(userInp.password, salt);
        await User.create<User>(userInp)
            .then((userObj) => {
                const token = userObj.generateAuthToken();
                res.header('x-auth-token', token);
                res.json( _.pick(userObj,['id','name','email']));
            })
            .catch((err: Error) => {
                res.status(500).json(err);
            });
    }

}