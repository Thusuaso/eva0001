<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <FloatLabel >
                <DatePicker class="w-100" v-model="selectedDate" inputId="date" dateFormat="yy/mm/dd"
                    @date-select="dateSelected($event)"
                />
                <label for="date">Date</label>
            </FloatLabel>

        </div>
        <div class="col-sm-6">
            <FloatLabel >
                <DatePicker class="w-100" v-model="selectedReminderDate" inputId="reminder" dateFormat="yy/mm/dd"
                    @date-select="reminderSelected($event)"
                />
                <label for="reminder">Reminder Date</label>
            </FloatLabel>

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <FloatLabel>
                <InputText id="customer" v-model="model.MusteriAdi" disabled class="w-100"/>
                <label for="customer">Customer</label>
            </FloatLabel>

        </div>
        <div class="col-sm-6">
            <FloatLabel>
                <InputText id="title" v-model="model.Baslik" class="w-100"/>
                <label for="title">Title</label>
            </FloatLabel>

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <FloatLabel>
                <Textarea v-model="model.Aciklama" rows="5" cols="30"  class="w-100"/>
                <label>Explanation</label>
            </FloatLabel>
        </div>
        <div class="col-sm-6">
            <FloatLabel>
                <Textarea v-model="model.Hatirlatma_Notu" rows="5" cols="30"  class="w-100"/>
                <label>Reminder</label>
            </FloatLabel>
        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :severity="status ? 'success':'warn'" class="w-100" :label="status? 'Save':'Update'" @click="process"/>
        </div>
        <div class="col-sm-6" v-if="!status">
            <Button severity="danger" class="w-100" label="Delete" @click="deleted"/>
        </div>

    </div>
</template>
<script setup lang="ts">
import {useCustomerSalesStore} from '~/store/customer-sales';
    /*Variables */
        const toast = useToast();
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
        const nuxtApp = useNuxtApp();
        let selectedDate = ref();
        let selectedReminderDate = ref();
        if(!status){
            selectedDate.value = nuxtApp.$dtsa(model.Tarih);
            selectedReminderDate.value = nuxtApp.$dtsa(model.Hatirlatma_Tarih);
        };
        const userIdCookie = useCookie('goz_mekmar_user_id');
        const usernameCookie = useCookie('goz_mekmar_user');

        const customerStore = useCustomerSalesStore();
        const emits = defineEmits(['closed_customer_detail_dialog'])
    /*Variables */

    /*Functions*/
        const process = ()=>{
            if(status){
                save();
            }else{
                update();
            }
        };
        const deleted = async ()=>{
            const {data:customer} = await useFetch(`/api/sales/customer/detail/delete/${model.ID}`,{
                method:'DELETE'
            });
            if(customer.value.error){
                toast.add({severity:'error',summary:'Customer Notes',detail:'An error has occurred.',life:3000});
            }else{
                if(customer.value.success){
                    toast.add({severity:'success',summary:'Customer Notes',detail:'Customer note has been updated.',life:3000});
                    customerStore.deleteCustomerDetailList(model.ID);
                    emits('closed_customer_detail_dialog');
                }else{
                    toast.add({severity:'error',summary:'Customer Notes',detail:'Customer note could not be deleted.',life:3000});
                }
            }
        };
        const save = async ()=>{
            model.Temsilci = await userIdCookie.value;
            const { data:customer } = await useFetch('/api/sales/customer/detail/save',{
                method:'POST',
                body:model
            });
            if(customer.value.error){
                toast.add({severity:'error',summary:'Customer Notes',detail:'An error has occurred.',life:3000});

            }else{
                if(customer.value.status){
                    toast.add({severity:'success',summary:'Customer Notes',detail:'Customer note has ben saved.',life:3000});
                    customerStore.addCustomerDetailList({...model,'ID':customer.value.id,'KullaniciAdi':usernameCookie.value});
                    emits('closed_customer_detail_dialog');
                }else{
                    toast.add({severity:'error',summary:'Customer Notes',detail:'Customer note could not be saved.',life:3000});

                }
            }
        };
        const update = async ()=>{
            const {data:customer} = await useFetch('/api/sales/customer/detail/update',{
                method:'PUT',
                body:model
            });
            if(customer.value.error){
                toast.add({severity:'error',summary:'Customer Notes',detail:'An error has occurred.',life:3000});
            }else{
                if(customer.value.status){
                    toast.add({severity:'success',summary:'Customer Notes',detail:'Customer note has been updated.',life:3000});
                    customerStore.updateCustomerDetailList(model);
                    emits('closed_customer_detail_dialog');
                }else{
                    toast.add({severity:'error',summary:'Customer Notes',detail:'Customer note could not be updated.',life:3000});
                }
            }
        };
        const dateSelected = (event)=>{
            model.Tarih = nuxtApp.$dtsa(event);
        };
        const reminderSelected = (event)=>{
            model.Hatirlatma_Tarih = nuxtApp.$dtsa(event);
        };
    /*Functions*/


</script>