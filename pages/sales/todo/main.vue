<template>
    <TodoList :list="todoStore.getTodoMainList" @todo_selected_emit="todoSelectedEmit($event)"/>
    <Dialog v-model:visible="to_do_new_form_dialog" modal :header="form_header" :style="{ width: '35rem' }">
        <TodoForm :model="todoModel" :status="newStatus" @todo_dialog_closed="todoDialogClosed"/>
    </Dialog>
</template>
<script setup lang="ts">
    import { useTodoStore } from '~/store/todo';
    definePageMeta({
        middleware:['auth']
    });
    /*Variables */
    const userIdCookie = useCookie('goz_mekmar_user_id');
    const toast = useToast();
    let todoModel = ref();
    let to_do_new_form_dialog = ref();
    let newStatus = ref();
    let form_header = ref();
    const todoStore = useTodoStore();
    const { data:todo } = await useFetch(`/api/sales/todo/main/list/${userIdCookie.value}`);
    if(todo.value.error){
        toast.add({severity:'error',summary:'Orders',detail:'An error has occurred.',life:3000});
    }else{
        todoStore.setMainTodoList(todo.value.list);
    };
    /*Variables */
    /*Function */
    const todoSelectedEmit = (todo:any)=>{
            todoModel.value = todo;
            to_do_new_form_dialog.value = true;
            newStatus.value = false;
            form_header.value ='Update To Do';


    };
    const todoDialogClosed = ()=>{
        to_do_new_form_dialog.value = false;
    };

    /*Function */
</script>