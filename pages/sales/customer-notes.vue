<template>
    <div>
        <SalesCustomerNotesLists :list="customerStore.getCustomerList" @customer_selected_emit="customerSelectedEmit($event)"/>
        <Dialog v-model:visible="visible_customer_form_dialog" modal :header="header" :style="{ width: '55rem' }">
            <Button severity="success" label="Add Reminder" @click="newReminder" class="w-100" />
            <SalesCustomerNotesDetail :list="customerStore.getCustomerDetailList"
                @customer_detail_selected_emit="customerDetailSelectedEmit($event)"
            />
        </Dialog>
        <Dialog v-model:visible="visible_customer_detail_form_dialog" modal :header="detailHeader" :style="{width:'55rem'}">
            <SalesCustomerNotesForm :model="detailModel" :status="detailStatus"
            @closed_customer_detail_dialog="closedCustomerDetailDialog"
            />
        </Dialog>


    </div>
</template>
<script setup lang="ts">
import {useCustomerSalesStore} from '~/store/customer-sales';
    /*Variables */
    const customerStore = useCustomerSalesStore();
    const { data:customer } = await useFetch('/api/sales/customer/list');
    customerStore.setCustomerList(customer.value.list);
    let header = ref();
    let visible_customer_form_dialog = ref(false);
    let detailModel = ref();
    const toast = useToast();
    const visible_customer_detail_form_dialog = ref(false);
    let detailHeader = ref('');
    let detailStatus = ref(false);
    /*Variables */

    /*Functions */
    const customerSelectedEmit = async (event)=>{
        const { data:customer } = await useFetch(`/api/sales/customer/detail/${event.replaceAll(' ','_')}`);
        if(customer.value.error){
            toast.add({severity:'error',summary:'Products',detail:'An error has occurred.',life:3000});

        }else{
            customerStore.setCustomerDetailList(customer.value.detail);
            header.value = event;
            visible_customer_form_dialog.value = true;
            

        };


    };
    const customerDetailSelectedEmit = async (event)=>{
        detailModel.value = event;
        visible_customer_detail_form_dialog.value = true;
        detailHeader.value = event.Baslik;
        detailStatus.value = false;
    };
    const newReminder  = async ()=>{
        visible_customer_detail_form_dialog.value = true;
        detailHeader.value = 'New Reminder';
        detailStatus.value = true;
        detailModel.value = {
        };
        detailModel.value.MusteriAdi = header.value;

    };
    const closedCustomerDetailDialog = async()=>{
        visible_customer_detail_form_dialog.value = false;
    };
    /*Functions */


</script>