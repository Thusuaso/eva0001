import mssql from '~/mssql/api';
/*Anasını Siktiğim iki kere kaydediyor. */
export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const insertOrderSql = `
        insert into SiparislerTB(
	SiparisNo,
	SiparisTarihi,
	OdemeTurID,
	TeslimTurID,
	MusteriID,
	Pesinat,
	NavlunFirma,
	NavlunMekmarNot,
	NavlunAlis,
	NavlunSatis,
	KayitTarihi,
	KullaniciID,
	SiparisDurumID,
	UretimAciklama,
	SevkiyatAciklama,
	FinansAciklama,
	OdemeAciklama,
	TahminiYuklemeTarihi,
	Komisyon,
	Ulke,
	UlkeId,
	DetayAciklama_1,
	DetayMekmarNot_1,
	DetayTutar_1,
	DetayAlis_1,
	DetayAciklama_2,
	DetayMekmarNot_2,
	DetayTutar_2,
	DetayAlis_2,
	SiparisSahibi,
	EvrakGideri,
	KonteynerAyrinti,
	FaturaKesimTurID,
	sigorta_Tutar,
	Operasyon,
	Finansman,
	Iade,
	MalBedeli,
	sigorta_tutar_satis,
	SiparisKontrol,
	SiparisKontrolEden
) 
VALUES('${body.SiparisNo}',
	   '${body.SiparisTarihi}',
	   '${body.OdemeTurID}',
	   '${body.TeslimTurID}',
	   '${body.MusteriID}',
	   '${body.Pesinat}',
	   '${body.NavlunFirma}',
	   '${body.NavlunMekmarNot}',
	   '${body.NavlunAlis}',
	   '${body.NavlunSatis}',
	   '${body.KayitTarihi}',
	   '${body.KullaniciID}',
	   '${body.SiparisDurumID}',
	   '${body.UretimAciklama}',
	   '${body.SevkiyatAciklama}',
	   '${body.FinansAciklama}',
	   '${body.OdemeAciklama}',
	   '${body.TahminiYuklemeTarihi}',
	   '${body.Komisyon}',
	   '${body.UlkeAdi}',
	   '${body.UlkeId}',
	   '${body.DetayAciklama_1}',
	   '${body.DetayMekmarNot_1}',
	   '${body.DetayTutar_1}',
	   '${body.DetayAlis_1}',
	   '${body.DetayAciklama_1}',
	   '${body.DetayMekmarNot_2}',
	   '${body.DetayTutar_2}',
	   '${body.DetayAlis_2}',
	   '${body.SiparisSahibi}',
	   '${body.EvrakGideri}',
	   '${body.KonteynerAyrinti}',
	   '${body.FaturaKesimTurID}',
	   '${body.sigorta_Tutar}',
	   '${body.Operasyon}',
	   '${body.Finansman}',
	   '${body.Iade}',
	   '${body.MalBedeli}',
	   '${body.sigorta_tutar_satis}',
	   '${body.SiparisKontrol}',
       '${body.SiparisKontrolEden}'
)
    `;
	const getOrderIdSql = `select top 1 ID from SiparislerTB order by ID desc`;
	return new Promise(async(resolve,reject)=>{
		await mssql.query(insertOrderSql,async (err:any,insert:any)=>{
			if(err){
				resolve({'error':true});
			}else{
				if(insert.rowsAffected[0] == 1){
					await mssql.query(getOrderIdSql,async (err:any,_id:any)=>{
						await resolve({'error':false,'status':true,'id':_id.recordset[0].ID});
					});
				}else{
					resolve({'error':false,'status':false});
				}
			}
		});
	});
});