<template>
    <DataTable :value="list" 
                v-model:selection="selectedTodo"
                selectionMode="single"
                @row-click="todoSelected($event)"
                sortField="Acil" :sortOrder="-1"
                :rowStyle="rowStyle"
                v-model:filters="filters"
                filterDisplay="row"

        >
            <Column field="Yapilacak" header="Assignment" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="GirisTarihi" header="Date" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ nuxtApp.$dts(slotProps.data.GirisTarihi) }}
                </template>
                
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="YapilacakOncelik" header="Priority"></Column>
            <Column  header="#">
                <template #body="slotProps">
                    <Button type="button" class="p-button-primary" label="Done" @click="done(slotProps.data.ID)" />
                </template>
            </Column>

    </DataTable>
</template>
<script setup lang="ts">
    import { useTodoStore } from '~/store/todo';
    import { FilterMatchMode } from '@primevue/core/api';

    /*Variables */
    const nuxtApp = useNuxtApp();
    const toast = useToast();
    const todoStore = useTodoStore();
    const selectedTodo = ref();
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const emit = defineEmits(["todo_selected_emit"]);
    const filters = ref({
        Yapilacak:{value:null,matchMode:FilterMatchMode.CONTAINS},
        GirisTarihi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},

    })
    /*Variables */

    /*Functions */
    const todoSelected =  (event:any)=>{
        emit('todo_selected_emit',event.data);
    };
    const rowStyle = (event:any) => {
        if (event.Acil) {
            return { color:'red' };
        }
    };
    const done = async (id:any)=>{
        const {data:todo} = await useFetch(`/api/sales/todo/process/done/${id}`);
        if(todo.value.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            if(todo.value.status){
                toast.add({severity:'success',summary:'To Do',detail:'Task completed.',life:3000});
                todoStore.deleteTodo(id);
                todoStore.deleteTodoMain(id);
            }else{
                toast.add({severity:'success',summary:'To Do',detail:'Task Completion Failed.',life:3000});
            };
        }
    };

    /*Functions */




</script>