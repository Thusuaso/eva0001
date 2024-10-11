import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertCompanySql = `
        insert into FirmalarTB(FirmaAdi,Telefon,MailAdresi,Notlar)
        VALUES('${body.FirmaAdi}','${body.Telefon}','${body.MailAdresi}','${body.Notlar}')
    `;
    const getCompanyIdSql = `select top 1 ID from FirmalarTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertCompanySql,async(err:any,insert)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insert?.rowsAffected[0] == 1){
                    await mssql.query(getCompanyIdSql,(err:any,id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            resolve({'error':false,'status':true,'id':id.recordset[0].ID});
                        }
                    });
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});