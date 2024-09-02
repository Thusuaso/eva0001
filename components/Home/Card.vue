<template>

    <div class="row m-auto text-center">
        <div class="col-sm-3">
            <div class="card border-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-primary mb-1">{{ title_1 }}</div>
                        <div class="h6 mb-0 text-gray-800">
                            {{ nuxtApp.$usd(month) }}
                        </div>
                    </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300">
                            
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card border-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-primary mb-1">{{ title_2 }}</div>
                        <div class="h6 mb-0 text-gray-800">
                            {{ nuxtApp.$usd(year) }}
                        </div>
                    </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300">
                            
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card border-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-primary mb-1">{{ title_3 }}</div>
                        <div class="h6 mb-0 text-gray-800">
                            {{ nuxtApp.$usd(average) }}
                        </div>
                    </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300">
                            
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card border-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-primary mb-1">{{ title_4 }}</div>
                        <div class="h6 mb-0 text-gray-800">
                            {{ nuxtApp.$usd(forecast) }}
                        </div>
                    </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300">
                            
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    average:{
        type:Number,
        required:true
    },
    forecast:{
        type:Number,
        required:true
    },
    _year:{
        type:Number,
        required:true
    },
    _month:{
        type:Number,
        required:true
    },
    title_1:{
        type:String,
        required:true
    },
    title_2:{
        type:String,
        required:true
    },
    title_3:{
        type:String,
        required:true
    },
    title_4:{
        type:String,
        required:true
    }
});
const {month,year,average,forecast,_year,_month,title_1,title_2,title_3,title_4} = props;
const nuxtApp = useNuxtApp();

</script>