<template>
    <div>
        <DataTable :value="store.getList" tableStyle="min-width: 50rem"
            class="p-datatable-sm" paginator :rows="20"
            v-model:filters="filters"
            filterDisplay="row"
            @filter="filtersList($event)"
            v-model:selection="selectedProduct"
            selectionMode="single"
            @row-click="productSelected($event)"
            
        >
            <Column field="KasaNo" header="Crate No" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="Tarih" header="Date" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ nuxtApp.$dtsa(slotProps.data.Tarih) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="KategoriAdi" header="Category" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="OcakAdi" header="Quarry" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>

            <Column field="UrunAdi" header="Product" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #footer>
                    {{ nuxtApp.$decimal(store.getListTotal.crate) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="YuzeyIslemAdi" header="Surface" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"style="width:100px;"/>
                </template>
            </Column>
            <Column field="En" header="Width" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="Boy" header="Height" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="Kenar" header="Thickness" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="Adet" header="Pcs. in Box">
                <template #body="slotProps">
                    {{ nuxtApp.$decimal(slotProps.data.Adet) }}
                </template>
                <template #footer>
                    {{ nuxtApp.$decimal(store.getListTotal.piece) }}
                </template>
            </Column>
            <Column field="KutuAdet" header="Box Amount">
                <template #body="slotProps">
                    {{ nuxtApp.$decimal(slotProps.data.KutuAdet) }}
                </template>
                <template #footer>
                    {{ nuxtApp.$decimal(store.getListTotal.box) }}
                </template>
            </Column>
            <Column field="Miktar" header="Amount">
                <template #body="slotProps">
                    {{ nuxtApp.$decimal(slotProps.data.Miktar) }}
                </template>
                <template #footer>
                    {{ nuxtApp.$decimal(store.getListTotal.amount) }}
                </template>
            </Column>
            <Column field="Kutu" header="Box">
                <template #body="slotProps">
                    <div v-if="slotProps.data.Kutu">
                        ✓
                    </div>
                    <div v-else>
                        x
                    </div>
                </template>

            </Column>
            <Column field="Bagli" header="Binded">
                <template #body="slotProps">
                    <div v-if="slotProps.data.Bagli">
                        ✓
                    </div>
                    <div v-else>
                        x
                    </div>
                </template>
            </Column>
            <Column field="SiparisAciklama" header="Po" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            </Column>
            <Column field="Aciklama" header="Exp." :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" style="width:50px;"/>
                </template>
            
            </Column>


        </DataTable>

    </div>
</template>

<script setup lang="ts">
    import { FilterMatchMode } from '@primevue/core/api';
    import { useSelectionStore } from '~/store/selection';
    const nuxtApp = useNuxtApp();
    const store = useSelectionStore();
    const selectedProduct = ref();
    const emits = defineEmits(['selected_product_emit'])
    const filters = ref({
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH }



    });

    const filtersList = async (event:any)=>{
        const selectionTotalList = {
        'crate':0,
        'piece':0,
        'amount':0,
        'box':0
        };
        selectionTotalList.crate = event.filteredValue.length;
        await event.filteredValue.forEach(x=>{
            selectionTotalList.piece += x.Adet;
            selectionTotalList.amount += x.Miktar;
            selectionTotalList.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList);



    };

    const productSelected = (event:any)=>{
        emits('selected_product_emit',event.data);
    };

</script>