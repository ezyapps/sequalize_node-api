import {Request, Response } from 'express';
import { min } from 'lodash';
const oracledb = require('oracledb');
const dbConfig = require('../../startup/dbConfig_oracle');
export class DepartmentController {
    private connection: any;
    private result: any;
    // constructor() {
    //     this.connection = oracledb.getConnection(dbConfig);
    // }
    private async ExecQuery(sql: string){
        console.log('Custom execute function');
        return await this.connection.execute(
            sql,
            [], // A bind parameter is needed to disambiguate the following options parameter and avoid ORA-01036
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
              // prefetchRows:   100,                    // internal buffer allocation size for tuning
              // fetchArraySize: 100                     // internal buffer allocation size for tuning
            }
          );
    }
    public async index(req: Request, res: Response) {
        try {
            this.connection = await oracledb.getConnection(dbConfig);  
          const sql =
              `SELECT *
              FROM GOVTOFFICE
              ORDER BY id`;
          
          // Optional Object Output Format
          this.result = await this.connection.execute(
            sql,
            [], // A bind parameter is needed to disambiguate the following options parameter and avoid ORA-01036
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
              // prefetchRows:   100,                    // internal buffer allocation size for tuning
              // fetchArraySize: 100                     // internal buffer allocation size for tuning
            }
          );
          //this.ExecQuery(sql);
          

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
    public async byMinistry(req: Request, res: Response) {
        try {
            this.connection = await oracledb.getConnection(dbConfig);  
            let minId: number = Number.parseInt(req.params.id);
            console.log(minId);
          const sql =
              `SELECT o.ID, o.OFFICENAME, m.MINISTRY_NAME
              FROM GOVTOFFICE o INNER JOIN MINISTRY m on o.PARENTMINISTRY = m.ID
              WHERE o.PARENTMINISTRY = :ministryId
              ORDER BY o.id`;
          console.log(sql);
          // Optional Object Output Format
          this.result = await this.connection.execute(
            sql,
            {"ministryId": minId},
            //[], // A bind parameter is needed to disambiguate the following options parameter and avoid ORA-01036
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
              // prefetchRows:   100,                    // internal buffer allocation size for tuning
              // fetchArraySize: 100                     // internal buffer allocation size for tuning
            }
          );
          //this.ExecQuery(sql);
          

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
    public async byMinistry1(req: Request, res: Response) {
        try {
            this.connection = oracledb.getConnection(dbConfig);
            console.log(req.params);
            const ministryId: number = Number.parseInt(req.params.id);
            const sql =
                `SELECT *
                FROM GOVTOFFICE
                WHERE PARENTMINISTRY = :ministryId
                ORDER BY id`;
            // Optional Object Output Format
            this.result = await this.connection.execute(
                sql,
                {"ministryId": ministryId}, // A bind parameter is needed to disambiguate the following options parameter and avoid ORA-01036
                {
                  outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
                  // prefetchRows:   100,                    // internal buffer allocation size for tuning
                  // fetchArraySize: 100                     // internal buffer allocation size for tuning
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