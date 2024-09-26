export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('std',(value:any)=>{

        if (value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == "") {
            return "";
        } else {
            const date = value.split('-');
            const day = date[2];
            const month = date[1];
            const year = date[0];
            return new Date(year,month,day);  
        }
    })
})