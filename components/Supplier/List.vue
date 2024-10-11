<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem"
            v-model:selection="selectedSupplier"
            selectionMode="single"
            @row-click="supplierSelected($event)"
            v-model:filters="filters"
            filterDisplay="row"

        >
            <Column field="ID" header="ID" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="FirmaAdi" header="Supplier" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
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
    const emits = defineEmits(['supplier_list_selected'])
    const { list } = props;
    const filters = ref({
        ID : {value:null,matchMode:FilterMatchMode.STARTS_WITH },
        FirmaAdi : {value:null,matchMode:FilterMatchMode.STARTS_WITH },

    });
    const selectedSupplier = ref();
    const supplierSelected = (event:any)=>{
        emits('supplier_list_selected',event.data);
    };
</script>