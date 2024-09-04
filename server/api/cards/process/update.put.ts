import mssql from '~/mssql/api';
function getCategoryId(category:any,id:any){
    return new Promise(async(resolve,reject)=>{
        if(id == undefined || id == null || id == 0 || id == '' || id == ' '){
            const insertCategorySql = `insert into KategoriTB(KategoriAdi) VALUES('${category}')`;
            const getCategoryIdSql = `select top 1 ID from KategoriTB order by ID desc`;
            await mssql.query(insertCategorySql,async (err:any,insertCategory:any)=>{
                if(insertCategory.rowsAffected[0]==1){
                    await mssql.query(getCategoryIdSql,async(err:any,getId:any)=>{
                        if(getId?.recordset.length >0){
                            resolve(getId?.recordset[0].ID);
                        }
                    });
                }
            });
        }else{
            resolve(id);
        }
    });

};
function getProductId(product:any,id:any){
    return new Promise(async(resolve,reject)=>{
        if(id == null || id == undefined || id == '' || id == ' ' || id == 0){
            const insertProductSql = `insert into UrunlerTB(UrunAdi) VALUES('${product}')`;
            const getProductIdSql = `select top 1 ID from UrunlerTB order by ID desc `;
            await mssql.query(insertProductSql,async(err:any,product:any)=>{
                if(product.rowsAffected[0] == 1){
                    await mssql.query(getProductIdSql,async(err:any,getId:any)=>{
                        if(getId.recordset.length >0){
                            resolve(getId.recordset[0].ID);
                        }
                    });
                }
            });
        }else{
            resolve(id);
        }
    });
};
function getSurfaceId(surface:any,id:any){
    return new Promise(async(resolve,reject)=>{
        if(id == null || id == undefined || id == '' || id == ' ' || id == 0){
            const insertSurfaceSql = `insert into YuzeyKenarTB(YuzeyIslemAdi) VALUES('${surface}')`;
            const getSurfaceIdSql = `select top 1 ID from YuzeyKenarTB order by ID desc  `;
            await mssql.query(insertSurfaceSql,async(err:any,surface:any)=>{
                if(surface.rowsAffected[0] == 1){
                    await mssql.query(getSurfaceIdSql,async(err:any,getId:any)=>{
                        if(getId.recordset.length >0){
                            resolve(getId.recordset[0].ID);
                        }
                    });
                }
            });
        }else{
            resolve(id);
        }
    });
};
function getSizeId(w:any,h:any,t:any){
    return new Promise(async(resolve,reject)=>{
        const controlSizeSql = `select top 1 * from OlculerTB ol where ol.En='${w}' and ol.Boy='${h}' and ol.Kenar ='${t}'`;
        const insertSizeSql = `insert into OlculerTB(En,Boy,Kenar) VALUES('${w}','${h}','${t}')`;
        const getSizeIdSql = `select top 1 ID from OlculerTB order by ID desc`;
        await mssql.query(controlSizeSql,async (err:any,control:any)=>{
            if(control.recordset.length > 0){
                resolve(control.recordset[0].ID);
            }else{
                await mssql.query(insertSizeSql,async (err:any,insert:any)=>{
                    if(insert.rowsAffected[0] == 1){
                        await mssql.query(getSizeIdSql,(err:any,getId:any)=>{
                            if(getId?.recordset.length >0){
                                resolve(getId.recordset[0].ID);
                            }
                        });
                    }
                });
            }
        })
    });
}
export default defineEventHandler(async(event:any)=>{
    const body = await readBody(event);
    const categoryId = await getCategoryId(body.KategoriAdi,body.KategoriID);
    const productId = await getProductId(body.UrunAdi,body.UrunID);
    const surfaceId = await getSurfaceId(body.YuzeyIslemAdi,body.YuzeyIslemID);
    const sizeId = await getSizeId(body.En,body.Boy,body.Kenar);
    const updateCardSql = `
        update UrunKartTB SET UrunID='${productId}',YuzeyID='${surfaceId}',OlcuID='${sizeId}',KategoriID='${categoryId}'
        where ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateCardSql,(err:any,card:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                if(card.rowsAffected[0] == 1){
                    resolve({'error':false,'status':true});
                }else{
                    resolve({'error':false,'status':false});
                }
            }
        })
    })
});