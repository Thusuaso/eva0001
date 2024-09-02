<template>
    <OrdersListProduction :orders="orders?.production"/>
</template>
<script setup lang="ts">
    const toast = useToast();
    const { data:orders } = await useFetch('/api/orders/production');
    if(orders.error){
        toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });
    }
</script>