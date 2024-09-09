import {defineStore} from 'pinia';
export const useModelsStore = defineStore('models',{
    state: ()=>{
        return {
            productModel:ref({}),
            orderModel:ref({})
        }
    },
    actions:{
        setProductModel(payload:any){
            this.productModel = payload;
        },
        setOrderModel(payload:any){
            this.orderModel = payload;
        }
    },
    getters:{
        getProductModel(state){
            return state.productModel;
        },
        getOrderModel(state){
            return state.orderModel;
        }
    }

})