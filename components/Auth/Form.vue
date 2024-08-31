<template>
    <div>

        <div class="flex flex-wrap mb-4 gap-2">
            <InputText placeholder="Username" aria-label="username" :invalid="username_invalid" v-model="model.username" @keyup="loginUsernameInput"/>
        </div>
        <div class="flex flex-wrap gap-2 mb-3">
            <InputText type="password" placeholder="Password" aria-label="password" :invalid="password_invalid" v-model="model.password" @keyup="loginPasswordInput"/>
        </div>
        <div class="flex flex-wrap gap-2">
            <Button type="button" class="p-button-success" label="Login" @click="login"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/store/auth';
const toast = useToast();
const tokenCookie = useCookie('goz_mekmar_auth_token');
const userCookie = useCookie('goz_mekmar_user');
const mailCookie = useCookie('goz_mekmar_mail');
const store = useAuthStore();


const props = defineProps({
    model:{
        type:Object,
        required:true,
        default:() => ({})
    },
    users:{
        type:Array,
        required:true,
    }
});
const {model,users} = props;
let username_invalid = ref(true);
let password_invalid = ref(true);
const loginUsernameInput = (event:any)=>{
    const index = users.find(x=>{
        return x.KullaniciAdi.toLowerCase() === event.target._value.toLowerCase();
    });
    if(index){
        username_invalid.value = false;
    }else{
        username_invalid.value = true;
    }
};
const loginPasswordInput = (event:any)=>{
    const index = users.find(x=>{
        return x.YSifre === event.target._value;
    });
    if(index){
        password_invalid.value = false;
    }else{
        password_invalid.value = true;
    }
};


const login = async ()=>{
    const { data:response } = await useFetch('/api/auth',{
        method:'POST',
        body:model
    });
    if(response.value.status){
        tokenCookie.value = response.value.token;
        userCookie.value = response.value.user;
        mailCookie.value = response.value.mail;
        store.setAuthToken(response.value.token);
        store.setUser(response.value);
        toast.add({ severity: 'success', summary: 'Login Status', detail: 'successful', life: 3000 });
        navigateTo('/');
    }else{
        toast.add({ severity: 'error', summary: 'Info', detail: 'unsuccessful', life: 3000 });
    }

};
</script>