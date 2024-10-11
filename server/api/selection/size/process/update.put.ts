import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateSizeSql = `
        update Kasa_Detaylari_Yeni
            SET
                Crate_Width='${body.Crate_Width}',
                Crate_Height='${body.Crate_Height}',
                Crate_Thickness='${body.Crate_Thickness}',
                Stone_Size='${body.Stone_Size}',
                SupplierId='${body.SupplierId}',
                Supplier='${body.Supplier}',
                Piece='${body.Piece}'
            WHERE
				ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateSizeSql,(err:any,updated)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(updated?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});