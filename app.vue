<template>
  <Toast />
  <SharedNavbar :menu="menu" v-if="authStore.isAuthenticated"/>
  <div class="container mt-4">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import {useSharedStore} from '~/store/shared';
import { useAuthStore } from './store/auth';
const cookie = useCookie('goz_mekmar_auth_token');
const userCookie = useCookie('goz_mekmar_user');
const mailCookie = useCookie('goz_mekmar_mail');
const userIdCookie = useCookie('goz_mekmar_user_id');
const menu = [
    {
        label:'Home',
        url:'/'
    },
    {
        label: 'Orders',
        items: [
            {
                label: 'Production',
                url:'/orders/production',
            },
            {
              label:'Shipped',
              url:'/orders/shipped'
            },
            {
              label:'On Hold',
              url:'/orders/onhold'
            }


        ]
    },
    {
      label:'Operation',
      items:[
        {
          label:'Product Data',
          url:'/operation/cards'
        }
      ]
    }
];
const sharedStore = useSharedStore();
const authStore = useAuthStore();
const { data:users } = await useFetch('/api/shared/users');
await sharedStore.setUsers(users);
authStore.setAuthToken(cookie.value);
const user = {
  'user':userCookie.value,
  'mail':mailCookie.value,
  'user_id':userIdCookie.value
};
authStore.setUser(user);










</script>