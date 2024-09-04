<template>
    <OrdersListShipped :shipped="shipped?.shipped" />
</template>
<script setup lang="ts">
const toast = useToast();
const {data:shipped} = await useFetch('/api/orders/list/shipped');
if(shipped?.error){
    toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });
}
</script>