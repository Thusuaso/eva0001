<template>
    <Button type="button" class="p-button-info w-100" label="New Card" @click="newCardForm" />
    <CardsList @selected_card_emit="cardSelectedEmit($event)"/>
    <Dialog v-model:visible="card_visible_dialog" :header="cardHeader" modal :style="{ width: '45rem' }">
        <CardsForm :model="model" :status="newCardStatus"
            :categories="categories"
            :products="products"
            :surfaces="surfaces"
            :sizes="sizes"
            @card_dialog_closed="cardDialogClosed"
        />
    </Dialog>
</template>
<script setup lang="ts">
    import { useCardsStore } from '~/store/cards';
    const toast = useToast();
    const cardStore = useCardsStore();
    const { data:cards } = await useFetch('/api/cards/list');
    const cardHeader= ref("");
    if(cards?.value?.error){
        toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});

    }else{
        await cardStore.setCardList(cards?.value?.list);

    };
    let card_visible_dialog = ref(false);
    let model = ref({

    });
    let newCardStatus = ref(false);
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
        cardHeader.value = 'New Card';
    };
    const { data:cardsShared } = await useFetch('/api/cards/shared');
    if(cardsShared.value.error){
        toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
    };
    const categories = cardsShared?.value.categories;
    const products = cardsShared?.value.products;
    const surfaces = cardsShared?.value.surfaces;
    const sizes = cardsShared?.value.sizes;
    const cardSelectedEmit = (event:any)=>{
        card_visible_dialog.value = true;
        model = event;
        newCardStatus.value = false;
        cardHeader.value = model.ID;
    };
    const cardDialogClosed = ()=>{
        card_visible_dialog.value = false;
    };


</script>