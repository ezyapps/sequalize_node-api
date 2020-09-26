import { Request, Response } from 'express';
import { GeoDivision } from '../models/geo-division.model';

export class GeoDivisionController {
    public async index(req: Request, res: Response) {
        return await GeoDivision.findAll<GeoDivision>().then((data: Array<GeoDivision>) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
}