<template>
    <div>
        <ContainerTrackingList :list="container.list"
            @container_list_selected_emit="containerListSelected($event)"
        />
    </div>
    <Dialog v-model:visible="container_dialog_form" :header="header" modal :style="{width:'55rem'}">
        <ContainerTrackingForm :model="model" @update_container_emit="update($event)"/>

    </Dialog>
</template>
<script setup lang="ts">
    const toast = useToast();
    const { data:container } = await useFetch('/api/container/tracking/list',{
        method:'GET'
    });
    if(container.value.error){
        toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
    };
    let container_dialog_form = ref(false);
    let header = ref('');
    let model = ref();
    const containerListSelected = (event:any)=>{
        console.log("containerListSelected",event);
        model.value = event;
        container_dialog_form.value = true;
        header.value = "Edit Container";
    };
    const update = async (event:any)=>{
        const { data:container } = await useFetch('/api/container/tracking/update',{
            method:'PUT',
            body:event
        });
        if(container.value.error){
            toast.add({severity:'error',summary:'Container',detail:'An error has occurred.',life:3000});
        }else{
            if(container.value.status){
                toast.add({severity:'success',summary:'Container',detail:'Container updated successfully.',life:3000});
            }else{
                toast.add({severity:'error',summary:'Container',detail:'Failed to update container.',life:3000});
            }
        }
    };
</script>