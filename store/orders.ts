import {defineStore} from 'pinia';

export const useOrdersStore = defineStore('orders',{
    state: ()=>{
        return {
            orders:[]
        }
    },
    actions:{
        setOrders(orders:any){
            this.orders = orders;
        }
    },
    getters:{
        getOrders(state){
            return state.orders;
        }
    }
})