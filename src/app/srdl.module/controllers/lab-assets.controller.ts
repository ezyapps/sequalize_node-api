import { Request, Response } from 'express'
import { ILabAsset } from '../interfaces/lab-asset.interface';
import { LabAsset } from '../models/lab-asset.model';
export class LabAssetController {
    public async index(req: Request, res: Response) {
        await LabAsset.findAll<LabAsset>({})
        .then((labAssets: Array<LabAsset>) => {res.json(labAssets)})
        .catch((err: Error) => {res.json(err)})
    }

    public async create (req: Request, res: Response ){
        const labAssetInp: ILabAsset = req.body;
        await LabAsset.create<LabAsset>(labAssetInp)
        .then ((createdObj: LabAsset) => {res.json(createdObj) })
        .catch((err:Error) => res.json(err));
    }
}