import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IGeoStructure } from "../interfaces/geo-structure.interface";
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
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(4),
        allowNull: false
    }
},
{
    sequelize: dbCon, 
    tableName: 'divisions'
});

//GeoDivision.hasMany(GeoDistrict, {foreignKey:'parent_code', sourceKey: 'code'});

GeoDivision.sync({force: true}).then(() => {
    console.log('GeoDivision has been synced');
});