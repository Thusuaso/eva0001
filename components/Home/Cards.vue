<template>
    <div class="">
            <HomeCard :month="data.orderMonth" :year="data.orderYear" :average="data.orderAverage" :forecast="data.orderForecast" :_year="data.year" :_month="data.month"
                title_1="Monthly Order (FOB)" title_2="Annual Order (FOB)" title_3="Monthly Average (FOB)" title_4="Annual Forecast (FOB)"
            />
        <br>

            <HomeCard :month="data.forwardingMonth" :year="data.forwardingYear" :average="data.forwardingAverage" :forecast="data.forwardingForecast" :_year="data.year" :_month="data.month"
                title_1="Monthly Shipment (DDP)" title_2="Annual Shipment (DDP)" title_3="Shipment Average Monthly (DDP)" title_4="Annual Shipment Forecast (DDP)"
            />

    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    data:{
        type:Object,
        required:true
    }
});
const {data} = props;
</script>