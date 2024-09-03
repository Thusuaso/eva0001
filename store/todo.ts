import {defineStore} from 'pinia';
export const useTodoStore = defineStore('todo',{
    state:()=>{
        return{
            list:ref()
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
        }
    },
    getters:{
        getTodoList(state){
            return state.list;
        }
    }
});
