<template>
    <div class="auth">
        <AuthForm :model="model" :users="users"/>
    </div>
</template>
<script setup lang="ts">
import { useSharedStore } from '~/store/shared';

const model = ref({
    'username':'',
    'password':''
});
const store = useSharedStore();
const users = store.getUsers;


</script>