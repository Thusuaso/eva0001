import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getSupplier = async()=>{
        const supplierListSql = `select ID,FirmaAdi from TedarikciTB`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(supplierListSql,(err:any,supplierList:any)=>{
                if(err){
                    resolve({'error':true});
                }else{
                    if(supplierList.recordset.length>0){
                        resolve({'error':false,'list':supplierList.recordset});
                    }else{
                        resolve({'error':true,'list':[]});
                    }
                }
            });
        });

    };
    const getUnit = async()=>{
        const unitListSql = `select ID,BirimAdi from UrunBirimTB`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(unitListSql ,(err:any,unitList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]})
                }else{
                    if(unitList.recordset.length>0){
                        resolve({'error':false,'list':unitList.recordset});
                    }else{
                        resolve({'error':true,'list':[]});
                    }
                }
            });
        });
    };
    const getDelivery = async ()=>{
        const deliveryListSql = `select top 8 ID,TeslimTur  from SiparisTeslimTurTB order by ID desc`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(deliveryListSql,(err:any,deliveryList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(deliveryList.recordset.length >0){
                        resolve({'error':false,'list':deliveryList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    const getPayment = async()=>{
        const paymentListSql = `select ID,OdemeTur  from SiparisOdemeTurTB`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(paymentListSql,(err:any,paymentList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(paymentList.recordset.length >0){
                        resolve({'error':false,'list':paymentList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    const getCountry = async()=>{
        const countryListSql = `select Id,UlkeAdi from YeniTeklif_UlkeTB`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(countryListSql,(err:any,countryList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(countryList.recordset.length >0){
                        resolve({'error':false,'list':countryList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    const getInvoice = async()=>{
        const invoiceListSql = `select ID,FaturaAdi from FaturaKesilmeTB where ID != 2`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(invoiceListSql,(err:any,invoiceList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(invoiceList.recordset.length >0){
                        resolve({'error':false,'list':invoiceList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    const getCustomer = async()=>{
        const customerListSql = `select ID,FirmaAdi,Ulke,UlkeId,Satisci,MusteriTemsilciId from MusterilerTB`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(customerListSql,(err:any,customerList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(customerList.recordset.length >0){
                        resolve({'error':false,'list':customerList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    const getUser = async()=>{
        const userListSql = `select ID,KullaniciAdi,MailAdres from KullaniciTB where Aktif= 1`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(userListSql,(err:any,userList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(userList.recordset.length >0){
                        resolve({'error':false,'list':userList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    const getPo = async()=>{
        const poListSql = `select SiparisNo from SiparislerTB`;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(poListSql,(err:any,poList:any)=>{
                if(err){
                    resolve({'error':true,'list':[]});	
                }else{
                    if(poList.recordset.length >0){
                        resolve({'error':false,'list':poList.recordset});
                    }else{
                        resolve({'error':false,'list':[]});
                    }
                }
            });
        });
    };
    return new Promise(async(resolve,reject)=>{
        const supplier = await getSupplier();
        const unit = await getUnit();
        const delivery = await getDelivery();
        const payment = await getPayment();
        const country = await  getCountry();
        const invoice = await getInvoice();
        const customer = await getCustomer();
        const user = await getUser();
        const po = await getPo();
        if(supplier?.error){
            resolve({'error':true});
        }else{
            if(unit?.error){
                resolve({'error':true});
            }else{
                if(delivery?.error){
                    resolve({'error':true});
                }else{
                    if(payment?.error){
                        resolve({'error':true});
                    }else{
                        if(country?.error){
                            resolve({'error':true});
                        }else{
                            if(invoice?.error){
                                resolve({'error':true});
                            }else{
                                 if(customer?.error){
                                    resolve({'error':true});
                                }else{
                                    if(user?.error){
                                        resolve({'error':true});
                                    }else{
                                        if(po?.error){
                                            resolve({'error':true});
                                        }else{
                                            resolve({'error':false,'supplier':supplier?.list,'unit':unit?.list,'delivery':delivery?.list,'payment':payment?.list,'country':country?.list,'invoice':invoice?.list,'customer':customer?.list,'user':user?.list,'po':po?.list});
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    });
});