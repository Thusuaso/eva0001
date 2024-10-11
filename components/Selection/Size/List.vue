<template>
    <DataTable :value="list" tableStyle="min-width: 50rem"
        v-model:filters="filters"
        filterDisplay="row"
        v-model:selection="selectedSizeList"
        selectionMode="single"
        @row-click="sizeListSelected($event)"
    >
        <Column field="Crate_Width" header="Width" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
        </Column>
        <Column field="Crate_Height" header="Length" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
        </Column>
        <Column field="Crate_Thickness" header="Height" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
        </Column>
        <Column field="Stone_Size" header="Tile Size" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
        </Column>
        <Column field="Supplier" header="Supplier" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
        </Column>
        <Column field="Piece" header="Piece"></Column>
    </DataTable>
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
    const emits = defineEmits(['selected_size_emit'])
    const filters = ref({
        Crate_Width:{value:null,matchMode:FilterMatchMode.STARTS_WITH },
        Crate_Height:{value:null,matchMode:FilterMatchMode.STARTS_WITH },
        Crate_Thickness:{value:null,matchMode:FilterMatchMode.STARTS_WITH },
        Stone_Size:{value:null,matchMode:FilterMatchMode.STARTS_WITH },
        Supplier:{value:null,matchMode:FilterMatchMode.STARTS_WITH },

    });
    const selectedSizeList = ref();
    const sizeListSelected = (event:object)=>{
        emits('selected_size_emit',event.data);
    };
</script>