<template>
    <Card style="width: 25rem; overflow: hidden;
        margin:0px auto;text-align: center;
    ">
        <template #header>
            {{ customer }}  ({{ priority }})
        </template>
        <template #title>{{ representative }}</template>
        <template #content>
            {{ header }}
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Detail" severity="primary" @click="detail" outlined class="w-100" />
            </div>
        </template>
    </Card>

</template>
<script setup lang="ts">
    /*Variables */
    const props = defineProps({
        customer:{
            type:String,
            required:false,
        },
        header:{
            type:String,
            required:false
        },
        representative:{
            type:String,
            required:false
        },
        priority:{
            type:String,
            required:false
        }
    });
    const { customer,header,representative,priority } = props;
    const emit = defineEmits([''])
    /*Variables */

    const detail = ()=>{
        emit('customer_selected_emit',customer)
    };

</script>