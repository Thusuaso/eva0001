import mssql from '~/mssql/api';

export default defineEventHandler(async(id)=>{
    const _id = await getRouterParam(id,'id');
    const deleteCustomerSql = `delete SatisciAyrintiTB where ID='${_id}'`;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(deleteCustomerSql,(err:any,customer)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(customer?.rowsAffected[0] == 1){
                    resolve({'error':false,'success':true});
                }else{
                    resolve({'error':false,'success':false});

                }
            }
        });
    });
});