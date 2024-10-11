<template>
    
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedCompany" inputId="company" :suggestions="filteredCompany" optionLabel="FirmaAdi" @complete="searchCompany($event)" 
                    @item-select="companySelected($event)"
                    class="w-100"
                />
                <label for="company">Company</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <DatePicker v-model="selectedDate" inputId="date" showIcon iconDisplay="input" class="w-100"
                    @date-select="dateSelected($event)" dateFormat="yy/mm/dd"
                />
                <label for="date">Date</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="invoice" v-model="model.FaturaNo" class="w-100"/>
                <label for="invoice">Invoice</label>
            </FloatLabel>
        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-3">
            <FloatLabel>
                <AutoComplete v-model="selectedPo" inputId="order-po" :suggestions="filteredPo" @complete="searchPo($event)" class="w-100" optionLabel="SiparisNo"
                    @item-select="poSelected($event)"
                />
                <label for="order-po">Order Po</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputNumber id="price" v-model="model.Tutar" inputId="stacked-buttons" showButtons mode="currency" currency="USD" fluid  class="w-100"/>

                <label for="price">Price</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputNumber id="currency" v-model="model.Kur" inputId="stacked-buttons" showButtons mode="currency" currency="USD" fluid  class="w-100"/>

                <label for="currency">Currency</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputNumber id="usd" v-model="model.Usd" inputId="stacked-buttons" showButtons mode="currency" currency="USD" fluid  class="w-100"/>

                <label for="usd">Usd</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-3">
            <Button severity="secondary" label="New" class="w-100" @click="newForm"
                :disabled="new_button_disabled"
            />
        </div>
        <div class="col-sm-3">
            <Button :severity="status?'success':'warn'" :label="status?'Add':'Update'" class="w-100" @click="process"
                :disabled="process_button_disabled"
            />
        </div>
        <div class="col-sm-3">
            <Button severity="danger" label="Delete" class="w-100" @click="deleted"
                :disabled="delete_button_disabled"
            />
        </div>
        <div class="col-sm-3">
            <Button severity="info" label="Cancel" class="w-100" @click="cancel"
                :disabled="cancel_button_disabled"
            />

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-12">
            <DataTable :value="documents" 
            class="p-datatable-sm"
            v-model:selection="selectedDocument"
            selectionMode="single"
            @row-click="documentSelected($event)"
            >
                <Column field="FirmaAdi" header="Company"></Column>
                <Column field="SiparisNo" header="Po"></Column>
                <Column field="FaturaNo" header="Invoice No"></Column>
                <Column field="Tarih" header="Date">
                    <template #body="slotProps">
                        {{ nuxtApp.$dtsa(slotProps.data.Tarih) }}
                    </template>
                </Column>
                <Column field="Tutar" header="Tl">
                    <template #body="slotProps">
                        {{ nuxtApp.$tl(slotProps.data.Tutar) }} 
                    </template>
                </Column>
                <Column field="Kur" header="Currency">
                    <template #body="slotProps">
                        {{ nuxtApp.$tl(slotProps.data.Kur) }} 
                    </template>
                </Column>
                <Column field="Usd" header="Usd">
                    <template #body="slotProps">
                        {{ nuxtApp.$usd(slotProps.data.Tutar) }} 
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        company:{
            type:Array,
            required:true
        },
        model:{
            type:Object,
            required:true
        },
        po:{
            type:Object,
            required:true
        }
    });
    const { model,company,po } = props;
    const selectedCompany = ref();
    let filteredCompany = ref();
    const selectedDate = ref(new Date());
    const selectedPo = ref();
    let filteredPo = ref();
    const nuxtApp = useNuxtApp();
    let new_button_disabled = ref(false);
    let process_button_disabled = ref(true);
    let delete_button_disabled = ref(true);
    let cancel_button_disabled = ref(true);
    let status = ref(true);
    let documents = ref([]);
    const selectedDocument = ref();
    const userIdCookie = useCookie('goz_mekmar_user_id');

    const searchCompany = (event:any)=>{
        let res;
        if(event.query.length == 0){
            res = company;
        }else{
            res = company.filter(item => item.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase()));
        };
        filteredCompany.value = res;
    };
    const companySelected = (event:any)=>{
        model.FirmaAdi = event.value.FirmaAdi;
        model.FirmaID = event.value.ID;
    };
    const dateSelected = (event:any)=>{
        model.Tarih = nuxtApp.$dtsa(event);
    };
    const searchPo = (event:any)=>{
        let res;
        if(event.query.length == 0){
            res = po;
        } else{
            res = po.filter(item => item.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()));
        };
        filteredPo.value = res;
    };
    const poSelected = (event:any)=>{
        model.SiparisNo = event.value.SiparisNo;
    };
    const newForm = ()=>{
        new_button_disabled.value = true;
        process_button_disabled.value = false;
        cancel_button_disabled.value = false;
        delete_button_disabled.value = true;
        status.value = true;
    };
    const process = ()=>{
        if(status.value){
            add(model)
        }else{
            update(model);
        }
    };
    const add = async (model:object)=>{
        model.KullaniciID = await userIdCookie.value;
        model.KayitTarihi = await nuxtApp.$dtsa(new Date());
        model.ID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
        model.Tarih = await nuxtApp.$dtsa(selectedDate.value);
        documents.value.unshift(model);
    };
    const update = async (model:object)=>{

    };
    const deleted = ()=>{
        new_button_disabled.value = false;
        process_button_disabled.value = true;
        cancel_button_disabled.value = true;
        delete_button_disabled.value = true;
    };
    const cancel = ()=>{
        new_button_disabled.value = false;
        process_button_disabled.value = true;
        cancel_button_disabled.value = true;
        delete_button_disabled.value = true;
        status.value = true;
    };
    const documentSelected = (event:any)=>{
        model = event.data;
        status.value = false;
        new_button_disabled.value = true;
        process_button_disabled.value = false;
        cancel_button_disabled.value = false;
        delete_button_disabled.value = false;
    }
</script>