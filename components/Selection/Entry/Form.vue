<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            
            <FloatLabel class="w-full md:w-56">
                <Select v-model="selectedKindofSave" inputId="kind-of-save" :options="kinds" optionLabel="kind" class="w-100" 
                    @change="kindOfSaveSelected($event)"
                />
                <label for="kind-of-save">Kind of Save</label>
            </FloatLabel>


        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedSupplier" inputId="suppliers" :suggestions="filteredSuppliers" optionLabel="FirmaAdi"  @complete="searchSupplier($event)" 
                    @item-select="supplierSelected($event)"
                    class="w-100"
                />
                <label for="suppliers">Suppliers</label>
            </FloatLabel>

        </div>
        <div class="col-sm-4">
            <div class="row m-auto text-center">
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="category" v-model="model.KategoriAdi" disabled class="w-100"/>
                        <label for="category">Category</label>
                    </FloatLabel>

                </div>
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="product" v-model="model.UrunAdi" disabled class="w-100"/>
                        <label for="product">Products</label>
                    </FloatLabel>
                </div>

            </div>

        </div>

    </div>

    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel>
                <AutoComplete v-model="selectedPo" inputId="po" :suggestions="filteredPo" optionLabel="SiparisNo" @complete="searchPo($event)"
                    @item-select="poSelected($event)"
                    class="w-100"
                    :disabled="po_dropdown_disabled"
                    
                />
                <label for="po">Po</label>
            </FloatLabel>

        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <DatePicker v-model="selectedDate" inputId="date" @date-select="dateSelected($event)" class="w-100" dateFormat="yy/mm/dd"/>
                <label for="date">Date</label>
            </FloatLabel>

        </div>
        <div class="col-sm-4">
            <div class="row m-auto text-center">
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="surface" v-model="model.YuzeyIslemAdi" disabled class="w-100"/>
                        <label for="surface">Surface</label>
                    </FloatLabel>

                </div>
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="size" v-model="model.OlcuAdi" disabled class="w-100"/>
                        <label for="size">Size</label>
                    </FloatLabel>
                </div>

            </div>

        </div>

    </div>

    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel class="w-100">
                <Select v-model="selectedProducts" inputId="products" :options="productsList" optionLabel="Aciklama" class="w-100" 
                    @change="productsSelected($event)"
                    :disabled="product_dropdown_disabled"
                />
                <label for="products">Products</label>
            </FloatLabel>

        </div>
        <div class="col-sm-4">
            <div class="row m-auto text-center">
                <div class="col-sm-3" v-for="unit in units" :key="unit.id">
                    <RadioButton v-model="selectedUnit" :inputId="unit.name" :name="unit.name" :value="unit.name" 
                        @change="unitSelected($event)"
                    />
                    <label :for="unit.name" class="ml-2">{{ unit.name }}</label>
                </div>
            </div>

        </div>
        <div class="col-sm-4"></div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <div class="row ">
                <div class="col-sm-9">
                    <FloatLabel class="w-100">
                        <InputText id="product_card_id" v-model="model.UrunKartID" :disabled="true" class="w-100"/>
                        <label for="product_card_id">Card Id</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-3">
                    <Button class="w-100" severity="secondary" icon="pi pi-id-card" :disabled="product_card_disabled" @click="openCardList"/>
                </div>
            </div>


        </div>
        <div class="col-sm-4">
            <div class="row m-auto text-center">
                <div class="col-sm-4">
                    <FloatLabel>
                        <InputText id="box-amount" v-model="model.KutuAdet" class="w-100"/>
                        <label for="box-amount">Box</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel>
                        <InputText id="box-in-amount" v-model="model.KutuIciAdet" class="w-100"/>
                        <label for="box-in-amount">Box In</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel>
                        <InputText id="total-piece" v-model="model.Adet" class="w-100"/>
                        <label for="total-piece">Pieces</label>
                    </FloatLabel>
                </div>

            </div>

            <div class="row m-auto text-center mt-4">
                <div class="col-sm-4">
                    <FloatLabel>
                        <InputText id="amount" v-model="model.Miktar" class="w-100"/>
                        <label for="amount">Amount</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel>
                        <InputText id="o-sqm" v-model="model.SqmMiktar" class="w-100"/>
                        <label for="o-sqm">Sqm</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel>
                        <InputText id="crate-piece" v-model="crate_amount" class="w-100"/>
                        <label for="crate-piece">Crate</label>
                    </FloatLabel>
                </div>

            </div>
            <div class=" row m-auto text-center mt-1">
                <div class="col-sm-3">
                    <Checkbox v-model="model.Kutu" inputId="box" :binary="true" />
                    <label for="box" > Box </label>
                </div>
                <div class="col-sm-3">
                    <Checkbox v-model="model.Bagli" inputId="binded" :binary="true" />
                    <label for="binded" > Bind </label>
                </div>
                <div class="col-sm-3">
                    <Checkbox v-model="model.Disarda" inputId="out" :binary="true" />
                    <label for="out" > Out </label>
                </div>
                <div class="col-sm-3">
                    <Checkbox v-model="model.Bulunamadi" inputId="not_found" :binary="true" />
                    <label for="not_found" > Not </label>
                </div>
            </div>

        </div>
        <div class="col-sm-4"></div>

    </div>

    <div class="row m-auto text-center mt-1">
        <div class="col-sm-4">
            <div class="row m-auto text-center mt-4">
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="crate_no" v-model="model.KasaNo" disabled class="w-100"/>
                        <label for="crate_no">C. No</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6" >
                    <FloatLabel >
                        <AutoComplete v-model="selectedQuarry" inputId="quarry" :suggestions="filteredQuarries" @complete="searchQuarry($event)" optionLabel="OcakAdi"
                            @item-select="quarrySelected($event)"
                            class="w-100"
                        />
                        <label for="quarry">Quarries</label>
                    </FloatLabel>


                </div>
            </div>
            <div class="row m-auto text-center mt-4">
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="controlled_by" v-model="model.Duzenleyen"  class="w-100"/>
                        <label for="controlled_by">Controlled By</label>
                    </FloatLabel>

                </div>
                <div class="col-sm-6">
                    <FloatLabel>
                        <InputText id="created_by" v-model="model.Kasalayan"  class="w-100"/>
                        <label for="created_by">Created By</label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div class="col-sm-4">

                <Textarea v-model="model.Aciklama" rows="5" cols="30" class="w-100"/>
        </div>
        <div class="col-sm-4">

        </div>

    </div>
    <div class="row m-auto text-center">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :severity="status? 'success':'warn'" :label="status? 'Save':'Update'" class="w-100" @click="process"/>
        </div>
        <div class="col-sm-6" v-if="!status">
            <Button severity="danger" label="Delete" class="w-100" @click="deleted"/>
        </div>
    </div>

    <Dialog v-model:visible="products_card_visible" header="Card List" modal :style="{width:'75rem'}">
        <CardsList @selected_card_emit="cardSelectedEmit($event)"/>

    </Dialog>

</template>

<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Array,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        },
        po:{
            type:Array,
            required:true
        },
        quarries:{
            type:Array,
            required:true
        },
        suppliers:{
            type:Array,
            required:true
        },
        cards:{
            type:Array,
            required:true
        }
    });
    const { model,status,po,quarries,suppliers,cards } = props;
    const selectedSupplier = ref();
    let filteredSuppliers = ref();
    const selectedPo = ref();
    let filteredPo = ref();
    const toast = useToast();
    let productsList = ref();
    const selectedDate = ref(new Date());
    const nuxtApp = useNuxtApp();
    let po_dropdown_disabled = ref(true);
    let product_dropdown_disabled = ref(true);
    const selectedProducts = ref();
    let selectedUnit = ref();
    let product_card_disabled = ref(true);
    const selectedQuarry = ref();
    let filteredQuarries = ref();
    let products_card_visible = ref(false);
    let crate_amount = 1;
    let emits = defineEmits(['process_product_emit','deleted_product_emit'])
    const units = ref([
        {'id':1,'name':'Sqm'},
        {'id':2,'name':'Pcs'},
        {'id':3,'name':'Mt'},
        {'id':4,'name':'Ton'},

    ])
    const kinds = ref([
        {'id':1,'kind':'Stock'},
        {'id':2,'kind':'Order'},
    ]);
    const selectedKindofSave = ref();
    const kindOfSaveSelected = async (event:Object)=>{
        model.Tarih = nuxtApp.$dtsa(new Date());
        model.UretimTurID = event.value.id;
        if(status){
            if(event.value.id == 1){
                const {data:crate} = await useFetch('/api/selection/entry/crate_no/mekmer',{method:'GET'});
                if(crate.value.error){
                    toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
                }else{
                    model.KasaNo = crate.value.no;
                }
                model.SiparisAciklama = 'Stock';
                model.Aciklama = 'Stock';
                po_dropdown_disabled.value = true;
                product_dropdown_disabled.value = true;
                selectedUnit.value = 'Sqm';
                model.UrunBirimID = 1;
                model.UrunBirimAdi = 'Sqm';
                product_card_disabled.value = false;
                selectedSupplier.value = suppliers.find(x=>x.ID == 1);
                model.TedarikciID = 1;
                selectedPo.value = null;
                selectedProducts.value = null;
                model.UrunKartID = null;
                model.KategoriAdi = null;
                model.UrunAdi = null;
                model.YuzeyIslemAdi = null;
                model.OlcuAdi = null;



            }else{

                po_dropdown_disabled.value = false;
                product_card_disabled.value = true;

            }
        }else{
                model.SiparisAciklama = 'Stock';
                model.Aciklama = 'Stock';
                po_dropdown_disabled.value = true;
                product_dropdown_disabled.value = true;
                product_card_disabled.value = false;
                selectedPo.value = null;
                selectedProducts.value = null;
                model.UrunKartID = null;
                model.KategoriAdi = null;
                model.UrunAdi = null;
                model.YuzeyIslemAdi = null;
                model.OlcuAdi = null;
        }

    };

    const searchSupplier = (event:any)=>{
        let res;
        if(event.query.length == 0 ){
            res = suppliers;
        }else{
            res = suppliers.filter(x=>{
                return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredSuppliers.value = res;
    };
    const supplierSelected = async (event:Object)=>{
        if(status){
            if(event.value.ID == 1 || event.value.ID == 123){
                const { data:crate } = await useFetch('/api/selection/entry/crate_no/mekmer',{method:'GET'});
                if(crate.value.error){
                    toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
                }else{
                    model.KasaNo = crate.value.no;
                }
                model.TedarikciID = event.value.ID;
                model.FirmaAdi = event.value.FirmaAdi;
            }else{
                const { data:crate } = await useFetch('/api/selection/entry/crate_no/out',{method:'GET'});
                if(crate.value.error){
                    toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
                }else{
                    model.KasaNo = crate.value.no;
                }
                model.TedarikciID = event.value.ID;
                model.FirmaAdi = event.value.FirmaAdi;
            }
        }


    };
    const searchPo = (event:any)=>{
        let res;
        if(event.query.length == 0){
            res = po;
        }else{
            res = po.filter(x=>{
                return x.SiparisNo.toString().toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredPo.value = res;
    };
    const poSelected = async (event:Object)=>{
        const { data:products } = await useFetch(`/api/shared/products/${event.value.SiparisNo}`,{
            method: 'GET'
        });
        if(products.value.error){
            toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
        }else{
            productsList.value = products.value.list;
            model.SiparisAciklama = event.value.SiparisNo;
            model.Aciklama = event.value.SiparisNo;
            product_dropdown_disabled.value = false;
        }

    };
    const dateSelected = (event:any)=>{
        model.Tarih = nuxtApp.$dtsa(event);
    };
    const productsSelected = async (event:any)=>{
        model.UrunKartID = event.value.UrunKartID;
        model.UrunAdi = event.value.UrunAdi;
        model.KategoriAdi = event.value.KategoriAdi;
        model.YuzeyIslemAdi = event.value.YuzeyIslemAdi;
        model.En = event.value.En;
        model.Boy = event.value.Boy;
        model.Kenar = event.value.Kenar;
        model.OlcuAdi = event.value.En + 'x' + event.value.Boy + 'x' + event.value.Kenar;
        selectedSupplier.value = await suppliers.find(x=>{
            return x.ID == event.value.TedarikciID;
        });
        model.TedarikciID = selectedSupplier.value.ID;
        model.FirmaAdi = selectedSupplier.value.FirmaAdi;
        model.UrunBirimID = event.value.UrunBirimID;
        selectedUnit.value = units.value.find(x=>{
            return x.id == event.value.UrunBirimID;
        })?.name;
        model.UrunBirimAdi = selectedUnit.value;
        product_card_disabled.value = true;

        if(selectedSupplier.value.ID == 1 || selectedSupplier.value.ID == 123){
            const {data:crate} = await useFetch('/api/selection/entry/crate_no/mekmer',{method:'GET'});
                if(crate.value.error){
                    toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
                }else{
                    model.KasaNo = crate.value.no;
                }
        }else{
            const { data:crate } = await useFetch('/api/selection/entry/crate_no/out',{method:'GET'});
            if(crate.value.error){
                toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
            }else{
                model.KasaNo = crate.value.no;
            }
        }



    };
    const unitSelected = (event:any)=>{
        model.UrunBirimID = units.value.find(x=>{
            return x.name.toLowerCase() == event.target._value.toLowerCase();
        })?.id;
        model.UrunBirimAdi = event.target._value;
    };
    const searchQuarry = (event:any)=>{
        let res;
        if(event.query.length == 0){
            res = quarries;
        }else{
            res = quarries.filter(x=>{
                return x.OcakAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredQuarries.value = res;
    };
    const quarrySelected = (event:Object)=>{
        model.UrunOcakID = event.value.ID;
        model.OcakAdi = event.value.OcakAdi;
    };
    const cardSelectedEmit = (event:Object)=>{
        model.UrunKartID = event.ID;
        model.KategoriAdi = event.KategoriAdi;
        model.UrunAdi = event.UrunAdi;
        model.YuzeyIslemAdi = event.YuzeyIslemAdi;
        model.En = event.En;
        model.Boy = event.Boy;
        model.Kenar = event.Kenar;
        model.OlcuAdi = event.En + 'x' + event.Boy + 'x' + event.Kenar;
        products_card_visible.value = false;

    };
    const openCardList = ()=>{
        products_card_visible.value = true;
    };

    if(!status){
        selectedKindofSave.value = kinds.value.find(x=>x.id == model.UretimTurID);
        selectedDate.value = nuxtApp.$dtsa(model.Tarih);
        selectedUnit.value = model.UrunBirimAdi;
        selectedQuarry.value = quarries.find(x=>x.ID == model.UrunOcakID);
        selectedSupplier.value = suppliers.find(x=>x.ID == model.TedarikciID);
        if(model.UretimTurID==1){
            selectedPo.value = null;
            selectedProducts.value == null;
        }else{
            const {data:products} = await useFetch(`/api/shared/products/all/${model.SiparisAciklama}`);
            productsList.value = products.value.list;
            selectedPo.value = po.find(x=>x.SiparisNo.toLowerCase() === model.SiparisAciklama.toLowerCase());
            selectedProducts.value = products.value.list.find(x=>x.UrunKartID === model.UrunKartID);
        };
        selectedDate.value = nuxtApp.$dtsa(model.Tarih);
    };

    const process = async ()=>{
        model.KasaAdedi = await +crate_amount;
        if(status){
            emits('process_product_emit',model);
        }else{

        }
    };
    const deleted = ()=>{
        emits('deleted_product_emit',model.ID);
    }





</script>