import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateCustomerSql = `
        update SatisciAyrintiTB SET

            Aciklama='${body.Aciklama}',
            Baslik='${body.Baslik}',
            Tarih = '${body.Tarih}',
            Hatirlatma_Tarih='${body.Hatirlatma_Tarih}',
            Hatirlatma_Notu='${body.Hatirlatma_Notu}'
            where ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateCustomerSql,(err:any,customer)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(customer?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});