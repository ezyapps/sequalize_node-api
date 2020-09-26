import { symbol } from "joi";
import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { ILabInfo } from "../interfaces/lab-info.interface";

export class LabInfo extends Model implements ILabInfo{
    id!: string;
    code!: string;
    edu_inst_id!: string;
    lab_creation_date!: Date;
    room_length!: number;
    room_width!: number;
    no_of_pc!: number;
    student_capacity!: number;
    LAT!: number;
    LON!: number;
    last_visit_date!: Date;
    visit_by!: string;
    last_visit_comment!: string;    
}

LabInfo.init({
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    code: {type: DataTypes.STRING, allowNull: false},
    edu_inst_id: {type: DataTypes.STRING, allowNull: false},
    lab_creation_date: {type: DataTypes.DATE, allowNull: false},
    room_length: {type: DataTypes.DOUBLE, defaultValue: 0},
    room_width: {type: DataTypes.DOUBLE, defaultValue: 0},
    no_of_pc: {type: DataTypes.TINYINT, defaultValue: 0},
    student_capacity: {type: DataTypes.TINYINT, defaultValue: 0},
    LAT: {type: DataTypes.DOUBLE, defaultValue: 0},
    LON: {type: DataTypes.DOUBLE, defaultValue: 0},
    last_visit_date: {type: DataTypes.DATE, allowNull: true},
    visit_by: {type: DataTypes.STRING, allowNull: true},
    last_visit_comment: {type: DataTypes.STRING, allowNull: true},
},
{sequelize: dbCon, tableName:'lab_info'});

LabInfo.sync({alter: true}).then(()=>{
    console.log('LabInfo table has been synced');
})