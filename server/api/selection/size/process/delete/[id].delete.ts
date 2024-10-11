import mssql from '~/mssql/api';

export default defineEventHandler(async(id)=>{
    const _id = await getRouterParam(id,'id');
    const deleteSizeSql = `delete Kasa_Detaylari_Yeni where ID='${_id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteSizeSql,(err:any,deleted)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(deleted?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});