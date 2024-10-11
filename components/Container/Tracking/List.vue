<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem"
        v-model:selection="selectedContainerList"
        selectionMode="single"
        @row-click="containerListSelected($event)"
        >
            <Column field="MusteriAdi" header="Customer"></Column>
            <Column field="SiparisNo" header="Po"></Column>
            <Column field="YuklemeTarihi" header="Shipment Date">
                <template #body="slotProps">
                    {{ nuxtApp.$dtsa(slotProps.data.YuklemeTarihi) }}
                </template>
            </Column>
            <Column field="KonteynerNo" header="Container No"></Column>
            <Column field="Line" header="Line"></Column>
            <Column field="Eta" header="Eta"></Column>
            <Column field="Kalan" header="Time to Arrival"></Column>
            <Column  header="#">
                <template #body="slotProps">
                        <div
                            v-if="
                            slotProps.data.KonsimentoDurum == null || !slotProps.data.KonsimentoDurum
                            "
                        >
                            Not Sent
                        </div>
                        <div v-else>Sent</div>
                </template>
            </Column>
            <Column field="AktarmaLimanAdi" header="Port"></Column>
            <Column field="Seller" header="Sorumlu"></Column>
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
    const { list } = props;
    const nuxtApp = useNuxtApp();
    const emits = defineEmits(['container_list_selected_emit'])
    const selectedContainerList = ref();
    const containerListSelected = (event:any)=>{
        emits('container_list_selected_emit', event.data);
    };
</script>