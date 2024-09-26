import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertBgpProjectSql = `
        insert into BgpNetworkProjects
        (
            ProjectName,
            DateofRegistiration,
            Temsilci,
            UlkeAdi,
            UlkeLogo
        )
        VALUES('${body.ProjectName}','${body.DateofRegistiration}','${body.Temsilci}','${body.UlkeAdi}','${body.UlkeLogo}')
    `;
    const getBgpProjectSql = `
        select top 1 ID from BgpNetworkProjects order by ID desc

    `;
    return new Promise(async( resolve,reject)=>{
        await mssql.query(insertBgpProjectSql,async (err:any,bgp)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(bgp?.rowsAffected[0] == 1){
                    await mssql.query(getBgpProjectSql,async(err:any,_id)=>{
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
        })
    });
})