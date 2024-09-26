<template>
    <div class="row m-auto text-center">
        <div class="col-sm-6">
            <SalesRepresentativeList :list="representativeStore?.getRepresentativeListA" @representative_selected_emit="representativeSelectedEmit($event)"/>
        </div>
        <div class="col-sm-6">
            <SalesRepresentativeSummary :list="representativeStore?.getRepresentativeListB" :seller_status="true" header="Sales Summary"/>
            <br/>
            <SalesRepresentativeSummary :list="representativeStore?.getRepresentativeListC" :seller_status="false" header="Operation Summary
"/>

        </div>
    </div>
    <Dialog v-model:visible="representative_dialog_visible" modal header="Update Representative" :style="{ width: '35rem' }">
        <SalesRepresentativeForm :model="model" :users="users" @closed_form_model="closedFormModel"/>
    </Dialog>

</template>
<script setup lang="ts">
    import { useRepresentativeStore } from '~/store/representative';
    /*Variables */
    const representativeStore = useRepresentativeStore();
    /*Variables */
    const {data:representative} = await useFetch('/api/sales/representative/list');
    representativeStore.setRepresentativeList(representative.value);
    const {data:users} = await useFetch('/api/shared/users');
    let representative_dialog_visible = ref();
    let model = ref();
    /*Functions */
    const representativeSelectedEmit = (event:Object)=>{
        representative_dialog_visible.value = true;
        model.value = event;
    };
    const closedFormModel = ()=>{
        representative_dialog_visible.value = false;
    }
    /*Functions */
</script>