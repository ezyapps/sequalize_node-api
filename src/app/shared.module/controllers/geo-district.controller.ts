import { Request, Response } from 'express';
import { IGeoStructure } from '../interfaces/geo-structure.interface';
import { GeoDistrict } from '../models/geo-district.model';

export class GeoDistrictController {
    public async index(req: Request, res: Response) {
        return await GeoDistrict.findAll<GeoDistrict>().then((data: Array<GeoDistrict>) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
    public async creat(req: Request, res: Response) {
        var inpObj: IGeoStructure = req.body;
        return await GeoDistrict.create<GeoDistrict>(inpObj).then((data: GeoDistrict) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
}