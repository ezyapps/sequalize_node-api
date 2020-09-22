import { Request, Response } from 'express';
import { IEducationInstType } from '../interfaces/edu-inst-type.interfce';
import { IEducationInst } from '../interfaces/education-inst.interfce';
import { EducationInstType } from '../models/edu-inst-type.model';
import { EducationInst } from '../models/education-inst.model';
export class EducationInstController{
    public async index(req: Request, res: Response) {
        await EducationInst.findAll<EducationInst>().then((data: Array<EducationInst>) => {
            res.status(200).json(data);
        }).catch ((err: Error) => {
            res.status(500).json(err);
        })
    }

    public async create(req: Request, res: Response){
        const eduInstInp: IEducationInst = req.body;
        await EducationInst.create<EducationInst>(eduInstInp)
            .then((newObj: EducationInst) => {
                res.status(201).json(newObj);
            })
            .catch((err: Error) => {
                res.status(500).json(err);
            })
    }
}