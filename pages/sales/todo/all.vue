<template>
    <div>
        <TodoAllList :list="todoStore.getTodoAllListA" @to_do_selected_emit="todoSelectedEmit"/>
    </div>
    
   <Dialog v-model:visible="to_do_new_form_dialog" modal :header="form_header" :style="{ width: '35rem' }">
        <TodoForm :model="todoModel" :status="newStatus" @todo_dialog_closed="todoDialogClosed"/>
    </Dialog>
</template>
<script setup lang="ts">
import { useTodoStore } from '~/store/todo';
 /*Variables */
    const toast = useToast();
    let to_do_new_form_dialog = ref(false);
    let form_header = ref();
    let todoModel = ref();
    let newStatus = ref(false);
    const todoStore = useTodoStore();
/*Variables */
    const { data:todo } = await useFetch('/api/sales/todo/all/list');
    if(todo.value.error){
        toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
    }else{
        await todoStore.setAllTodoList(todo.value);
    };
/*Function */
const todoDialogClosed = ()=>{
    to_do_new_form_dialog.value = false;
};
const todoSelectedEmit = (todo:any)=>{
    todoModel.value = todo;
    to_do_new_form_dialog.value = true;
    newStatus.value = false;
    form_header.value ='Update To Do';
};
/*Function */
</script>