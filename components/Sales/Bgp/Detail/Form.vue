<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="customer" v-model="model.FirmaAdi" class="w-100" />
                <label for="customer">Customer</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="mail" v-model="model.Email" class="w-100" />
                <label for="mail">Mail</label>
            </FloatLabel>

        </div>
        <div class="col-sm-4">
            <FloatLabel>
                <InputText id="phone-number" v-model="model.PhoneNumber" class="w-100" />
                <label for="phone-number">Phone</label>
            </FloatLabel>

        </div>

        
    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-3">
            <RadioButton v-model="model.WrongNumber" inputId="ingredient1"  :binary="true"/>
            <label for="ingredient1" class="ml-2">Wrong Number
            </label>
        </div>
        <div class="col-sm-3">
            <RadioButton v-model="model.NotResponse" inputId="ingredient2" :binary="true" />
            <label for="ingredient2" class="ml-2">No Answer
            </label>

        </div>
        <div class="col-sm-3">
            <RadioButton v-model="model.Interested" inputId="ingredient3" :binary="true" />
            <label for="ingredient3" class="ml-2">Interested</label>
        </div>
        <div class="col-sm-3">
            <RadioButton v-model="model.NotInterested" inputId="ingredient4" :binary="true" />
            <label for="ingredient4" class="ml-2">Not Interested
            </label>
        </div>


    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <RadioButton v-model="model.Unvan" inputId="contractor" name="contractor" value="contractor" />
            <label for="contractor" class="ml-2">Contractor</label>
        </div>
        <div class="col-sm-6">
            <RadioButton v-model="model.Unvan" inputId="architect" name="architect" value="architect" />
            <label for="architect" class="ml-2">Architect</label>
        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <FloatLabel>
                <InputText id="title" v-model="model.Baslik" class="w-100" />
                <label for="title">Title</label>
            </FloatLabel>

        </div>
        <div class="col-sm-6">
            <FloatLabel>
                <DatePicker v-model="selectedReminderDate" inputId="reminder_date" @date-select="reminderSelected($event)" class="w-100"/>
                <label for="reminder_date">Reminder Date</label>
            </FloatLabel>

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <FloatLabel>
                <Textarea v-model="model.Aciklama" rows="5" cols="30" class="w-100"/>
                <label>Explanation</label>
            </FloatLabel>
        </div>
        <div class="col-sm-6">
            <FloatLabel>
                <Textarea v-model="model.HatirlatmaAciklama" rows="5" cols="30" class="w-100"/>
                <label>Reminder</label>
            </FloatLabel>
        </div>

    </div>
    <div class="row m-auto text-center">
        <div :class="status ? 'col-sm-12' : 'col-sm-6'">
            <Button class="w-100" :severity="status?'success':'warn'" :label="status?'Save':'Update'" @click="process"/>
        </div>
        <div class="col-sm-6" v-if="!status">
            <Button class="w-100" severity="danger" label="Delete" @click="deleted" />
        </div>

    </div>



</template>
<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        }
    });
    const { model , status } = props;
    const nuxtApp = useNuxtApp();
    const selectedReminderDate = ref();
    const userId = useCookie('goz_mekmar_user_id');
    const emits = defineEmits(['detail_project_process_emit','detail_project_delete_emit'])
    const reminderSelected = (event:any)=>{
        model.HatirlatmaTarihi = nuxtApp.$dtsa(event);
    };
    const process = async ()=>{
        model.KayitTarihi = nuxtApp.$dtsa(new Date());
        model.Temsilci = userId.value;
        model.NotInterested = __nullControl(model.NotInterested);
        model.NotResponse = __nullControl(model.NotResponse);
        model.WrongNumber = __nullControl(model.WrongNumber);
        model.Interested = __nullControl(model.Interested);

    


        emits('detail_project_process_emit',model);
    };
    const deleted = () =>{
        emits('detail_project_delete_emit',model.ID);
    };

    if(!status){
        selectedReminderDate.value = nuxtApp.$dtsa(model.HatirlatmaTarihi);
    };
    const __nullControl = (event:any)=>{
        if(event == null || event == undefined){
            return false;
        }else{
            return event;
        }
    }

</script>