<template>
    <Chart type="bar" :data="chart" :options="chartOptions" style="height:550px;width: 100%;" />

</template>
<script lang="ts" setup>
const props = defineProps({
    chart:{
        type:Object,
        required:true
    }

});
const { chart } = props;
const chartOptions = {
    maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    color: 'grey'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'grey',
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: 'grey'
                },
                grid: {
                    color: 'grey',
                    drawBorder: false
                }
            }
        }
}
</script>