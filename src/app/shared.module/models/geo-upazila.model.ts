import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IGeoStructure } from "../../shared.module/interfaces/geo-structure.interface";
import { GeoDistrict } from "./geo-district.model";
import { GeoUnion } from "./geo-union.model";

export class GeoUpazila extends Model implements IGeoStructure {
    id!: string;
    code!: string;
    name!: string;
    parent_code!: string;
}

GeoUpazila.init({
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
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_code: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
{
    sequelize: dbCon, 
    tableName: 'upazilas'
});

//GeoUpazila.belongsTo(GeoDistrict, {foreignKey: 'parent_code', targetKey:'code'});
//GeoUpazila.hasMany(GeoUnion,{foreignKey:'parent_code', sourceKey: 'code'});

GeoUpazila.sync({alter: true}).then(() => {
    console.log('GeoUpazila has been synced');
});