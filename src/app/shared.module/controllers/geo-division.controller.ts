import { Request, Response } from 'express';
import { IGeoStructure } from '../interfaces/geo-structure.interface';
import { GeoDivision } from '../models/geo-division.model';

export class GeoDivisionController {
    public async index(req: Request, res: Response) {
        return await GeoDivision.findAll<GeoDivision>().then((data: Array<GeoDivision>) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
    public async creat(req: Request, res: Response) {
        var inpObj: IGeoStructure = req.body;
        return await GeoDivision.create<GeoDivision>(inpObj).then((data: GeoDivision) => {
            res.status(200).json(data);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }
}