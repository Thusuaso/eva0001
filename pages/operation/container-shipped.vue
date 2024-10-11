<template>
    <div>
        <ContainerShippedList :list="container.list" @shipped_container_selected_emit="shippedContainerSelected($event)"/>
    </div>
    <Dialog v-model:visible="container_dialog_form" :header="header" modal :style="{width:'55rem'}">
        <ContainerShippedForm :model="model"/>
    </Dialog>
</template>
<script setup lang="ts">
    const {data:container} = await useFetch('/api/container/shipped/list');
    let container_dialog_form = ref(false);
    let header= ref('Updated Shipped Container');
    let model = ref({});
    const shippedContainerSelected = (event:any)=>{
        container_dialog_form.value = true;
        model.value = event;

    };
</script>