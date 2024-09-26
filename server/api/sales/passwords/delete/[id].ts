import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const deletePasswordSql = `delete Accounts where ID='${id}'`;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(deletePasswordSql,(err:any,deleted)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(deleted?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        })
    });

});