import { Application } from "express";
import { auth } from "../shared.module/middleware/auth";
import { EducationInstTypeController } from "./controllers/edu-inst-type.controller";
import { EducationInstController } from "./controllers/education-inst.controller";
import { LabProviderController } from "./controllers/lab-provider.controller";


export function SrdlRoutes(app: Application) {
    var labProviderController = new LabProviderController();
    var eduInstTypeController = new EducationInstTypeController();
    var eduInstController = new EducationInstController();
    var labAssetsController = new LabProviderController();
    
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
    
}