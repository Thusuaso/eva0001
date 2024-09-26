<template>
    <DataTable :value="list"
        :selection="selectedTodo"
        selectionMode="single"
        @row-click="toDoSelected($event)"
        v-model:filters="filters"
        filterDisplay="row"
    
    >
        <Column field="GirisTarihi" header="Date" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #body="slotProps">
                {{ nuxtApp.$dtsa(slotProps.data.GirisTarihi) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"/>
            </template>
        </Column>
        <Column field="OrtakGorev" header="Assignee" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"/>
            </template>
        </Column>
        <Column field="Yapilacak" header="Assignment" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"/>
            </template>
        </Column>
        <Column  header="#">
            <template #body="slotProps">
                <Button type="button" severity="warn" label="Done" @click="done(slotProps.data.ID)"/>
            </template>
        </Column>
        <Column  header="#">
            <template #body="slotProps">
                <Button type="button" severity="info" label="Not Seen" @click="seen(slotProps.data.ID)"/>

            </template>
        </Column>

    </DataTable>

</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { useTodoStore } from '~/store/todo';
/*Variables */
    const props = defineProps({
        'list':{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const nuxtApp = useNuxtApp();
    const emit = defineEmits(['to_do_selected_emit']);
    const selectedTodo = ref();
    const toast = useToast();
    const filters = ref({
        OrtakGorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Yapilacak: { value: null, matchMode: FilterMatchMode.CONTAINS },

        GirisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const todoStore = useTodoStore();
/*Variables */

/*Functions */
const toDoSelected = (event:any)=>{
    emit('to_do_selected_emit',event.data);
};
const done = async (id:any)=>{
        const {data:todo} = await useFetch(`/api/sales/todo/process/done/${id}`);
        if(todo.value.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            if(todo.value.status){
                toast.add({severity:'success',summary:'To Do',detail:'Task completed.',life:3000});
                todoStore.deleteTodo(id);
                todoStore.deleteTodoA(id);
            }else{
                toast.add({severity:'success',summary:'To Do',detail:'Task Completion Failed.',life:3000});
            };
        }
    };
const seen = async (id:any)=>{
    const { data:todo } = await useFetch(`/api/sales/todo/process/seen/${id}`);
        if(todo.value.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        } else{
            if(todo.value.status){
                toast.add({severity:'success',summary:'To Do',detail:'Task Seen Status Changed.',life:3000});
            } else{
                toast.add({severity:'success',summary:'To Do',detail:'Task Seen Status Change Failed.',life:3000});
            };
        }
    
};

/*Functions */



</script>