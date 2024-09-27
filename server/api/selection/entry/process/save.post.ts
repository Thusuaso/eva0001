import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    let body = await readBody(event);
    return new Promise(async(resolve,reject)=>{
        for (let i = 0 ; i < +body.KasaAdedi;i++){
            const insertProductSql = `
            insert into UretimTB
    (
        Tarih,
        KasaNo,
        UrunKartID,
        TedarikciID,
        UrunBirimID,
        UrunOcakID,
        Adet,
        KutuAdet,
        Miktar,
        Aciklama,
        UretimTurID,
        UrunDurumID,
        SiparisAciklama,
        Kutu,
        Duzenleyen,
        Kasalayan,
        Disarda,
        KutuIciAdet,
        SqmMiktar,
        Bagli,
        Bulunamadi
    )
    VALUES(
    '${body.Tarih}',
    '${body.KasaNo += i}',
    '${body.UrunKartID}',
    '${body.TedarikciID}',
    '${body.UrunBirimID}',
    '${body.UrunOcakID}',
    '${body.Adet}',
    '${body.KutuAdet}',
    '${body.Miktar}',
    '${body.Aciklama}',
    '${body.UretimTurID}',
    '${body.UrunDurumID}',
    '${body.SiparisAciklama}',
    '${body.Kutu}',
    '${body.Duzenleyen}',
    '${body.Kasalayan}',
    '${body.Disarda}',
    '${body.KutuIciAdet}',
    '${body.SqmMiktar}',
    '${body.Bagli}',
    '${body.Bulunamadi}'
    )
            `;
            mssql.query(insertProductSql);
        };
        resolve({'error':false,'status':true});
    });
});