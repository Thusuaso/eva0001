import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const quarriesSql = `
            select * from UrunOcakTB
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(quarriesSql,(err:any,quarries)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':quarries?.recordset});
            }
        });
    });
});