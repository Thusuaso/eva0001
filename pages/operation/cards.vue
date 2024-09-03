<template>
    <Button type="button" class="p-button-info w-100" label="New Card" @click="newCardForm" />
    <CardsList :cards="cards?.list"/>
    <Dialog v-model:visible="card_visible_dialog" header="" modal :style="{ width: '45rem' }">
        <CardsForm :model="model" :status="newCardStatus"
            :categories="categories"
            :products="products"
            :surfaces="surfaces"
            :sizes="sizes"
        />
    </Dialog>
</template>
<script setup lang="ts">
    const toast = useToast();
    const { data:cards } = await useFetch('/api/cards/list');
    let card_visible_dialog = ref(false);
    let model = ref({

    });
    let newCardStatus = ref(false);
    if(cards?.error){
        toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });
    };
    const newCardForm = ()=>{
        card_visible_dialog.value = true;
        newCardStatus.value = true;
        model = ref({
            'ID':0,
            'UrunID':0,
            'UrunAdi':'',
            'YuzeyIslemID':0,
            'YuzeyIslemAdi':'',
            'OlcuID':0,
            'En':'',
            'Boy':'',
            'Kenar':'',
            'KategoriID':0,
            'KategoriAdi':''
        });
    };
    const { data:cardsShared } = await useFetch('/api/cards/shared');
    if(cardsShared.value.error){
        toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
    };
    const categories = cardsShared?.value.categories;
    const products = cardsShared?.value.products;
    const surfaces = cardsShared?.value.surfaces;
    const sizes = cardsShared?.value.sizes;



</script>