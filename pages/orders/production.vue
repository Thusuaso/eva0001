<template>
    <div class="row m-auto text-center">
        <div class="col-sm-12">
            <Button type="button" class="p-button-success w-100" label="Add Order" @click="newOrder"/>
        </div>
    </div>
    <OrdersListProduction :orders="orders?.production"/>
    <Dialog v-model:visible="order_visible_dialog" header="" modal :style="{ width: '90rem' }">
        <OrdersFormModel 
                :model="model" 
                :productModel="productModel"
                :supplier="supplier" 
                :unit="unit"
                :delivery="delivery"
                :payment="payment"
                :country="country"
                :invoice="invoice"
                :customer="customer"
                :user="user"
                :po="po"
                :productList="productList"
            />

    </Dialog>
</template>
<script setup lang="ts">
import { useCardsStore } from '~/store/cards';
const cardStore = useCardsStore();
    /*Socket IO */
    import SocketConnection from '@/io';
    const socket = new SocketConnection();
    socket.socket?.on('cards_list_updated_on',async ()=>{
        const { data:cards } = await useFetch('/api/cards/list');
        if(cards?.value?.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            await cardStore.setCardList(cards?.value?.list);
        };
    });
    /*Socket IO */

    /*Variables */
    const toast = useToast();
    const order_visible_dialog = ref(false);
    let model = ref();
    let productModel = ref();
    let supplier = ref();
    let unit = ref();
    let delivery = ref();
    let payment = ref();
    let country = ref();
    let invoice = ref();
    let customer = ref();
    let user = ref();
    let po = ref();
    let productList = ref([]);

    /*Variables */

    /*Function */
    const newOrder = async ()=>{
        model.value = {
            'SiparisNo':'',
            'SiparisTarihi':'',
            'OdemeTurID':0,
            'OdemeTur':'',
            'TeslimTurID':0,
            'TeslimTur':'',
            'MusteriID':0,
            'FirmaAdi':'',
            'Pesinat':0,
            'NavlunFirma':'',
            'NavlunMekmarNot':'',
            'NavlunAlis':0,
            'NavlunSatis':0,
            'KayitTarihi':'',
            'KullaniciID':0,
            'KayitYapan':'',
            'SiparisDurumID':0,
            'Durum':'',
            'UretimAciklama':'',
            'SevkiyatAciklama':'',
            'FinansAciklama':'',
            'OdemeAciklama':'',
            'TahminiYuklemeTarihi':'',
            'YuklemeTarihi':'',
            'FaturaNo':0,
            'SiparisFaturaNo':0,
            'Vade':'',
            'Ulke':'',
            'Komisyon':0,
            'DetayAciklama_1':'',
            'DetayMekmarNot_1':'',
            'DetayTutar_1':0,
            'DetayAlis_1':0,
            'DetayAciklama_2':'',
            'DetayMekmarNot_2':'',
            'DetayTutar_2':0,
            'DetayAlis_2':0,
            'DetayAciklama_3':'',
            'DetayMekmarNot_3':'',
            'DetayTutar_3:':0,
            'DetayAlis_3':0,
            'SiparisSahibiAdi':'',
            'EvrakGideri':0,
            'Eta':'',
            'UlkeId':0,
            'UlkeAdi':'',
            'FaturaAdi':'',
            'depo_yukleme':false,
            'DetayTutar_4':0,
            'DetayAciklama_4':'',
            'sigorta_Tutar':0,
            'OperasyonAdi':'',
            'FinansmanAdi':'',
            'operationMail':'',
            'representativeMail':'',
            'SiparisSahibi':0,
            'Operasyon':0,
            'Finansman':0,
            'Iade':0,
            'MalBedeli':0,
            'sigorta_tutar_satis':0,
            'KonteynerAyrinti':'',
            'MayaControl':false,
            'FaturaKesimTurID':0,
            'KonteynerNo':'',
            'SiparisKontrol':false,
            'SiparisKontrolEden':0





        }
        productModel.value = {
            'ID':0,
            'SiparisNo':'',
            'TedarikciID':0,
            'TedarikciAdi':0,
            'UrunKartID':0,
            'KategoriAdi':'',
            'KategoriID':0,
            'UrunAdi':'',
            'UrunID':0,
            'YuzeyIslemAdi':'',
            'YuzeyIslemID':0,
            'OlcuID':0,
            'En':'',
            'Boy':'',
            'Kenar':'',
            'UrunBirimID':0,
            'UrunBirimAdi':'',
            'Miktar':0,
            'OzelMiktar':0,
            'SatisFiyati':0,
            'SatisToplam':0,
            'UretimAciklama':'',
            'MusteriAciklama':'',
            'KullaniciID':0,
            'AlisFiyati':0,
            'SiraNo':0,
            'Ton':0,
            'Adet':0



        };
        const { data:shared } = await useFetch('/api/orders/form/shared');
        if(shared.value.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            order_visible_dialog.value = true;
            supplier = shared.value.supplier;
            unit = shared.value.unit
            delivery = shared.value.delivery
            payment = shared.value.payment
            country = shared.value.country
            invoice = shared.value.invoice
            customer = shared.value.customer
            user = shared.value.user
            po = shared.value.po

        }

    };
    /*Function */

    /*Fetch */
    const { data:orders } = await useFetch('/api/orders/list/production');
    if(orders.error){
        toast.add({ severity: 'error', summary: 'Loading', detail: 'failed', life: 3000 });
    };



    /*Fetch */

    

    


</script>