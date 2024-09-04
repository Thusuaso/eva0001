<template>
    <HomeCards :data="data"/>
    <br/>
    <HomeCharts :chart_one="data?.chartShipped" :chart_two="data?.chartCustomerShipped" :chart_three="data?.chartProducts" :chart_four="data?.chartOffers"/>
</template>
<script setup lang="ts">

definePageMeta({
    middleware:['auth']
});



const { data } = await useFetch('/api/home');


</script>