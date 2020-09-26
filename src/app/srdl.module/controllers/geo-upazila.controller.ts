import { Request, Response } from 'express';
import { GeoUpazila } from '../models/geo-upazila.model';

export class GeoUpazilaController {
    public async index(req: Request, res: Response) {
        return await GeoUpazila.findAll<GeoUpazila>().then((data: Array<GeoUpazila>) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
}