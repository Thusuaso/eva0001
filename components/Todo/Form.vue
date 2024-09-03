<template>
    <div class="m-auto text-center">
        <div class="row w-100 mt-4">
            <div class="col-12 w-100">
                <FloatLabel class="w-100">
                    <Textarea v-model="model.Yapilacak" rows="5" class="w-100"/>
                    <label>Assignment</label>
                </FloatLabel>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-4">
                <FloatLabel>
                    <AutoComplete v-model="selectedAssignee" inputId="assignee" multiple fluid :suggestions="filteredAssignee" @complete="searchAssignee($event)" optionLabel="name" @item-select="assigneeSelected($event)"
                    />

                    <label for="Assignee">Assignee</label>
            </FloatLabel>


                    

            </div>
            <div class="col-4">
                <FloatLabel class="w-100">
                    <Select v-model="selectedPriority" inputId="dd-city" :options="priorities" optionLabel="priority" class="w-100" @change="prioritySelected($event)" />
                    <label for="dd-city">Select a Priority</label>
                </FloatLabel>
            </div>
            <div class="col-4">
                    <div class="flex items-center">
                        <Checkbox v-model="model.Acil" inputId="urgent"  :binary="true"/>
                        <label for="urgent" class="ml-2"> Urgent </label>
                    </div>
            </div>

        </div>
        <div class="row m-auto text-center w-100 mt-3">
            <div class="col">
                <Button type="button" class="p-button-success w-100" :label="status ? 'Save':'Update'" @click="process"/>
            </div>
            <div class="col" v-if="!status">
                <Button type="button" class="p-button-danger w-100" label="Delete" @click="deleted"/>
            </div>

        </div>
    </div>

</template>
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useTodoStore } from '~/store/todo';
    const usernameCookie = useCookie('goz_mekmar_user');
    const useridCookie = useCookie('goz_mekmar_user_id');
    const todoStore = useTodoStore();
    const toast = useToast();
    const props = defineProps({
        model:{
            type:Object,
            required: true
        },
        status:{
            type:Boolean,
            required:true
        }
    });
    const { model,status } = props;
    let selectedAssignee = ref();
    let filteredAssignee = ref([]);
    const assigneeList = [
        {'id':10,'name':'Gizem'},
        {'id':19,'name':'Özlem'},
        {'id':44,'name':'Hakan'},
        {'id':47,'name':'Semih'},

    ];
    const searchAssignee = (event:any)=>{
        let res;
        if(event.query.length  == 0){
            res = assigneeList;
        }else{
            res = assigneeList.filter(x=>{
                return x.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredAssignee.value = res
    };
    const assigneeSelected = (event:any)=>{
        let assignee = '';
        selectedAssignee.value.forEach(x=>{
            assignee += (x.name + ',');
        });
        model.OrtakGorev = assignee.substring(0,assignee.length - 1)
    };
    const priorities = [
        {'id':1,'priority':'A'},
        {'id':2,'priority':'B'},
        {'id':3,'priority':'C'},

    ];
    let selectedPriority = ref({});
    const prioritySelected = (event:any)=>{
        model.YapilacakOncelik = event.value.priority;
    };
    onMounted(()=>{
        if(!status){
            const modelAssignee: any[] = [];
            model.OrtakGorev.split(',').forEach(async (x: any)=>{
                await modelAssignee.push({'name':x});
            });
            selectedAssignee.value = modelAssignee;
            selectedPriority.value = priorities.find(x=>{
                return x.priority === model.YapilacakOncelik;
            })


        }

    });
    const process = ()=>{
        if(status){
            save();
        }else{
            update();
        }
    };
    const emit = defineEmits(['todo_dialog_closed']);
    const save = async ()=>{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        model.GorevVerenAdi = usernameCookie.value;
        model.GorevVerenID = useridCookie.value;
        model.GirisTarihi = year + '-' + month + '-' + day


        const { data:todo } = await useFetch('/api/sales/todo/process/save',{
            method:'POST',
            body:model
        });
        if(todo?.value.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            if(todo?.value.status){
                toast.add({severity:'success',summary:'To Do',detail:'Task saved successfully.',life:3000});
                todoStore.addTodo({...model,'ID':todo?.value?.id});
                emit('todo_dialog_closed');
            }else{
                toast.add({severity:'error',summary:'To Do',detail:'Task save failed.',life:3000});
            }
        }
    };
    const update = async ()=>{
        model.GirisTarihi = await useNuxtApp().$dtsa(model.GirisTarihi);
        const { data:todo } = await useFetch('/api/sales/todo/process/update',{
            method:'PUT',
            body:model
        });
        if(todo?.value?.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            if(todo?.value?.status){
                toast.add({severity:'success',summary:'To Do',detail:'Task updated successfully.',life:3000});
                todoStore.updateTodo(model);
                emit('todo_dialog_closed');
            }else{
                toast.add({severity:'error',summary:'To Do',detail:'Task update failed.',life:3000});
            }
        }
    };
    const deleted = async ()=>{
        const { data:todo } = await useFetch(`/api/sales/todo/process/deleted/${model.ID}`,{
            method:'DELETE'
        });
        if(todo?.value.error){
            toast.add({severity:'error',summary:'To Do',detail:'An error has occurred.',life:3000});
        }else{
            if(todo?.value.status){
                toast.add({severity:'success',summary:'To Do',detail:'Task deleted successfully.',life:3000});
                todoStore.deleteTodo(model.ID);
                emit('todo_dialog_closed');

            }else{
                toast.add({severity:'error',summary:'To Do',detail:'Task delete failed.',life:3000});
            }
        }


    };



    
</script>