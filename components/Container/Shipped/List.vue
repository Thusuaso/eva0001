<template>
    <div>
        <DataTable :value="list" paginator :rows="15"
            v-model:selection="selectedShippedContainer"
            selectionMode="single"
            @row-click="shippedContainerSelected($event)"
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
            <Column field="Eta" header="ETA"></Column>
            <Column field="KonsimentoDurum" header="#">
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
            <Column field="Sorumlu" header="Seller"></Column>



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
    const {list} = props;
    const nuxtApp = useNuxtApp();
    const emits = defineEmits(['shipped_container_selected_emit'])
    const selectedShippedContainer = ref();
    const shippedContainerSelected = (event:any)=>{
        emits('shipped_container_selected_emit',event.data);
    };
</script>