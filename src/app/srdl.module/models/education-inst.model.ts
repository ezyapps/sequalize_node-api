import { strict } from "assert";
import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IEducationInst } from "../interfaces/education-inst.interfce";

export class EducationInst extends Model implements IEducationInst {
    id!: string;
    eiin!: string;
    inst_name!: string;
    inst_type!: string;
    union_code!: string;
    upozila_code!: string;
    zilla_code!: string;
    contact_no!: string;
    contact_name!: string;
}

EducationInst.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    eiin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inst_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inst_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    union_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    upozila_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zilla_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: dbCon,
    tableName: 'education_insts'
});

EducationInst.sync({force: true}).then(()=>{
    console.log('Table "EducationInst" has been synced.');
});