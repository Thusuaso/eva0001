<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem"
            v-model:selection="selectedCustomerDetail"
            selectionMode="single"
            @row-click="customerDetailSelected($event)"
            >
            <Column field="Tarih" header="Date">
                <template #body="slotProps">
                    {{ nuxtApp.$dtsa(slotProps.data.Tarih) }}
                </template>
            </Column>
            <Column field="Baslik" header="Title"></Column>
            <Column field="Aciklama" header="Explanation"></Column>
            <Column field="Hatirlatma_Tarih" header="Reminder Time">
                <template #body="slotProps">
                    {{ nuxtApp.$dtsa(slotProps.data.Hatirlatma_Tarih) }}
                </template>
            </Column>
            <Column field="Hatirlatma_Notu" header="Reminder"></Column>
            <Column field="KullaniciAdi" header="Seller"></Column>



        </DataTable>

    </div>
</template>
<script setup lang="ts">
    /*Variables */
        const props = defineProps({
            list:{
                type:Array,
                required:true
            }
        });
        const { list } = props;
        const nuxtApp = useNuxtApp();
        const selectedCustomerDetail = ref();
        const emits = defineEmits(['customer_detail_selected_emit']);
    /*Variables */

    /*Functions */
        const customerDetailSelected = (event)=>{
            emits('customer_detail_selected_emit',event.data);
        };
    /*Functions */

</script>