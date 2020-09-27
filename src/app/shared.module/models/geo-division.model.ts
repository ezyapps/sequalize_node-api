import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IGeoStructure } from "../../shared.module/interfaces/geo-structure.interface";
import { GeoDistrict } from "./geo-district.model";

export class GeoDivision extends Model implements IGeoStructure {
    id!: string;
    code!: string;
    name!: string;
    parent_code!: string;
}

GeoDivision.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    sequelize: dbCon, 
    tableName: 'divisions'
});

//GeoDivision.hasMany(GeoDistrict, {foreignKey:'parent_code', sourceKey: 'code'});

GeoDivision.sync({alter: true}).then(() => {
    console.log('GeoDivision has been synced');
});