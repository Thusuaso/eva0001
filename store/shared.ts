import { defineStore } from 'pinia';

export const useSharedStore = defineStore('shared',{
    state : ()=>{
        return{
            users:ref([]),
            openPo:ref([]),
            suppliers:ref([]),
            quarries:ref([]),
            cards:ref([])
        }
    },
    actions:{
        setUsers(users:any){
            this.users = users;
        },
        setOpenPo(po:any){
            this.openPo = po;
        },
        setSuppliers(suppliers:any){
            this.suppliers = suppliers;
        },
        setQuarries(quarries:any){
            this.quarries = quarries;
        },
        setCards(cards:any){
            this.cards = cards;
        }
    },
    getters:{
        getUsers(state){
            return state.users;
        },
        getOpenPo(state){
            return state.openPo;
        },
        getSuppliers(state){
            return state.suppliers;
        },
        getQuarries(state){
            return state.quarries;
        },
        getCards(state){
            return state.cards;
        }
    }
    
})