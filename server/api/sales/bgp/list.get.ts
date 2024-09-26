import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const getBgpProjectsList = `
        select bgp.*,k.KullaniciAdi as TemsilciAdi from BgpNetworkProjects bgp
        inner join KullaniciTB k on k.ID = bgp.Temsilci
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getBgpProjectsList,async(err:any,bgp)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false,'list':bgp?.recordset});
            }
        });
    });
})