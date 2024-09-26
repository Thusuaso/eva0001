import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const allToDoSql = `select y.ID,y.Yapilacak,y.Yapildi,y.GirisTarihi,y.YapildiTarihi,y.YapilacakOncelik,y.Acil,y.Sira,y.OrtakGorev from Yapilacaklar y where y.Yapildi=0 order by y.GirisTarihi`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(allToDoSql,(err:any,todo:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,
                    'list_a':todo.recordset.filter(todo=>todo.YapilacakOncelik == 'A' || todo.YapilacakOncelik == 'B'),
                    'list_b':todo.recordset.filter(todo=>todo.YapilacakOncelik == 'C') 
                });
            }
        });
    });
})