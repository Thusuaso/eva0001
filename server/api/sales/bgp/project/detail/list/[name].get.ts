import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const name = await getRouterParam(event,'name');
    const bgpDetailProjectList = `select * from BgpProjectDetailList where ProjectName='${name?.replaceAll('_',' ')}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(bgpDetailProjectList,(err:any,detail)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':detail?.recordset});
            }
        });
    });
});