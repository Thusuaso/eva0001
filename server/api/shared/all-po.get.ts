import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const openPoSql = `
        select SiparisNo from SiparislerTB
        order by SiparisTarihi desc
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(openPoSql,(err:any,po)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':po?.recordset});
            }
        });
    });
});