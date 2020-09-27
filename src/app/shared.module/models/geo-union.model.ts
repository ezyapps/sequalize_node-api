import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { IGeoStructure } from "../../shared.module/interfaces/geo-structure.interface";
import { GeoDistrict } from "./geo-district.model";
import { GeoUpazila } from "./geo-upazila.model";

export class GeoUnion extends Model implements IGeoStructure {
    id!: string;
    code!: string;
    name!: string;
    parent_code!: string;
}

GeoUnion.init({
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
    tableName: 'unions'
});

//GeoUnion.belongsTo(GeoUpazila, {foreignKey: 'parent_code', targetKey:'code'});

GeoUnion.sync({alter: true}).then(() => {
    console.log('GeoUnion has been synced');
})

