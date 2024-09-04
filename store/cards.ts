import {defineStore} from 'pinia';
export const useCardsStore = defineStore('cards',{
    state:()=>{
        return{
            list:[]
        }
    },
    actions:{
        setCardList(list:any){
            this.list = list;
        },
        addCard(card:any){
            this.list.push(card);
        },
        updateCard(card:any){
            const index = this.list.findIndex(x=>{
                return x.ID === card.ID;
            });
            this.list.splice(index,1,card);
        },
        deleteCard(id:any){
            const index = this.list.findIndex(x=>{
                return x.ID === id;
            });
            this.list.splice(index,1);
        }
    },
    getters:{
        getCardList(state){
            return state.list;
        }
    }
})