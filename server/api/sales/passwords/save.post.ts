import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertPasswordSql = `
        insert into Accounts(
            Platform,
            LoginName,
            LoginPassword
        )
        VALUES('${body.Platform}','${body.LoginName}','${body.LoginPassword}')
    `;
    const getPasswordIdSql = `select top 1 ID from Accounts order by ID  desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertPasswordSql,async (err:any,insert)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insert?.rowsAffected[0] == 1){
                    await mssql.query(getPasswordIdSql,async(err,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            if(_id?.recordset.length >0){
                                resolve({'error':false,'status':true,'id':_id?.recordset[0].ID});
                            }else{
                                resolve({'error':false,'status':false});
                            }
                        }
                    })
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
})