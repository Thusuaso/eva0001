import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getCountryListSql = `select * from YeniTeklif_UlkeTB`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getCountryListSql,(err:any,country)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':country?.recordset});
            }
        });
        
    });
})