import mssql from '~/mssql/api';
export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const updateTodoSql = `
        update Yapilacaklar 
            SET
                Yapilacak='${body.Yapilacak}',
                GorevVerenID='${body.GorevVerenID}',
                GorevVerenAdi='${body.GorevVerenAdi}',
                GirisTarihi='${body.GirisTarihi}',
                YapildiTarihi='${body.YapildiTarihi}',
                YapilacakOncelik='${body.YapilacakOncelik}',
                Acil='${body.Acil}',
                OrtakGorev='${body.OrtakGorev}'
            WHERE
                ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateTodoSql,(err:any,todo:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(todo?.rowsAffected[0]==1){
                    resolve({'error':false,'status':true})
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });


});
