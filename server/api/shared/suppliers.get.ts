import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const suppliersSql = `
        select * from TedarikciTB
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(suppliersSql,(err:any,suppliers)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':suppliers?.recordset});
            }
        });
    });
});