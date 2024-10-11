import {defineStore} from 'pinia';

export const useUploadStore = defineStore('upload',{
    state :()=>{
        return{
            container_shipment_cost_model:ref({
                ID:0,
                FirmaAdi:'',
                FirmaID:0,
                Tarih:'',
                FaturaNo:'',
                Tutar:0,
                Kur:0,
                KayitTarihi:'',
                KullaniciID:0,
                SiparisNo:'',
                Usd:0
            })
            
        }
    },
    actions:{
        setModel(payload:any){
            this.container_shipment_cost_model = payload;
        }
    },
    getters:{
        getModel(state){
            return this.container_shipment_cost_model;
        }
    }
})