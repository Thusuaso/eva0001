import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const po = getRouterParam(event,'po');
    const getProductsSql = `
        select 
            su.ID,
            su.SiparisNo,
            su.TedarikciID,
            t.FirmaAdi as TedarikciAdi,
            su.UrunKartID,
            k.KategoriAdi,
			k.ID as KategoriID,
            urun.UrunAdi,
			urun.ID as UrunID,
            yk.YuzeyIslemAdi,
			yk.ID as YuzeyIslemID,
			ol.ID as OlcuID,
            ol.En,
            ol.Boy,
            ol.Kenar,
            su.UrunBirimID,
            ub.BirimAdi as UrunBirimAdi,
            su.Miktar,
            su.OzelMiktar,
            su.SatisFiyati,
            su.SatisToplam,
            su.UretimAciklama,
            su.MusteriAciklama,
            su.AlisFiyati,
            su.SiraNo,
            su.Ton,
            su.Adet


        from SiparisUrunTB su

        inner join TedarikciTB t on t.ID = su.TedarikciID
        inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
        inner join UrunKartTB uk on uk.ID = su.UrunKartID
        inner join KategoriTB k on k.ID = uk.KategoriID
        inner join UrunlerTB urun on urun.ID = uk.UrunID
        inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
        inner join OlculerTB ol on ol.ID = uk.OlcuID

        where su.SiparisNo='${po}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getProductsSql,(err:any,products:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(products.recordset.length >0){
                    resolve({'error':false,'status':true,'list':products.recordset});
                }else{
                    resolve({'error':false,'status':false,'list':[]});
                }
            }
        });
    });
})