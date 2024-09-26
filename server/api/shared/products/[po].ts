import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const po = await getRouterParam(event,'po');
    const getProductsSql = `
        select su.ID,su.UrunBirimID,s.SiparisNo,uk.ID as UrunKartID,k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar,su.TedarikciID,(t.FirmaAdi + '/' + k.KategoriAdi + '/' + ur.UrunAdi + '/' + yk.YuzeyIslemAdi + '/' + ol.En + 'x' + ol.Boy + 'x' + ol.Kenar) as Aciklama from SiparislerTB s
                inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
                inner join UrunKartTB uk on uk.ID = su.UrunKartID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                inner join TedarikciTB t on t.ID = su.TedarikciID
                
                where s.SiparisDurumID=2 and dbo.Production_Total_Control_Fk(s.SiparisNo,su.UrunKartID) < su.Miktar and  s.SiparisNo='${po}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getProductsSql,(err:any,products)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':products?.recordset});
            }
        });
    });
});