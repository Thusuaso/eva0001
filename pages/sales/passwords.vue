<template>
    <Button class="w-100" severity="success" label="Add Password" @click="newPassword"/>
    <SalesPasswordsList :list="store.getPasswordsList"
        @password_list_selected_emit="passwordListSelectedEmit($event)"
    />
    <Dialog v-model:visible="password_visible_form" :header="header" modal :style="{width:'55rem'}">
        <SalesPasswordsForm :model="model" :status="password_new_button_status"
            @password_process_emit="passwordProcessEmit($event)"
            @password_deleted_emit="passwordDeletedEmit($event)"
        />

    </Dialog>

</template>
<script setup lang="ts">
    import { usePasswordsStore } from '~/store/passwords';
    const toast = useToast();
    const store = usePasswordsStore();
    let password_visible_form = ref(false);
    let header = ref();
    let model = ref();
    let password_new_button_status = ref(false);
    const { data:passwords } = await useFetch('/api/sales/passwords/list',{
        method:'GET'
    });
    if(passwords?.value?.error){
        toast.add({severity:'error',summary:'Passwords',detail:'An error has occurred.',life:3000});
    }else{
        store.setPasswordsList(passwords?.value?.list);
    };
    const newPassword = ()=>{
        password_visible_form.value = true;
        header.value = "Add New Password";
        model.value = {
            ID:0,
            Platform:'',
            LoginName:'',
            LoginPassword:'',
        };
        password_new_button_status.value = true;
    };
    const passwordProcessEmit = async (event:any)=>{
        if(password_new_button_status.value){
            save(event);
        }else{
            update(event);
        }
    };
    const save = async (event:any)=>{
        const { data:password } = await useFetch('/api/sales/passwords/save',{
            method:'POST',
            body:event
        });
        if(password?.value?.error){
            toast.add({severity:'error',summary:'Password',detail:'An error has occurred.',life:3000});
        }else{
            if(password?.value?.status){
                toast.add({severity:'success',summary:'Password',detail:'Password saved successfully.',life:3000});
                store.addPassword({...event,'ID':password?.value?.id});
                password_visible_form.value = false;
                password_new_button_status.value = false;
            }else{
                toast.add({severity:'danger',summary:'Password',detail:'Password saved unsuccessfully.',life:3000});

            }
        }
    };
    const update = async (event:any)=>{
        const {data:password} = await useFetch('/api/sales/passwords/update',{
            method:'PUT',
            body:event
        });
        if(password?.value?.error){
            toast.add({severity:'error',summary:'Password',detail:'An error has occurred.',life:3000});
        }else{
            if(password?.value?.status){
                toast.add({severity:'success',summary:'Password',detail:'Password updated successfully.',life:3000});
                store.updatePassword(event);
                password_visible_form.value = false;
                password_new_button_status.value = false;
            }else{
                toast.add({severity:'danger',summary:'Password',detail:'Password updated unsuccessfully.',life:3000});
            }
        }
    };
    const passwordListSelectedEmit = async(event:any)=>{
        header.value = event.Platform + ' Update';
        model.value = event;
        password_new_button_status.value = false;
        password_visible_form.value = true;
    };
    const passwordDeletedEmit = async(event:any)=>{
        const {data:password} = await useFetch(`/api/sales/passwords/delete/${event}`,{
            method:'DELETE'
        });
        if(password.value.error){
            toast.add({severity:'error',summary:'Password',detail:'An error has occurred.',life:3000});
        }else{
            if(password.value.status){
                toast.add({severity:'success',summary:'Password',detail:'Password deleted successfully.',life:3000});
                store.deletePassword(event);
                password_visible_form.value = false;

            }else{
                toast.add({severity:'danger',summary:'Password',detail:'Password deleted unsuccessfully.',life:3000});
            }
        }
    };

</script>