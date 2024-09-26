import {defineStore} from 'pinia';

export const useRepresentativeStore = defineStore('representative',{
    state:()=>{
        return {
            list_a:ref(),
            list_b:ref(),
            list_c:ref()
        }
    },
    actions:{
        setRepresentativeList(lists:Object){
            this.list_a = lists?.list1;
            this.list_b = lists?.list2;
            this.list_c = lists?.list3;
        },
        updateRepresentative(rep:Object){
            const index = this.list_a.findIndex(item=>item.SiparisNo === rep.SiparisNo);
            if(index > -1){
                this.list_a.splice(index,1,rep);
            };

        }
    },
    getters:{
        getRepresentativeListA(state){
            return state.list_a;
        },
        getRepresentativeListB(state){
            return state.list_b;
        },
        getRepresentativeListC(state){
            return state.list_c;
        }
    }
})