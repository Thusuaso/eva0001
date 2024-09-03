import mssql from '~/mssql/api';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const insertTodoSql = `
        insert into Yapilacaklar(
            Yapilacak,
            Yapildi,
            GorevVerenID,
            GorevVerenAdi,
            GirisTarihi,
            YapildiTarihi,
            YapilacakOncelik,
            Acil,
            OrtakGorev
            )
            VALUES('${body.Yapilacak}',
            '${body.Yapildi}',
            '${body.GorevVerenID}',
            '${body.GorevVerenAdi}',
            '${body.GirisTarihi}',
            '${body.YapildiTarihi}',
            '${body.YapilacakOncelik}',
            '${body.Acil}',
            '${body.OrtakGorev}')
    
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertTodoSql,async (err:any,todo:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(todo.rowsAffected[0] == 1){
                    const getTodoIdSql = `select top 1 ID from Yapilacaklar order by ID desc`;
                    await mssql.query(getTodoIdSql,async (err:any,id:any)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            if(id.recordset.length >0){
                                resolve({'error':false,'status':true,'id':id.recordset[0].ID});
                            }else{
                                resolve({'error':false,'status':false});
                            }
                        };
                    });


                }else{
                    resolve({'error':true,'status':false});
                }
            }
        });
    });

})