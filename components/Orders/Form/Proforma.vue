<template>
    <div class="row m-auto text-center mt-3">
        <div class="col-sm-3">
            <FloatLabel class="mb-4">
                <Select v-model="selectedDelivery" inputId="delivery" :options="delivery" optionLabel="TeslimTur" class="w-100" 
                    @change="deliverySelected($event)"
                />
                <label for="delivery">Select a Delivery</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <Select v-model="selectedPayment" inputId="payment" :options="payment" optionLabel="OdemeTur" class="w-100" 
                    @change="paymentSelected($event)"
                />
                <label for="payment">Select a Payment</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <DatePicker v-model="selectedMaturity" inputId="maturity" @date-select="maturitySelected($event)"/>
                <label for="maturity">Maturity Date</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <Select v-model="selectedCountry" inputId="country" :options="country" optionLabel="UlkeAdi" class="w-100" 
                    @change="countrySelected($event)"
                />
                <label for="country">Select a Country</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputText id="payment_details" v-model="modelsStore.getOrderModel.OdemeAciklama" />
                <label for="payment_details">Payment Details</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputText id="container_details" v-model="modelsStore.getOrderModel.KonteynerAyrinti" />
                <label for="container_details">Container Details</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputNumber id="document_cost" v-model="modelsStore.getOrderModel.EvrakGideri" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                <label for="document_cost">Document Cost</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputNumber id="commission" v-model="modelsStore.getOrderModel.Komisyon" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                <label for="commission">Commission</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputNumber id="refund" v-model="modelsStore.getOrderModel.Iade" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                <label for="refund">Refund</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <Select v-model="selectedInvoice" inputId="invoice" :options="invoice" optionLabel="FaturaAdi" class="w-100" 
                    @change="invoiceSelected($event)"
                />
                <label for="invoice">Select a Invoice</label>
            </FloatLabel>

        </div>
        <div class="col-sm-9">
            <FloatLabel class="mb-4">
                <Textarea v-model="modelsStore.getOrderModel.UretimAciklama" rows="6" class="w-100"/>
                <label>Production Explanation</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <Textarea v-model="modelsStore.getOrderModel.SevkiyatAciklama" rows="6" class="w-100"/>
                <label>Shipped Explanation</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <Textarea v-model="modelsStore.getOrderModel.FinansAciklama" rows="6" class="w-100"/>
                <label>Finance Explanation</label>
            </FloatLabel>
            <FileUpload class="w-100" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Upload Proforma" />




        </div>

    </div>
    <div class="row m-auto text-center mt-3">
        <div class="col-sm-6">
            <Card>
                <template #title>Selling</template>
                <template #content>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-6">
                            <FloatLabel class="mb-4">
                                <InputNumber id="freight" v-model="modelsStore.getOrderModel.NavlunSatis" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid
                                    @input="ordersStore.setOrderSumFreight($event.value)"
                                />
                                <label for="freight">Freight</label>
                            </FloatLabel>
                        </div>
                        <div class="col-sm-6">
                            <FloatLabel>
                                <InputText id="freight_company" v-model="modelsStore.getOrderModel.NavlunFirma" />
                                <label for="freight_company">Freight Company</label>
                            </FloatLabel>
                        </div>
                        
                    </div>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-6">
                            <FloatLabel class="mb-4">
                                <InputNumber id="detail_1" v-model="modelsStore.getOrderModel.DetayTutar_1" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid
                                    @input="detailInput_1($event)"
                                />
                                <label for="detail_1">Detail 1</label>
                            </FloatLabel>
                        </div>
                        <div class="col-sm-6">
                            <FloatLabel>
                                <InputText id="detail_desc_1" v-model="modelsStore.getOrderModel.DetayAciklama_1" />
                                <label for="detail_desc_1">Detail 1 Desc.</label>
                            </FloatLabel>
                        </div>
                        
                    </div>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-6">
                            <FloatLabel class="mb-4">
                                <InputNumber id="detail_2" v-model="modelsStore.getOrderModel.DetayTutar_2" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid
                                    @input="detailInput_2($event)"
                                />
                                <label for="detail_2">Detail 2</label>
                            </FloatLabel>
                        </div>
                        <div class="col-sm-6">
                            <FloatLabel>
                                <InputText id="detail_desc_2" v-model="modelsStore.getOrderModel.DetayAciklama_2" />
                                <label for="detail_desc_2">Detail 2 Desc.</label>
                            </FloatLabel>
                        </div>
                        
                    </div>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-12">
                            <FloatLabel class="mb-4">
                                <InputNumber id="insurance" v-model="modelsStore.getOrderModel.sigorta_tutar_satis" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                                <label for="insurance">Insurance</label>
                            </FloatLabel>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <div class="col-sm-6">
            <Card>
                <template #title>Buying</template>
                <template #content>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-6">
                            <FloatLabel class="mb-4">
                                <InputNumber id="freight" v-model="modelsStore.getOrderModel.NavlunAlis" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                                <label for="freight">Freight</label>
                            </FloatLabel>
                        </div>
                        <div class="col-sm-6">
                            <FloatLabel>
                                <InputText id="freight_desc" v-model="modelsStore.getOrderModel.NavlunMekmarNot" />
                                <label for="freight_desc">Freight Desc.</label>
                            </FloatLabel>
                        </div>
                        
                    </div>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-6">
                            <FloatLabel class="mb-4">
                                <InputNumber id="detail_1" v-model="modelsStore.getOrderModel.DetayAlis_1" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                                <label for="detail_1">Detail 1</label>
                            </FloatLabel>
                        </div>
                        <div class="col-sm-6">
                            <FloatLabel>
                                <InputText id="detail_desc_1" v-model="modelsStore.getOrderModel.DetayMekmarNot_1" />
                                <label for="detail_desc_1">Detail 1 Desc.</label>
                            </FloatLabel>
                        </div>
                        
                    </div>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-6">
                            <FloatLabel class="mb-4">
                                <InputNumber id="detail_2" v-model="modelsStore.getOrderModel.DetayAlis_2" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                                <label for="detail_2">Detail 2</label>
                            </FloatLabel>
                        </div>
                        <div class="col-sm-6">
                            <FloatLabel>
                                <InputText id="detail_desc_2" v-model="modelsStore.getOrderModel.DetayMekmarNot_2" />
                                <label for="detail_desc_2">Detail 2 Desc.</label>
                            </FloatLabel>
                        </div>
                        
                    </div>
                    <div class="row m-auto text-center mt-4">
                        <div class="col-sm-12">
                            <FloatLabel class="mb-4">
                                <InputNumber id="insurance" v-model="modelsStore.getOrderModel.sigorta_Tutar" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid/>
                                <label for="insurance">Insurance</label>
                            </FloatLabel>
                        </div>
                    </div>
                </template>
            </Card>

        </div>
    </div>
</template>
<script setup lang="ts">
    import { useOrdersStore } from '~/store/orders';
    import { useModelsStore } from '~/store/models';
    import { onMounted } from 'vue';
    /*Variables */
    const props = defineProps({
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
        status:{
            type:Boolean,
            required:true
        }
    });
    const { delivery, payment, country,invoice,status } = props;
    const ordersStore = useOrdersStore();
    const modelsStore = useModelsStore();
    const nuxtApp = useNuxtApp();
    let selectedDelivery = ref();
    let selectedPayment = ref();
    let selectedCountry = ref();
    let selectedInvoice = ref();
    let selectedMaturity = ref();
    /*Variables */

    /*Functions */
    const detailInput_2 = async (event:any)=>{
        await ordersStore.setOrderSumOther_2(event.value);
    };
    const detailInput_1 = async (event:any)=>{
        await ordersStore.setOrderSumOther_1(event.value);
    };
    const onUpload = (file:any)=>{

    };
    const invoiceSelected = (event:any)=>{
        modelsStore.getOrderModel.FaturaKesimTurID = event.value.ID;
        modelsStore.getOrderModel.FaturaAdi = event.value.FaturaAdi;
    };

    const countrySelected = (event:any)=>{
        modelsStore.getOrderModel.UlkeId = event.value.Id;
        modelsStore.getOrderModel.UlkeAdi = event.value.UlkeAdi;
    };

    const maturitySelected = (event:any)=>{
        modelsStore.getOrderModel.Vade = nuxtApp.$dtsa(event);
    };
    const paymentSelected = (event:any)=>{
        modelsStore.getOrderModel.OdemeTurID = event.value.ID;
        modelsStore.getOrderModel.OdemeTur = event.value.OdemeTur;
        if(event.value.ID == 1 || event.value.ID==2){
            modelsStore.getOrderModel.SiparisDurumID = 1;
        }else{
            modelsStore.getOrderModel.SiparisDurumID = 2;
        }

    };

    const deliverySelected = (event:any)=>{
        modelsStore.getOrderModel.TeslimTurID = event.value.ID;
        modelsStore.getOrderModel.TeslimTur = event.value.TeslimTur;
    };

    /*Functions */
    onMounted(async()=>{
        if(!ordersStore.getNewButtonStatus){
            selectedDelivery.value = delivery.find(x=>{
                return x.ID == modelsStore.getOrderModel.TeslimTurID;
            });
            selectedPayment.value = payment.find(x=>{
                return x.ID == modelsStore.getOrderModel.OdemeTurID;
            });
            selectedMaturity.value = nuxtApp.$dtsa(modelsStore.getOrderModel.Vade);
            selectedCountry.value = country.find(x=>{
                return x.Id == modelsStore.getOrderModel.UlkeId;
            });
            selectedInvoice.value = invoice.find(x=>{
                return x.ID == modelsStore.getOrderModel.FaturaKesimTurID;
            });
        }
    });


</script>