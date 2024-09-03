import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const categoriesSql = `select k.ID,k.KategoriAdi from KategoriTB k`;
    const productsSql = `select u.ID,u.UrunAdi from UrunlerTB u`;
    const surfacesSql = `select yk.ID,yk.YuzeyIslemAdi from YuzeyKenarTB yk`;
    const sizesSql = `select o.ID,o.En,o.Boy,o.Kenar from OlculerTB o`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(categoriesSql,async (err:any,categories:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                await mssql.query(productsSql,async(err:any,products:any)=>{
                    if(err){
                        resolve({'error':true});
                    }else{
                        await mssql.query(surfacesSql,async(err:any,surfaces:any)=>{
                            if(err){
                                resolve({'error':true});
                            }else{
                                await mssql.query(sizesSql,async(err:any,sizes:any)=>{
                                    if(err){
                                        resolve({'error':true});
                                    }else{
                                        resolve({
                                            'error':false,
                                            'categories':categories?.recordset,
                                            'products':products?.recordset,
                                            'surfaces':surfaces?.recordset,
                                            'sizes':sizes?.recordset
                                        })
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});