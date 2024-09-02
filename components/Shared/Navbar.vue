<template>
   <Menubar :model="menu">
    <template #end>
        <div class="flex items-center gap-2">
            <Button type="button" icon="pi pi-bell" :badge="todo.todo.length" @click="toggle" />
        </div>
    </template>

   </Menubar>
   <Popover ref="op">
    <div class="flex flex-col gap-2 w-[25rem]">
        <Button type="button" class="p-button-info w-100" label="Add ToDo" @click="newToDo"/>
        <DataTable :value="todo.todo" 
        v-model:selection="selectedTodo"
        selectionMode="single"
        >
            <Column field="Yapilacak" header="Assignment" ></Column>
            <Column field="GirisTarihi" header="Date">
                <template #body="slotProps">
                    {{ nuxtApp.$dts(slotProps.data.GirisTarihi) }}
                </template>                    
            </Column>
            <Column field="YapilacakOncelik" header="Priority"></Column>
        </DataTable>

    </div>
   </Popover>

</template>
<script lang="ts" setup>
import {ref} from 'vue';
const username = useCookie('goz_mekmar_user');
const toast = useToast();
const nuxtApp = useNuxtApp();
const props = defineProps({
    menu:{
        type:Array,
        required:true,
        default:[]
    }
});
const { menu } = props;
const op = ref();
const toggle = (event:any) => {
    op.value.toggle(event);
};

const { data:todo } = await useFetch('/api/sales/todo',{
    method:'POST',
    body:{ 'username':username.value }
});
if(todo.error){
    toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });

};
const selectedTodo = ref();
const newToDo = ()=>{

};



</script>