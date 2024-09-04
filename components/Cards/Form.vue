<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedCategory" inputId="categories" :suggestions="filteredCategories" optionLabel="KategoriAdi" @complete="searchCategories($event)" @item-select="categorySelected($event)" @input="categoryInput($event)" />
                <label for="categories">Categories</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedProduct" inputId="products" :suggestions="filteredProducts" optionLabel="UrunAdi" @complete="searchProducts($event)" @item-select="productSelected($event)" @input="productInput($event)"/>
                <label for="products">Products</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedSurface" inputId="surfaces" :suggestions="filteredSurfaces" optionLabel="YuzeyIslemAdi" @complete="searchSurfaces($event)" @item-select="surfaceSelected($event)" @input="surfaceInput($event)"/>
                <label for="surfaces">Surfaces</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedWidth" inputId="width" :suggestions="filteredWidths" optionLabel="En" @complete="searchWidths($event)" @item-select="widthSelected($event)" @input="widthInput($event)"/>
                <label for="width">Width</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedHeight" inputId="height" :suggestions="filteredHeights" optionLabel="Boy" @complete="searchHeights($event)" @item-select="heightSelected($event)" @input="heightInput($event)"/>
                <label for="height">Height</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedThickness" inputId="thickness" :suggestions="filteredThicknesses" optionLabel="Kenar" @complete="searchThicknesses($event)" @item-select="thicknessSelected($event)" @input="thicknessInput($event)"/>
                <label for="thickness">Thickness</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row m-auto text-center mt-4">
        <div  :class="status ? 'col-sm-12':'col-sm-6'">
            <Button type="button" :label="status ? 'Save':'Update'" class="p-button-success w-100" @click="process"/>
        </div>
        <div :class="!status ? 'col-sm-6':''" v-if="!status">
            <Button type="button" label="Delete" class="p-button-danger w-100" @click="deleted"/>
        </div>

    </div>
</template>
<script setup lang="ts">
    import { useCardsStore } from '~/store/cards';
    import SocketConnection from '@/io';
    const toast = useToast();
    const cardStore = useCardsStore();
    const emit  = defineEmits(['card_dialog_closed']);
    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        },
        categories:{
            type:Array,
            required:true
        },
        products:{
            type:Array,
            required:true
        },
        surfaces:{
            type:Array,
            required:true
        },
        sizes:{
            type:Array,
            required:true
        }
    });
    const { model, status,categories,products,surfaces,sizes } = props;
    let selectedCategory = ref();
    let filteredCategories = ref();
    const searchCategories = (event:any)=>{
        let res = [];
        if(event.query.length === 0){
            res = categories;
        }else{
            res = categories.filter(x=>{
                return x.KategoriAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredCategories.value = res;
    };
    const categorySelected = (event:any)=>{
        model.KategoriAdi = event.value.KategoriAdi;
        model.KategoriID = event.value.ID;
    };
    const categoryInput = (event:any)=>{
        model.KategoriID = 0;
        model.KategoriAdi = event.target._value;
    };

    let selectedProduct = ref();
    let filteredProducts = ref();
    const searchProducts = (event:any)=>{
        let res = [];
        if(event.query.length === 0){
            res = products;
        }else{
            res = products.filter(x=>{
                return x.UrunAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredProducts.value = res;
    };
    const productSelected = (event:any)=>{
        model.UrunID = event.value.ID;
        model.UrunAdi = event.value.UrunAdi;
    }
    const productInput = (event:any)=>{
        model.UrunID = 0;
        model.UrunAdi = event.target._value;
    };

    let selectedSurface = ref();
    let filteredSurfaces = ref();
    const searchSurfaces = (event:any)=>{
        let res = [];
        if(event.query.length === 0){
            res = surfaces;
        } else{
            res = surfaces.filter(x=>{
                return x.YuzeyIslemAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredSurfaces.value = res;
    };
    const surfaceSelected = (event:any)=>{
        model.YuzeyIslemID = event.value.ID;
        model.YuzeyIslemAdi = event.value.YuzeyIslemAdi;
    };
    const surfaceInput = (event:any)=>{
        model.YuzeyIslemID = 0;
        model.YuzeyIslemAdi = event.target._value;
    };

    let selectedWidth = ref();
    let filteredWidths = ref();
    const searchWidths = (event:any)=>{
        let res = [];
        if(event.query.length === 0){
            res = sizes;
        } else{
            res = sizes.filter(x=>{
                return x.En.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredWidths.value = res;
    };
    const widthSelected = (event:any)=>{
        model.En = event.value.En;
    };
    const widthInput = (event:any)=>{
        model.En = event.target._value;
    };

    let selectedHeight = ref();
    let filteredHeights = ref();
    const searchHeights = (event:any)=>{
        let res = [];
        if(event.query.length === 0){
            res = sizes;
        } else{
            res = sizes.filter(x=>{
                return x.Boy.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredHeights.value = res;
    };
    const heightSelected = (event:any)=>{
        model.Boy = event.value.Boy;
    };
    const heightInput = (event:any)=>{
        model.Boy = event.target._value;
    };

    let selectedThickness = ref();
    let filteredThicknesses = ref();
    const searchThicknesses = (event:any)=>{
        let res = [];
        if(event.query.length === 0){
            res = sizes;
        } else{
            res = sizes.filter(x=>{
                return x.Kenar.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredThicknesses.value = res;
    };
    const thicknessSelected = (event:any)=>{
        model.Kenar = event.value.Kenar;
    };
    const thicknessInput = (event:any)=>{
        model.Kenar = event.target._value;
    };

    const process = ()=>{
        if(status){
            save();
        }else{
            update();
        }
    };
    const save = async () =>{
        const { data:card } = await useFetch('/api/cards/process/save',{
            method:'POST',
            body:model
        });
        if(card?.value?.error){
            toast.add({severity:'error',summary:'Cards',detail:'An error has occurred.',life:3000});
        }else{
            if(card?.value?.status){
                toast.add({severity:'success',summary:'Cards',detail:'The card has been saved.',life:3000});
                cardStore.addCard({...model,'ID':card?.value?.id,'OlcuID':card?.value?.sizeID});
                emit('card_dialog_closed');
                /*Socket IO */
                const socket = new SocketConnection();
                socket.socket?.emit('cards_list_updated_emit');
                /*Socket IO */
                reset();
            }else{
                toast.add({severity:'error',summary:'Cards',detail:'The card save failed.',life:3000});
            }
        }
    };
    const update = async ()=>{
        const {data:card} = await useFetch('/api/cards/process/update',{
            method:'PUT',
            body:model
        });
        if(card.value.error){
            toast.add({severity:'error',summary:'Cards',detail:'An error has occurred.',life:3000});
        }else{
            if(card?.value.status){
                toast.add({severity:'success',summary:'Cards',detail:'The card has been updated.',life:3000});
                cardStore.updateCard(model);
                emit('card_dialog_closed');

            }else{
                toast.add({severity:'error',summary:'Cards',detail:'The card update failed.',life:3000});
            }
        }

    };

    const deleted = async ()=>{
        const {data:card} = await useFetch(`/api/cards/process/deleted/${model.ID}`,{
            method:'DELETE'
        }); 
        if(card.value.error){
            toast.add({severity:'error',summary:'Cards',detail:'An error has occurred.',life:3000});

        }else{
            if(card?.value.status){
                toast.add({severity:'success',summary:'Cards',detail:'The card has been deleted.',life:3000});
                cardStore.deleteCard(model.ID);
                /*Socket IO */
                const socket = new SocketConnection();
                socket.socket?.emit('cards_list_updated_emit');
                /*Socket IO */
                emit('card_dialog_closed');
            }else{
                toast.add({severity:'error',summary:'Cards',detail:'The card delete failed.',life:3000});
            };
        }
    };
    if(!status){
        selectedCategory.value = categories.find(x=>x.ID == model.KategoriID);
        selectedProduct.value = products.find(x=>x.ID == model.UrunID);
        selectedSurface.value = surfaces.find(x=>x.ID == model.YuzeyIslemID);
        selectedWidth.value = sizes.find(x=>x.ID == model.OlcuID);
        selectedHeight.value = sizes.find(x=>x.ID == model.OlcuID);
        selectedThickness.value = sizes.find(x=>x.ID == model.OlcuID);
    };
    const reset = ()=>{
        selectedCategory.value  = {}
        selectedProduct.value  = {}
        selectedSurface.value  = {}
        selectedWidth.value  = {}
        selectedHeight.value  = {}
        selectedThickness.value  = {}
    };




</script>