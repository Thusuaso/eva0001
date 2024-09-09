import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    console.log(body);
    const insertProductSql = `
        insert into SiparisUrunTB
(
	SiparisNo,
	TedarikciID,
	UrunKartID,
	UrunBirimID,
	Miktar,
	OzelMiktar,
	SatisFiyati,
	SatisToplam,
	UretimAciklama,
	MusteriAciklama,
	AlisFiyati,
	SiraNo,
	Ton,
	Adet
) VALUES('${body.SiparisNo}','${body.TedarikciID}','${body.UrunKartID}','${body.UrunBirimID}','${body.Miktar}','${body.OzelMiktar}','${body.SatisFiyati}','${body.SatisToplam}','${body.UretimAciklama}','${body.MusteriAciklama}','${body.AlisFiyati}','${body.SiraNo}','${body.Ton}','${body.Adet}')
    `;

    const getProductIdSql = `select top 1 ID from SiparisUrunTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertProductSql,async (err:any , insertProduct:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insertProduct.rowsAffected[0] == 1){
                    await mssql.query(getProductIdSql,(err:any,_id:any)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            if(_id.recordset.length > 0){
                                resolve({'error':false,'status':true,'id':_id.recordset[0].ID});
                            }else{
                                resolve({'error':false,'status':false,'id':null});
                            }
                        }
                    });
                }else{
                    resolve({'error':false,'status':false})

                }
            }
        });
    });

});