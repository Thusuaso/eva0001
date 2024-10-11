import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    return new Promise(async(resolve,reject)=>{
        await body.forEach(async x=>{
            const insertDatabaseSql = `
                insert into SiparisFaturaKayitTB 
                                    
                        (  
                        Tarih,
                        FaturaKayitID,
                        SiparisFaturaTurID,
                        SiparisNo,
                        YuklemeEvrakID,
                        YuklemeEvrakDurumID,
                        EvrakAdi,
                        EvrakYuklemeTarihi,KullaniciID)
                        
                    values ('${x.date}', '${0}','${0}','${x.po}','${x.id}','${2}','${x.po + '.pdf'}','${x.date}','${x.userId}')
            `;
            console.log(insertDatabaseSql)
            await mssql.query(insertDatabaseSql);
        });
        resolve({'status':true});

    });
});