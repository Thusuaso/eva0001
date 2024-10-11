import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getCompanyListSql = `select * from FirmalarTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getCompanyListSql,(err:any,company)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':company?.recordset});
            }
        });
    });
});