import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertProject = `
        insert into BgpProjectDetailList(
	ProjectName,
	FirmaAdi,
	KayitTarihi,
	Baslik,
	Aciklama,
	HatirlatmaTarihi,
	HatirlatmaAciklama,
	Temsilci,
	Email,
	PhoneNumber,
	WrongNumber,
	NotResponse,
	NotInterested,
	Interested,
	Unvan,
	UlkeAdi
) VALUES('${body.ProjectName}',
'${body.FirmaAdi}',
'${body.KayitTarihi}',
'${body.Baslik}',
'${body.Aciklama}',
'${body.HatirlatmaTarihi}',
'${body.HatirlatmaAciklama}',
'${body.Temsilci}',
'${body.Email}',
'${body.PhoneNumber}',
'${body.WrongNumber}',
'${body.NotResponse}',
'${body.NotInterested}',
'${body.Interested}',
'${body.Unvan}',
'${body.UlkeAdi}'
)
    `;
    const getProjectId = `select top 1 ID from BgpProjectDetailList order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertProject,async (err:any,insert)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insert?.rowsAffected[0] == 1){
                    await mssql.query(getProjectId,(err:any,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            if(_id?.recordset.length >0){
                                resolve({'error':false,'status':true,'id':_id?.recordset[0].ID});
                            }else{
                                resolve({'error':false,'status':false});
                            }

                        }
                    });
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});