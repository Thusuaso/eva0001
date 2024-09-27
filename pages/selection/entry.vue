<template>
    <div class="row m-auto text-center">
        <div class="col-sm">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Producer</th>
                    <th scope="col">Month</th>
                    <th scope="col">Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Mekmer</th>
                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.mekmerMonth) }}</td>
                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.mekmerYear) }}</td>

                    </tr>
                    <tr>
                        <th>Mek-Moz</th>
                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.mekmozMonth) }}</td>

                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.mekmozYear) }}</td>
                    </tr>
                    <tr>
                        <th>External Crates</th>
                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.disMonth) }}</td>

                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.disYear) }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.monthTotal) }}</td>

                        <td>{{ nuxtApp.$decimal(store.getSumTotalTable.yearTotal) }}</td>
                    </tr>
                </tbody>
                </table>

        </div>
        <div class="col-sm">
            <Button severity="success" label="Add Crate" class="w-100" @click="newCrate"/>
        </div>
        <div class="col-sm">
            <Button severity="primary" label="Mekmer" class="w-100" @click="mekmerStocks"
                :disabled="mekmer_stock_button_disabled"
            />
            <Button severity="info" label="Ext. Crates" class="w-100" @click="externalStocks"
                :disabled="external_stock_button_disabled"
            />
            <Button severity="warn" label="Ext. Crates in Mekmer" class="w-100" @click="externalMekmarStocks"
                :disabled="external_in_mekmer_stock_button_disabled"
            />
            <Button severity="danger" label="Not Found" class="w-100" @click="notFoundStocks"
                :disabled="not_found_stock_button_disabled"
            />
        </div>
        <div class="col-sm">
            <Button severity="info" label="Crates"  icon="pi pi-file-excel" class="w-100" @click="crate_excel" text raised/>
            <Button class="mt-4 w-100" label="Orders" icon="pi pi-file-excel" severity="info" text raised />

            <FloatLabel class="w-100 mt-4">
                <Select v-model="selectedEfeLabel" inputId="efe-label" :options="efeLabels" optionLabel="name" class="w-100" 
                    @change="efeLabelSelected($event)"
                />
                <label for="efe-label">Efe Label</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <Button severity="info" label="Tickets"  icon="pi pi-file-excel" class="w-100" text raised/>
            VEIK ETİKET EKLENECEK.

        </div>
    </div>
    <div class="row m-auto text-center">
        <div class="col-sm-12">
            <SelectionEntryList @selected_product_emit="selectedProductEmit($event)"
                
            />
        </div>
    </div>

    <Dialog v-model:visible="selection_entry_form_dialog" :header="selection_entry_header" modal :style="{width:'85rem'}">
        <SelectionEntryForm :model="store.getModel" :status="selection_new_button_status"
            :po="sharedStore.getOpenPo" 
            :quarries="sharedStore.getQuarries"
            :suppliers="sharedStore.getSuppliers"
            :cards="cardsStore.getCardList"
            @process_product_emit="process($event)"
            @deleted_product_emit="deleted($event)"
        />

    </Dialog>
</template>

<script setup lang="ts">
    import { useSelectionStore } from '~/store/selection';
    import { useSharedStore } from '~/store/shared';
    import { useCardsStore } from '~/store/cards';
    const toast = useToast();
    const store = useSelectionStore();
    const cardsStore = useCardsStore();
    const nuxtApp = useNuxtApp();
    const sharedStore = useSharedStore();
    let selectionList = ref();
    let selectionTotalList = ref();
    let mekmer_stock_button_disabled = ref(true);
    let external_stock_button_disabled = ref(false);
    let external_in_mekmer_stock_button_disabled = ref(false);
    let not_found_stock_button_disabled = ref(false);
    let selectedEfeLabel = ref();
    let selection_entry_form_dialog = ref(false);
    let selection_entry_header = ref('Add Crate');
    let selection_new_button_status = ref(false);
    let efeLabels = ref(
        [
        {
          name: "12x24",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2012x24.docx",
        },
        {
          name: "16x16",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x16.docx",
        },
        {
          name: "16x24",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x24.docx",
        },
        {
          name: "18x18",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2018x18.docx",
        },
        {
          name: "Pattern Set",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%20set.docx",
        },
      ]


    )
    const { data:selection } = await useFetch('/api/selection/entry/list',{
        method:'GET'
    });
    if(selection?.value?.error){
        toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
    }else{
        await store.setSelectionList(selection?.value?.list);
        await store.setSumTotalTable(selection?.value?.sumTable);
        selectionList.value = store.getMekmerList;
        selectionTotalList.value = {
            'crate':0,
            'piece':0,
            'amount':0,
            'box':0
        };
        selectionTotalList.value.crate = selectionList.value.length;
        await selectionList.value.forEach(x=>{
            selectionTotalList.value.piece += x.Adet;
            selectionTotalList.value.amount += x.Miktar;
            selectionTotalList.value.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList.value);
    };

    const { data:po } = await useFetch('/api/shared/open-po',{method: 'GET'});
    const { data:quarries } = await useFetch('/api/shared/quarries',{method: 'GET'});
    const { data:suppliers } = await useFetch('/api/shared/suppliers',{method: 'GET'});
    const { data:cards } = await useFetch('/api/cards/list',{method: 'GET'});
    await sharedStore.setOpenPo(po.value.list);
    await sharedStore.setQuarries(quarries.value.list);
    await sharedStore.setSuppliers(suppliers.value.list);
    await cardsStore.setCardList(cards.value.list);



    const newCrate = async()=>{
        selection_entry_form_dialog.value = true;
        selection_entry_header.value = 'Add Crate';
        selection_new_button_status.value = true;
        store.setModel({
            ID:0,
            Tarih:'',
            KasaNo:0,
            UrunKartID:0,
            KategoriAdi:'',
            KategoriID:0,
            OcakAdi:'',
            OcakId:0,
            UrunAdi:'',
            UrunId:0,
            YuzeyIslemAdi:'',
            YuzeyId:0,
            OlcuId:0,
            En:'',
            Boy:'',
            Kenar:'',
            KutuAdet:0,
            KutuIciAdet:0,
            Miktar:0,
            Kutu:false,
            Bagli:false,
            SiparisAciklama:'',
            Aciklama:'',
            TedarikciID:0,
            FirmaAdi:'',
            Bulunamadi:false,
            Disarda:false,
            Adet:0,
            OzelMiktar:0,
            Duzenleyen:'Muhsin',
            Kasalayan:'Emre',
            UrunBirimId:0,
            UrunBirimAdi:'',
            UretimTurID:0,
            OlcuAdi:'',
            KasaAdedi:1,
            SqmMiktar:0,
            UrunDurumID:1
        });
    };
    const mekmerStocks = async ()=>{
        await store.setList(store.getMekmerList)

        selectionTotalList.value = {
        'crate':0,
        'piece':0,
        'amount':0,
        'box':0
        };
        selectionTotalList.value.crate = store.getMekmerList.length;
        await store.getMekmerList.forEach(x=>{
            selectionTotalList.value.piece += x.Adet;
            selectionTotalList.value.amount += x.Miktar;
            selectionTotalList.value.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList.value);

        mekmer_stock_button_disabled.value = true;
        external_stock_button_disabled.value = false;
        external_in_mekmer_stock_button_disabled.value = false;
        not_found_stock_button_disabled.value = false;
    };

    const externalStocks = async ()=>{
        await store.setList(store.getDisList)
        selectionTotalList.value = {
        'crate':0,
        'piece':0,
        'amount':0,
        'box':0
        };
        selectionTotalList.value.crate = store.getDisList.length;
        await store.getDisList.forEach(x=>{
            selectionTotalList.value.piece += x.Adet;
            selectionTotalList.value.amount += x.Miktar;
            selectionTotalList.value.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList.value);

        mekmer_stock_button_disabled.value = false;
        external_stock_button_disabled.value = true;
        external_in_mekmer_stock_button_disabled.value = false;
        not_found_stock_button_disabled.value = false;
    };

    const externalMekmarStocks = async ()=>{
        await store.setList(store.getMekmerDisList)
        
        selectionTotalList.value = {
        'crate':0,
        'piece':0,
        'amount':0,
        'box':0
        };
        selectionTotalList.value.crate = store.getMekmerDisList.length;
        await store.getMekmerDisList.forEach(x=>{
            selectionTotalList.value.piece += x.Adet;
            selectionTotalList.value.amount += x.Miktar;
            selectionTotalList.value.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList.value);

        mekmer_stock_button_disabled.value = false;
        external_stock_button_disabled.value = false;
        external_in_mekmer_stock_button_disabled.value = true;
        not_found_stock_button_disabled.value = false;
    };

    const notFoundStocks = async ()=>{
        await store.setList(store.getNotFoundList)

        selectionTotalList.value = {
        'crate':0,
        'piece':0,
        'amount':0,
        'box':0
        };
        selectionTotalList.value.crate = store.getNotFoundList.length;
        await store.getNotFoundList.forEach(x=>{
            selectionTotalList.value.piece += x.Adet;
            selectionTotalList.value.amount += x.Miktar;
            selectionTotalList.value.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList.value);

        mekmer_stock_button_disabled.value = false;
        external_stock_button_disabled.value = false;
        external_in_mekmer_stock_button_disabled.value = false;
        not_found_stock_button_disabled.value = true;
    };
    const crate_excel = async ()=>{

    };
    /*
    Bu bölüm digital ocean bölümü silinmesi nedeniyle yapılamadı. Yapılacak.

    const efeLabelSelected = async (event:any)=>{
        var link = document.createElement("a");
        link.setAttribute('download', 'Efe Etiket');
        link.href = event.value.link;
        document.body.appendChild(link);
        link.click();
    };*/

    const selectedProductEmit = (event:any) =>{
        store.setModel(event);
        selection_new_button_status.value = false;
        selection_entry_form_dialog.value = true;
        selection_entry_header.value = 'Edit Product ' + event.KasaNo;
    };
    const process = async (event:any)=>{
        if(selection_new_button_status.value){
            save(event);
        }else{
            update(event);
        };
    };

    const save = async (event:any)=>{
        const  { data:product } = await useFetch('/api/selection/entry/process/save',{
                method:'POST',
                body:event
            });
            if(product.value.error){
                toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
            }else{
                if(product.value.status){
                    await __getSelectionList();
                    store.setModel({
            ID:0,
            Tarih:'',
            KasaNo:0,
            UrunKartID:0,
            KategoriAdi:'',
            KategoriID:0,
            OcakAdi:'',
            OcakId:0,
            UrunAdi:'',
            UrunId:0,
            YuzeyIslemAdi:'',
            YuzeyId:0,
            OlcuId:0,
            En:'',
            Boy:'',
            Kenar:'',
            KutuAdet:0,
            KutuIciAdet:0,
            Miktar:0,
            Kutu:false,
            Bagli:false,
            SiparisAciklama:'',
            Aciklama:'',
            TedarikciID:0,
            FirmaAdi:'',
            Bulunamadi:false,
            Disarda:false,
            Adet:0,
            OzelMiktar:0,
            Duzenleyen:'Muhsin',
            Kasalayan:'Emre',
            UrunBirimId:0,
            UrunBirimAdi:'',
            UretimTurID:0,
            OlcuAdi:'',
            KasaAdedi:1,
            SqmMiktar:0,
            UrunDurumID:1
                    });

                    toast.add({severity:'success',summary:'Selection',detail:'Saved successfully.',life:3000});
                }else{
                    toast.add({severity:'error',summary:'Selection',detail:'Saved unsuccessfully.',life:3000});
                };
            }


    };
    const update = async (event:any)=>{
        const {data:product} = await useFetch('/');
        if(product.value.error){
            toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
        }else{
            if(product.value.status){
                toast.add({severity:'success',summary:'Selection',detail:'Updated successfully.',life:3000});
                store.updateProduct({...event});
                selection_entry_form_dialog.value = false;
            } else{
                toast.add({severity:'error',summary:'Selection',detail:'Updated unsuccessfully.',life:3000});
            }
        }
    };

    const deleted = async(event:any)=>{
        const { data:product } = await useFetch(`/api/selection/entry/process/delete/${event}`);
        if(product.value.error){
            toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
        }else{
            if(product.value.status){
                toast.add({severity:'success',summary:'Selection',detail:'Deleted successfully.',life:3000});
                store.deleteProduct(event);
                selection_entry_form_dialog.value = false;
            } else{
                toast.add({severity:'error',summary:'Selection',detail:'Deleted unsuccessfully.',life:3000});
            }
        }

    };  

    const __getSelectionList = async ()=>{
        const { data:selection } = await useFetch('/api/selection/entry/list',{
        method:'GET'
    });
    if(selection?.value?.error){
        toast.add({severity:'error',summary:'Selection',detail:'An error has occurred.',life:3000});
    }else{
        await store.setSelectionList(selection?.value?.list);
        await store.setSumTotalTable(selection?.value?.sumTable);
        selectionList.value = store.getMekmerList;
        selectionTotalList.value = {
            'crate':0,
            'piece':0,
            'amount':0,
            'box':0
        };
        selectionTotalList.value.crate = selectionList.value.length;
        await selectionList.value.forEach(x=>{
            selectionTotalList.value.piece += x.Adet;
            selectionTotalList.value.amount += x.Miktar;
            selectionTotalList.value.box += x.KutuAdet;
        });
        store.setListTotal(selectionTotalList.value);
    };
    };
</script>