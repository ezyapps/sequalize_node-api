import { EducationInst } from "./education-inst.model";
import { LabInfo } from "./lab-info.model";

EducationInst.hasMany(LabInfo, {foreignKey: 'edu_inst_id'});
LabInfo.belongsTo(EducationInst, {foreignKey: 'edu_inst_id'});