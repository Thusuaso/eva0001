<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm">
            <FloatLabel>
                <AutoComplete v-model="selectedSupplier" inputId="supplier" :suggestions="filteredSuppliers" @complete="searchSuppliers" 
                    optionLabel="FirmaAdi" @item-select="supplierSelected($event)"
                    class="w-100"
                />
                <label for="supplier">Suppliers</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel>
                <InputText id="width" v-model="store.getModel.Crate_Width" class="w-100"/>
                <label for="width">Width</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel>
                <InputText id="length" v-model="store.getModel.Crate_Height" class="w-100"/>
                <label for="length">Length</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel>
                <InputText id="height" v-model="store.getModel.Crate_Thickness" class="w-100"/>
                <label for="height">Height</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel>
                <InputText id="stone_size" v-model="store.getModel.Stone_Size" class="w-100"/>
                <label for="stone_size">Tile Size</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel>
                <InputText id="piece" v-model="store.getModel.Piece" class="w-100"/>
                <label for="piece">Piece</label>
            </FloatLabel>
        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :severity="status? 'success':'warn'" :label=" status ? 'Save':'Update'" class="w-100" @click="process"/>
        </div>
        <div class="col-sm-6" v-show="!status">
            <Button severity="danger" label="Delete" class="w-100" @click="deleted" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSelectionSizeStore } from '~/store/selection-size';
    const props = defineProps({
        suppliers:{
            type:Array,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        }
    });
    const { suppliers,status } = props;
    const emits = defineEmits(['selection_size_process_emit','selection_size_delete_emit']);
    const store = useSelectionSizeStore();
    const selectedSupplier = ref();
    let filteredSuppliers = ref();
    const searchSuppliers = (event:any)=>{
        let res;
        if(event.query.length == 0){
            res = suppliers;

        }else{
            res = suppliers.filter(supplier=>supplier?.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase()));
        };
        filteredSuppliers.value = res;
    };
    const supplierSelected = (event:any)=>{
        store.getModel.SupplierId = event.value.ID;
        store.getModel.Supplier = event.value.FirmaAdi;
    };
    const process = ()=>{
        emits('selection_size_process_emit',store.getModel);
    };
    const deleted = ()=>{
        emits('selection_size_delete_emit',store.getModel.ID);
    };
    if(!status){
        selectedSupplier.value = suppliers.find(x=>{
            return x.ID == store.getModel.SupplierId;
        })
    }
</script>