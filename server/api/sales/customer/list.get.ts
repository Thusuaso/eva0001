import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const getCustomerSql = `
        select
    m.ID,
    m.FirmaAdi,
    m.MusteriOncelik as Oncelik,
   (select top 1  s.Baslik from SatisciAyrintiTB s where s.MusteriAdi = m.FirmaAdi  order by s.Tarih desc ) as baslik,
    k.KullaniciAdi as Temsilci,
    m.Takip as Takip,
    (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as UlkeAdi,
    u.Png_Flags as Flag,
    m.MailAdresi as Mail
   
    from
    MusterilerTB m,YeniTeklif_UlkeTB u,KullaniciTB k
    where u.Id=m.UlkeId and k.ID=m.MusteriTemsilciId  and   m.Marketing ='Mekmar' and ( m.MusteriOncelik  = 'A' or m.MusteriOncelik = 'B' or m.MusteriOncelik = 'C') and m.Takip = 1
    
    order by m.MusteriOncelik
    `;
    const getOfferSql = `
        select
                        m.MusteriAdi as FirmaAdi,
                        t.TeklifOncelik as Oncelik,
                        (select k.KullaniciAdi from KullaniciTB k where k.ID = t.KullaniciId) as Temsilci,
                        (select top 1  s.Baslik from SatisciAyrintiTB s where s.MusteriAdi = m.MusteriAdi   order by s.Tarih desc) as baslik,
                        (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as UlkeAdi,
                        u.Png_Flags as Flag,
                        (select mt.MailAdresi from MusterilerTB mt where mt.FirmaAdi = m.MusteriAdi) as Mail,
                        t.KaynakYeri as Kaynak,
                        t.Id as ID,
                        t.TakipEt
                        from YeniTeklifTB t , YeniTeklif_MusterilerTB m,YeniTeklif_UlkeTB u
                        where m.Id = t.MusteriId and ( t.TeklifOncelik='A' or  t.TeklifOncelik='B' or t.TeklifOncelik='C') and t.TakipEt=1 and u.Id = m.UlkeId
                        GROUP BY  m.MusteriAdi,t.TeklifOncelik, t.KullaniciId,m.UlkeId,u.Png_Flags,t.KaynakYeri,t.Id,t.TakipEt
                        order by t.TeklifOncelik
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getCustomerSql,async(err:any,customer)=>{
            if(err){
                resolve({'error':true});
            }else{
                await mssql.query(getOfferSql,async(err:any,offer)=>{
                    if(err){
                        resolve({'error':true});
                    }else{
                        resolve({'error':false,'list':customer?.recordset.concat(offer?.recordset)});
                    }
                });
            }
        });
    });
});