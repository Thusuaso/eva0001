<template>
    <div>
        <Card style="width: 25rem; overflow: hidden;height:200px;">
        <template #header>
            {{ representative }} - {{ nuxtApp.$dtsa(date) }}

        </template>
        <template #title>
            {{ projectName }}


        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <div class="row m-auto text-center">
                    <div class="col-sm-6">
                        <Button label="Detail" severity="warn" outlined class="w-100" @click="detail"/>
                    </div>
                    <div class="col-sm-6">
                        <Button label="Delete" severity="danger" outlined class="w-100" @click="deleted"/>

                    </div>
                </div>
            </div>
        </template>
    </Card>
    </div>
</template>
<script setup lang="ts">
/*Variables */
    const props = defineProps({
        projectName : {
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        representative:{
            type:String,
            required:true
        },
        id:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    });
    const {projectName,date,representative,id,country} = props;
    const nuxtApp = useNuxtApp();
    const emits = defineEmits(['delete_bgp_project_emit','detail_bgp_project_emit'])
/*Variables */

/*Functions */
    const deleted = async ()=>{
        emits('delete_bgp_project_emit',id)
    };
    const detail = async ()=>{
        const data = {
            'project':projectName,
            'country':country
        }
        emits('detail_bgp_project_emit',data);
    };
/*Functions */

</script>