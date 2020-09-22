import { Application } from "express";
import { MinistryController } from "./controllers/ministry.controller";
import { DepartmentController } from "./controllers/department.controller";
import { DesignationController } from "./controllers/designation.controller";
import { OfficerController } from "./controllers/officer.controller";

export function CDSRoutes(app: Application){
    const ministryController = new MinistryController();
    const departmentController = new DepartmentController();
    const designationController = new DesignationController();
    const officerController = new OfficerController();
    app.route('/cds/ministries').get(ministryController.index);
    app.route('/cds/departments').get(departmentController.index);
    app.route('/cds/departments/:id').get(departmentController.byMinistry);
    app.route('/cds/designations').get(designationController.index);

    app.route('/cds/officers/designationwisecount').get(officerController.designation_wise_summery);
    app.route('/cds/officers/designationwisecount/:ministryId').get(officerController.ministry_wise_designation_summery);
    app.route('/cds/officers/list').get(officerController.OfficerList);
    app.route('/cds/officers/list/:minsId/:deptId/:desgId').get(officerController.OfficerListByMinsDeptDesignation);
}