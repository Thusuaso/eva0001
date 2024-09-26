<template>
    {{ cost }}
</template>
<script setup lang="ts">
    const props = defineProps({
        cost:{
            type:Array,
            required:false
        }
    });
    const { cost } = props;
</script>