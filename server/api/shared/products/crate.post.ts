import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const getCrateListSql  = `
                select ur.ID,ur.KasaNo,ur.Miktar,uk.ID as UrunKartId,k.KategoriAdi,urun.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar,ub.BirimAdi,
        (select su.SatisFiyati * ur.Miktar from SiparisUrunTB su where su.SiparisNo = ur.SiparisAciklama and su.UrunKartID = ur.UrunKartID) as TotalProduct,
        (select su.SatisFiyati from SiparisUrunTB su where su.SiparisNo = ur.SiparisAciklama and su.UrunKartID = ur.UrunKartID) as SatisFiyati

        from 
            UretimTB ur
            inner join UrunKartTB uk on uk.ID = ur.UrunKartID
            inner join KategoriTB k on k.ID = uk.KategoriID
            inner join UrunlerTB urun on urun.ID = uk.UrunID
            inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
            inner join OlculerTB ol on ol.ID = uk.OlcuID
            inner join UrunBirimTB ub on ub.ID = ur.UrunBirimID
        where 
        SiparisAciklama='${body.po}' 
        and UrunKartID='${body.cardId}'
    `;
    const orderAmountSql = `select Miktar from SiparisUrunTB where ID='${body.orderId}'`;
    const productionAmountSql = `select sum(Miktar) as Miktar from UretimTB where SiparisAciklama='${body.po}' and UrunKartID=${body.cardId}`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getCrateListSql,async (err:any,crate)=>{
            if(err){
                resolve({'error':true});

            }else{
                await mssql.query(orderAmountSql,async(err:any,orderAmount)=>{
                    if(err){
                        resolve({'error':true});
                    }else{
                        await mssql.query(productionAmountSql,(err:any,productionAmount)=>{
                            if(err){
                                resolve({'error':true});
                            }else{
                                resolve({'error':false,'list':crate?.recordset,'orderAmount':orderAmount?.recordset[0].Miktar,'productionAmount':productionAmount?.recordset[0].Miktar});

                            }
                        });
                    }
                });
            }
        });
    });
});