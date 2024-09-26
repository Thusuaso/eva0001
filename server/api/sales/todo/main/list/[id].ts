import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const id = await getRouterParam(event,'id');
    const mainToDoSql = `
                select 

                    y.ID,
                    y.Yapilacak,
                    y.Yapildi,
                    y.GorevVerenID,
                    y.GorevVerenAdi,
                    y.GirisTarihi,
                    y.YapildiTarihi,
                    y.YapilacakOncelik,
                    y.Acil,
                    y.Sira,
                    y.OrtakGorev

                from Yapilacaklar y
                where y.Yapildi=0 and y.GorevVerenID='${id}'
                order by y.GirisTarihi desc
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(mainToDoSql,(err:any,mainToDo:any)=>{
            if(err){
                resolve({'error':true});
            } else{
                if(mainToDo?.recordset?.length>0){
                    resolve({'error':false,'list':mainToDo.recordset});
                } else{
                    resolve({'error':false,'list':[]});
                }
            }
        }); 
    });
});