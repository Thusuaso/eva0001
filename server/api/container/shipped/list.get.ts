import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getContainerShippedListSql = `
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
            and s.SiparisDurumID=3 and s.Takip=0
            order by s.ID desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getContainerShippedListSql,async(err:any,container)=>{
            if(err){
                resolve({'status':true});
            }else{
                resolve({'status':false,'list':container?.recordset});
            }
        });
    });
});