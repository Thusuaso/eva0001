import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getMekmerCrateNoSql = `
        select top 1 KasaNo + 1 as KasaNo from UretimTB 
        where Disarda != 1 and LEN(KasaNo) != 6

        order by ID desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getMekmerCrateNoSql,(err:any,crate)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'no':crate?.recordset[0].KasaNo});
            }
        })
    });
});