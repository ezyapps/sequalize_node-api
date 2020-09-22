import { Sequelize } from "sequelize";
import { DbConfig } from '../config/db.config';
const dbConfig = new DbConfig();
export const dbCon = new Sequelize (
    dbConfig._db, dbConfig._user, dbConfig._password,
    {
        host: dbConfig._host,
        dialect: "mysql",
        //operatorsAliases: false,
        pool: {
            max: dbConfig._pool_max,
            min: dbConfig._pool_min,
            acquire: dbConfig._pool_acquire,
            idle: dbConfig._pool_idle
        }
    }
)