import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getEntryListSql = `
        select 
        (ol.En + 'x' + ol.Boy + 'x' + ol.Kenar) as OlcuAdi, 
        u.OzelMiktar,
    u.Duzenleyen,u.Kasalayan,u.UrunKartID,urb.ID as UrunBirimId,urb.BirimAdi as UrunBirimAdi,u.UretimTurID,u.ID,u.Tarih,u.KasaNo,k.KategoriAdi,k.ID as KategoriID,uo.OcakAdi,uo.ID as UrunOcakID,ur.UrunAdi,ur.ID as UrunId,yk.YuzeyIslemAdi,yk.ID as YuzeyId,ol.ID as OlcuId,ol.En,ol.Boy,ol.Kenar,u.KutuAdet,u.KutuIciAdet,u.Miktar,u.Kutu,u.Bagli,u.SiparisAciklama,u.Aciklama,u.TedarikciID,t.FirmaAdi,u.Bulunamadi,u.Disarda,u.Adet,u.SqmMiktar
    
    
    from UretimTB u inner join TedarikciTB t on t.ID = u.TedarikciID inner join UrunBirimTB ub on ub.ID = u.UrunBirimID inner join UrunOcakTB uo on uo.ID = u.UrunOcakID inner join UretimTurTB ut on ut.ID = u.UretimTurID inner join UrunKartTB uk on uk.ID = u.UrunKartID inner join KategoriTB k on k.ID = uk.KategoriID inner join UrunlerTB ur on ur.ID = uk.UrunID inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID inner join OlculerTB ol on ol.ID = uk.OlcuID inner join UrunBirimTB urb on urb.ID = u.UrunBirimID where UrunDurumID=1 order by KasaNo desc
    `;
    const getMonthlyTotalSql = `select sum(u.Miktar) as Miktar,(select t.FirmaAdi from TedarikciTB t where t.ID = u.TedarikciID) as TedarikciAdi,u.TedarikciID from UretimTB u where u.UrunBirimID = 1 and YEAR(u.Tarih) = YEAR(GETDATE()) and MONTH(u.Tarih) = MONTH(GETDATE()) group by u.TedarikciID`;
    const getTotalSql = `select sum(u.Miktar) as Miktar,(select t.FirmaAdi from TedarikciTB t where t.ID = u.TedarikciID) as TedarikciAdi,u.TedarikciID from UretimTB u where u.UrunBirimID = 1 and YEAR(u.Tarih) = YEAR(GETDATE()) group by u.TedarikciID`;

    return new Promise(async(resolve,reject)=>{
        await mssql.query(getEntryListSql,async (err,entry)=>{
            if(err){
                resolve({'error':true});
            }else{
                await mssql.query(getMonthlyTotalSql,async (err:any,monthly)=>{
                    if(err){
                        resolve({'error':true});
                    }else{
                        await mssql.query(getTotalSql,async(err:any,total)=>{
                            let data = {
                                'mekmerList':[],
                                'mekmerDisList':[],
                                'disList':[],
                                'bulunamadiList':[],
                            };
                            let sumTotal = {
                                'mekmerMonth':0,
                                'mekmozMonth':0,
                                'disMonth':0,
                                'mekmerYear':0,
                                'mekmozYear':0,
                                'disYear':0,
                                'monthTotal':0,
                                'yearTotal':0,
                            };
                            entry?.recordset.forEach(x=>{
                                if((x.TedarikciID == 1 || x.TedarikciID == 123) && !x.Bulunamadi){
                                    data.mekmerList.push(x);
                                } else if ((x.TedarikciID != 1 || x.TedarikciID != 123) && !x.Bulunamadi && !x.Disarda){
                                    data.mekmerDisList.push(x);
                                } else if ((x.TedarikciID != 1 || x.TedarikciID != 123) && !x.Bulunamadi && x.Disarda){
                                    data.disList.push(x);
                                } else if (x.Bulunamadi){
                                    data.bulunamadiList.push(x);
                                }
                            });
                            monthly?.recordset.forEach(x=>{
                                sumTotal.monthTotal += x.Miktar;
                                if(x.TedarikciID == 1){
                                    sumTotal.mekmerMonth += x.Miktar;
                                }else if (x.TedarikciID == 123){
                                    sumTotal.mekmozMonth += x.Miktar;
                                } else {
                                    sumTotal.disMonth += x.Miktar;
                                }
                            });
                            total?.recordset.forEach(x=>{
                                sumTotal.yearTotal += x.Miktar;
                                if(x.TedarikciID == 1){
                                    sumTotal.mekmerYear += x.Miktar;
                                }else if (x.TedarikciID == 123){
                                    sumTotal.mekmozYear += x.Miktar;
                                } else {
                                    sumTotal.disYear += x.Miktar;
                                }
                            });
                            resolve({'error':false,'list':data,'sumTable':sumTotal});

                        });
                    }
                })
            }
        });
    });

});