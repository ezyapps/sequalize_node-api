import {Request, Response} from 'express';
const oracledb = require('oracledb');
const dbConfig = require('../../startup/dbConfig_oracle');
export class DesignationController {
    private connection: any;
    private result: any;
    public async index(req:Request, res:Response) {
        try {
            this.connection = await oracledb.getConnection(dbConfig);  
          const sql =
              `SELECT *
              FROM POST
              ORDER BY id`;
          
          // Optional Object Output Format
          this.result = await this.connection.execute(
            sql,
            [], 
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            }
          );
          
        } catch (err) {
          console.error(err);
        } finally {
          if (this.connection) {
            try {
              // Connections should always be released when not needed
              await this.connection.close();
              await res.status(200).json(this.result.rows);
            } catch (err) {
              console.error(err);
              await res.status(500).json(err);
            }
          }
        }
    }
}