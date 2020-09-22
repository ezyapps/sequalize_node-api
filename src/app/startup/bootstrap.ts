import {logger} from './logger';
import { init_configs } from './config';
import { Routes } from './routes';
import { Application } from 'express';
import { dbCon } from './dbCon';
export function boostrap (app: Application){
    const routes: Routes = new Routes();
    logger();
    init_configs(app);
    routes.routes(app);
    dbCon.authenticate().then( () => {
        console.log('Database connection successful.');
    }).catch( err => {
        console.error(err);        
    })
}