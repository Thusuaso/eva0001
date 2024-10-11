<template>
    <div class="row m-auto text-center">
        <div class="col-sm-6">
            <FloatLabel class="mt-4">
                <AutoComplete v-model="selectedPo" inputId="po" :suggestions="filteredPo" @complete="searchPo($event)"
                    @item-select="poSelected($event)" optionLabel="SiparisNo"
                    class="w-100"
                />
                <label for="po">Po</label>
            </FloatLabel>
            <FileUpload class="mt-4" mode="advanced"  @select="filesSelected($event)"
                    :multiple="true" accept=".pdf" 
                    :maxFileSize="1000000"
                    :customUpload="true"
                    @uploader="uploader($event)"
                    :disabled="uploader_disabled"
            >
                <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                </template>
            </FileUpload>
        </div>
        <div class="col-sm-6">
            <UploadList :list="documentList"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import fileService from '~/aws/api';
const selectedPo = ref();
    let filteredPo = ref();
    let uploadFilesList = ref([]);
    const userIdCookie = useCookie('goz_mekmar_user_id');
    let uploader_disabled  = ref(true);
    const nuxtApp = useNuxtApp();
    const toast = useToast();
    let documentList = ref([]);
    const { data:po } = await useFetch('/api/shared/all-po',{
        method:'GET'
    });
    const { data:documents } = await useFetch('/api/upload/list/model',{
      method:'GET'
    });
    documentList.value = documents?.value?.list;
    const poSelected = async (event:any)=>{
        const { data:po } = await useFetch('/api/upload/list/po',{
          method:'POST',
          body:{ 'po':event.value.SiparisNo }
        });
        uploader_disabled.value = false;
        documentList.value = po.value.list;
    };
    const searchPo = (event:any)=>{
        let res;
        if(event.query.length == 0){
            res = po.value.list;
        }else{
            res = po.value.list.filter((item)=> item.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()));
        };
        filteredPo.value = res;
    };
    const filesSelected = (event:any)=>{
        for (const item of event.files) {
        let folderProductInfo = ref({
          id: 0,
          po: "",
          userId: 0,
          date: nuxtApp.$dtsa(new Date()),
          file:{}
          
        });
        if (item.name == "Purchase Order.pdf") {
          folderProductInfo.value.id = 1;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo);
        }
        
        else if (item.name == "Proforma Invoice.pdf") {
          folderProductInfo.id = 2;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "İç Sipariş.pdf") {
          folderProductInfo.value.id = 3;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Çeki Listesi.pdf") {
          folderProductInfo.value.id = 4;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Yükleme Notası.pdf") {
          folderProductInfo.value.id = 5;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Mekmar-Efes Gümrük Faturası.pdf"){
          folderProductInfo.value.id = 6;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
          
        else if (item.name == "Gümrük Notası.pdf") {
          folderProductInfo.value.id = 7;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "ISF vb Formlar.pdf") {
          folderProductInfo.value.id = 8;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Konşimento.pdf") {
          folderProductInfo.value.id = 9;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "İlaçlama Belgesi.pdf") {
          folderProductInfo.value.id = 10;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }

        else if (item.name == "ATR.pdf"  || item.name == "atr.pdf") {
          folderProductInfo.value.id = 75;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Gçb Beyannamesi.pdf") {
          folderProductInfo.value.id = 12;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Packing Declarition.pdf") {
          folderProductInfo.value.id = 14;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "L-C Metin.pdf") {
          folderProductInfo.value.id = 15;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Commer Invoice.pdf") {
          folderProductInfo.value.id = 16;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Packing List.pdf") {
          folderProductInfo.value.id = 17;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Booking.pdf") {
          folderProductInfo.value.id = 20;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "İlaçlama Notası.pdf") {
          folderProductInfo.value.id = 71;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Fotolar.pdf") {
          folderProductInfo.value.id = 72;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Draft.pdf") {
          folderProductInfo.value.id = 99;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Özel İşçilik Faturaları.pdf") {
          folderProductInfo.value.id = 40;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Certificate of Origin.pdf") {
          folderProductInfo.value.id = 74;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }        
        else if (item.name == "Dispatch Note.pdf") {
          folderProductInfo.value.id = 76;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
        else if (item.name == "Other.pdf") {
          folderProductInfo.value.id = 77;
          folderProductInfo.value.po = selectedPo.value.SiparisNo;
          folderProductInfo.value.userId = userIdCookie.value;
          folderProductInfo.value.file = item;
          uploadFilesList.value.push(folderProductInfo.value);
        }
      





      };



    };
    const uploader = async (event:any)=>{      
        const { data:uploaded } = await useFetch('/api/upload/document',{
            method:'POST',
            body:uploadFilesList.value,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(uploaded.value.status){
          toast.add({ severity:'success',summary:'Shipment Form',detail:'Saved successfully.',life:3000 });
          const { data:po } = await useFetch('/api/upload/list/po',{
              method:'POST',
              body:{ 'po':selectedPo.value.SiparisNo }
            });
            documentList.value = po.value.list;
        }else{
          toast.add({ severity:'error',summary:'Shipment Form',detail:'Saved unsuccessfully.',life:3000 });

        }
        uploadFilesList.value.forEach(async x=>{
            await fileService.sendInvoice(x.file,x.id,x.po);
            console.log('Dosya yükleme başarılı...')
        });
    };




</script>