import { Request, Response } from 'express';
import { ILogin } from "../interfaces/login.interface";
import { User } from '../models/user.model';
const Joi = require('joi');
const bcrypt = require('bcrypt');

export class AuthController {

    public async login(req: Request, res: Response) {
        try{
            const loginInp: ILogin = req.body;
            console.log(loginInp);
            //if(!this.validateLogin(loginInp)){
            //    return res.status(400).json('Invalid Credentials');
            //}
            let user = await User.findOne<User>({
                where: {email: loginInp.email }
            });
            console.log(user);
            if(!user){
                return res.status(400).json('Invalid Credentials');
            }
            const validPassword = await bcrypt.compare(loginInp.password, user?.password );
            if(!validPassword) return res.status(400).json('Invalid email or password');
            const token = user.generateAuthToken();
            return res.status(200).json(token);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    private validateLogin(params: ILogin) {
        const schema = {
            email:Joi.string().required().email(),
            password:Joi.string().min(6).required(),
        };
        return Joi.validate(params, schema);
    }
}