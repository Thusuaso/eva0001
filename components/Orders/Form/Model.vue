<template>
    <div class="row m-auto text-center">
        <div class="col-sm-9">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">Order</Tab>
                    <Tab value="1">Proforma</Tab>
                    <Tab value="2">Cost</Tab>



                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <OrdersFormOrder 
                            :supplier="supplier"
                            :unit="unit"
                            :productList="ordersStore.getProducts"
                            @product_model_reset_emit="productModelResetEmit"
                        />
                    </TabPanel>
                    <TabPanel value="1">
                        <OrdersFormProforma
                            :delivery="delivery"
                            :payment="payment"
                            :country="country"
                            :invoice="invoice"
                            :status="ordersStore.getNewButtonStatus"
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <OrdersFormCost :cost="ordersStore.getOrdersCost"/>
                    </TabPanel>

                </TabPanels>
            </Tabs>




        </div>
        <div class="col-sm-3">
            <Button :label="ordersStore.getNewButtonStatus? 'Save':'Update'" :severity="ordersStore.getNewButtonStatus ? 'success':'warn' " type="button" @click="process" class="w-100"/>
            <Button label="Exit" severity="danger" type="button" @click="exit" class="w-100 mt-2 mb-4"/>
            <FloatLabel class="w-100 mb-4">
                <InputText class="w-100" id="username" v-model="modelStore.getOrderModel.SiparisNo" :disabled="order_po_disabled" />
                <label for="username">Po</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <DatePicker class="w-100" v-model="order_date" inputId="order_date" @date-select="orderDateSelect($event)" :disabled="order_date_disabled"/>
                <label for="order_date">Date</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <DatePicker class="w-100" v-model="estimated_date" inputId="est_ship_date" @date-select="estimatedDateSelect($event)" :disabled="order_date_disabled"/>
                <label for="est_ship_date">Estimated Ship. Date</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <AutoComplete lass="w-100 mb-4" v-model="selectedCustomer" inputId="customer" :suggestions="filteredCustomer" @complete="searchCustomer($event)" 
                    @item-select="customerSelected($event)"
                    optionLabel="FirmaAdi"
                    style="width: 100%;"
                    :disabled="order_customer_disabled"
                />
                <label for="customer">Customer</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <AutoComplete lass="w-100 mb-4" v-model="selectedSeller" inputId="seller" :suggestions="filteredSeller" @complete="searchSeller($event)" 
                    @item-select="sellerSelected($event)"
                    optionLabel="KullaniciAdi"
                    style="width: 100%;"
                />
                <label for="seller">Seller</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <AutoComplete lass="w-100 mb-4" v-model="selectedOperation" inputId="operation" :suggestions="filteredOperation" @complete="searchOperation($event)" 
                    @item-select="operationSelected($event)"
                    optionLabel="KullaniciAdi"
                    style="width: 100%;"
                />
                <label for="operation">Operation</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <AutoComplete lass="w-100 mb-4" v-model="selectedFinance" inputId="finance" :suggestions="filteredFinance" @complete="searchFinance($event)" 
                    @item-select="financeSelected($event)"
                    optionLabel="KullaniciAdi"
                    style="width: 100%;"
                />
                <label for="finance">Finance</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-4">
                <InputNumber id="Prepayment" v-model="modelStore.getOrderModel.Pesinat" :minFractionDigits="4" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid :disabled="true"/>
                <label for="Prepayment">Prepayment</label>
            </FloatLabel>
            <table class="table">
                <thead>
                    <tr>
                        <td scope="col">Total</td>
                        <td scope="col">{{ nuxtApp.$usd(ordersStore.getOrderTotalTable.product) }}</td>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Freight</td>
                        <td>{{ nuxtApp.$usd(ordersStore.getOrderTotalTable.freight) }}</td>

                    </tr>
                    <tr>
                        <td>Total (Other)</td>
                        <td>
                            {{ nuxtApp.$usd(ordersStore.getOrderTotalTable.detail_1 +ordersStore.getOrderTotalTable.detail_2) }}
                        </td>
                    </tr>
                    <tr>
                        <td>G.Total</td>
                        <td>{{ nuxtApp.$usd(
                            ordersStore.getOrderTotalTable.product +
                            ordersStore.getOrderTotalTable.freight +
                            ordersStore.getOrderTotalTable.detail_1 +  ordersStore.getOrderTotalTable.detail_2 
                        ) }}</td>

                    </tr>

                </tbody>
                </table>

            
        </div>

    </div>
</template>
<script setup lang="ts">
import { useOrdersStore } from '~/store/orders';
import { useModelsStore } from '~/store/models';
import SocketConnection from '@/io';
import { onMounted } from 'vue';
/*Variables */
const emit = defineEmits(['product_model_reset_emit','close_order_dialog_emit'])
const props = defineProps({


    supplier:{
        type:Array,
        required:true
    },
    unit:{
        type:Array,
        required:true
    },
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
    customer:{
        type:Array,
        required:true
    },
    user:{
        type:Array,
        required:true
    },
    po:{
        type:Array,
        required:true
    }
});
const { supplier,unit,delivery,payment,country,invoice,customer,user,po } = props;
const ordersStore = useOrdersStore();
const modelStore = useModelsStore();
const nuxtApp = useNuxtApp();
const toast = useToast();
let socket = new SocketConnection();
const userCookie = useCookie('goz_mekmar_user_id');
const usernameCookie = useCookie('goz_mekmar_user');
const selectedCustomer = ref();
const filteredCustomer = ref();
const selectedSeller = ref();
const filteredSeller = ref();
const selectedOperation = ref();
const filteredOperation = ref();
const selectedFinance = ref();
const filteredFinance = ref();
let order_po_disabled = ref(false);
let order_date_disabled = ref(false);
let order_customer_disabled = ref(false);
let order_date = ref();
let estimated_date = ref();
let order_id = ref();
/*Variables */

/*Function */
const productModelResetEmit = ()=>{
    emit('product_model_reset_emit')
};
const process = ()=>{
    if(ordersStore.getNewButtonStatus){
        save();
    }else{
        update();
    }
};
const save = async ()=>{
    modelStore.getOrderModel.KayitTarihi = nuxtApp.$dtsa(new Date());
    modelStore.getOrderModel.KullaniciID = userCookie.value;
    modelStore.getOrderModel.KayitYapan = usernameCookie.value;
    const { data:order } = await useFetch('/api/orders/process/order/save',{
        method: 'POST',
        body: modelStore.getOrderModel
    });
    if(order.value.err){
        toast.add({severity:'error',summary:'Order',detail:'An error has occurred.',life:3000});
    }else{
        if(order.value.status){
            toast.add({severity:'success',summary:'Order',detail:'Order saved successfully.',life:3000});
            await ordersStore.setNewButtonStatus(false);
            order_id.value = order?.value?.id;
        
            order_po_disabled.value = true;
            order_date_disabled.value = true;
            order_customer_disabled.value = true;
        }else{
            toast.add({severity:'error',summary:'Order',detail:'Order save unsuccessfully.',life:3000});
        }
    };

    


};
const update = async ()=>{
    let totalOrder = 0;
    await ordersStore.getProducts.forEach(async (x)=>{
        totalOrder += (x.Miktar * x.SatisFiyati);
    });
    modelStore.getOrderModel.MalBedeli = totalOrder;
    if(order_id.value == null || order_id.value == undefined){
        console.log();
    }else{
        modelStore.getOrderModel.ID = order_id.value;

    }
    // const { data:order } = await useFetch('/api/orders/process/order/update',{
    //     method:'PUT',
    //     body: modelStore.getOrderModel
    // })
};
const exit = async ()=>{
    await socket.socket?.emit('order_production_list_updated_emit');
    emit('close_order_dialog_emit');
};
const orderDateSelect = (date:any)=>{
    modelStore.getOrderModel.SiparisTarihi = nuxtApp.$dtsa(date);
    order_date.value = nuxtApp.$dtsa(date);
};
const estimatedDateSelect = (date:any)=> {
    modelStore.getOrderModel.TahminiYuklemeTarihi = nuxtApp.$dtsa(date);
    estimated_date.value = nuxtApp.$dtsa(date);
};
const searchCustomer = (event:any)=>{
    let res = [];
    if(event.query.length ==0){
        res = customer;
    }else{
        res = customer.filter((x=>{
            return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        }));
    };
    filteredCustomer.value = res;
};
const customerSelected = (event:any)=>{
    modelStore.getOrderModel.FirmaAdi = event.value.FirmaAdi;
    modelStore.getOrderModel.MusteriID = event.value.ID;

};
const searchSeller = (event:any)=>{
    let res = [];
    if(event.query.length ==0){
        res = user;
    }else{
        res = user.filter((x=>{
            return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        }));
    };
    filteredSeller.value = res;
};
const sellerSelected = (event:any)=>{
    modelStore.getOrderModel.SiparisSahibiAdi = event.value.KullaniciAdi;
    modelStore.getOrderModel.SiparisSahibi = event.value.ID;

};
const searchOperation = (event:any)=>{
    let res = [];
    if(event.query.length ==0){
        res = user;
    }else{
        res = user.filter((x=>{
            return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        }));
    };
    filteredOperation.value = res;
};
const operationSelected = (event:any)=>{
    modelStore.getOrderModel.OperasyonAdi = event.value.KullaniciAdi;
    modelStore.getOrderModel.Operasyon = event.value.ID;

};
const searchFinance = (event:any)=>{
    let res = [];
    if(event.query.length ==0){
        res = user;
    }else{
        res = user.filter((x=>{
            return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        }));
    };
    filteredFinance.value = res;
};
const financeSelected = (event:any)=>{
    modelStore.getOrderModel.FinansmanAdi = event.value.KullaniciAdi;
    modelStore.getOrderModel.Finansman = event.value.ID;

};

/*Function */

onMounted(async ()=>{
    if(!ordersStore.getNewButtonStatus){
        order_date.value = nuxtApp.$dtsa(modelStore.getOrderModel.SiparisTarihi);
        estimated_date.value = nuxtApp.$dtsa(modelStore.getOrderModel.TahminiYuklemeTarihi);
        selectedCustomer.value = customer.find(x=>{
            return x.ID == modelStore.getOrderModel.MusteriID;
        });
        selectedSeller.value = user.find(x=>{
            return x.ID == modelStore.getOrderModel.SiparisSahibi;
        });
        selectedOperation.value = user.find(x=>{
            return x.ID == modelStore.getOrderModel.Operasyon;
        });
        selectedFinance.value = user.find(x=>{
            return x.ID == modelStore.getOrderModel.Finansman;
        });
    };
});







</script>