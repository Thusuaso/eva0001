import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateDetailList = `
        update BgpProjectDetailList SET
	FirmaAdi ='${body.FirmaAdi}',
	Baslik = '${body.Baslik}',
	Aciklama ='${body.Aciklama}',
	HatirlatmaTarihi ='${body.HatirlatmaTarihi}',
	HatirlatmaAciklama = '${body.HatirlatmaAciklama}',
	Email = '${body.Email}',
	PhoneNumber = '${body.PhoneNumber}',
	WrongNumber = '${body.WrongNumber}',
	NotResponse = '${body.NotResponse}',
	NotInterested = '${body.NotInterested}',
	Interested = '${body.Interested}',
	Unvan = '${body.Unvan}'
WHERE ID = '${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateDetailList,(err:any,update)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(update?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }

        })
    });
});