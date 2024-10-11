import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const documentColor = (po:any,documents:any)=>{
        return new Promise(async(resolve,reject)=>{
            const colorListSql = `
                    select sp.YuklemeEvrakID,sp.SiparisFaturaTurID,sp.EvrakAdi,
                    (select nfk.FirmaID from NakliyeFaturaKayitTB nfk where nfk.ID = sp.FaturaKayitID) as NakliyeFirmaID,
                    (select (select firma.FirmaAdi from FirmalarTB firma where firma.ID = nfk.FirmaID) from NakliyeFaturaKayitTB nfk where nfk.ID = sp.FaturaKayitID) as NakliyeFirmaAdi,
                                            (select (select firma.FirmaAdi  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = sp.FaturaKayitID) as KonteynerFirmaAdi,
                                (select (select firma.ID  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = sp.FaturaKayitID) as KonteynerFirmaID
                    from SiparisFaturaKayitTB sp where SiparisNo='${ po }'
            `;
            await mssql.query(colorListSql,async (err,colors)=>{
                let docModel = [];
                const colorList = await colors?.recordset;
                for(const item of documents){
                    const index = await colorList?.findIndex(x=> +x.YuklemeEvrakID == +item.ID);
                    if(index > -1){
                        docModel.push({...item,'Color':'yellow','SiparisNo':po,'NakliyeFirmaID':colors?.recordset[index].NakliyeFirmaID,'KonteynerFirmaID':colors.recordset[index].KonteynerFirmaID,'DocName':colors.recordset[index].EvrakAdi});
                    }else{
                        docModel.push({...item,'Color':'gray','SiparisNo':po});
                    };
                };
                resolve(docModel);
            });
        });
    };
    const getDocumentListSql = `select ID,EvrakAdi from YeniYuklemeEvraklarTB`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getDocumentListSql,async (err:any,documents)=>{
            const documentList = await documentColor(body.po,documents?.recordset);
            resolve({'list':documentList});
        });
    });
});