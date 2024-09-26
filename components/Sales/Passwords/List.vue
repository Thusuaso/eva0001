<template>
    <div>
                
        <DataTable :value="list" tableStyle="min-width: 50rem"
            v-model:filters="filters"
            filterDisplay="row"
            v-model:selection="selectedPassword"
            selectionMode="single"
            @row-click="passwordSelected($event)"

        >
            <Column field="Platform" header="Platform" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
            </Column>
            <Column field="LoginName" header="Username" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
 
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="LoginPassword" header="Password">
                <template #body="slotProps">
                    <div v-if="passwordShowStatus">
                        {{ slotProps.data.LoginPassword }}
                    </div>
                    <div v-else>
                        **********
                    </div>
                </template>
            </Column>
            <Column header="#">
                <template #body="slotProps">
                    <Button severity="info" icon="pi pi-eye-slash" @click="passwordShowStatus = !passwordShowStatus"/>
                </template>
            </Column>
        </DataTable>

    </div>
</template>
<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';

    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const selectedPassword = ref();
    const emits = defineEmits(['password_list_selected_emit']);
    const filters = ref({
        Platform: { value: null, matchMode: FilterMatchMode.CONTAINS },
        LoginName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    });
    const passwordShowStatus = ref(false);
    const passwordSelected = (event:any)=>{
        emits('password_list_selected_emit',event.data);
    };
</script>