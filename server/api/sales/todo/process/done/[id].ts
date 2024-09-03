import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const id = getRouterParam(event,'id');
    const updateTodoSql = `update Yapilacaklar SET Yapildi='${true}' where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateTodoSql,(err:any,todo:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(todo.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        });
    });
});