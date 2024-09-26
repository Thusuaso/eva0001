<template>
    <Button severity="success" @click="newForm" label="Add Project" class="w-100 mb-3"/>
    <SalesBgpLists :list="bgpStore.getBgpList"
        @delete_bgp_project_emit="deleteBgpProjectEmit($event)"
        @detail_bgp_project_emit="detailBgpProjectEmit($event)"
    />
    <Dialog v-model:visible="bgp_new_project_visible_dialog" :header="header" modal :style="{width:'55rem'}">
        <SalesBgpForm :model="model" :status="status" :country="country?.list"
            @bgp_project_save_emit="bgpProjectSaveEmit($event)"
        />
    </Dialog>
    <Dialog v-model:visible="bgp_detail_project_visible_dialog" :header="detailHeader" modal :style="{width:'75rem'}">
        <Button severity="success" label="Add Bgp" class="w-100" @click="addBgpProject"/>
        <SalesBgpDetailList :list="bgpStore.getBgpDetailList"
            @detail_project_selected_emit="detailProjectSelectedEmit($event)"
        />
    </Dialog>
    <Dialog v-model:visible="bgp_detail_project_form_visible_dialog" :header="detailFormHeader" modal :style="{width:'75rem'}">
        <SalesBgpDetailForm :model="detailBgpModel"
            @detail_project_process_emit="detailProjectProcessEmit($event)"
            :status="addBgpProjectNewFormStatus"
            @detail_project_delete_emit="detailProjectDeleteEmit($event)"
        />
    </Dialog>



</template>
<script setup lang="ts">
    import { useBgpStore } from '~/store/bgp';
    const bgpStore = useBgpStore();
    const { data:bgp } = await useFetch('/api/sales/bgp/list');
    const { data:country } =  await useFetch('/api/shared/country');
    bgpStore.setBgpList(bgp?.value?.list);
    const toast = useToast();
    let bgp_new_project_visible_dialog = ref(false);
    let header = ref();
    let model = ref();
    let status = ref(false);
    let bgp_detail_project_visible_dialog = ref(false);
    let detailHeader = ref();

    let bgp_detail_project_form_visible_dialog = ref(false);
    let detailFormHeader = ref();
    let detailBgpModel = ref();

    let detailCountryName = ref();
    let addBgpProjectNewFormStatus = ref(false);

    const deleteBgpProjectEmit = async (event:any)=>{
        const { data:bgp } = await useFetch(`/api/sales/bgp/project/delete/${event}`,{
            method:'DELETE'
        });
        if(bgp.value.error){
            toast.add({severity:'error',summary:'Bgp Project',detail:'An error has occurred.',life:3000});

        }else{
            if(bgp.value.status){
                toast.add({severity:'success',summary:'Bgp Project',detail:'Bgp project has been deleted.',life:3000});
                bgpStore.deleteBgpList(event)
            }else{  
                toast.add({severity:'error',summary:'Bgp Project',detail:'Bgp project could not be deleted.',life:3000});

            }
        }
    };
    const newForm = ()=>{
        bgp_new_project_visible_dialog.value = true;
        header.value = 'Add Project';
        model.value = {
            'ID':0,
            'ProjectName':'',
            'DateofRegistration':'',
            'Temsilci':0,
            'TemsilciAdi':'',
            'UlkeAdi':'',
            'UlkeLogo':'',
        };
        status.value = true;
    };
    const bgpProjectSaveEmit = async (event:any)=>{
        const { data:bgp } = await useFetch('/api/sales/bgp/project/save',{
            method:'POST',
            body:event
        });
        if(bgp.value.error){
            toast.add({severity:'error',summary:'Bgp Project',detail:'An error has occurred.',life:3000});
        }else{
            if(bgp.value.status){
                toast.add({severity:'success',summary:'Bgp Project',detail:'Bgp project has been saved.',life:3000});
                bgpStore.addBgpList({...event,'ID':bgp.value.id});
                bgp_new_project_visible_dialog.value = false;
            }else{
                toast.add({severity:'error',summary:'Bgp Project',detail:'Bgp project could not be saved.',life:3000});
                bgp_new_project_visible_dialog.value = false;
            }
        }

    };
    const detailBgpProjectEmit = async (event:any)=>{
        const { data:detail } = await useFetch(`/api/sales/bgp/project/detail/list/${event.project.replaceAll(' ','_')}`);
        if(detail.value.error){
            toast.add({severity:'error',summary:'Bgp Project',detail:'An error has occurred.',life:3000});
        }else{
            await bgpStore.setBgpDetailList(detail?.value?.list);
            detailHeader.value = event.project;
            bgp_detail_project_visible_dialog.value = true;
            detailCountryName.value = event.country;

        };
        
    };
    const addBgpProject = async () =>{
        detailBgpModel.value = {
            ID:0,
            ProjectName:'',
            FirmaAdi:'',
            KayitTarihi:'',
            Baslik:'',
            Aciklama:'',
            HatirlatmaTarihi:'',
            HatirlatmaAciklama:'',
            Temsilci:0,
            Email:'',
            PhoneNumber:'',
            WrongNumber:false,
            NotResponse:false,
            NotInterested:false,
            Interested:false,
            Unvan:'',
            UlkeAdi:'',
        };
        detailFormHeader.value = 'New Bgp Project';
        detailBgpModel.value.ProjectName = detailHeader.value;
        detailBgpModel.value.UlkeAdi = detailCountryName.value;
        bgp_detail_project_form_visible_dialog.value = true;
        addBgpProjectNewFormStatus.value = true;


    };
    const detailProjectProcessEmit = (event:any) =>{
        if(addBgpProjectNewFormStatus.value){
            detailBgpProjectSave(event);
        }else{
            detailBgpProjectUpdate(event);
        };

    };



    const detailBgpProjectSave = async (event:Object)=>{
        const {data:detail } = await useFetch('/api/sales/bgp/project/detail/save',{
            method:'POST',
            body:event
        });
        if(detail.value.error){
            toast.add({severity:'error',summary:'Bgp Project',detail:'An error has occurred.',life:3000});
            
        }else{
            if(detail.value.status){
                toast.add({severity:'success',summary:'Bgp Project',detail:'Bgp project has been saved.',life:3000});
                addBgpProjectNewFormStatus.value = false;
                bgpStore.addBgpDetailList({...event,'ID':detail.value.id});
                bgp_detail_project_form_visible_dialog.value = false;
            }else{
                toast.add({severity:'error',summary:'Bgp Project',detail:'Bgp project could not be saved.',life:3000});
            }
        }
    };
    const detailBgpProjectUpdate = async (event:Object)=>{
        const {data:detail} = await useFetch('/api/sales/bgp/project/detail/update',{
            method:'PUT',
            body:event
        });
        if(detail.value.error){
            toast.add({severity:'error',summary:'Bgp Project',detail:'An error has occurred.',life:3000});
        }else{
            if(detail.value.status){
                toast.add({severity:'success',summary:'Bgp Project',detail:'Bgp project has been updated.',life:3000});
                bgpStore.updateBgpDetailList(event);
                bgp_detail_project_form_visible_dialog.value = false;
            }else{
                toast.add({severity:'error',summary:'Bgp Project',detail:'Bgp project could not be updated.',life:3000});
            }
        }
    };

    const detailProjectSelectedEmit = async (event:Object)=>{
        addBgpProjectNewFormStatus.value = false;
        detailBgpModel.value = event;
        bgp_detail_project_form_visible_dialog.value = true;
        detailFormHeader.value = event.FirmaAdi + ' Update';

    };

    const detailProjectDeleteEmit = async(event:any)=>{
        const {data:detail} = await useFetch(`/api/sales/bgp/project/detail/delete/${event}`,{
            method:'DELETE'
        });
        if(detail.value.error){
            toast.add({severity:'error',summary:'Bgp Project',detail:'An error has occurred.',life:3000});
        }else{
            if(detail.value.status){
                toast.add({severity:'success',summary:'Bgp Project',detail:'Bgp project has been deleted.',life:3000});
                bgpStore.deleteBgpDetailList(event);
                bgp_detail_project_form_visible_dialog.value = false;
            }else{
                toast.add({severity:'error',summary:'Bgp Project',detail:'Bgp project could not be deleted.',life:3000});
            }
        }
    };

</script>