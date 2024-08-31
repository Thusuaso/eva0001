import mssql from `~/mssql/api`;
export default defineEventHandler(async ()=>{
    const usersSql = `
        select k.ID,k.KullaniciAdi,k.YSifre,k.MailAdres from KullaniciTB k
        where k.Aktif = 1
    `;
    return new Promise((resolve,reject)=>{
        mssql.query(usersSql,(err:any,users:any)=>{
            if(err){
                resolve(false);
            }else{
                if(users?.recordset?.length>0){
                    resolve(users.recordset);
                }else{
                    resolve(false);
                }
            }
        });
    });

});