<template>
    <div class="row m-auto text-center">
        <div class="col-sm-9">
            <OrdersFormOrder 
                :model="model"
                :productModel="productModel"
                :supplier="supplier"
                :unit="unit"
                :productList="productList"
            />
        </div>
        <div class="col-sm-3"></div>

    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    model:{
        type:Object,
        required:true
    },
    productModel:{
        type:Object,
        required:true
    },
    productList:{
        type:Array,
        required:true
    },
    supplier:{
        type:Array,
        required:true
    },
    unit:{
        type:Array,
        required:true
    },
    delivery:{
        type:Array,
        required:true
    },
    payment:{
        type:Array,
        required:true
    },
    country:{
        type:Array,
        required:true
    },
    invoice:{
        type:Array,
        required:true
    },
    customer:{
        type:Array,
        required:true
    },
    user:{
        type:Array,
        required:true
    },
    po:{
        type:Array,
        required:true
    }
});
const { model,supplier,unit,delivery,payment,country,invoice,customer,user,po } = props;

</script>