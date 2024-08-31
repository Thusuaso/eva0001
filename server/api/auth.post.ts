import mssql from '~/mssql/api';
export default defineEventHandler( async(event)=>{
    const body = await readBody(event);
    const authSql = `
            select * from KullaniciTB where KullaniciAdi='${body.username}' and YSifre='${body.password}'
    
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(authSql,(err:any,auth:any)=>{
            if(err){
                const data = {
                    'status':false
                }
                resolve(data);
            }else{
                if(auth?.recordset?.length>0){
                    const data = {
                        'status':true,
                        'token':Math.random().toString(36).substr(2),
                        'user':auth.recordset[0].KullaniciAdi,
                        'mail':auth.recordset[0].MailAdres
                    }
                    resolve(data);
                }else{
                    const data = {
                        'status':false
                    }
                    resolve(data);
                }
            }
        })
    });
});