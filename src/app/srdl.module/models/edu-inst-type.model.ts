import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IEducationInstType } from "../interfaces/edu-inst-type.interfce";

export class EducationInstType extends Model implements IEducationInstType {
    id!: string;
    type!: string; 
}

EducationInstType.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING
    }
},
{
    sequelize: dbCon,
    tableName: 'education_inst_types'
});

EducationInstType.sync({force: true}).then(()=>{
    console.log('Table "EducationInstType" has been synced.');
});