import {defineStore} from 'pinia';
export const usePasswordsStore = defineStore('passwords',{
    state:()=>{
        return{
            passwords_list:ref(),
        }
    },
    actions:{
        setPasswordsList(payload:any){
            this.passwords_list = payload;
        },
        addPassword(payload:any){
            this.passwords_list.push(payload);
        },
        updatePassword(payload:any){
            const index = this.passwords_list.findIndex(x=>x.ID === payload.ID);
            if(index > -1){
                this.passwords_list.splice(index,1,payload);
            };
        },
        deletePassword(id:any){
            const index = this.passwords_list.findIndex(x=>x.ID === id);
            if(index > -1){
                this.passwords_list.splice(index,1);
            };
        }
    },
    getters:{
        getPasswordsList(state){
            return state.passwords_list;
        }
    }
})