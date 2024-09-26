import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
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
'${body.KasaNo}',
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
    const getProductIdSql = `select top 1 ID from UretimTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertProductSql,async(err:any,insert)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insert.rowsAffected[0] == 1){
                    await mssql.query(getProductIdSql,(err:any,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            resolve({'error':false,'status':true,'id':_id?.recordset[0].ID});
                        }
                    });
                } else{
                    resolve({'error':false,'status':false});
                }
            };
        })
    });
});