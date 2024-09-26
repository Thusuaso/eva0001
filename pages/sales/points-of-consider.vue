<template>
    <Button class="w-100" severity="primary" @click="newConsider" label="New"/>
    <SalesPointsToConsiderList
        @consider_selected_emit="considerSelected($event)"
    />
    <Dialog v-model:visible="points_of_consider_visible_form" :header="pointsOfConsiderHeader" modal>
        <SalesPointsToConsiderForm :model="model" :status="pointsOfConsiderNewButtonStatus"
            @closed_dialog_form="closedDialogForm"
        />
    </Dialog>
</template>
<script setup lang="ts">
/*Variables */
import {usePointsToConsider} from '~/store/points-to-consider';
const store = usePointsToConsider();

const { data:customer } = await useFetch('/api/sales/consider/list',{
    method:'GET'
});

store.setPointsToConsider(customer.value.list);
let model = ref({
    'ID':0,
    'Hata':''
})
let points_of_consider_visible_form = ref(false);
let pointsOfConsiderHeader = 'New Form';
let pointsOfConsiderNewButtonStatus = ref(false);
/*Variables */
const newConsider = async ()=>{
    model.value = {
        'ID':0,
        'Hata':''
    };
    pointsOfConsiderNewButtonStatus.value = true;

    points_of_consider_visible_form.value = true;
    pointsOfConsiderHeader.value = 'New Form';

};
const considerSelected = (event:object)=>{
    model.value = event;
    pointsOfConsiderNewButtonStatus.value = false;

    points_of_consider_visible_form.value = true;
    pointsOfConsiderHeader = 'Update Form';
};
const closedDialogForm = ()=>{
    points_of_consider_visible_form.value = false;
};





</script>