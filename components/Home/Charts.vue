<template>
    <div class="row m-auto text-center mb-3">
        <div class="col-sm-6">
            <Card>
                <template #title>Monthly Shipped Report</template>
                <template #content>
                    <HomeChartOne :chart="chart_one"/>

                </template>
            </Card>
        </div>
        <div class="col-sm-6">
            <Card>
                <template #title>Shipped by Marketing Report</template>
                <template #content>
                    <HomeChartTwo :chart="chart_two"/>
                </template>
            </Card>
        </div>
    </div>
    <div class="row m-auto text-center">
        <div class="col-sm-6">
            <Card>
                <template #title>Monthly Production Report</template>
                <template #content>
                    <HomeChartThree :chart="chart_three"/>
                </template>
            </Card>
        </div>
        <div class="col-sm-6">
            <Card>
                <template #title>Monthly Offers Report</template>
                <template #content>
                    <HomeChartOne :chart="chart_four"/>

                </template>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        chart_one:{
            type:Object,
            required:true
        },
        chart_two:{
            type:Object,
            required:true
        },
        chart_three:{
            type:Object,
            required:true
        },
        chart_four:{
            type:Object,
            required:true
        }
    });
    const {chart_one,chart_two,chart_three,chart_four} = props;
</script>