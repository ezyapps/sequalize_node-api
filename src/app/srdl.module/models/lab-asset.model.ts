import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { ILabAsset } from "../interfaces/lab-asset.interface";

export class LabAsset extends Model implements ILabAsset {
    id!: string;
    asset_code!: string;
    description!: string;
}
LabAsset.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    asset_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: dbCon,
    tableName: 'lab_assets'
});

LabAsset.sync({alter: true}).then(() => {
    console.log('Lab_Assets table synced');
}).catch((err: Error) => {
    console.log(err);
})