<template>
    <HomeCards :data="data"/>
    <br/>
    <HomeCharts :chart_one="data?.chartShipped" :chart_two="data?.chartCustomerShipped" :chart_three="data?.chartProducts" :chart_four="data?.chartOffers"/>
</template>
<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from 'vue';
definePageMeta({
    middleware:['auth']
});
const socket = io("http://localhost:3001", {
  reconnectionDelayMax: 10000,
});

const { data } = await useFetch('/api/home');


</script>