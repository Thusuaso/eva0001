import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateRepresentativeSql = `update SiparislerTB SET SiparisSahibi='${body.SiparisSahibiId}',Operasyon='${body.OperasonId}' where SiparisNo='${body.SiparisNo}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateRepresentativeSql,(err:any,representative)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(representative?.rowsAffected[0]==1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        })
    });
})