import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertSupplierSql = `
        insert into TedarikciTB (FirmaAdi)
        VALUES('${body.FirmaAdi}')
    `;
    const getSupplierIdSql = `select top 1 ID from TedarikciTB order by ID desc`;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(insertSupplierSql,async (err:any,insert)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insert?.rowsAffected[0] == 1){
                    await mssql.query(getSupplierIdSql,(err:any,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            resolve({'error':false,'status':true,'id':_id.recordset[0].ID});
                        }
                    });
                } else {
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});