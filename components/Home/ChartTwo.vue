<template>
    <Chart type="doughnut" :data="chart" :options="chartOptions" style="height:550px;width: 100%;" />
</template>
<script setup lang="ts">
const props = defineProps({
    chart:{
        type:Object,
        required:true
    }
});
const { chart } = props;

const chartOptions = {
    plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: 'grey'
                }
            }
        }
}
</script>