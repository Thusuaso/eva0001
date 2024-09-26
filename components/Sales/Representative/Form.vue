<template>
    <div class="row m-auto text-center mt-4 mb-4">
        <div class="col-sm-6">
            <FloatLabel class="w-100">
                <AutoComplete class="w-100" v-model="selectedSeller" inputId="seller" :suggestions="filteredSeller" optionLabel="KullaniciAdi" @complete="searchSeller($event)" 
                @item-select="sellerSelected($event)"
                />
                <label for="seller">Seller</label>
            </FloatLabel>


        </div>
        <div class="col-sm-6">
            <FloatLabel class="w-100">
                <AutoComplete class="w-100" v-model="selectedOperation" inputId="operation" :suggestions="filteredOperation" optionLabel="KullaniciAdi" @complete="searchOperation($event)" 
                    @item-select="operationSelected($event)"
                />
                <label for="operation">Operation</label>
            </FloatLabel>

        </div>
    </div>
    <Button class="w-100" label="Update" severity="warn" @click="update"/>
</template>
<script setup lang="ts">
import { useRepresentativeStore } from '~/store/representative';
/*Variables */
    const props = defineProps({
        model:{
            type: Object,
            required: true
        },
        users:{
            type:Array,
            required:true
        }
    });
    const { model,users } = props;
    const toast = useToast();
    const repStore = useRepresentativeStore();
    const emit = defineEmits(['closed_form_model'])
    let selectedSeller = ref();
    let filteredSeller = ref();
    let selectedOperation = ref();
    let filteredOperation = ref();
    selectedSeller.value = users.find(s=>s.KullaniciAdi.toLowerCase() == model.SiparisSahibi.toLowerCase());
    selectedOperation.value = users.find(o=>o.KullaniciAdi.toLowerCase() == model.Operasyon.toLowerCase());
    let newModel = ref({
        'SiparisNo':model.SiparisNo,
        'SiparisSahibi':selectedSeller.value.KullaniciAdi,
        'Operasyon':selectedOperation.value.KullaniciAdi,
        'SiparisSahibiId':selectedSeller.value.ID,
        'OperasonId':selectedOperation.value.ID
    });
/*Variables */

/*Functions */
    const searchSeller  = (event:any)=>{
        let res = [];
        if(event.query.length == 0){
            res = users;
        }else{
            res = users.filter((user:any)=>user.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase()));
        };
        filteredSeller.value = res;
    };
    const searchOperation  = (event:any)=>{
        let res = [];
        if(event.query.length == 0){
            res = users;
        }else{
            res = users.filter((user:any)=>user.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase()));
        };
        filteredOperation.value = res;
    };
    const update = async ()=>{
        const { data:representative } = await useFetch('/api/sales/representative/process/update',{
            method:'PUT',
            body:newModel
        });
        if(representative.value.err){
            toast.add({severity:'error',summary:'Products',detail:'An error has occurred.',life:3000});
        }else{
            if(representative.value.status){
                toast.add({severity:'success',summary:'Representative',detail:'Changed Successfully.',life:3000});
                await repStore.updateRepresentative(newModel.value);
                emit('closed_form_model');

            }else{
                toast.add({severity:'success',summary:'Representative',detail:'Changed Unsuccessfully.',life:3000});

            }
        }
    };
    const sellerSelected = (event:any)=>{
        newModel.value.SiparisSahibi = event.value.KullaniciAdi;
        newModel.value.SiparisSahibiId = event.value.ID;
    };
    const operationSelected = (event:any)=>{
        newModel.value.Operasyon = event.value.KullaniciAdi;
        newModel.value.OperasonId = event.value.ID;
    }


/*Functions */


</script>