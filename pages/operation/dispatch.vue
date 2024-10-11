<template>
    <div class="row m-auto text-center container mb-4">
        <div class="col-sm">
            <FloatLabel>
                <AutoComplete v-model="selectedPo" inputId="selected-po" :suggestions="filteredPo" optionLabel="SiparisNo" @complete="searchPo($event)" 
                    @item-select="poSelected($event)"
                    class="w-100"
                />
                <label for="selected-po">Po</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            
            <FloatLabel>
                <DatePicker v-model="selectedDate" inputId="shipment-date" showIcon iconDisplay="input" 
                    @date-select="dateSelected($event)"
                    class="w-100"
                />
                <label for="shipment-date">Shipment Date</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel>
                <InputText id="invoice-no" v-model="model.SiparisFaturaNo" class="w-100"/>
                <label for="invoice-no">Invoice No</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <div class="flex items-center">
                <Checkbox v-model="model.Takip" inputId="follow" :binary="true" />
                <label for="follow" class="ml-2"> Track </label>
            </div>
        </div>
        <div class="col-sm">
            <div class="flex items-center float-start">
                <Checkbox v-model="model.NormalSevk" inputId="regular-shipment" :binary="true" @change="regularShipmentChange($event)"/>
                <label for="regular-shipment" class="ml-2"> Regular Shipment </label>
            </div>
            <div class="flex items-center float-start">
                <Checkbox v-model="model.HizliSevk" inputId="fasted-shipment" :binary="true" @change="fastShipmentChange($event)"/>
                <label for="fasted-shipment" class="ml-2"> Fast Shipment </label>
            </div>
        </div>
        


    </div>
    <div class="row m-auto text-center container mb-4">
        <div class="col-sm-3">
            <FloatLabel class="w-full md:w-56">
                <Select v-model="selectedProduct" inputId="products" :options="productList" optionLabel="Aciklama" class="w-100" 
                    @change="productChange($event)" 
                    :disabled="dropdown_product_disabled"
                />
                <label for="products">Products</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputText id="order-amount" v-model="orderAmount" disabled class="w-100"/>
                <label for="order-amount">Order</label>
            </FloatLabel>

        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputText id="shipped-amount" v-model="shippedAmount" disabled class="w-100"/>
                <label for="shipped-amount">Shipped</label>
            </FloatLabel>
        </div>
        <div class="col-sm-3">
            <FloatLabel>
                <InputText id="remained-amount" v-model="remainedAmount" disabled class="w-100"/>
                <label for="remained-amount">Remained</label>
            </FloatLabel>
        </div>

    </div>
    <div class="row m-auto text-center container">
        <div class="col-sm-5" >
            <DataTable v-model:selection="selectedCrate" :value="crateList" dataKey="ID" 
                scrollable scrollHeight="400px" class="p-datatable-sm"
            >
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="KasaNo" header="Crate"></Column>
                <Column field="Miktar" header="Amount">
                    <template #body="slotProps">
                        {{ nuxtApp.$decimal(slotProps.data.Miktar) }}
                    </template>
                </Column>
                <Column field="BirimAdi" header="Unit"></Column>

            </DataTable>
        </div>
        <div class="col-sm-1" >
            <Button severity="warn" label="Send" @click="sendCrate" class="w-100"/>
        </div>
        <div class="col-sm-6" >
            <DataTable :value="model.Urunler" scrollable scrollHeight="400px" 
                class="p-datatable-sm"
            >
                <Column field="KasaNo" header="Crate"></Column>
                <Column field="UrunAdi" header="Product">
                    <template #footer>
                        {{ model.Urunler.length }}
                    </template>
                </Column>
                <Column  header="Size">
                    <template #body="slotProps">
                        {{ slotProps.data.En }} x {{ slotProps.data.Boy }} x {{ slotProps.data.Kenar }}
                    </template>
                </Column>
                <Column field="BirimAdi" header="Unit"></Column>
                <Column field="Miktar" header="Amount">
                    <template #body="slotProps">
                        {{ nuxtApp.$decimal(slotProps.data.Miktar) }}
                    </template>
                    <template #footer>
                        {{ nuxtApp.$decimal(sendingCrateTotal.amount) }}
                    </template>
                </Column>
                <Column  header="Total">
                    <template #body="slotProps">
                        {{ nuxtApp.$usd(slotProps.data.Miktar * slotProps.data.SatisFiyati) }}
                    </template>
                    <template #footer>
                        {{ nuxtApp.$usd(sendingCrateTotal.price) }}
                    </template>
                </Column>

            </DataTable>

        </div>

    </div>
    <div class="row m-auto text-center container">
        <div class="col-sm-12">
            <Button class="w-100" severity="success" label="Ship" @click="shipped"/>
        </div>
    </div>


</template>
<script setup lang="ts">
    const { data:po } = await useFetch('/api/shared/open-po',{
        method:'GET'
    });
    const toast = useToast();
    const poList = po?.value?.list;    
    const selectedPo = ref();
    let filteredPo = ref();
    const selectedDate = ref();
    const nuxtApp = useNuxtApp();
    let productList = ref();
    const selectedProduct = ref();
    let dropdown_product_disabled = ref(true);
    let crateList = ref([]);
    let selectedCrate = ref();
    let sendingCrateList = ref([]);
    let sendingCrateTotal = ref({
        'amount':0,
        'price':0
    });
    let model = ref({
        'SiparisNo':0,
        'YuklemeTarihi':'',
        'SiparisDurumID':3,
        'SiparisFaturaNo':'',
        'Takip':false,
        'NormalSevk':false,
        'HizliSevk':false,
        'Urunler':[]

    });

    let orderAmount = ref(0);
    let shippedAmount = ref(0);
    let remainedAmount = ref(0);

    const searchPo = (event:object)=>{
        let res;
        if(event.query.length == 0){
            res = poList;
        }else{
            res = poList.filter(x=>{
                return x.SiparisNo.toLowerCase().startsWith(event.query);
            });
        };
        filteredPo.value = res;
    };
    const poSelected = async (event:object)=>{
        model.value.SiparisNo = event?.value?.SiparisNo;
        const { data:products } = await useFetch(`/api/shared/products/all`,{
            method:'POST',
            body:{
                po:event.value.SiparisNo
            }
        });
        productList.value = products?.value?.list;
        dropdown_product_disabled.value = false;
        sendingCrateTotal.value = {
            'amount':0,
            'price':0
        };
        model.value.Urunler = [];
        crateList.value = [];
        orderAmount.value = 0;
        shippedAmount.value = 0;
        remainedAmount.value = 0;

    };
    const dateSelected = (event:any)=>{
        model.value.YuklemeTarihi = nuxtApp.$dtsa(event);
    };
    const regularShipmentChange = (event:any)=>{
        model.value.HizliSevk = false;
    };
    const fastShipmentChange = (event:any)=>{
        model.value.NormalSevk = false;
    };
    const productChange = async (event:any)=>{
        const { data:crate } = await useFetch('/api/shared/products/crate',{
            method:'POST',
            body:{
                po:event.value.SiparisNo,
                cardId:event.value.UrunKartID,
                orderId:event.value.ID
            }
        });
        crateList.value = crate.value.list;
        orderAmount.value = crate.value.orderAmount;
        shippedAmount.value = crate.value.productionAmount;
        remainedAmount.value = +(crate.value.orderAmount - crate.value.productionAmount).toFixed(2);
        console.log(crateList);
    };
    const sendCrate = async ()=>{
        if(remainedAmount.value == 0){
            await crateList.value.forEach(x=>{
            model.value.Urunler.push(x);
        });
        crateList.value = [];
        const index = productList.value.findIndex(x=>{
            return x.ID == selectedProduct.value.ID;
        });
        productList.value.splice(index,1);

        model.value.Urunler.forEach(x=>{
            sendingCrateTotal.value.amount += +x.Miktar;
            sendingCrateTotal.value.price += +(x.Miktar * x.SatisFiyati);
        });
        }else{
            toast.add({severity:'error',summary:'Dispatch',detail:'Please ship all products.',life:3000});
        }




    };
    const shipped = async ()=>{
        if(productList.length == 0){
            const { data:shipped } = await useFetch('/api/dispatch/ship',{
            method:'POST',
            body:model.value
        });
        if(shipped.value.error){
            toast.add({severity:'error',summary:'Dispatch',detail:'An error has occurred.',life:3000});
        }else{
            if(shipped.value.status){
                toast.add({ severity:'success',summary:'Dispatch',detail:'Saved successfully.',life:3000 });
            }else{
                toast.add({ severity:'error',summary:'Dispatch',detail:'Saved unsuccessfully.',life:3000 });
            };
        };
        }else{
            toast.add({severity:'error',summary:'Dispatch',detail:'Please select products.',life:3000});
        }





    };  
    


</script>