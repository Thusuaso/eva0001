import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = getRouterParam(event,'id');
    const deletedTodoSql = `delete Yapilacaklar where ID='${id}'`;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(deletedTodoSql,async (err:any,deletedTodo:any)=>{
            if(err){
                resolve({'error':true});
            } else{
                if(deletedTodo.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                } else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});