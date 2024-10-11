<template>
    <div>
        <Button severity="success" class="w-100" label="Add Supplier" @click="newForm"/>
        <SupplierList :list="store.getList"
            @supplier_list_selected="supplierListSelected($event)"
        />
        <Dialog v-model:visible="supplier_dialog_form" :header="header" modal :style="{width:'55rem'}">
            <SupplierForm 
                :model="store.getModel" 
                :status="status"
                @suppliers_process_emit="process($event)"
                @suppliers_delete_emit="deleted($event)"
            />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
    import { useSuppliersStore } from '~/store/suppliers';
    const store = useSuppliersStore();
    const toast = useToast();
    let supplier_dialog_form = ref(false);
    let header = ref('New Form');
    let status = ref(false);
    const { data:suppliers } = await useFetch('/api/suppliers/list',{
        method:'GET'
    });
    if(suppliers?.value?.error){
        toast.add({severity:'error',summary:'Suppliers',detail:'An error has occurred.',life:3000});
    }else{
        store.setList(suppliers.value.list);
    };
    const newForm = ()=>{
        store.setModel({
            ID:0,
            FirmaAdi:''
        });
        supplier_dialog_form.value = true;
        status.value = true;
        header.value = 'New Form';
    };
    const supplierListSelected = (event:object)=>{
        store.setModel(event);
        header.value = event?.FirmaAdi + ' Update Form';
        status.value = false;
        supplier_dialog_form.value = true;
    };
    const process = (event:object)=>{
        if(status.value ) {
            save(event);
        }else{
            update(event);
        }
    };
    const save = async (event:object)=>{
        const {data:supplier} = await useFetch('/api/suppliers/process/save',{
            method:'POST',
            body:event
        });
        if(supplier.value.error){
            toast.add({severity:'error',summary:'Suppliers',detail:'An error has occurred.',life:3000});
        }else{
            if(supplier.value.status){
                toast.add({severity:'success',summary:'Suppliers',detail:'Supplier saved successfully.',life:3000});
                store.addSupplier({...event,'ID':supplier?.value?.id});
                supplier_dialog_form.value = false;
            }else{
                toast.add({severity:'error',summary:'Suppliers',detail:'Supplier could not be saved.',life:3000});
            }
        }
    };
    const update = async (event:object)=>{
        const {data:supplier} = await useFetch('/api/suppliers/process/update',{
            method:'PUT',
            body:event
        });
        if(supplier.value.error){
            toast.add({severity:'error',summary:'Suppliers',detail:'An error has occurred.',life:3000});
        }else{
            if(supplier.value.status){
                toast.add({severity:'success',summary:'Suppliers',detail:'Supplier updated successfully.',life:3000});
                store.updateSupplier(event);
                supplier_dialog_form.value = false;
            }else{
                toast.add({severity:'error',summary:'Suppliers',detail:'Supplier could not be updated.',life:3000});
            }
        }
    };
    const deleted = async (id:number)=>{
        const {data:supplier} = await useFetch(`/api/suppliers/process/delete/${id}`,{
            method:'DELETE'
        });
        if(supplier.value.error){
            toast.add({severity:'error',summary:'Suppliers',detail:'An error has occurred.',life:3000});
        }else{
            if(supplier.value.status){
                toast.add({severity:'success',summary:'Suppliers',detail:'Supplier deleted successfully.',life:3000});
                store.deleteSupplier(id);
                supplier_dialog_form.value = false;

            }else{
                toast.add({severity:'error',summary:'Suppliers',detail:'Supplier could not be deleted.',life:3000});
            }
        }
    };


</script>