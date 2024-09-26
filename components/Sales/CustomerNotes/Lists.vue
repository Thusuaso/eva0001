<template>
    <div class="row">
        <div class="col-sm-4" v-for="customer in list" :key="customer">
            <SalesCustomerNotesList :header="customer.baslik" :customer="customer.FirmaAdi" :priority="customer.Oncelik"
                :representative="customer.Temsilci"
                @customer_selected_emit="customerSelectedEmit($event)"
            />

        </div>
    </div>
</template>
<script setup lang="ts">
/*Variables */
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const emits = defineEmits(['customer_selected_emit'])
/*Variables */

/*Functions */
    const customerSelectedEmit = (event)=>{
        emits('customer_selected_emit',event);
    };
/*Functions */



</script>