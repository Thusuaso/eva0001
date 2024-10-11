import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateSupplierSql = `update TedarikciTB SET FirmaAdi='${body.FirmaAdi}' WHERE ID='${body.ID}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateSupplierSql,(err:any,update)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(update?.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});