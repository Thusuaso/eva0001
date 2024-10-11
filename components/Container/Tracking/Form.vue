<template>
    <div class="row m-auto text-center m-auto mt-4">
        <div class="col-sm-3">
            <FloatLabel>
                <InputText id="container_no" v-model="model.KonteynerNo" />
                <label for="container_no">Container No</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputText id="line" v-model="model.Line" />
                <label for="line">Line</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <DatePicker v-model="selectedDate" inputId="date" showIcon iconDisplay="input" @date-select="dateSelected($event)"
                    dateFormat="yy/mm/dd"
                />
                <label for="date">Date</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <Button severity="danger" label="Clear" @click="clearDate"/>
        </div>
    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <div class="flex items-center">
                <Checkbox v-model="selectedBillOfLadingStatus" inputId="bill-of-lading" :binary="true" 
                    @change="model.KonsimentoDurum = !model.KonsimentoDurum;"
                />
                <label for="bill-of-lading" class="ml-2"> Bill of Lading </label>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="flex items-center">
                <Checkbox v-model="selectedFollowStatus" inputId="follow-status" :binary="true" 
                @change="model.Takip = !model.Takip"
                />
                <label for="follow-status" class="ml-2"> {{ selectedFollowStatus? 'Follow':'UnFollow' }} </label>
            </div>
        </div>
    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-12">
            <Button severity="warn" label="Update" class="w-100" @click="update"/>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Object,
            required:true
        }
    });
    const { model } = props;
    const emits = defineEmits(['update_container_emit'])
    const nuxtApp = useNuxtApp();

    let selectedDate = ref();
    let selectedBillOfLadingStatus = ref(false);
    let selectedFollowStatus = ref(false);
    if(model.KonsimentoDurum == null || model.KonsimentoDurum == undefined || model.KonsimentoDurum == false){
        selectedBillOfLadingStatus.value = false;
    }else{
        selectedBillOfLadingStatus.value = true;
    };
    if(model.Takip == null || model.Takip == undefined || model.Takip == false){
        selectedFollowStatus.value = false;
    }else{
        selectedFollowStatus.value = true;
    }
    const dateSelected = (event:any)=>{
        model.Eta = nuxtApp.$dtsa(event);
    };
    const clearDate = ()=>{
        model.Eta = null;
        selectedDate.value = null;
    };
    const update = ()=>{
        emits('update_container_emit',model);
    };


</script>