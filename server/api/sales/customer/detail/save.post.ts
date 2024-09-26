import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertCustomerSql = `
        insert into SatisciAyrintiTB(
                MusteriAdi,
                Aciklama,
                Baslik,
                Tarih,
                Hatirlatma_Tarih,
                Hatirlatma_Notu,
                Temsilci
            ) VALUES('${body.MusteriAdi}',
            '${body.Aciklama}',
            '${body.Baslik}',
            '${body.Tarih}',
            '${body.Hatirlatma_Tarih}',
            '${body.Hatirlatma_Notu}',
            '${body.Temsilci}'

            )
    `;
    const getCustomerIdSql = `
        select top 1 ID from SatisciAyrintiTB order by ID desc

    `;

    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertCustomerSql,async(err:any,customer)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(customer?.rowsAffected[0] == 1){
                    await mssql.query(getCustomerIdSql,(err:any,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            if(_id?.recordset.length >0){
                                resolve({'error':false,'status':true,'id':_id?.recordset[0].ID});
                                
                            }else{
                                resolve({'error':false,'status':false});
                            }
                        }
                    });
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });

});