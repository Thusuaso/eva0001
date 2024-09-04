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
                        <InputNumber id="purchase-price" v-model="productModel.AlisFiyati" :minFractionDigits="4" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid :disabled="productInputDisabled"/>
                        <label for="purchase-price">Purchase Price</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputNumber id="sale-price" v-model="productModel.SatisFiyati" :minFractionDigits="4" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid :disabled="productInputDisabled"/>
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
                        <InputNumber id="amount" v-model="productModel.Miktar" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="amount">Amount</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="piece" v-model="productModel.Adet" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="piece">Piece</label>
                    </FloatLabel>
                </div>

            </div>
            <div class="row">
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputText class="w-100" id="queue" v-model="productModel.SiraNo" disabled />
                        <label for="queue">#</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="m2" v-model="productModel.OzelMiktar" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="m2">M2</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel class="w-100">
                        <InputNumber id="ton" v-model="productModel.Ton" inputId="locale-us" locale="en-US" :minFractionDigits="4" fluid :disabled="productInputDisabled"/>
                        <label for="ton">Ton</label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div class="col-sm-8">
            <FloatLabel class="w-100 mb-4">
                <Textarea v-model="productModel.MusteriAciklama" rows="11" cols="30" class="w-100" :disabled="productInputDisabled"/>
                <label>Explanation (En)</label>
            </FloatLabel>
            <FloatLabel class="w-100">
                <Textarea v-model="productModel.UretimAciklama" rows="10" cols="30" class="w-100" :disabled="productInputDisabled"/>
                <label>Explanation (Tr)</label>
            </FloatLabel>
            <div class="row">
                <div class="col-sm-3">
                    <Button label="New" severity="secondary" class="w-100" @click="newForm"/>
                </div>
                <div class="col-sm-3">
                    <Button label="Add" severity="success" class="w-100" :disabled="productInputDisabled"/>
                </div>
                <div class="col-sm-3">
                    <Button label="Update" severity="warn" class="w-100" :disabled="productInputDisabled"/>
                </div>
                <div class="col-sm-3">
                    <Button label="Delete" severity="danger" class="w-100" :disabled="productInputDisabled"/>
                </div>
            </div>

        </div>

    </div>
    
    <Dialog v-model:visible="card_visible_dialog" header="" modal :style="{ width: '50rem' }">
        <CardsList :cards="cardList" @selected_card_emit="selectedCardEmit($event)"/>
    </Dialog>
</template>
<script setup lang="ts">
const props = defineProps({
    model: {
        type: Object,
        required: true
    },
    productModel:{
        type:Object,
        required:true
    },
    productList:{
        type:Array,
        required:true
    },
    supplier:{
        type:Array,
        required:true
    },
    unit:{
        type:Array,
        required:true
    }
});
const { model,supplier,unit,productModel } = props;
/*Variables */
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
    model.TedarikciAdi = event.value.FirmaAdi;
    model.TedarikciId = event.value.ID;
};
const unitSelected = (event:any)=>{
    productModel.UrunBirimID = event.value.ID;
    productModel.UrunBirimAdi = event.value.BirimAdi;

};
const newForm = ()=>{
    productInputDisabled.value = false;
};



/*Function */




</script>