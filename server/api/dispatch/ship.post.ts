import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);

    const updateOrderSql = `update SiparislerTB SET SiparisDurumID=3, YuklemeTarihi='${body.YuklemeTarihi}' where SiparisNo='${body.SiparisNo}'`
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateOrderSql,(err:any,updateOrder)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(updateOrder?.rowsAffected[0] == 1){
                    body.Urunler.forEach( x=>{
                        const insertShippedCratesSql = `
                            insert into SevkiyatTB(Tarih,KasaNo,MusteriID,BirimFiyat,Toplam,CikisNo,RaporDurum,KullaniciID) 
                                VALUES('${x.Tarih}','${x.KasaNo}','${x.MusteriId}','${x.SatisFiyati}','${x.TotalProduct}','${x.SiparisNo}','1','10');
                        `;
                        mssql.query(insertShippedCratesSql,async (err:any,insertCrate)=>{
                            if(err){
                                resolve({'error':true});
                            }else{
                                if(insertCrate?.rowsAffected[0] == 1){
                                    const updateCrateSql = `update UretimTB SET UrunDurumID= 0 where KasaNo='${x.KasaNo}'`;
                                    await mssql.query(updateCrateSql,(err,updateCrate)=>{
                                        if(err){
                                            resolve({'error':true});
                                        }
                                    });
                                }

                            }
                        });
                    });
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        })


        

    });
});