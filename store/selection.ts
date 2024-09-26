import { defineStore } from 'pinia';

export const useSelectionStore = defineStore('selection',{
    state : ()=>{
        return{
            list:ref(),
            mekmer_list:ref(),
            mekmer_dis_list:ref(),
            dis_list:ref(),
            not_found_list:ref(),
            sumTotalTable:ref(),
            listTotal:ref()
        }
    },
    actions:{
        setSelectionList(payload:any){
            this.list = payload.mekmerList;
            this.mekmer_list = payload.mekmerList;
            this.mekmer_dis_list = payload.mekmerDisList;
            this.dis_list = payload.disList;
            this.not_found_list = payload.bulunamadiList;
        },
        setSumTotalTable(payload:any){
            this.sumTotalTable = payload;
        },
        setList(payload:any){
            this.list = payload;
        },
        setListTotal(payload:any){
            this.listTotal = payload;
        },
        addProduct(payload:any){
            this.list.unshift(payload);
        },
        updateProduct(payload:any){
            const index = this.list.findIndex(item=>item.ID === payload.ID);
            if(index > -1){
                this.list.splice(index,1,payload);
            };
        },
        deleteProduct(id:any){
            const index = this.list.findIndex(x=>x.ID === id);
            if(index > -1){
                this.list.splice(index,1);
            }
        }

    },
    getters:{
        getList(state){
            return state.list;
        },
        getMekmerList(state){
            return state.mekmer_list;
        },
        getMekmerDisList(state){
            return state.mekmer_dis_list;
        },
        getDisList(state){
            return state.dis_list;
        },
        getNotFoundList(state){
            return state.not_found_list;
        },
        getSumTotalTable(state){
            return state.sumTotalTable;
        },
        getListTotal(state){
            return state.listTotal;
        }
    }
});
