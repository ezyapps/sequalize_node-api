import {Request, Response} from 'express';
const oracledb = require('oracledb');
const dbConfig = require('../../startup/dbConfig_oracle');
export class MinistryController {
    public async index(req:Request, res:Response) {
        let connection;
        let result;

        try {
          
          connection = await oracledb.getConnection(dbConfig);
          const sql =
              `SELECT *
              FROM MINISTRY
              ORDER BY id`;
          
          // Optional Object Output Format
          result = await connection.execute(
            sql,
            [], // A bind parameter is needed to disambiguate the following options parameter and avoid ORA-01036
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
              // prefetchRows:   100,                    // internal buffer allocation size for tuning
              // fetchArraySize: 100                     // internal buffer allocation size for tuning
            }
          );
          

        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              // Connections should always be released when not needed
              await connection.close();
              await res.status(200).json(result.rows);
            } catch (err) {
              console.error(err);
              await res.status(500).json(err);
            }
          }
        }
        
    }
}