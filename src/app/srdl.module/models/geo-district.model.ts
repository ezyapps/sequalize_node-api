import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IGeoStructure } from "../interfaces/geo-structure.interface";
import { GeoDivision } from "./geo-division.model";
import { GeoUpazila } from "./geo-upazila.model";

export class GeoDistrict extends Model implements IGeoStructure {
    id!: string;
    code!: string;
    name!: string;
    parent_code!: string;
}

GeoDistrict.init({
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
    },
    parent_code: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
{
    sequelize: dbCon, 
    tableName: 'districts'
});

//GeoDistrict.hasMany(GeoUpazila, {foreignKey: 'parent_code', sourceKey:'code'});
//GeoDistrict.belongsTo(GeoDivision, {foreignKey: 'parent_code', targetKey: 'code'});
GeoDistrict.sync({force: true}).then(() => {
    console.log('GeoDistrict has been synced');
});