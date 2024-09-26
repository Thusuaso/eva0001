export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('stda',(value:any)=>{
        if (value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == "") {
            return "";
        } else {
            const date = value.split('-');
            const day = date[0];
            const month = date[1];
            const year = date[2];
            return new Date(year,month,day);  
        }
    })
})