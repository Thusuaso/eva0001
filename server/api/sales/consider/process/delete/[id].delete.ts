import mssql from '~/mssql/api';
export default defineEventHandler(async (event)=>{
    const id = await getRouterParam(event,'id');
    const deleteConsiderSql = `delete MaliyetHatalariTB where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteConsiderSql,(err:any,consider)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(consider?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});