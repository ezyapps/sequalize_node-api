import {Application } from 'express';
import { GeoDistrictController } from '../shared.module/controllers/geo-district.controller';
import { GeoDivisionController } from '../shared.module/controllers/geo-division.controller';
import { GeoUnionController } from '../shared.module/controllers/geo-union.controller';
import { GeoUpazilaController } from '../shared.module/controllers/geo-upazila.controller';
import { HomeController } from './controllers/home.controller';

export function HomeRoute(app: Application) {
    const homeController: HomeController = new HomeController();
    var geoUpazilaController = new GeoUpazilaController();
    var geoUnionController = new GeoUnionController();
    var geoDistrictController = new GeoDistrictController();
    var geoDivisionController = new GeoDivisionController();
    
    app.route('/').get(homeController.index);
    app.route('/hello').get(homeController.sayHello);
    app.route('/api/geo/unions')
        .get(geoUnionController.index);
    app.route('/api/geo/upazilas')
        .get(geoUpazilaController.index)
        .post(geoUpazilaController.creat);
    app.route('/api/geo/districts')
        .get(geoDistrictController.index)
        .post(geoDistrictController.creat);
    app.route('/api/geo/divisions')
        .get(geoDivisionController.index)
        .post(geoDivisionController.creat);
}