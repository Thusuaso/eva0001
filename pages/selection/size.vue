<template>
    <div>
        <Button severity="success" label="Add Size" class="w-100" @click="newForm"/>

        <SelectionSizeList :list="store.getList"
            @selected_size_emit="sizeSelected($event)"
        />

        <Dialog v-model:visible="crate_size_form_dialog" :header="header" modal :style="{ width:'55rem' }">
            <SelectionSizeForm 
                :suppliers="suppliers?.list"
                :status="status"
                @selection_size_process_emit="process($event)"
                @selection_size_delete_emit = "deleted($event)"
            />    
        </Dialog>
    </div>
</template>
<script setup lang="ts">
    import { useSelectionSizeStore } from '~/store/selection-size';
    const { data:size } = await useFetch('/api/selection/size/list');
    const { data:suppliers } = await useFetch('/api/shared/suppliers');
    const store = useSelectionSizeStore();
    const toast = useToast();
    store.setList(size?.value?.list);
    let header = ref('New Form');
    let crate_size_form_dialog = ref(false);
    let status = ref();

    const newForm = ()=>{
        header.value = "New Form";
        crate_size_form_dialog.value = true;
        store.setModel({
            ID:0,
            Crate_Width:'',
            Crate_Height:'',
            Crate_Thickness:'',
            Stone_Size:'',
            SupplierId:0,
            Supplier:'',
            Piece:0
        });
        status.value = true;
    };
    const process = (event:any)=>{
        if(status.value){
            save(event);
        }else{
            update(event);
        }
    };
    const save = async (event:any)=>{
        const { data:size } = await useFetch('/api/selection/size/process/save',{
            method:'POST',
            body:event
        });
        if(size.value.error){
            toast.add({severity:'error',summary:'Crate Size',detail:'An error has occurred.',life:3000});
        }else{
            if(size.value.status){
                toast.add({severity:'success',summary:'Crate Size',detail:'Saved successfully.',life:3000});
                store.addSize({...event,ID:size.value.id});
                crate_size_form_dialog.value = false;

            }else{
                toast.add({severity:'error',summary:'Crate Size',detail:'Saved unsuccessfully.',life:3000});

            }
        }
    };
    const update = async (event:any)=>{
        const { data:size } = await useFetch('/api/selection/size/process/update',{
            method:'PUT',
            body:event
        });
        if(size.value.error){
            toast.add({severity:'error',summary:'Crate Size',detail:'An error has occurred.',life:3000});
        }else{
            if(size.value.status){
                toast.add({severity:'success',summary:'Crate Size',detail:'Updated successfully.',life:3000});
                store.updateSize(event);
                crate_size_form_dialog.value = false;
            }else{
                toast.add({severity:'error',summary:'Crate Size',detail:'Updated unsuccessfully.',life:3000});
            };
        };
    };
    const deleted = async (id:any)=>{
        const { data:size } = await useFetch(`/api/selection/size/process/delete/${id}`,{
            method:'DELETE'
        });
        if(size.value.error){
            toast.add({severity:'error',summary:'Crate Size',detail:'An error has occurred.',life:3000});
        }else{
            if(size.value.status){
                toast.add({severity:'success',summary:'Crate Size',detail:'Deleted successfully.',life:3000});
                store.deleteSize(id);
                crate_size_form_dialog.value = false;
            }else{
                toast.add({severity:'error',summary:'Crate Size',detail:'Deleted unsuccessfully.',life:3000});
            }
        }
    };
    const sizeSelected = async (event:any)=>{
        status.value = false;
        store.setModel(event);
        header.value="Update Form";
        crate_size_form_dialog.value = true;
    };
    

</script>