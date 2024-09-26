<template>
    <OrdersListProduction />
</template>
<script setup lang="ts">
    import { useOrdersStore } from '~/store/orders';
    const toast = useToast();
    const orderStore = useOrdersStore();
    const { data:orders } = await useFetch('/api/orders/list/onhold');
    if(orders.value.error){
        toast.add({severity:'error',summary:'Orders',detail:'An error has occurred.',life:3000});
    }else{
        orderStore.setProductionOrders(orders?.value.onhold)
    };
</script>