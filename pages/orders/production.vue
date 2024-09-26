<template>
    <div class="row m-auto text-center">
        <div class="col-sm-12">
            <Button type="button" class="p-button-success w-100" label="Add Order" @click="newOrder"/>
        </div>
    </div>
    <OrdersListProduction @order_production_selected_emit="orderProductionSelectedEmit($event)"/>
    <Dialog v-model:visible="order_visible_dialog" :header="header" modal :style="{ width: '90rem' }" >
        <OrdersFormModel 
                :supplier="supplier" 
                :unit="unit"
                :delivery="delivery"
                :payment="payment"
                :country="country"
                :invoice="invoice"
                :customer="customer"
                :user="user"
                :po="po"
                @product_model_reset_emit="productModelResetEmit"
                @close_order_dialog_emit="closeOrderDialogEmit"
            />

    </Dialog>
</template>
<script setup lang="ts">
import { useCardsStore } from '~/store/cards';
import { useModelsStore } from '~/store/models';
import { useOrdersStore } from '~/store/orders';
import { onMounted } from 'vue';
import SocketConnection from '@/io';

    /*Variables */
    const orderStore = useOrdersStore();
    const cardStore = useCardsStore();
    const modelsStore = useModelsStore();
    const socket = new SocketConnection();
    const toast = useToast();
    const order_visible_dialog = ref(false);
    
    let supplier = ref();
    let unit = ref();
    let delivery = ref();
    let payment = ref();
    let country = ref();
    let invoice = ref();
    let customer = ref();
    let user = ref();
    let po = ref();
    let header = ref();

    /*Variables */

    /*Function */
    const newOrder = async ()=>{
        modelsStore.setOrderModel(
            {
            'ID':0,
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

        );
        await modelsStore.setProductModel(
            {
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



            }
        );

        const { data:shared } = await useFetch('/api/orders/form/shared');
        if(shared.value.error){
            toast.add({severity:'error',summary:'Orders',detail:'An error has occurred.',life:3000});
        }else{
            order_visible_dialog.value = true;
            supplier = shared.value.supplier;
            unit = shared.value.unit;
            delivery = shared.value.delivery;
            payment = shared.value.payment;
            country = shared.value.country;
            invoice = shared.value.invoice;
            customer = shared.value.customer;
            user = shared.value.user;
            po = shared.value.po;
            orderStore.setProducts([]);
            header.value = 'New Order';
            orderStore.setNewButtonStatus(true);
            orderStore.setOrderSumFreight(0);
            orderStore.setOrderSumOther_1(0);
            orderStore.setOrderSumOther_2(0);

        };

    };
    const productModelResetEmit = ()=>{
        modelsStore.setProductModel(
            {
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
            'Adet':0,
            'Mt':0,
            'M2':0



            }
        )
    };
    const closeOrderDialogEmit = ()=>{
        order_visible_dialog.value = false;
    };
    const orderProductionSelectedEmit = async (event:any)=>{
        const { data:shared } = await useFetch('/api/orders/form/shared');
        if(shared.value.error){
            toast.add({severity:'error',summary:'Orders',detail:'An error has occurred.',life:3000});
        }else{
            supplier = shared.value.supplier;
            unit = shared.value.unit;
            delivery = shared.value.delivery;
            payment = shared.value.payment;
            country = shared.value.country;
            invoice = shared.value.invoice;
            customer = shared.value.customer;
            user = shared.value.user;
            po = shared.value.po;
            header.value = event.SiparisNo;
            orderStore.setNewButtonStatus(false);
            await modelsStore.setOrderModel(
                event
            );
            await modelsStore.setProductModel(
            {
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



            }
            );
            order_visible_dialog.value = true;
            orderStore.setOrderSumFreight(modelsStore.getOrderModel.NavlunSatis);
            orderStore.setOrderSumOther_1(modelsStore.getOrderModel.DetayTutar_1);
            orderStore.setOrderSumOther_2(modelsStore.getOrderModel.DetayTutar_2);



        };


    };

    /*Function */

    /*Fetch */
    const { data:orders } = await useFetch('/api/orders/list/production');
    if(orders.value.error){
        toast.add({severity:'error',summary:'Orders',detail:'An error has occurred.',life:3000});

    }else{
        orderStore.setProductionOrders(orders?.value.production)
    };



    /*Fetch */

    onMounted(()=>{
            /*Socket IO */
            socket.socket?.on('cards_list_updated_on',async ()=>{
                const { data:cards } = await useFetch('/api/cards/list');
                if(cards?.value?.error){
                    toast.add({severity:'error',summary:'Cards',detail:'An error has occurred.',life:3000});
                }else{
                    await cardStore.setCardList(cards?.value?.list);
                };
            });

            socket.socket?.on('order_production_list_updated_on',async()=>{
                const { data:orders } = await useFetch('/api/orders/list/production');
                if(orders.value.error){
                    toast.add({ severity: 'error', summary: 'Orders', detail: 'An error has occurred.', life: 3000 });
                }else{
                    orderStore.setProductionOrders(orders?.value.production);
                }
            });


            /*Socket IO */
    })

    

    


</script>