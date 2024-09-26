import mssql from '~/mssql/api';

export default defineEventHandler( async (event)=>{
    const body = await readBody(event);
    const updateProductSql = `
        update SiparisUrunTB 
        SET 
            TedarikciID = '${body.TedarikciID}',
            UrunKartID = '${body.UrunKartID}',
            UrunBirimID ='${body.UrunBirimID}',
            Miktar ='${body.Miktar}',
            OzelMiktar='${body.OzelMiktar}',
            SatisFiyati='${body.SatisFiyati}',
            SatisToplam='${body.SatisToplam}',
            UretimAciklama='${body.UretimAciklama}',
            MusteriAciklama='${body.MusteriAciklama}',
            AlisFiyati='${body.AlisFiyati}',
            Ton='${body.Ton}'
        WHERE
            ID='${body.ID}'
    
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateProductSql,(err:any,update:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(update.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                    
                }
            }
        });
    });
});