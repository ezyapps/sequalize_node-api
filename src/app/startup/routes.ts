import express, {Application, Request, Response, NextFunction} from 'express';

import { reqError } from '../shared.module/middleware/error';
import { HomeRoute } from '../home.module/home';
import { UserRoutes } from '../user.module/user.routes';
import { CDSRoutes } from '../cds.module/cds.routes';
import { SrdlRoutes } from '../srdl.module/srdl.routes';

export class Routes {
    public routes(app: Application): void {
        HomeRoute(app);
        UserRoutes(app);
        CDSRoutes(app);
        SrdlRoutes(app);
        app.use(reqError);
    }   

    
    
}