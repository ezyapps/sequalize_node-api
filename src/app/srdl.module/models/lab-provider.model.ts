import { DataTypes, Model } from "sequelize";
import { dbCon } from "../../startup/dbCon";
import { ILabProvider } from "../interfaces/lab-provider.interface";

export class LabProvider extends Model implements ILabProvider {
    public id!: string;
    public name!: string;
}

LabProvider.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    }
},
{
    sequelize: dbCon,
    tableName: 'lab_providers'
});
LabProvider.sync().then(()=>{
    console.log('TABLE: "lab_providers" has been synced.');
});