import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth',{
    state : ()=>{
        return{
            auth_token:null,
            username:null,
            mail:null
        }
    },
    actions:{
        setAuthToken(token:any){
            this.auth_token = token;
        },
        setUser(payload:any){
            this.username = payload.user;
            this.mail = payload.mail;
        }
    },
    getters:{
        isAuthenticated(state){
            return state.auth_token ? true:false;
        },
        getUsername(state){
            return state.username;
        },
        getMail(state){
            return state.mail;
        }
    }
})