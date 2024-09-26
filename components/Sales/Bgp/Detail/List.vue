<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem"
        v-model:selection="selectedDetail"
        selectionMode="single"
        @row-click="detailSelected($event)"
        >
            <Column field="FirmaAdi" header="Customer"></Column>
            <Column field="KayitTarihi" header="Date">
                <template #body="slotProps">
                    {{ nuxtApp.$dtsa(slotProps.data.KayitTarihi) }}
                </template>
            </Column>
            <Column field="Baslik" header="Title"></Column>
            <Column field="Aciklama" header="Explanation"></Column>

            <Column field="HatirlatmaTarihi" header="Reminder Date">
                <template #body="slotProps">
                    {{ nuxtApp.$dtsa(slotProps.data.HatirlatmaTarihi) }}
                </template>
            </Column>
            <Column field="HatirlatmaAciklama" header="Reminder"></Column>
            <Column field="Email" header="Mail"></Column>
            <Column field="Unvan" header="Degree">
                <template #body="slotProps">
                    {{ slotProps.data.Unvan}}
                </template>
            </Column>


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
    const selectedDetail = ref();
    const emits = defineEmits(['detail_project_selected_emit'])

    const detailSelected = (event:any)=>{
        emits('detail_project_selected_emit',event.data);
    };
</script>