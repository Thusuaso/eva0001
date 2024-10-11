import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getSupplierListSql = `
        select ID,FirmaAdi from TedarikciTB order by ID desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getSupplierListSql,async(err:any,suppliers)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':suppliers?.recordset});
            };
        });
    });
});