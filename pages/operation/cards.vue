<template>
    <Button type="button" class="p-button-info w-100" label="New Card" @click="newCardForm" />
    <CardsList :cards="cards?.list"/>
</template>
<script setup lang="ts">
    const toast = useToast();
    const { data:cards } = await useFetch('/api/cards/list');
    if(cards?.error){
        toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });
    };
    const newCardForm = ()=>{

    };


</script>