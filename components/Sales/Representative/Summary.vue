<template>
    <DataTable :value="list" 
        class="p-datatable-sm"
    >
        <template #header>
            {{ header }}
        </template>
        <Column field="Representative" :header="seller_status?'Seller':'Operation'" >

        </Column>
        <Column field="Total" header="Total" >

        </Column>

    </DataTable>
</template>
<script setup lang="ts">
/*Variables */
    const props = defineProps({
        list:{
            type:Array,
            required:true
        },
        seller_status:{
            type:Boolean,
            required:true
        },
        header:{
            type:String,
            required:true
        }
    });
    const { list,seller_status,header } = props;
/*Variables */


</script>