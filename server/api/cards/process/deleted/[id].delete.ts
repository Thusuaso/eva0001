import mssql  from '~/mssql/api';
export default defineEventHandler(async (event:any)=>{
    const id = await getRouterParam(event,'id');
    const deletedCardSql = `delete UrunKartTB where ID='${id}'`;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(deletedCardSql,(err:any,card:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(card.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});