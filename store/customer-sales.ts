import {defineStore} from 'pinia';

export const useCustomerSalesStore = defineStore('customer-sales',{
    state : ()=>{
        return {
            customer_list:ref(),
            customer_detail_list:ref()
        }
    },
    actions:{
        setCustomerList(payload:any){
            this.customer_list = payload;
        },
        setCustomerDetailList(payload:any){
            this.customer_detail_list = payload;
        },
        addCustomerDetailList(payload:any){
            this.customer_detail_list.push(payload);
        },
        deleteCustomerDetailList(id:any){
            const index = this.customer_detail_list.findIndex(x=>x.ID == id);
            if(index> -1){
                this.customer_detail_list.splice(index,1);
            }
        },
        updateCustomerDetailList(payload:any){
            const index = this.customer_detail_list.findIndex(x=>x.ID == payload.ID);
            if(index > -1){
                this.customer_detail_list.splice(index,1,payload);
            }
        }
    },
    getters:{
        getCustomerList(state){
            return state.customer_list;
        },
        getCustomerDetailList(state){
            return state.customer_detail_list;
        }
    }
})