import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateProductSql = `
        update UretimTB
SET
	Tarih='${body.Tarih}',
	UrunKartID='${body.UrunKartID}',
	TedarikciID='${body.TedarikciID}',
	UrunBirimID='${body.UrunBirimID}',
	UrunOcakID='${body.UrunOcakID}',
	Adet='${body.Adet}',
	KutuAdet='${body.KutuAdet}',
	Miktar='${body.Miktar}',
	Aciklama='${body.Aciklama}',
	UretimTurID='${body.UretimTurID}',
	SiparisAciklama='${body.SiparisAciklama}',
	Kutu='${body.Kutu}',
	Duzenleyen='${body.Duzenleyen}',
	Kasalayan='${body.Kasalayan}',
	Disarda='${body.Disarda}',
	KutuIciAdet='${body.KutuIciAdet}',
	SqmMiktar='${body.SqmMiktar}',
	Bagli='${body.Bagli}',
	Bulunamadi='${body.Bulunamadi}'

where
	ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateProductSql,(err:any,update)=>{
            if(err){
                resolve({ 'error':true});
            }else{
                if(update.rowsAffected[0] == 1){
                    resolve({ 'error':false,'status':true});
                } else{
                    resolve({ 'error':false,'status':false});
                }
            }
        });
    });

});