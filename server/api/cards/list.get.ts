import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const cardsListSql = `
        select 

                    uk.ID,
                    k.KategoriAdi,
                    u.UrunAdi,
                    yk.YuzeyIslemAdi,
                    o.En,
                    o.Boy,
                    o.Kenar,
                    k.ID as KategoriId,
                    u.ID as UrunId,
                    yk.ID as YuzeyId,
                    o.ID as OlcuId

                from UrunKartTB uk
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB u on u.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB o on o.ID = uk.OlcuID
                order by uk.ID desc
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(cardsListSql,(err:any,cards)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':cards?.recordset});
            }
        });
    });
});