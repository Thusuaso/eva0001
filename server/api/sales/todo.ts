import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const params = await readBody(event);
    const todoSql = `
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
                where y.Yapildi=0 and y.OrtakGorev LIKE '%' + '${params.username}' +  '%' 
                order by y.GirisTarihi desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(todoSql,(err,todo)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false, 'todo':todo?.recordset});
            }
        });
    });
});