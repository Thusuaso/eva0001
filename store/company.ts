import type { integer } from 'aws-sdk/clients/cloudfront';
import {defineStore} from 'pinia';

export const useCompanyStore = defineStore('company',{
    state : ()=>{
        return {
            list:ref([])
        }
    },
    actions:{
        setList(list:any){
            this.list = list;
        },
        addCompany(company:object){
            this.list.unshift(company);
        },
        updateCompany(company:object){
            const index = this.list.findIndex(c => c.ID === company.ID);
            if(index > -1){
                this.list.splice(index, 1, company);
            };
        },
        deleteCompany(id:integer){
            const index = this.list.findIndex(c => c.ID === id);
            if(index > -1){
                this.list.splice(index, 1);
            };
        }

    },
    getters:{
        getList(state){
            return state.list;
        }
    }

});