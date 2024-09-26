import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const deleteProductSql = `delete UretimTB where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteProductSql,(err:any,deleted)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(deleted.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});