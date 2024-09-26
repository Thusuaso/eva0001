import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const customer = await getRouterParam(event,'customer');
    const getDetailSql = `
        select k.KullaniciAdi,
                a.ID,
                a.MusteriAdi,
                a.Satisci_Cloud,
                a.Satisci_Cloud_Dosya,
                a.Aciklama,
                a.Baslik,
                a.Hatirlatma_Notu,
                a.Hatirlatma_Tarih,
                a.Tarih
            from SatisciAyrintiTB a , KullaniciTB k where k.ID = a.Temsilci and
            a.MusteriAdi = '${customer?.replaceAll('_',' ')}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getDetailSql,(err:any,customer)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'detail':customer?.recordset});
            }
        });
    });
});