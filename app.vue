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
const menu = [
    {
        label:'Home',
        url:'/'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },


        ]
    },
];
const sharedStore = useSharedStore();
const authStore = useAuthStore();
const { data:users } = await useFetch('/api/shared/users');
await sharedStore.setUsers(users);
authStore.setAuthToken(cookie.value);
const user = {
  'user':userCookie.value,
  'mail':mailCookie.value
};
authStore.setUser(user);








</script>