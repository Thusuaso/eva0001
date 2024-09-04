<template>
    <FloatLabel>
        <InputText id="value" v-model="newValue" 
            class="w-100"
        />
        <label for="value">{{ text }}</label>
    </FloatLabel>
</template>
<script setup lang="ts">
    import { computed } from 'vue'
    const emit = defineEmits(['onInput'])
    const props = defineProps({
        value:{
            type:Number,
            required:true,
            default:0
        },
        text:{
            type:String,
            required:true,
            default:''
        },

    });
    const { value , text  } = props;

    let newValue = computed({
        get(){
            return value.toFixed(4).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)\,/g, ".");
        },
        set(modifiedValue){
            let newValue = parseFloat(modifiedValue.replace(",", "."));
            if (isNaN(newValue)) {
                newValue = 0;
            };
            emit("onInput", newValue);
        }
    });

</script>