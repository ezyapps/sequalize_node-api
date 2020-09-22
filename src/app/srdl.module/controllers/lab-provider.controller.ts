import { Request, Response} from 'express';
import { ILabProvider } from '../interfaces/lab-provider.interface';
import { LabProvider } from '../models/lab-provider.model';
export class LabProviderController {
    
    public async index(req: Request, res: Response) {
        await LabProvider.findAll<LabProvider>({})
        .then((labProviders: Array<LabProvider>) => {res.json(labProviders)})
        .catch((err: Error) => {res.json(err)})
    }

    public async create (req: Request, res: Response ){
        const labProviderInp: ILabProvider = req.body;
        await LabProvider.create<LabProvider>(labProviderInp)
        .then ((createdObj: LabProvider) => {res.json(createdObj) })
        .catch((err:Error) => res.json(err));
    }
}
