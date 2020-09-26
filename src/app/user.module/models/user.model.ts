import { Model, DataTypes } from "sequelize";
import { IUser } from "../interfaces/user.interface";
import { dbCon } from "../../startup/dbCon";
const jwt = require('jsonwebtoken');
const config = require('config');

export class User extends Model implements IUser {
    public id!: number;
    public name!: string;
    public gender!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public isAdmin!: boolean;
    public generateAuthToken() {
        const token = jwt.sign({id: this.id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
        return token;
    };
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        gender: {
            type: new DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: new DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize: dbCon,
        tableName: 'users'
    }
);

User.sync({force: true}).then( ()=> {
    console.log('Users table has been created.');
});
//{force: true}