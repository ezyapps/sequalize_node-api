import {Response, Request} from 'express';
const oracledb = require('oracledb');
const dbConfig = require('../../startup/dbConfig_oracle');
export class OfficerController 
{
    
    
    public async designation_wise_summery(req: Request, res: Response) {
      let connection: any;
      let result: any;
        const sql = `SELECT CT.*, p.post_name FROM (
            select POST AS POST_ID, count(*) as TOTAL_OFFICER from ICTOFFICER GROUP BY POST
            ) CT inner join POST p ON CT.POST_ID = p.ID
            order by p.post_order`;
          try {
            connection = await oracledb.getConnection(dbConfig);
            result = await connection.execute(
                sql,[], 
                {
                  outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
                }
              );
                  
          }catch (err){
              console.log(err);
          }
          finally 
          {
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

    public async ministry_wise_designation_summery(req: Request, res: Response) {
      let connection: any;
      let result: any;
        try {
          connection = await oracledb.getConnection(dbConfig);  
          let minsId: number = Number.parseInt(req.params.ministryId);
          console.log(minsId);
          const sql = `SELECT CT.*, p.post_name FROM (
            select POST AS POST_ID, count(*) as TOTAL_OFFICER from ICTOFFICER WHERE ministry=:ministryId GROUP BY POST
            ) CT inner join POST p ON CT.POST_ID = p.ID
            order by p.post_order`;
        console.log(sql);
        // Optional Object Output Format
        result = await connection.execute(
          sql,
          {"ministryId": minsId},
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

    public async OfficerList(req: Request, res: Response){
      let connection: any;
      let result: any;
      
      const sql = `select o.ID, o.image, o.name, p.post_name, m.ministry_name 
      from ICTOFFICER o LEFT OUTER JOIN POST p ON o.POST = p.ID 
      LEFT OUTER JOIN ministry m on o.ministry = m.ID
      --WHERE ministry=2 
      order by p.post_order`;
      try {
        connection = await oracledb.getConnection(dbConfig);
        result = await connection.execute(
            sql,[], 
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            }
          );
              
      }catch (err){
          console.log(err);
      }
      finally 
      {
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
    public async OfficerListByMinsDeptDesignation(req: Request, res: Response){
      let connection: any;
      let result: any;
      let minsId: number = Number.parseInt(req.params.minsId);
      let deptId: number = Number.parseInt(req.params.deptId);
      let designId: number = Number.parseInt(req.params.desgId);
      let params = {};
      let sql = `select o.ID, o.image, o.name, p.post_name, m.ministry_name 
      from ICTOFFICER o INNER JOIN POST p ON o.POST = p.ID 
      INNER JOIN ministry m on o.ministry = m.ID
      WHERE 1=1 `;
      if(minsId>0)
      {
        sql += ' AND ministry=:minsId';
        
      }
      if(designId>0){
        sql += ' AND o.POST = :postId';
      }
      sql += ' order by p.post_order'
      try {
        connection = await oracledb.getConnection(dbConfig);
        
        if(minsId>0 && designId >0 )
        {
          result = await connection.execute(
            sql,
            {"minsId": minsId, 'postId': designId}, 
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            }
          );
        }else if(minsId>0  )
        {
          result = await connection.execute(
            sql,
            {"minsId": minsId}, 
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            }
          );
        } else if(designId >0 )
        {
          result = await connection.execute(
            sql,
            {'postId': designId}, 
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            }
          );
        } else {
          result = await connection.execute(
            sql,
            [], 
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,     // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            }
          );
        }
              
      }catch (err){
          console.log(err);
      }
      finally 
      {
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