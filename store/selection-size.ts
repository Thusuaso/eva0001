import {defineStore} from 'pinia';

export const useSelectionSizeStore = defineStore('selection-size',{
    state: ()=>{
        return{
            model:ref({

            }),
            list:ref([]),
        }
    },
    actions:{
        setList(list:any){
            this.list = list;
        },
        setModel(model:any){
            this.model = model;
        },
        addSize(model:object){
            this.list.unshift(model);
        },
        updateSize(model:object){
            const index = this.list.findIndex((item) => item.ID === model.ID);
            if(index > -1){
                this.list.splice(index,1,model);
            }
        },
        deleteSize(id:number){
            const index = this.list.findIndex((item) => item.ID === id);
            if(index > -1){
                this.list.splice(index,1);
            }
        }
    },
    getters:{
        getList(state){
            return state.list;
        },
        getModel(state){
            return state.model;
        }
    }

})