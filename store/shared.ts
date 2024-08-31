import {defineStore} from 'pinia';

export const useSharedStore = defineStore('shared',{
    state : ()=>{
        return{
            users:[]
        }
    },
    actions:{
        setUsers(users:string){
            this.users = users;
        }
    },
    getters:{
        getUsers(state){
            return state.users;
        }
    }
    
})