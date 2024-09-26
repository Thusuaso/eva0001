import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const list1Sql = `select s.SiparisNo,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibi,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Operasyon from SiparislerTB s where s.SiparisDurumID=2 order by s.SiparisTarihi desc`;
    const list2Sql = `select count(s.SiparisSahibi) as Total,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as Representative from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where m.Marketing in ('Mekmar','Imperial Homes') and s.SiparisDurumID=2 group by s.SiparisSahibi order by count(s.SiparisSahibi) desc`;
    const list3Sql = `select count(s.Operasyon) as Total,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Representative from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where m.Marketing in ('Mekmar','Imperial Homes') and s.SiparisDurumID=2 group by s.Operasyon order by count(s.Operasyon) desc`;

    return new Promise(async(resolve,reject)=>{
        await mssql.query(list1Sql,async(err:any,list1)=>{
            if(err){
                resolve({'error':true});
            }else{
                await mssql.query(list2Sql,async(err2:any,list2)=>{
                    if(err2){
                        resolve({'error':true});
                    }else{
                        await mssql.query(list3Sql,async(err3:any,list3)=>{
                            if(err3){
                                resolve({'error':true});
                            }else{
                                resolve({'error':false,'list1':list1?.recordset,'list2':list2?.recordset,'list3':list3?.recordset});
                            }
                        });
                    }
                });
            }
        })
    });

});