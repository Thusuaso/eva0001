<template>
    <Button severity="success" label="Add Company" class="w-100" @click="newForm"/>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm">
            <UploadShipmentForm :company="companyStore.getList" :model="uploadStore.getModel"
            :po="po.list"
            />
        </div>
    </div>
    <Dialog v-model:visible="shipment_cost_dialog_form" :header="header" modal :style="{width:'55rem'}">
        <UploadShipmentCompany :company="companyStore.getList"/>
    </Dialog>
</template>
<script setup lang="ts">
    import { useUploadStore } from '~/store/upload';
    import { useCompanyStore } from '~/store/company';
    const uploadStore = useUploadStore();
    const companyStore = useCompanyStore();
    const { data:company } = await useFetch('/api/company/list',{
        method:'GET'
    });
    const {data:po} = await useFetch('/api/shared/all-po',{
        method:'GET'
    });
    companyStore.setList(company.value.list);
    let shipment_cost_dialog_form = ref(false);
    let header = ref('Add New Company');
    const newForm = () =>{
        shipment_cost_dialog_form.value = true;
    };


</script>