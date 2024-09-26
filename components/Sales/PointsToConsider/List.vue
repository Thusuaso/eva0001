<template>
    <DataTable :value="pointsToConsiderStore.getPointsToConsiderList" tableStyle="min-width: 50rem"
        v-model:selection="selectedConsider"
        selectionMode="single"
        @row-click="considerSelected($event)"
    >
        <Column field="Hata" header="Points of Consider"></Column>
 
    </DataTable>
</template>
<script setup lang="ts">
/*Variables*/
import {usePointsToConsider} from '~/store/points-to-consider';
const pointsToConsiderStore = usePointsToConsider();
const selectedConsider = ref();
const emit = defineEmits(['consider_selected_emit'])

/*Variables*/

/*Functions */
    const considerSelected = (event:object)=>{
        emit('consider_selected_emit', event.data);
    }
/*Functions */


</script>