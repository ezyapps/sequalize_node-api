import { Application } from "express";
import { auth } from "../shared.module/middleware/auth";
import { EducationInstTypeController } from "./controllers/edu-inst-type.controller";
import { EducationInstController } from "./controllers/education-inst.controller";
import { GeoDistrictController } from "./controllers/geo-district.controller";
import { GeoDivisionController } from "./controllers/geo-division.controller";
import { GeoUnionController } from "./controllers/geo-union.controller";
import { GeoUpazilaController } from "./controllers/geo-upazila.controller";
import { LabProviderController } from "./controllers/lab-provider.controller";


export function SrdlRoutes(app: Application) {
    var labProviderController = new LabProviderController();
    var eduInstTypeController = new EducationInstTypeController();
    var eduInstController = new EducationInstController();
    var labAssetsController = new LabProviderController();
    var geoUpazilaController = new GeoUpazilaController();
    var geoUnionController = new GeoUnionController();
    var geoDistrictController = new GeoDistrictController();
    var geoDivisionController = new GeoDivisionController();
    app.route('/api/srdl/lab-providers')
        .get(labProviderController.index)
        .post(auth, labProviderController.create);
    app.route('/api/srdl/edu-inst-types')
        .get(eduInstTypeController.index)
        .post(auth, eduInstTypeController.create);
    app.route('/api/srdl/edu-insts')
        .get(eduInstController.index)
        .post(auth, eduInstController.create);
    app.route('/api/srdl/lab-assets')
        .get(labAssetsController.index)
        .post(auth, labAssetsController.create);
    app.route('/api/geo/upazilas')
        .get(geoUpazilaController.index);
}