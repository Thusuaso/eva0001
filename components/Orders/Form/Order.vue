<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <div class="row mb-4">
                <div class="col-sm-9">
                    <FloatLabel>
                        <InputText style="width:250px;" id="card_id" v-model="cardId" disabled/>
                        <label for="card_id">Card Id</label>
                    </FloatLabel>
                    

                </div>
                <div class="col-sm-3">
                    <Button type="button" class="p-button-secondary" label="@" @click="openCards" :disabled="productInputDisabled"/>
                </div>

            </div>
            <FloatLabel class="mb-4">
                <InputText class="w-100" id="category" v-model="category" disabled/>
                <label for="category">Category</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputText class="w-100" id="product" v-model="product" disabled/>
                <label for="product">Product</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputText class="w-100" id="surface" v-model="surface" disabled/>
                <label for="surface">Surface</label>
            </FloatLabel>
            <FloatLabel class="mb-4">
                <InputText class="w-100" id="size" v-model="size" disabled/>
                <label for="size">Size</label>
            </FloatLabel>
            <FloatLabel class="mb-4 w-100">
                <AutoComplete class="w-100" v-model="selectedSupplier" inputId="supplier" :suggestions="filteredSupplier" @complete="searchSupplier($event)" @item-select="supplierSelected($event)" optionLabel="FirmaAdi" :disabled="productInputDisabled"/>
                <label for="supplier">Supplier</label>
            </FloatLabel>
            <div class="row mb-4">
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputNumber id="purchase-price" v-model="modelsStore.getProductModel.AlisFiyati" :minFractionDigits="4" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid :disabled="productInputDisabled"/>
                        <label for="purchase-price">Purchase Price</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputNumber id="sale-price" v-model="modelsStore.getProductModel.SatisFiyati" :minFractionDigits="4" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid :disabled="productInputDisabled"/>
                        <label for="sale-price">Sale Price</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <Select v-model="selectedUnit" inputId="unit" :options="unit" optionLabel="BirimAdi" class="w-100" @change="unitSelected($event)" :disabled="productInputDisabled"/>
                        <label for="unit">Unit</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="amount" v-model="modelsStore.getProductModel.Miktar" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="amount">Amount</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="piece" v-model="modelsStore.getProductModel.Adet" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="piece">Piece</label>
                    </FloatLabel>
                </div>

            </div>
            <div class="row">
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputText class="w-100" id="queue" v-model="modelsStore.getProductModel.SiraNo" disabled />
                        <label for="queue">#</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="m2" v-model="modelsStore.getProductModel.OzelMiktar" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="m2">M2</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="ton" v-model="modelsStore.getProductModel.Ton" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="ton">Ton</label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div class="col-sm-8">
            <FloatLabel class="w-100 mb-4">
                <Textarea v-model="modelsStore.getProductModel.MusteriAciklama" rows="11" cols="30" class="w-100" :disabled="productInputDisabled"/>
                <label>Explanation (En)</label>
            </FloatLabel>
            <FloatLabel class="w-100">
                <Textarea v-model="modelsStore.getProductModel.UretimAciklama" rows="10" cols="30" class="w-100" :disabled="productInputDisabled"/>
                <label>Explanation (Tr)</label>
            </FloatLabel>
            <div class="row" v-if="!orderStore.getNewButtonStatus">
                <div class="col-sm-3">
                    <Button label="New" severity="secondary" class="w-100" @click="newForm" :disabled="product_new_disabled"/>
                </div>
                <div class="col-sm-3">
                    <Button label="Add" severity="success" class="w-100" @click="add" :disabled="product_add_disabled"/>
                </div>
                <div class="col-sm-3">
                    <Button label="Update" severity="warn" class="w-100" @click="updated" :disabled="product_updated_disabled"/>
                </div>
                <div class="col-sm-3">
                    <Button label="Delete" severity="danger" class="w-100" @click="deleted" :disabled="product_deleted_disabled"/>
                </div>
            </div>

        </div>

    </div>
    <DataTable :value="orderStore.getProducts" tableStyle="min-width: 50rem"
        v-model:selection="selectedProduct" selectionMode="single"
        @row-click=productSelected($event)
    >
        <Column header="#" field="SiraNo"></Column>
        <Column header="Supplier" field="TedarikciAdi"></Column>
        <Column header="Product" field="UrunAdi"></Column>
        <Column header="Surface" field="YuzeyIslemAdi"></Column>
        <Column header="Width" field="En"></Column>
        <Column header="Height" field="Boy"></Column>
        <Column header="Thickness" field="Kenar"></Column>
        <Column header="M2" field="Miktar">
            <template #body="slotProps">
                {{ nuxtApp.$decimal(slotProps.data.Miktar) }}
            </template>
        </Column>
        <Column header="Piece" field="Adet">
            <template #body="slotProps">
                {{ nuxtApp.$decimal(slotProps.data.Adet) }}
            </template>
        </Column>
        <Column header="Mt" field="Mt">
            <template #body="slotProps">
                {{ nuxtApp.$decimal(slotProps.data.Mt) }}
            </template>
        </Column>
        <Column header="Ton" field="Ton">
            <template #body="slotProps">
                {{ nuxtApp.$decimal(slotProps.data.Ton) }}
            </template>
        </Column>
        <Column header="Ö.M" field="OzelMiktar">
            <template #body="slotProps">
                {{ nuxtApp.$decimal(slotProps.data.OzelMiktar) }}
            </template>
        </Column>
        <Column header="Price" field="SatisFiyati">
            <template #body="slotProps">
                {{ nuxtApp.$usd(slotProps.data.SatisFiyati) }}
            </template>
        </Column>
        <Column header="Total" field="SatisToplam">
            <template #body="slotProps">
                {{ nuxtApp.$usd(slotProps.data.SatisToplam) }}
            </template>
        </Column>


    </DataTable>


    <Dialog v-model:visible="card_visible_dialog" header="" modal :style="{ width: '50rem' }">
        <CardsList :cards="cardList" @selected_card_emit="selectedCardEmit($event)"/>
    </Dialog>
</template>
<script setup lang="ts">
import { useModelsStore } from '~/store/models';
import { useOrdersStore } from '~/store/orders';


/*Variables */
const nuxtApp = useNuxtApp();
const modelsStore = useModelsStore();
const orderStore = useOrdersStore();
const toast = useToast();
const emit = defineEmits(['product_model_reset_emit'])
const props = defineProps({


    supplier:{
        type:Array,
        required:true
    },
    unit:{
        type:Array,
        required:true
    },

});
const { supplier,unit } = props;
let cardId = ref();
let category = ref();
let product = ref();
let surface = ref();
let size = ref();
let card_visible_dialog = ref(false);
let cardList = ref();
let selectedSupplier = ref();
let filteredSupplier = ref();
let selectedUnit = ref();
let productInputDisabled = ref(true);
let selectedProduct = ref();
let product_add_disabled = ref(true);
let product_updated_disabled = ref(true);
let product_deleted_disabled = ref(true);
let product_new_disabled = ref(false);

/*Variables */



/*Function */
const openCards = async ()=>{
    const { data:cards } = await useFetch('/api/cards/list');
    cardList.value = cards.value.list;
    card_visible_dialog.value = true;
};
const selectedCardEmit = async(event:any)=>{
    cardId.value = event.ID;
    category.value = event.KategoriAdi;
    product.value = event.UrunAdi;
    surface.value = event.YuzeyIslemAdi;
    size.value = event.En + 'x' + event.Boy + 'x' + event.Kenar; 
    card_visible_dialog.value = false;
    modelsStore.getProductModel.UrunKartID = event.ID;
    modelsStore.getProductModel.KategoriAdi = event.KategoriAdi;
    modelsStore.getProductModel.UrunAdi = event.UrunAdi;
    modelsStore.getProductModel.YuzeyIslemAdi = event.YuzeyIslemAdi;
    modelsStore.getProductModel.En = event.En;
    modelsStore.getProductModel.Boy = event.Boy;
    modelsStore.getProductModel.Kenar = event.Kenar;
    modelsStore.getProductModel.KategoriID = event.KategoriID;
    modelsStore.getProductModel.UrunID = event.UrunID;
    modelsStore.getProductModel.YuzeyIslemID = event.YuzeyIslemID;
    modelsStore.getProductModel.OlcuID = event.OlcuID;
    modelsStore.getProductModel.MusteriAciklama = event.KategoriAdi + '-' + event.UrunAdi + '-' + event.YuzeyIslemAdi + '-' + event.En + 'x' + event.Boy + 'x' + event.Kenar;





};
const searchSupplier = (event:any)=>{
    let res = null;
    if(event.query.length ===0){
        res = supplier;
    }else{
        res = supplier.filter(x=>{
            return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
    };
    filteredSupplier.value = res;
}
const supplierSelected = (event:any)=>{
    modelsStore.getProductModel.TedarikciAdi = event.value.FirmaAdi;
    modelsStore.getProductModel.TedarikciId = event.value.ID;
};
const unitSelected = (event:any)=>{
    modelsStore.getProductModel.UrunBirimID = event.value.ID;
    modelsStore.getProductModel.UrunBirimAdi = event.value.BirimAdi;

};
const newForm = ()=>{
    modelsStore.getProductModel.SiraNo = orderStore.getProducts.length + 1;
    productInputDisabled.value = false;
    product_add_disabled.value = false;
    product_new_disabled.value = true;
};
const add = async ()=>{
    modelsStore.getProductModel.SiparisNo = await modelsStore.getOrderModel.SiparisNo;
    modelsStore.getProductModel.SatisToplam = await (parseFloat(modelsStore.getProductModel.SatisFiyati) * parseFloat(modelsStore.getProductModel.Miktar));
    const { data:product } = await useFetch('/api/orders/process/product/save',{
        method:'POST',
        body:modelsStore.getProductModel
    });
    if(product.value.error){
        toast.add({severity:'error',summary:'Products',detail:'An error has occurred.',life:3000});
    }else{
        if(product.value.status){
            await orderStore.addProduct({...modelsStore.getProductModel,'ID':product.value.id});
            toast.add({severity:'success',summary:'Products',detail:'Product added successfully.',life:3000});
            reset();
            product_add_disabled.value = true;
            product_new_disabled.value = false;
        }else{
            toast.add({severity:'error',summary:'Products',detail:'Product added unsuccessfully.',life:3000});
        }
    }

};
const reset =  ()=>{
    emit('product_model_reset_emit');
    cardId.value = ''
    category.value = ''
    product.value = ''
    surface.value = ''
    size.value = ''
    selectedSupplier.value = null;
    selectedUnit.value = null;
    productInputDisabled.value = true;
    selectedProduct.value = null;


} 

const updated = async ()=>{
    modelsStore.getProductModel.SatisToplam = await (parseFloat(modelsStore.getProductModel.SatisFiyati) * parseFloat(modelsStore.getProductModel.Miktar));
    await orderStore.updateProduct(modelsStore.getProductModel);
    reset();
    product_add_disabled.value = true;
    product_new_disabled.value = false;
    product_updated_disabled.value = true;
    product_deleted_disabled.value = true;

};

const deleted = async ()=>{
    await orderStore.deleteProduct(modelsStore.getProductModel.ID);
    reset();
    product_add_disabled.value = true;
    product_new_disabled.value = false;
    product_updated_disabled.value = true;
    product_deleted_disabled.value = true;

};
const productSelected = (event:any)=>{
    cardId.value = event.data.UrunKartID;
    category.value = event.data.KategoriAdi;
    product.value = event.data.UrunAdi;
    surface.value = event.data.YuzeyIslemAdi;
    size.value = event.data.MusteriAciklama;
    modelsStore.getProductModel.UrunKartID = event.data.UrunKartID;
    modelsStore.getProductModel.KategoriAdi = event.data.KategoriAdi;
    modelsStore.getProductModel.UrunAdi = event.data.UrunAdi;
    modelsStore.getProductModel.YuzeyIslemAdi = event.data.YuzeyIslemAdi;
    modelsStore.getProductModel.En = event.data.En;
    modelsStore.getProductModel.Boy = event.data.Boy;
    modelsStore.getProductModel.Kenar = event.data.Kenar;
    modelsStore.getProductModel.KategoriID = event.data.KategoriID;
    modelsStore.getProductModel.UrunID = event.data.UrunID;
    modelsStore.getProductModel.YuzeyIslemID = event.data.YuzeyIslemID;
    modelsStore.getProductModel.OlcuID = event.data.OlcuID;
    modelsStore.getProductModel.MusteriAciklama = event.data.MusteriAciklama;
    modelsStore.getProductModel.UretimAciklama = event.data.UretimAciklama;

    
    selectedSupplier.value = supplier.find(x=>{
        return x.ID = event.data.TedarikciId;
    });
    modelsStore.getProductModel.AlisFiyati = event.data.AlisFiyati;
    modelsStore.getProductModel.SatisFiyati = event.data.SatisFiyati;
    selectedUnit.value = unit.find(x=>{
        return x.ID = event.data.UrunBirimID;
    });
    modelsStore.getProductModel.Miktar = event.data.Miktar;
    modelsStore.getProductModel.Adet = event.data.Adet;
    modelsStore.getProductModel.OzelMiktar = event.data.OzelMiktar;
    modelsStore.getProductModel.Ton = event.data.Ton;
    modelsStore.getProductModel.SiraNo = event.data.SiraNo;


    product_add_disabled.value = true;
    product_new_disabled.value = true;
    product_updated_disabled.value = false;
    product_deleted_disabled.value = false;
    productInputDisabled.value = false;

}


/*Function */




</script>