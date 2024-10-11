import {defineStore} from 'pinia';

export const useSuppliersStore = defineStore('suppliers',{
    state : ()=>{
        return{
            list:ref(),
            model:ref()
        }
    },
    actions:{
        setList(payload:Array<any>){
            this.list = payload;
        },
        setModel(model:object){
            this.model = model;
        },
        addSupplier(supplier:object){
            this.list.unshift(supplier);
        },
        updateSupplier(supplier:object){
            const index = this.list.findIndex((item: { ID: any; }) => item.ID === supplier.ID);
            if(index > -1){
                this.list.splice(index,1,supplier);
            };
        },
        deleteSupplier(id:Number){
            const index = this.list.findIndex((item: { ID: any; }) => item.ID === id);
            if(index > -1){
                this.list.splice(index,1);
            };
        }
    },
    getters:{
        getList(state){
            return state.list;
        },
        getModel(state){
            return state.model;
        }
    }
})