import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getPasswordsListSql = `select * from Accounts`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getPasswordsListSql,(err:any,passwords)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':passwords?.recordset});
            }
        });
    });
});