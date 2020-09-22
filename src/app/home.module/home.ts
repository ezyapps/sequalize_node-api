import {Application } from 'express';
import { HomeController } from './controllers/home.controller';

export function HomeRoute(app: Application) {
    const homeController: HomeController = new HomeController();
    app.route('/').get(homeController.index);
    app.route('/hello').get(homeController.sayHello);
    
}