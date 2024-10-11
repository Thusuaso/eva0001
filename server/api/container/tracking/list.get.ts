import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const containerListSql = `
        select
                s.ID,
                s.SiparisNo,
                m.FirmaAdi as MusteriAdi,
                s.Pesinat,
                NavlunSatis + DetayTutar_1 + DetayTutar_2 + DetayTutar_3  as Navlun,
                ( Select Sum(o.Tutar) from OdemelerTB o where o.SiparisNo=s.SiparisNo ) as Odemeler,
                (Select Sum(u.SatisToplam) from SiparisUrunTB u where u.SiparisNo=s.SiparisNo) as MalBedeli,
                (select k.KullaniciAdi from KullaniciTB k where k.ID=s.SiparisSahibi ) as Sorumlu,
                s.Eta,
                s.KonteynerNo,
                s.YuklemeTarihi,
                s.KonsimentoDurum,
                s.AktarmaLimanAdi,
                s.Line,
                s.Takip
                from
                SiparislerTB s,MusterilerTB m
                where s.MusteriID=m.ID
                and s.SiparisDurumID=3 and s.Takip=1
                order by s.ID desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(containerListSql,async (err:any,container)=>{
            if(err){
                resolve({'error':true});
            }else{
                let containerList = await container?.recordset;
                await containerList.forEach(x=>{
                    if(x.Eta == null){
                        x.Kalan = 0;
                    } else{
                        const today = new Date();
                        const date = new Date(x.Eta);
                        const reminderDate = Math.round((date - today) / 86400000);
                        if(reminderDate < 0){
                            x.Kalan = 0;
                        } else{
                            x.Kalan = reminderDate;
                        }
        
                    }
                });
                resolve({'error':false,'list':containerList});
            }
        }); 
    });
});