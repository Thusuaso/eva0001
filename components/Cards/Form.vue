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
    <div class="row m-auto text-center">
        <div class="col-sm-4">

        </div>
        <div class="col-sm-4">
            
        </div>
        <div class="col-sm-4">
            
        </div>
    </div>
</template>
<script setup lang="ts">
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
        model.KategoriAdi = event;
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
        model.UrunAdi = event;
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
        model.YuzeyIslemAdi = event;
    };

</script>