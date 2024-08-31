<template>
        <Chart type="bar" :data="chart" :options="chartOptions" style="height:550px;width: 100%;" />

</template>
<script setup lang="ts">
const props = defineProps({
    chart:{
        type:Object,
        required:true
    }
});
const {chart} = props;
const chartOptions = {
    maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: 'grey'
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'grey'
                },
                grid: {
                    color: 'grey'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'grey'
                },
                grid: {
                    color: 'grey'
                }
            }
        }
}
</script>