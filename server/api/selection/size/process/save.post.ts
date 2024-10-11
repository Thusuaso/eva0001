import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const insertSizeSql =  `
        insert into Kasa_Detaylari_Yeni
            (
                Crate_Width,
                Crate_Height,
                Crate_Thickness,
                Stone_Size,
                SupplierId,
                Supplier,
                Piece
            )
            VALUES('${body.Crate_Width}','${body.Crate_Height}','${body.Crate_Thickness}','${body.Stone_Size}','${body.SupplierId}','${body.Supplier}','${body.Piece}')
    `;
    const getSizeIdSql = `select top 1 ID from Kasa_Detaylari_Yeni order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertSizeSql,(err:any,insert)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(insert?.rowsAffected[0] == 1){
                    mssql.query(getSizeIdSql,(err:any,_id)=>{
                        if(err){
                            resolve({'error':true});
                        }else{
                            resolve({'error':false,'status':true,'id':_id.recordset[0].ID});
                        }
                    });
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});