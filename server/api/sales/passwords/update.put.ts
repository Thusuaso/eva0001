import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const updatePasswordSql = `
        update Accounts SET
            Platform = '${body.Platform}',
            LoginName = '${body.LoginName}',
            LoginPassword = '${body.LoginPassword}'
        where
        ID = '${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updatePasswordSql,(err:any,update)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(update?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        })
    })

});