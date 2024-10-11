<template>
    <div class="mt-4">
        <FloatLabel>
            <InputText id="supplier" v-model="model.FirmaAdi" class="w-100"/>
            <label for="supplier">Supplier</label>
        </FloatLabel>
    </div>
    <div class="row m-auto text-center mt-4">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :severity="status?'succes':'warn'" :label="status?'Save':'Update'" @click="process" class="w-100"/>

        </div>
        <div class="col-sm-6" v-show="!status">
            <Button severity="danger" label="Delete" @click="deleted" class="w-100"/>

        </div>

    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        }
    });
    const { model,status } = props;
    const emits = defineEmits(['suppliers_process_emit','suppliers_delete_emit'])
    const process = ()=>{
        emits('suppliers_process_emit',model);
    };
    const deleted = ()=>{
        emits('suppliers_delete_emit',model.ID);
    };

    
</script>