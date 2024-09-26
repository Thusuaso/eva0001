<template>
    <div class="row m-auto text-center">
        <div class="col-sm-4 mb-3" v-for="bgp in list" :key="bgp">
            <SalesBgpList :projectName="bgp.ProjectName" 
                :representative="bgp.TemsilciAdi"
                :date="bgp.DateofRegistiration"
                :id="bgp.ID"
                :country="bgp.UlkeAdi"

                @delete_bgp_project_emit="deleteBgpProjectEmit($event)"
                @detail_bgp_project_emit="detailBgpProjectEmit($event)"
            />

        </div>
    </div>



</template>
<script setup lang="ts">
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const {list} = props;
    const emits = defineEmits(['delete_bgp_project_emit','detail_bgp_project_emit']);
    const deleteBgpProjectEmit = (event:any)=>{
        emits('delete_bgp_project_emit',event);
    };
    const detailBgpProjectEmit = (event:any)=>{
        emits('detail_bgp_project_emit',event);
    }

</script>