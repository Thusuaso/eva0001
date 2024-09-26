<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-12">
            <FloatLabel>
                <Textarea v-model="model.Hata" rows="5" cols="30" />
                <label>Points Of Consider</label>
            </FloatLabel>

        </div>
    </div>
    <div class="row m-auto text-center">
        <div :class="status ? 'col-sm-12' : 'col-sm-6'" >
            <Button class="w-100" :severity="status ? 'success':'warning'" :label="status ? 'Save':'Update'" @click="process" />
        </div>
        <div class="col-sm-6" v-if="!status">
            <Button class="w-100" severity="danger" label="Delete" @click="deleted"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { usePointsToConsider } from '~/store/points-to-consider';
/*Variables */
const props = defineProps({
    status:{
        type:Boolean,
        required:true
    },
    model:{
        type:Object,
        required:true
    }
})
const { status,model } = props;
const toast = useToast();
const emit = defineEmits(['closed_dialog_form']);
const store = usePointsToConsider();
/*Variables */

/*Functions */
const process = () =>{
    if(status){
        save();
    }else{
        update();
    }
};
const save = async ()=>{
    const {data:consider } = await useFetch('/api/sales/consider/process/save',{
        method:'POST',
        body:model
    });
    if(consider.value.error){
        toast.add({severity:'error',summary:'Points Of Consider',detail:'An error has occurred.',life:3000});
    }else{
        if(consider.value.status){
            toast.add({severity:'success',summary:'Points Of Consider',detail:'Point of consider has been saved.',life:3000});
            emit('closed_dialog_form');

            store.addConsider({...model,'ID':consider.value.id});
        }else{
            toast.add({severity:'error',summary:'Points Of Consider',detail:'Point of consider save failed.',life:3000});

        }
    }
};
const update = async ()=>{
    const {data:consider } = await useFetch('/api/sales/consider/process/update',{
        method:'PUT',
        body:model
    });
    if(consider.value.error){
        toast.add({severity:'error',summary:'Points Of Consider',detail:'An error has occurred.',life:3000});
    }else{
        if(consider.value.status){
            toast.add({severity:'success',summary:'Points Of Consider',detail:'Point of consider has been updated.',life:3000});
            emit('closed_dialog_form');
            store.updateConsider(model);

        }else{
            toast.add({severity:'error',summary:'Points Of Consider',detail:'Point of consider update failed.',life:3000});
        };
    };
};  
const deleted = async ()=>{
    const { data:consider } = await useFetch(`/api/sales/consider/process/delete/${model.ID}`,{
        method:'DELETE',
    });
    if(consider.value.error){
        toast.add({severity:'error',summary:'Points Of Consider',detail:'An error has occurred.',life:3000});

    }else{
        if(consider.value.status){
            toast.add({severity:'success',summary:'Points Of Consider',detail:'Point of consider has been deleted.',life:3000});
            emit('closed_dialog_form');
            store.deleteConsider(model.ID);

        }else{
            toast.add({severity:'error',summary:'Points Of Consider',detail:'Point of consider delete failed.',life:3000});

        }
    };


}
/*Functions */










</script>