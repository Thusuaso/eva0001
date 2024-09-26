import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getPointsToConsiderListSql = `
        select * from MaliyetHatalariTB
    `;
    return new Promise(async(resolve,reject)=>{
        mssql.query(getPointsToConsiderListSql,(err:any,pointsToConsider)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':pointsToConsider?.recordset});
            }
        });
    });
});