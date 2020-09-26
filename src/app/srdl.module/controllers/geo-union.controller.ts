import { Request, Response } from 'express';
import { GeoUnion } from '../models/geo-union.model';

export class GeoUnionController {
    public async index(req: Request, res: Response) {
        return await GeoUnion.findAll<GeoUnion>().then((data: Array<GeoUnion>) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
}