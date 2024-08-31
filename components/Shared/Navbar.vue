<template>
   <Menubar :model="menu" />
</template>
<script lang="ts" setup>
const props = defineProps({
    menu:{
        type:Array,
        required:true,
        default:[]
    }
});
const {menu} = props;
</script>