<template>
    <div>
        <DataTable :value="list" :rowClass="rowClass"
        
        >
            <Column field="ID" header="ID"></Column>
            <Column field="EvrakAdi" header="Document Name"></Column>
        </DataTable>

    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const rowClass = (data:any) =>{
      return data.Color === "gray" ? "row-gray" : "row-yellow";
    };
</script>
<style scoped>
:deep(.row-gray) {
  background-color: rgb(180, 180, 180) !important;
  color: white !important;
}
:deep(.row-yellow) {
  background-color: rgb(255, 255, 119) !important;
  color: black !important;
}
</style>