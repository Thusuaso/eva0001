<template>
    <DataTable 
        :value="orderStore.getProductionOrders" 
        rowGroupMode="rowspan" 
        :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']" 
        :sortOrder="-1" 
        tableStyle="min-width: 50rem;font-size:70%"
        v-model:filters="filters"
        :globalFilterFields="['SiparisTarihi','SiparisNo', 'FirmaAdi', 'UrunAdi', 'UrunUretimAciklama', 'En', 'Boy', 'Kenar','UrunFirmaAdi']"
        filterDisplay="row"
        v-model:selection="selectedProductionOrder"
        selectionMode="single"
        @row-click="orderProductionSelected($event)"
    >
        <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
        </template>
        <Column field="SiparisTarihi" header="O. Date" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #body="slotProps">
            {{ nuxtApp.$dtsa(slotProps.data.SiparisTarihi) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="FirmaAdi" header="Customer" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="SiparisNo" header="Po" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>

        <Column field="PI" header="PI" style="min-width: 80px">
            <template #body="slotProps">
            <div v-if="slotProps.data.EvrakDurum > 0">
              <a :href="
                  'https://file-service.mekmar.com/file/download/2/' +
                  slotProps.data.SiparisNo
                ">
                <i class="pi pi-download" />
              </a>
            </div>
            <div v-else>
              <a>
                <i class="pi pi-download" />
              </a>
            </div>
          </template>
        </Column>
        <Column field="UrunAdi" header="Product" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"/>
        </template>
        </Column>
        <Column field="UrunUretimAciklama" header="Details" style="min-width: 80px"></Column>
        <Column field="En" header="Width" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()" />
        </template>
        </Column>
        <Column field="Boy" header="Height" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()" />
        </template>
        </Column>
        <Column field="Kenar" header="Thickness" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
        </template>
        </Column>
        <Column field="UrunFirmaAdi" header="Supplier" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #body="slotProps">
            <div v-if="slotProps.data.TedarikciID == 1 || slotProps.data.TedarikciID == 123" >
              {{ slotProps.data.UrunFirmaAdi }}
            </div>
            <div v-else :style="{ color: slotProps.data.Isf ? '' : 'red' }">
              {{ slotProps.data.UrunFirmaAdi }}
            </div>
          </template>
          
          <template #filter="{ filterModel, filterCallback }">
            <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
        </template>
        </Column>
        <Column field="Miktar" header="Amount" style="min-width: 80px">
          <template #body="slotProps">
            {{ nuxtApp.$decimal(slotProps.data.Miktar) }}
          </template>
        </Column>
        <Column field="BirimAdi" header="Unit" style="min-width: 80px" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
        </template>
        </Column>
        <Column field="Ton" header="Ton" style="min-width: 80px">
          <template #body="slotProps">
            {{ nuxtApp.$decimal(slotProps.data.Ton) }}
          </template>
        </Column>
        <Column field="SatisFiyati" header="Price" style="min-width: 80px">
            <template #body="slotProps">
                {{ nuxtApp.$usd(slotProps.data.SatisFiyati) }}
            </template>
        </Column>
        <Column field="SatisToplam" header="Total" style="min-width: 80px">
            <template #body="slotProps">
                {{ nuxtApp.$usd(slotProps.data.SatisToplam) }}
            </template>
        </Column>


    </DataTable>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useOrdersStore } from '~/store/orders';
/*Variables */
const orderStore = useOrdersStore();
const nuxtApp = useNuxtApp();
const toast = useToast();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },






});
const selectedProductionOrder = ref();
const emit = defineEmits(['order_production_selected_emit'])
/*Variables */

/*Function*/
const orderProductionSelected = async(event:any)=>{
  const { data:products } = await useFetch(`/api/orders/process/product/list/${event.data.SiparisNo}`);
  if(products.value.error){
    toast.add({severity:'error',summary:'Products',detail:'An error has occurred.',life:3000});
  }else{
    if(products.value.status){
      orderStore.setProducts(products.value.list);
    }else{
      toast.add({severity:'error',summary:'Products',detail:'An error has occurred.',life:3000});
    }
  }
  await emit('order_production_selected_emit',event.data);
};
/*Function*/


</script>