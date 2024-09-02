export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('decimal',(value:any)=>{
        if(value == null || value == undefined){
            return 0.0;
        }else{
            const val = (value / 1).toFixed(4).replace('.',',');
            return val.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ".");
        }
    })
})