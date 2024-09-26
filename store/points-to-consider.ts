import {defineStore} from 'pinia';
export const usePointsToConsider = defineStore('points-to-consider',{
    state : ()=>{
        return{
            list:ref(),
        }
    },
    actions:{
        setPointsToConsider(payload:any){
            this.list = payload;
        },
        addConsider(payload:any){
            this.list.push(payload);
        },
        updateConsider(payload:any){
            const index = this.list.findIndex(x=>x.ID == payload.ID);
            this.list.splice(index,1,payload);
        },
        deleteConsider(id:any){
            const index = this.list.findIndex(x=>x.ID == id);

            if(index > -1 ){
                this.list.splice(index,1);
            }
        }

    },
    getters:{
        getPointsToConsiderList(state){
            return state.list;
        },

    }
})