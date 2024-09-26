import mssql from '~/mssql/api';

export default defineEventHandler(async (id)=>{
    const _id = await getRouterParam(id,'id');
    const deleteBgpSql = `delete BgpNetworkProjects where ID='${_id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteBgpSql,(err:any,bgp)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(bgp?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});