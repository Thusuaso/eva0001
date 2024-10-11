import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const updateContainerSql = `
        update SiparislerTB SET 
    Eta='${body.Eta}',
    KonteynerNo='${body.KonteynerNo}',
    KonsimentoDurum='${body.KonsimentoDurum}',
    Line='${body.Line}',
    Takip='${body.Takip}' where 
    SiparisNo='${body.SiparisNo}'
    `;
    console.log(updateContainerSql);
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateContainerSql,(err:any,updated)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(updated?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});