import { Request, Response } from 'express'
import { ILabInfo } from '../interfaces/lab-info.interface';
import { EducationInst } from '../models/education-inst.model';
import { LabInfo } from '../models/lab-info.model';

export class LabInfoController {
    public async index(req: Request, res: Response) {
        await LabInfo.findAll<LabInfo>({})
        .then((data: Array<LabInfo>) => {res.json(data)})
        .catch((err: Error) => {res.json(err)})
    }

    public async labByUpozila(req: Request, res: Response) {
        var upozilaCode = req.params.upozilaCode;
        if(upozilaCode == null)
            return res.status(500).json('Invalid Input');

        await LabInfo.findAll<LabInfo>({
            include: [
                {
                    model: EducationInst,
                    required: true,
                    where: {
                        upozila_code: upozilaCode
                    }
                }
            ]
        })
        .then((data: Array<LabInfo>) => {res.json(data)})
        .catch((err: Error) => {res.json(err)})
    }

    public async create (req: Request, res: Response ){
        const inpObj: ILabInfo = req.body;
        await LabInfo.create<LabInfo>(inpObj)
        .then ((createdObj: LabInfo) => {res.json(createdObj) })
        .catch((err:Error) => res.json(err));
    }

}