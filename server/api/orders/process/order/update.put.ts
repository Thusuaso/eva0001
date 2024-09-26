import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateOrderSql = `
        update SiparislerTB 
	set
	OdemeTurID = '${body.OdemeTurID}' ,
	TeslimTurID ='${body.TeslimTurID}',
	Pesinat = '${body.Pesinat}',
	NavlunFirma = '${body.NavlunFirma}',
	NavlunMekmarNot = '${body.NavlunMekmarNot}',
	NavlunAlis = '${body.NavlunAlis}',
	NavlunSatis = '${body.NavlunSatis}',
	SiparisDurumID = '${body.SiparisDurumID}',
	UretimAciklama = '${body.UretimAciklama}',
	SevkiyatAciklama = '${body.SevkiyatAciklama}',
	FinansAciklama = '${body.FinansAciklama}',
	OdemeAciklama = '${body.OdemeAciklama}',
	Komisyon='${body.Komisyon}',
	Ulke = '${body.UlkeAdi}',
	UlkeId='${body.UlkeId}',
	DetayAciklama_1='${body.DetayAciklama_1}',
	DetayMekmarNot_1='${body.DetayMekmarNot_1}',
	DetayTutar_1='${body.DetayTutar_1}',
	DetayAlis_1='${body.DetayAlis_1}',
	DetayAciklama_2='${body.DetayAciklama_1}',
	DetayMekmarNot_2='${body.DetayMekmarNot_2}',
	DetayTutar_2='${body.DetayTutar_2}',
	DetayAlis_2='${body.DetayAlis_2}',
	SiparisSahibi='${body.SiparisSahibi}',
	EvrakGideri='${body.EvrakGideri}',
	KonteynerAyrinti='${body.KonteynerAyrinti}',
	FaturaKesimTurID='${body.FaturaKesimTurID}',
	sigorta_Tutar='${body.sigorta_Tutar}',
	Operasyon='${body.Operasyon}',
	Finansman='${body.Finansman}',
	Iade='${body.Iade}',
	MalBedeli='${body.MalBedeli}',
	sigorta_tutar_satis='${body.sigorta_tutar_satis}',
	SiparisKontrol='${body.SiparisKontrol}',
	SiparisKontrolEden='${body.SiparisKontrolEden}'
	
	where ID = '${body.ID}'

    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateOrderSql,(err:any,update)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(update?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
})