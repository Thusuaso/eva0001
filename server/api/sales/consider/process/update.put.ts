import mssql from '~/mssql/api';

export default defineEventHandler(async (event) =>{
    const body = await readBody(event);
    const updateConsiderSql = `
        update MaliyetHatalariTB SET Hata = '${body.Hata}' WHERE ID = '${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateConsiderSql,(err:any,consider)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(consider.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});