<template>
   <Menubar :model="menu">
    <template #end>
        <div class="flex items-center gap-2">
            <Button type="button" icon="pi pi-bell" :badge="todo.todo.length.toString()" @click="toggle" />
        </div>
    </template>

   </Menubar>

   <Popover ref="todo_popover" :closeOnEscape="false">
    <div class="flex flex-col gap-2 w-[25rem]">
        <Button type="button" class="p-button-info w-100" label="Add To Do" @click="newToDo"/>
        <TodoList :list="todoList" @todo_selected_emit="todoSelectedEmit($event)"/>
    </div>
   </Popover>

   <Dialog v-model:visible="to_do_new_form_dialog" modal :header="form_header" :style="{ width: '35rem' }">
        <TodoForm :model="todoModel" :status="newStatus" @todo_dialog_closed="todoDialogClosed"/>
    </Dialog>

</template>
<script lang="ts" setup>
import {ref} from 'vue';
import { useTodoStore } from '~/store/todo';
const todoStore = useTodoStore();
const username = useCookie('goz_mekmar_user');
const toast = useToast();
const props = defineProps({
    menu:{
        type:Array,
        required:true,
        default:[]
    }
});
const { menu } = props;
const todo_popover = ref();
const toggle = (event:any) => {
    todo_popover.value.toggle(event);
};
let newStatus = ref(true);
let form_header = ref('');
const { data:todo } = await useFetch(`/api/sales/todo/list/${username.value}`);
let todoList = ref();
if(todo.error){
    toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });
}else{
    await todoStore.setTodoList(todo.value.todo);
    todoList.value = await todoStore.getTodoList;
}

let to_do_new_form_dialog = ref(false);
let todoModel = ref({
    
})


const newToDo = ()=>{
    to_do_new_form_dialog.value = true;
    todoModel.value = {
        ID:0,
        Yapilacak:'',
        Yapildi:false,
        GorevVerenID:0,
        GorevVerenAdi:'',
        GirisTarihi:'',
        YapildiTarihi:'',
        YapilacakOncelik:'',
        Acil:false,
        OrtakGorev:[]
    };
    newStatus.value = true;
    form_header.value ='Add New To Do';
};
const todoSelectedEmit = (todo:any)=>{
    todoModel.value = todo;
    to_do_new_form_dialog.value = true;
    newStatus.value = false;
    form_header.value ='Update To Do';


};
const todoDialogClosed = ()=>{
    to_do_new_form_dialog.value = false;
};



</script>