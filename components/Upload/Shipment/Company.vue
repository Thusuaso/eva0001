<template>
    <div>
        <div class="row m-auto text-center mt-4 mb-4">
            <div class="col-sm-3">
                <FloatLabel>
                    <InputText id="company" v-model="model.FirmaAdi" />
                    <label for="company">Company</label>
                </FloatLabel>
            </div>
            <div class="col-sm-3">
                <FloatLabel>
                    <InputText id="phone" v-model="model.Telefon" />
                    <label for="phone">Phone</label>
                </FloatLabel>
            </div>
            <div class="col-sm-3">
                <FloatLabel>
                    <InputText id="mail" v-model="model.MailAdresi" />
                    <label for="mail">Mail</label>
                </FloatLabel>
            </div>
            <div class="col-sm-3">
                <FloatLabel>
                    <InputText id="description" v-model="model.Notlar" />
                    <label for="description">Desc.</label>
                </FloatLabel>
            </div>
        </div>
        <div class="row m-auto text-center mb-4">
            <div :class="status ? 'col-sm-12':'col-sm-4'">
                <Button :severity="status ? 'success':'warn'" :label="status?'Add':'Update'" @click="process" class="w-100"/>
            </div>
            <div class="col-sm-4" v-show="!status">
                <Button severity="info" label="Cancel" @click="cancel" class="w-100"/>

            </div>
            <div class="col-sm-4" v-show="!status">
                <Button severity="danger" label="Delete" @click="deleted" class="w-100"/>

            </div>
        </div>
        <DataTable :value="company" 
            :paginator="true"
            :rows="15"
            class="p-datatable-sm"
            v-model:selection="selectedCompany"
            selectionMode="single"
            @row-click="companySelected($event)"
        >
            <Column field="ID" header="ID"></Column>
            <Column field="FirmaAdi" header="Company"></Column>
            <Column field="Telefon" header="Phone">
                <template #body="slotProps">
                    {{ slotProps.data.Telefon == 'null' ? '': slotProps.data.Telefon }}
                </template>
            </Column>
            <Column field="MailAdresi" header="Mail">
                <template #body="slotProps">
                    {{ slotProps.data.MailAdresi == 'null' ? '': slotProps.data.MailAdresi }}
                </template>
            </Column>
            <Column field="Notlar" header="Desc.">
                <template #body="slotProps">
                    {{ slotProps.data.Notlar == 'null' ? '': slotProps.data.Notlar }}
                </template>
            </Column>

        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import { useCompanyStore } from '~/store/company';
    const props = defineProps({
        company:{
            type:Array,
            required:true
        }
    });
    const { company } = props;
    const selectedCompany = ref();
    const toast = useToast();
    const companyStore = useCompanyStore();
    let model = ref({
        ID:0,
        FirmaAdi:'',
        Telefon:'',
        MailAdresi:'',
        Notlar:''
    });
    let status = ref(true);
    const process = ()=>{
        if(status.value){
            save(model.value);
        }else{
            update(model.value);
        }
    };
    const save = async (event:any)=>{
        const {data:company} = await useFetch('/api/company/process/save',{
            method:'POST',
            body:event
        });
        if(company.value.error){
            toast.add({severity:'error',summary:'Company',detail:'An error has occurred.',life:3000});
        }else{
            if(company.value.status){
                toast.add({severity:'success',summary:'Company',detail:'Company saved successfully.',life:3000});
                companyStore.addCompany({...event,'ID':company.value.id});
                model.value = {
                    ID:0,
                    FirmaAdi:'',
                    Telefon:'',
                    MailAdresi:'',
                    Notlar:''
                };
            }else{
                toast.add({severity:'error',summary:'Company',detail:'Company saved unsuccessfully.',life:3000});
            }
        }
    };
    const update = async (event:any)=>{
        const { data:company } = await useFetch('/api/company/process/update',{
            method:'PUT',
            body:event
        });
        if(company.value.error){
            toast.add({severity:'error',summary:'Company',detail:'An error has occurred.',life:3000});
        }else{
            if(company.value.status){
                toast.add({severity:'success',summary:'Company',detail:'Company updated successfully.',life:3000});
                await companyStore.updateCompany({...event});
                model.value = {
                    ID:0,
                    FirmaAdi:'',
                    Telefon:'',
                    MailAdresi:'',
                    Notlar:''
                };
                status.value = true;
            }else{
                toast.add({severity:'error',summary:'Company',detail:'Company updated unsuccessfully.',life:3000});
            }
        }
    };

    const cancel = ()=>{
        model.value = {
            ID:0,
            FirmaAdi:'',
            Telefon:'',
            MailAdresi:'',
            Notlar:''
        };
        status.value = true;
    };
    const deleted = async ()=>{
        const {data:company} = await useFetch(`/api/company/process/delete/${model.value.ID}`,{
            method:'DELETE'
        });
        if(company.value.error){
            toast.add({severity:'error',summary:'Company',detail:'An error has occurred.',life:3000});
        }else{
            if(company.value.status){
                toast.add({severity:'success',summary:'Company',detail:'Company deleted successfully.',life:3000});
                await companyStore.deleteCompany(model.value.ID);
                model.value = {
                    ID:0,
                    FirmaAdi:'',
                    Telefon:'',
                    MailAdresi:'',
                    Notlar:''
                };
                status.value = true;

            }else{
                toast.add({severity:'error',summary:'Company',detail:'Company deleted unsuccessfully.',life:3000});
            }
        }
    };

    const companySelected = (event:any)=>{
        model.value = event.data;
        model.value.MailAdresi = model.value.MailAdresi == 'null' ? '': model.value.MailAdresi;
        model.value.Telefon = model.value.Telefon == 'null' ? '': model.value.Telefon;
        model.value.Notlar = model.value.Notlar == 'null' ? '': model.value.Notlar;
        status.value = false;

    };
</script>