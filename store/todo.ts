import {defineStore} from 'pinia';
export const useTodoStore = defineStore('todo',{
    state:()=>{
        return{
            list:ref(),
            all_list_a:ref(),
            all_list_b:ref(),
            list_main:ref()
        }
    },
    actions:{
        setTodoList(list:any){
            this.list = list;
        },
        addTodo(todo:any){
            this.list.push(todo);
        },
        updateTodo(todo:any){
            const index = this.list.findIndex((x: { ID: any; })=>{
                return x.ID === todo.ID;
            });
            this.list.splice(index,1,todo);
        },
        deleteTodo(id:any){
            const index = this.list.findIndex((x:{ID:any})=>{
                return x.ID === id;
            });
            this.list.splice(index,1);
        },
        setAllTodoList(list:any){
            this.all_list_a = list.list_a;
            this.all_list_b = list.list_b;
        },
        deleteTodoA(id:any){
            const index = this.all_list_a.findIndex((x:{ID:any})=>{
                return x.ID === id;
            });
            if(index > -1){
                this.all_list_a.splice(index,1);
            }
        },
        setMainTodoList(list:any){
            this.list_main = list;
        },
        deleteTodoMain(id:any){
            const index = this.list_main.findIndex((x:{ID:any})=>{
                return x.ID === id;
            });
            if(index > -1){
                this.list_main.splice(index,1);
            }
        }
    },
    getters:{
        getTodoList(state){
            return state.list;
        },
        getTodoAllListA(state){
            return state.all_list_a;
        },
        getTodoAllListB(state){
            return state.all_list_b;
        },
        getTodoMainList(state){
            return state.list_main;
        }
    }
});
