import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const insertConsiderSql = `
        insert into MaliyetHatalariTB(Hata)
            VALUES('${body.Hata}')
    `;
    const getConsiderIdSql = `select top 1 ID from MaliyetHatalariTB order by ID desc`;
    return new Promise(async (resolve,reject) =>{
        await mssql.query(insertConsiderSql,async (err:any,consider)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(consider?.rowsAffected[0] == 1){
                    await mssql.query(getConsiderIdSql,async (err:any,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            if(_id?.recordset.length >0){
                                resolve({'error':false,'status':true,'id':_id?.recordset[0].ID});

                            }else{
                                resolve({'error':false,'status':false});
                            };
                        };
                    });
                }else{
                    resolve({'error':false,'status':false});
                };
            }
        });
    });

});