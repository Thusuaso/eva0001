<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="platform" v-model="model.Platform" class="w-100"/>
                <label for="platform">Platform</label>
            </FloatLabel>

        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="username" v-model="model.LoginName" class="w-100"/>
                <label for="username">Username</label>
            </FloatLabel>


        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="password" v-model="model.LoginPassword" class="w-100"/>
                <label for="password">Password</label>
            </FloatLabel>

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div :class="status?'col-sm-12' : 'col-sm-6'">
            <Button :severity="status? 'success':'warn'" :label="status?'Save':'Update'" @click="process" class="w-100"/>
        </div>
        <div class="col-sm-6" v-if="!status">
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
    const {model,status} = props;
    const emits = defineEmits(['password_process_emit','password_deleted_emit'])
    const process = ()=>{
        emits('password_process_emit',model);
    };
    const deleted = ()=>{
        emits('password_deleted_emit',model.ID);
    }
</script>