<template>
    <DataTable :value="list" 
        class="p-datatable-sm"
        v-model:filters="filters"
        filterDisplay="row"
        v-model:selection="selectedRepresentative"
        selectionMode="single"
        @row-click="representativeSelected($event)"
    >
        <Column field="SiparisNo" header="Po" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText style="width:100px;" v-model="filterModel.value" type="text" @input="filterCallback()"/>
            </template>
        </Column>
        <Column field="SiparisSahibi" header="Seller" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText style="width:100px;" v-model="filterModel.value" type="text" @input="filterCallback()"/>
            </template>
        </Column>
        <Column field="Operasyon" header="Operation" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText style="width:100px;" v-model="filterModel.value" type="text" @input="filterCallback()"/>
            </template>
        </Column>
    </DataTable>
</template>
<script setup lang="ts">
import {FilterMatchMode} from '@primevue/core/api'
/*Variables */
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const filters = ref({
        SiparisNo:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        SiparisSahibi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
        Operasyon:{value:null,matchMode:FilterMatchMode.STARTS_WITH},

    });
    const emit = defineEmits(['representative_selected_emit']);
    const  selectedRepresentative = ref();
/*Variables */

/*Functions */
const representativeSelected = (event:Object)=>{
    emit('representative_selected_emit',event?.data);
};
/*Functions */



</script>