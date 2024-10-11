import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateCompanySql = `
            update FirmalarTB
        SET
        FirmaAdi='${body.FirmaAdi}',
        Telefon='${body.Telefon}',
        MailAdresi='${body.MailAdresi}',
        Notlar='${body.Notlar}'
        WHERE
            ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateCompanySql, (err:any,update)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(update?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});