import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const seenUpdateSql = `update Yapilacaklar SET Goruldu=0 where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(seenUpdateSql,(err:any,todo)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(todo?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
})