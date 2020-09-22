import { Request, Response} from 'express';
import { IEducationInstType } from '../interfaces/edu-inst-type.interfce';
import { EducationInstType } from '../models/edu-inst-type.model';

export class EducationInstTypeController {
    
    public async index(req: Request, res: Response) {
        await EducationInstType.findAll<EducationInstType>({})
        .then((eduInstTypes: Array<EducationInstType>) => {res.json(eduInstTypes)})
        .catch((err: Error) => {res.json(err)})
    }

    public async create (req: Request, res: Response ){
        const eduInstTypeInp: IEducationInstType = req.body;
        await EducationInstType.create<EducationInstType>(eduInstTypeInp)
        .then ((createdObj: EducationInstType) => {res.json(createdObj) })
        .catch((err:Error) => res.json(err));
    }
}
