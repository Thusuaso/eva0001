<template>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <FloatLabel>
                <InputText id="project_name" v-model="model.ProjectName" class="w-100"/>
                <label for="project_name">Project Name</label>
            </FloatLabel>

        </div>
        <div class="col-sm-6">
            <FloatLabel>
                <AutoComplete class="w-100" v-model="selectedCountry" inputId="country" :suggestions="filteredCountry" optionLabel="UlkeAdi" @complete="searchCountry($event)" 
                 @item-select="countrySelected($event)"
                />
                <label for="country">Country</label>
            </FloatLabel>

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div class="col-sm-12">
            <Button severity="success" label="Save" class="w-100" @click="save"/>
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
        },
        country:{
            type:Array,
            required:true
        }
    });
    const {model, status, country} = props;
    const selectedCountry = ref();
    let filteredCountry = ref();
    const nuxtApp = useNuxtApp();
    const emits = defineEmits(['bgp_project_save_emit'])
    const userCookie = useCookie('goz_mekmar_user');
    const userIdCookie = useCookie('goz_mekmar_user_id');

    const searchCountry = (event)=>{
        let results;
        if(event.query.length === 0){
            results = country;
        }else{
            results = country.filter(x=>{
                return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredCountry.value = results;

    };
    const countrySelected = (event)=>{
        model.UlkeAdi = event.value.UlkeAdi;
        model.UlkeId = event.value.Id;
        model.UlkeLogo = event.value.Icon_Flags;
    };
    const save = ()=>{
        model.DateofRegistiration = nuxtApp.$dtsa(new Date());
        model.Temsilci = userIdCookie.value;
        model.TemsilciAdi = userCookie.value;
        emits('bgp_project_save_emit',model);
    };

</script>