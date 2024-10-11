import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const crateSizeListSql = `select * from Kasa_Detaylari_Yeni order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(crateSizeListSql,(err:any,size)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':size?.recordset});
            }
        });
    });
});