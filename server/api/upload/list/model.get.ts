import mssql from '~/mssql/api';
export default defineEventHandler(async ()=>{
    const getShipmentFormDocumentSql = `select ID,EvrakAdi from YeniYuklemeEvraklarTB`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getShipmentFormDocumentSql,async(err:any,documents:any)=>{
            let modelData: any[] = [];
            await documents.recordset.forEach(x=>{
                 x.Color = 'gray';
                 modelData.push(x);
             });
             resolve({'list':modelData});

        });
    });
});