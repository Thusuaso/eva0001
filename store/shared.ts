import { defineStore } from 'pinia';

export const useSharedStore = defineStore('shared',{
    state : ()=>{
        return{
            users:ref([]),
            openPo:ref([]),
            suppliers:ref([]),
            quarries:ref([]),
            cards:ref([]),
            company:ref([]),
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
        },
        setCompany(company:any){
            this.company = company;
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
        },
        getCompany(state){
            return state.company;
        }
    }
    
})