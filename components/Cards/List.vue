<template>
    <DataTable :value="cardStore.getCardList" paginator :rows="20" tableStyle="min-width: 50rem"
      v-model:filters="filters"
      filterDisplay="row"
      selectionMode="single"
      v-model:selection="selectedCard"
      @row-click="cardSelected($event)"
      sortField="ID" :sortOrder="-1"
    
    >
        <Column field="ID" header="ID" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="KategoriAdi" header="Category" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="UrunAdi" header="Product" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="YuzeyIslemAdi" header="Surface" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="En" header="Width" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }" >
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="Boy" header="Height" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>
        <Column field="Kenar" header="Thickness" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText class="w-100" v-model="filterModel.value" type="text" @input="filterCallback()"  />
          </template>
        </Column>

    </DataTable>


</template>
<script setup lang="ts">
import {ref} from 'vue';
import {FilterMatchMode} from '@primevue/core/api';
import { useCardsStore } from '~/store/cards';
const cardStore = useCardsStore();
const filters = ref({
    ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },


});
const selectedCard = ref();

const emit = defineEmits(['selected_card_emit'])
const cardSelected = (event:any)=>{
  emit('selected_card_emit',event.data);
};

</script>